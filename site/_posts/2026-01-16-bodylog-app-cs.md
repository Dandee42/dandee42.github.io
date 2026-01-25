---
layout: post
lang: cs
page_id: bodylog-app
title: BodyLog - Jak jsem si vytvořil svou první fitness apku
description: Příběh o tom, jak jsem po 8 letech zaznamenávání dat v Excelu napsal vlastní webovou aplikaci a co mě to naučilo.
lead: Příběh o tom, jak jsem po 8 letech zaznamenávání dat v Excelu napsal vlastní webovou aplikaci a co mě to naučilo.
slug: /bodylog-app
reading_time: 8 min
image: \assets\files\images\posts\2026-01-16-bodylog-app\bodylog_hero.jpg
category: 
tags: [my-projects, web-app]
published: true
---

Nevystudoval jsem IT obor, ale vždy mě lákalo si vytvořit svoji vlastní aplikaci. Chtěl jsem něco, co bude mít reálný přínos pro můj život a nebude to jen další „cvičný“ projekt do šuplíku. A tak vznikla [BodyLog App](https://bodylog.daniel-hladik.cz).

Obsah článku:
- toc
{: toc }

## Proč právě apka na sledování tělesných měr

Posledních 8 let jsem si vedl záznamy o své postavě v Excelu. Ne že bych byl profesionální bodybuilder, ale vždy mě zajímalo, jak se moje tělo s časem mění. Razím totiž heslo: „Co neměříš, to neřídíš.“ Jenže tabulka s čísly bez kontextu je po čase nepřehledná a chyběla mi v ní ta správná vizualizace „evoluce“ těla v čase – i když co si budeme povídat, ty přibývající roky (a kila) jsou na některých partiích vidět i bez grafu.

Právě tento letitý Excel se stal ideálním kandidátem na mou první aplikaci. I když je fitness aplikací na trhu nespočet, nechtěl jsem jim konkurovat. Chtěl jsem si postavit vlastní řešení na míru a hlavně se na něm naučit, co všechno obnáší vývoj – od prvního návrhu databáze až po nasazení na produkční server.

> ### _„Co neměříš, to neřídíš.“_

Když jsem se před přibližně rokem a půl začínal učit programovat, řekl jsem si, že bych mohl vytvořit aplikaci a udělat něco praktického, co bych sám využil. Z toho vznikla aplikace, kterou jsem pracovním názvem pojmenoval BodyLog.

## Šel jsem na to s rozmyslem

Navrhnul jsem si databázové modely, tabulku po tabulce a jejich vzájemné vazby. V té době jsem ještě nepoužíval AI ve velkém, takže jsem hezky po staru nejdříve na papír navrhnul entity, které jsem pospojoval do logického celku. Pomocí nástroje draw.io jsem si načrtnul, jaké stránky budou v aplikaci figurovat. Vypsal jsem si je také do Excelu a připsal si k nim slug URL, title a descriptions (kde to mělo význam).

![Diagram mappingu stránek v aplikaci](\assets\files\images\posts\2026-01-16-bodylog-app\bodylog-01.jpg){: .post-image }

Jakmile jsem měl základní architekturu aplikace připravenou, vrhnul jsem se na vizuál. Vytvořil jsem si v jedné online aplikaci design, ke kterému jsem poté směřoval při vývoji aplikace.

![Původní grafický návrh nástěnky](\assets\files\images\posts\2026-01-16-bodylog-app\bodylog-03.jpg){: .post-image }

![Style Guide se základními UI prvky](\assets\files\images\posts\2026-01-16-bodylog-app\bodylog-02.jpg){: .post-image }

Aplikaci jsem v základu za pár týdnů vytvořil, ale používal jsem ji pouze na svém lokálním počítači. Neměla překlady ani převody jednotek. Téměř rok jsem ji nepustil do produkčního světa. Tedy až do teď.

Některé věci jsem předělal, vylepšil, ale základ zůstal více méně stejný. Nejde o složitou aplikaci, takže změny jsem si ani nemusel nikam systematicky zaznamenávat, ale rovnou jsem na nich postupně pracoval.

> **Proč symbol mrkve v brandingu?**
> _Protože. Je to klišé. Jez mrkvičku a budeš zdravý jako řípa, říkává se (nebo jsem to popletl?). Nemá to logický důvod. Byla to první věc, která mě napadla._
{: .alert .alert-warning }

## S čím jsem nejvíc bojoval a co jsem se naučil

Vyzkoušel jsem si postupně tyto role:
- **Softwarový architekt a analytik**: Ještě než jsem napsal první řádek kódu, musel jsem si ujasnit, co přesně stavím. Navrhl jsem datový model, aby spolu jednotlivé entity (uživatel, záznam, jednotka) správně mluvily, a rozkreslil jsem si tok dat aplikací.
- **Grafický designer**: Zjistil jsem, že návrh vizuální podoby aplikace nebyl jen o barvách a nastylovaných tlačítkách (UI), ale i o tom, jak se uživateli bude používat (UX).
- **Backend developer**: Musel jsem vyvinout logiku, která převádí jednotky, hlídá oprávnění uživatelů a stará se o to, aby se správná data poslala na správné místo.
- **Frontend developer**: Převedl jsem design do reality pomocí HTML, CSS (převážně Bootstrap) a Javascriptu tak, aby aplikace vypadala a chovala se skvěle na desktopu i na displeji telefonu.
- **Tester**: Testerská role mi byla sice zkušenostmi nejbližší, ale upřímně jsem ji asi nejvíc odflákl. Samozřejmě jsem si zkoušel aplikaci proklikat, ale podrobnější testování jsem nechal na kamarádech.
- **Projektový manažer**: Musel jsem se naučit říct „ne“ novým funkcím, abych tu základní verzi (MVP) konečně dostal k uživatelům. A že těch nápadů bylo a stále je v backlogu hromada.

Naučil jsem se:

- **Tvorba wireframe modelu**: Pochopil jsem, že začít kódovat bez rozmyšleného nákresu a logiky aplikace je cesta do pekel. Dobré plánování a příprava na začátku projektu mi ušetřilo desítky hodin přepisování kódu.
- **Práce s databází a vztahy (ORM)**: Naučil jsem se, jak typovat proměnné a efektivně propojovat tabulky.
- **Lokalizace (i18n)**: Implementoval jsem systém, díky kterému aplikace mluví česky i anglicky a správně pracuje s formáty data a času v různých regionech.
- **Git a GitHub**: Ovládl jsem verzování kódu. Už se nebojím v aplikaci něco „rozbít“, protože se díky Gitu můžu kdykoliv vrátit k funkční verzi.
- **Docker**: Naučil jsem se aplikaci „zabalit“ do kontejneru. Díky tomu běží naprosto stejně na mém notebooku i na serveru.
- **Architektura MVC / MVT**: Pochopil jsem, jak oddělit data od vzhledu a logiky. To je klíč k tomu, aby kód zůstal přehledný i s tím, jak aplikace roste.
- **Automatický deployment přes Github Actions**: Nastavil jsem proces, kdy se po každé změně v kódu aplikace automaticky otestuje a sama nahraje na server.
- **Správa serveru**: Vyzkoušel jsem si konfiguraci produkčního prostředí, práci v terminálu přes SSH a zabezpečení aplikace tak, aby byla připravena na reálný provoz.

## AI - Učitel na zavolání
Jakožto začátečník v programování byla pro mě AI nekonečnou studnicí vědomostí s mentorem v jednom. Místo hodin strávených pročítání Stack Overflow jsem se jí ptal na konkrétní koncepty. Připadal jsem si jako malé dítě, které objevuje svět a neustále se ptá "Proč to tak funguje?".

Nadruhou stranu, i když mi AI hodně pomohla, několikrát mě poslala do slepé uličky s neexistujícími knihovnami. Naučilo mě to nejdůležitější pravidlo: Důvěřuj, ale prověřuj. Každý řádek, který mi AI navrhla, jsem musel pochopit a validovat, než jsem ho v projektu nechal.

Dnes už dokáže AI napsat jednoduchou webovou aplikaci sama a nepotřebujete ani vědět, jak programovat. Stačí vědět, co chcete a umět to správně formulovat.

## Co aplikace umí?

Dost už okecávání, přejdu k tomu, co vás, čtenáře, zajímá. K čemu vám ta apka bude? BodyLog App jsem stavěl tak, aby byla minimalistická, responzivní, dalo se ni dívat a používala se intuitivně.

Přibližný soupis toho, co umí:

* **Záznam 15+ tělesných měr:** Od klasiky jako váha, pas a hrudník až po detaily jako levé/pravé předloktí nebo lýtka. Máte tak kompletní mapu své postavy.
* **Automatický výpočet metrik:** Pro každý záznam měření se počítá BMI, % tělesného tuku a WHR.
* **Definice osobních cílů a jejich deadline** Řeknete si: "Chci do léta zhubnout do plavek.", nastavíte si termín 30. června a pak už "jen" děláte něco pro to,aby se tak stalo a v čase sledujete, zda se vám to daří či nikoliv.
* **Chytré přepínání jednotek:** Aplikace se vám přizpůsobí. Pokud preferujete centimetry a kilogramy, používáte je. Pokud jste zvyklí na imperiální jednotky, jedním kliknutím v profilu přepnete celou aplikaci (včetně historie) do palců a liber.
* **Interaktivní grafy a trendy:** Čísla v tabulce jsou fajn, ale graf s dlouhodovými trendy vám ukáže pravdu. Okamžitě vidíte, jestli křivka pasu klesá, zatímco biceps roste. Nebo, jak vám kolísá váha během roku, ať už z důvodu jojo efektu, nebo přirozeného cyklu ročních období.
* **Poznámky ke každému dni:** Ke každému měření si můžete připsat, jak jste se cítili, jestli jste byli po tréninku, nebo jestli byl ten den „cheat meal“ a nacpali jste si pupek k prasknutí. Kontext je totiž u dat klíčový.
* **Bezpečný přístup k vašim datům:** Každý uživatel má svůj vlastní profil. Vaše míry vidíte jen vy.

![Hotová aplikace - přihlašovací stránka](\assets\files\images\posts\2026-01-16-bodylog-app\bodylog-04.jpg){: .post-image }

Pokud zjistím, že je o BodyLog zájem, třeba aplikaci přesunu na samostatnou doménu a vymyslím lepší název. Mám v hlavě už teď seznam funkcí, které bych rád přidal. Nejdříve chci ale znát zpětnou vazbu od vás :)

P.S.: Počítám s tím, že apka má nějaké mouchy a může spadnout do neošetřené chyby serveru 500. Mně se to tedy zatím nepovedlo. Pokud by ale takový případ nastal, budu rád za nahlášení chyby na můj email [info@daniel-hladik.cz](#contact-form). Díky :)

> **Budu rád za zpětnou vazbu**
> _Aplikace je dostupná na mé subdoméně [bodylog.daniel-hladik.cz](https://bodylog.daniel-hladik.cz). Pokud vás zajímá, jak jsem se se svou vůbec první webovou aplikací popral a chcete sledovat svoje tělesné míry, zaregistrujte se a vyzkoušejte si ji. Je plně zdarma a bez reklam._
{: .alert .alert-idea }

> **Potřebujete pomoct s automatizací svých každodenních úkolů?**
> _[Napište mi zprávu](#contact-form) nebo si se mnou domluvte [30 min konzultaci ZDARMA](https://zapti.me/daniel-hladik/konzultace-zdarma)._
{: .alert .alert-info }