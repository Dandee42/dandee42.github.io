---
layout: post
lang: cs
page_id: sleep-habit-tracker
title: Jak sledovat svůj spánek pomocí Google nástrojů
description: Ukážu vám, jak sledovat vaši spánkovou rutinu pomocí Google Sheets zdarma. Bez aplikací a wearables – s Google Formulářem a automatickou připomínkou.
lead: Ukážu vám, jak sledovat vaši spánkovou rutinu pomocí nástrojů, ke kterým má každý přístup zdarma v rámci svého Google účtu.
slug: /sleep-habit-tracker
reading_time: 8 min
image: \assets\files\images\posts\2025-12-11-sleep-habit-tracker\sleep-habit_tracker-hero.jpg
category: 
tags: [life-hacks, google-sheets, google-apps-script, gmail]
published: true
---

Chcete sledovat svůj spánek bez nutnosti používat specializované aplikace nebo drahé wearables? V tomto článku se podělím o to, jak jsem si vytvořil vlastní **spánkový tracker** přímo v **Google Sheets** a rozšířil ho o emailovou notifikaci pomocí Google Apps Scriptu.

Obsah článku:
- toc
{: toc }

## Proč sledovat svůj spánek?
Spánkem trávíme přibližně třetinu života a jeho kvalita výrazně ovlivňuje naši regeneraci, soustředění i celkovou produktivitu. Proto bychom mu měli věnovat svoji pozornost. Někdo má problém usnout, někdo zase vstát na první zazvonění budíku. Ať už je váš důvod jakýkoliv, vlastní **spánkový deník** vám může pomoct najít vzorce, odhalit problémové dny a lépe porozumět svým návykům.

Já osobně se snažím **chodit spát a vstávat ve stejnou dobu** — ale upřímně, ne vždy se mi to daří. Právě proto jsem si začal spánek zaznamenávat, abych mohl zpětně vyhodnotit, jak jsem v jednotlivých dnech, týdnech či měsících dodržel svůj režim.

## Použité nástroje od Google

* **Google Sheets** - hlavní databáze a přehled výsledků
* **Google Forms** - jednoduché rozhraní pro zapisování spánku
* **Apps Script** - automatická notifikace emailem s odkazem na formulář

## Jak vytvořit vlastní aplikaci na sledování spánku

Pojďme se vrhnout na samotný proces tvorby aplikace.

### Krok 1. Nová tabulka a formulář

Otevřeme si nový Google sheets soubor. List 1 přejmenujeme na např. `sleep_calendar`. K tabulce napojíme formulář, přes který budeme každý den zadávat údaje o spánku.
Tvorbu formuláře najdeme v horním menu na záložce `Nástroje` a poté klikneme na `Vytvořit nový formulář`. Otevře se nám formulář v Google Forms, kde si nadefinujeme, co chceme sledovat. Zároveň se nám v Google Sheets vytvoří nový list se záznamy napojenými na data z vyplněného formuláře. Pojmenujeme tento list např. `sleep_tracking_data`.

![Vytvoření nového formuláře přes Google Forms](\assets\files\images\posts\2025-12-11-sleep-habit-tracker\sleep-habit_tracker-01.jpg)

Protože ráno nejsem schopný napočítat do desíti, budu si psát čas, v kolik hodin jsem šel spát večer předtím a čas, v kolik jsem se probudil. Poté si výsledný čas nechám automaticky spočítat přes vzorec z rozdílu těchto hodnot.

Já osobně tedy chci znát:
* svoji ranní náladu,
* čas, kdy jsem šel spát,
* čas probuzení,
* a jestli jsem vstal na první zazvonění budíku.

Pro lepší kontext si každý může doplnit další parametry dle své potřeby, např.: pole s poznámkou nebo zda jste přestali pít a jíst hodinu a půl před spaním apod.

![Zadání polí pro formulář](\assets\files\images\posts\2025-12-11-sleep-habit-tracker\sleep-habit_tracker-02.jpg)

Pošleme si první **zkušební záznam vyplněním formuláře**. Hodnoty se nám automaticky propíšou do listu `sleep_tracking_data`. Přidáme si nový sloupec na druhou pozici za časovou značku a dosadíme vzorcem `=DATUM(ROK(A2);MĚSÍC(A2);DEN(A2))` pro **očištění datumu o časový údaj**. Důvodem je, aby nám funkce pro vyhledání hodnoty vždy našla přesný údaj. Do posledního sloupce (u mě na příkladu sloupec `G`) přidáme **počítaný sloupec s délkou spánku** prostým rozdílem času ulehnutí ke spánku a času probuzení.

![Google Sheets tabulka s daty z Google Forms](\assets\files\images\posts\2025-12-11-sleep-habit-tracker\sleep-habit_tracker-03.jpg)

Jakmile máme parametry nadefinované přejdeme na tvorbu přehledové tabulky.

### Krok 2. Přehledný kalendář se záznamy spánku

V přehledové tabulce na listu `sleep_calendar` si vytvoříme čísla měsíců (1 až 12) do sloupců a čísla dnů v měsíci (1 až 31) do řádků. Abychom věděli, o jaký rok jde, do buňky `A1` vložíme aktuální rok. Rok se nám bude také hodit i pro vzorec, který vyhledá konkrétní záznam z `sleep_tracking_data` a přiřadí ho konkrétnímu datu v přehledové tabulce.

Pro zobrazení celkové délky spánku ke konkrétnímu zaznamenanému dni napíšeme do buňky `B2` následujicí vzorec a rozkopírujeme ho do všech polí v naší matici:

<pre><code>
=XLOOKUP(DATUM($A$1; A$1; $A2); sleep_tracking_data!$B$2:$B$999; sleep_tracking_data!$G$2:$G$999; "")
</code></pre>

Formát buněk bude potřeba upravit jako `HH:mm`, aby se nám zobrazoval hezky naformátovaný jako čas, jinak uvidíme pouze nějaké nic neříkající číslo.

**Podmíněné formátování** můžeme využít k přehlednému zvýraznění hodnot podle vlastních pravidel. U délky spánku si například můžeme nastavit barevnou škálu, kde se výrazně odchýlené hodnoty zobrazí červeně a hodnoty blízké ideálu zeleně.

Další možností je zduplikovat tabulku a do kopie zaznamenávat subjektivní pocity po probuzení (např. dobře, špatně, aj). Jednotlivým hodnotám pak přiřadíme barvy, které se následně propíší jako pozadí do tabulky s časovými údaji. Zduplikovanou tabulku můžeme skrýt a ponechat si pouze hlavní přehled s časovými hodnotami podbarvenými podle toho, jak dobře jsme se ráno cítili.

Protože jednotlivé měsíce mají rozdílný počet dní, je vhodné buňky odpovídající neexistujícím datům zabarvit tmavou barvou, aby bylo na první pohled jasné, že zde žádná hodnota nemůže vzniknout. Stejným způsobem si můžeme zvýraznit i víkendy, například světle šedou barvou.

Výsledný přehled může potom vypadat takto:

![Výsledný přehled se zaznamenanými spánkovými údaji](\assets\files\images\posts\2025-12-11-sleep-habit-tracker\sleep-habit_tracker-05.jpg)

Pokud bychom chtěli **sledovat data mezi jednotlivými roky**, založíme si nový list s přehledovou tabulkou a jen změníme na požadovaný rok v buňce `A1`.

### Krok 3. Automatická notifikace na email

Abychom ráno nezapomněli, že máme vyplnit svoje údaje o spánku, budeme si každé ráno **posílat notifikaci emailem** přes **Google Apps Script**. V horním menu Google Sheets klikneme na záložku `Rozšíření`, kde najdeme položku `Apps Script`. Vytvoříme skript s kódem pro odeslání zprávy z našeho **Gmail účtu** a povolíme potřebné autorizace.

<pre><code>
function sendEmailReminder() {
  const EMAIL = "your@gmail.com"; 
  const FORM_URL = "https://forms.gle/abcdefgh"; 
  const SUBJECT = "Zaznamenej si spánek";
  const BODY = `Ahoj!\n\nNezapomeň prosím vyplnit dnešní formulář:\n${FORM_URL}`;
  const SENDER_NAME = "Osobní asistent";

  GmailApp.sendEmail(EMAIL, SUBJECT, BODY, {
    name: SENDER_NAME,
    htmlBody: `Ahoj!&lt;br&gt;&lt;br&gt;
Nezapomeň prosím vyplnit dnešní formulář:&lt;br&gt;&lt;br&gt;
&lt;a href=&quot;${FORM_URL}&quot;&gt;SLEEP TRACKER FORM&lt;/a&gt;`
  });
}
</code></pre>

V Google Apps Script **nastavíme spouštěč** dané funkce na příslušnou ranní hodinu, kdy chceme dostávat notifikaci.

![Google Apps Script a nastavení automatických emailových upomínek](\assets\files\images\posts\2025-12-11-sleep-habit-tracker\sleep-habit_tracker-06.jpg)

Připomínku si nemusíme posílat pouze emailem, ale můžeme například vložit odkaz do **Google Keeps** nebo do **Google kalendáře** a nastavit si pravidelnou upomínku. Záleží, co jsme zvyklí používat a podle toho zvolíme nástroj, který nám pomůže připomenout si každé ráno zápis do formuláře.

A máme hotovo! :)

> **Tip na závěr**
> _Aplikaci můžete mimo jiné využít i jako snář, kdy si hned ráno budete zaznamenávat sny, které se vám během spánku zdály. Stejně tak ji lze využít jako jednoduché sledování návyků, na které se chcete soustředit._
{: .alert .alert-idea }

> **Potřebujete pomoct s touto či jinou automatizací?**
> _<a href="#contact-form">Napište mi zprávu</a> nebo si se mnou domluvte <a href="https://zapti.me/daniel-hladik/konzultace-zdarma">30 min konzultaci ZDARMA</a>._
{: .alert .alert-info }
