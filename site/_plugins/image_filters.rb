# Liquid filters for files in the site source. site.static_files can't answer these
# in the English build, where polyglot leaves out assets/.
module Jekyll
  module ImageFilters
    # {{ "/assets/x.webp" | file_exists }} is true when the file exists
    def file_exists(path)
      File.file?(source_file(path))
    end

    # {{ "/assets/x.jpg" | image_size }} is [width, height] of a JPEG or PNG, or nil
    def image_size(path)
      file = source_file(path)
      return nil unless File.file?(file)

      File.open(file, 'rb') do |f|
        head = f.read(24).to_s.b
        if head.start_with?("\x89PNG".b)
          head[16, 8].unpack('NN')
        elsif head.start_with?("\xFF\xD8".b)
          jpeg_size(f)
        end
      end
    end

    private

    def source_file(path)
      File.join(@context.registers[:site].source, path.to_s)
    end

    # Walks the JPEG segments to the start-of-frame marker, which holds the dimensions
    def jpeg_size(f)
      f.seek(2)
      while (segment = f.read(4)) && segment.bytesize == 4
        marker, length = segment.unpack('nn')
        return nil unless (marker >> 8) == 0xFF

        if (0xFFC0..0xFFCF).cover?(marker) && ![0xFFC4, 0xFFC8, 0xFFCC].include?(marker)
          height, width = f.read(5).unpack('xnn')
          return [width, height]
        end
        f.seek(length - 2, IO::SEEK_CUR)
      end
      nil
    end
  end
end

Liquid::Template.register_filter(Jekyll::ImageFilters)
