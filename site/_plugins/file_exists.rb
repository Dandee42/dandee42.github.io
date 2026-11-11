# Liquid filter: {{ "/assets/x.webp" | file_exists }} is true when the file exists in the site source.
# site.static_files can't answer this in the English build, where polyglot leaves out assets/.
module Jekyll
  module FileExistsFilter
    def file_exists(path)
      site = @context.registers[:site]
      File.file?(File.join(site.source, path.to_s))
    end
  end
end

Liquid::Template.register_filter(Jekyll::FileExistsFilter)
