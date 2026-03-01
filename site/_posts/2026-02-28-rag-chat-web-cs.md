---
layout: post
lang: cs
page_id: rag-chat-web
title: Jak přidat agentního AI chatbota na svůj web (RAG návod)
description: Naučte se, jak pomocí n8n a RAG postavit AI agenta, který zná vaše služby, domlouvá schůzky a odesílá e-maily. Praktický návod pro váš web bez složitého kódování.
lead: Chcete si na svůj web přidat chatbota, který posílá emaily, domlouvá schůzky a zná celý váš web nazpaměť? Přečtěte si více v článku.
slug: /rag-ai-agent-in-website
reading_time: 7 min
image: /assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-hero.jpg
category: 
tags: [ai-chat, rag, agentic-ai, n8n, llm]
published: true
---

Chcete na webu **chatbota**, který skutečně zná vaše produkty, služby, ceníky nebo dokumentaci a neodpovídá jen obecné fráze? V tomto článku vás provedu tvorbou "agentního" chatbota sestrojeného pomocí nástroje **n8n**. Ukážeme si, jak využít metodu **RAG** k propojení **AI** s vašimi daty z webu a jak agentovi umožnit provádět akce, jako je odesílání e-mailů či domlouvání schůzek.

Obsah článku:
- toc
{: toc }

## Co znamená RAG a proč ho chtít
Ještě něž se dostaneme k samotné tvorbě, je potřeba pochopit klíčový koncept, bez kterého by nám model nedával relevantní odpovědi. Tím je **<abbr title="RAG (Retrieval-Augmented Generation, v překladu Generování rozšířené o vyhledávání ): Proces, kdy si AI nejdříve přečte vaše dokumenty a až pak odpoví uživateli.">RAG</abbr>**.

Zkratka **RAG (Retrieval-Augmented Generation)** se překládá do češtiny jako _generování rozšířené o vyhledávání_. Jedná se o koncept, díky kterému váš AI model "nehalucinuje" (nevymýšlí si), ale odpovědi generuje na základě nějaké znalostní databáze, kterou mu vy sami předložíte.

![Srovnání položení dotazu na běžný AI model a RAG AI model](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-01.jpg){: .post-image }

Běžný AI model je jako velmi vzdělaný člověk, který však od určitého data přestal sledovat novinky a nezná nic o vašem konkrétním byznysu. Když se ho zeptáte na něco z interní dokumentace, nebude vědět a může si i vymýšlet. Pokud tomu samému člověku dáte do ruky vaše materiály (ceník, dokumentaci, články, FAQ) a řeknete mu: _"Odpovídej pouze na základě toho, co zde najdeš."_, najde tu správnou odpověď. Takto velmi zjednodušeně funguje RAG AI Model.

Jak RAG proces vypadá v praxi:

1. **Příprava dat**: Dokumenty očištěné o duplicity a nepotřebný obsah se rozsekají na menší části. Tyto kousky se pomocí **<abbr title="Embedding model je specializovaný typ umělé inteligence, který slouží jako překladač mezi lidskou řečí a světem čísel. Jeho jedinou úlohou je vzít kus textu (slovo, větu nebo odstavec) a vypočítat pro něj jeho vektor. V rámci procesu RAG se při ukládání převádějí dokumenty na vektory, aby se daly uložit do vektorové databáze. Při dotazu se otázka uživatele převede na vektory, aby ji systém mohl porovnat s uloženými daty.">embedding modelu</abbr>** převedou na **<abbr title="V kontextu AI je vektor číselné vyjádření významu slova, věty nebo celého dokumentu. Protože počítače nerozumí textu tak jako lidé, používají k porovnávání informací dlouhé seznamy čísel (souřadnice). Tyto souřadnice určují přesnou polohu dané informace v pomyslném prostoru znalostí. Pokud mají dva texty podobný význam, leží jejich vektory v databázi blízko sebe. V rámci RAG umožňují systému bleskově najít souvislosti mezi otázkou uživatele a vašimi daty.">vektory</abbr>** a uloží do speciální vektorové databáze, kde v nich AI umí rychle hledat.
2. **Zpracování dotazu**: Když se uživatel zeptá, systém převede jeho dotaz pomocí stejného modelu na vektor a najde nejbližší kontextovou shodu v databázi. Vytáhne tak pouze ty odstavce, které s otázkou skutečně souvisí.
3. **Generování odpovědi**: Tyto vybrané odstavce se přibalí k původní otázce a pošlou se **<abbr title="LLM (Large Language Model): Velký jazykový model je typ umělé inteligence (např. Chat GPT, Claude nebo Gemini) vytrénovaný na obrovském množství textu. Slouží jako „mozek“ celého systému, který dokáže rozumět lidské řeči, generovat text a logicky uvažovat.">LLM modelu</abbr>**, který z nich sestaví finální odpověď. Do odpovědi tedy nejsou zahrnuty pouze znalosti natrénované v LLM modelu, ale i nalezené informace.

## Použité nástroje

Způsobů, jak si sestrojit chytrý AI chat a umístit ho na vašem webu, je hned několik. Velmi jsem si oblíbil low-code automatizační nástroj **<abbr title="n8n: Low-code platforma pro automatizaci workflow, která propojuje stovky aplikací bez nutnosti složitého kódování.">n8n</abbr>**, kde můžete hezky vizuálně vidět, jak informace ve workflow putují z jednoho uzlu do druhého. Budu tedy popisovat implementaci právě s tímto nástrojem.

Pro vás neznalé, n8n je taková virtuální stavebnice Merkur, jen pro **automatizace**. Má v sobě přímo integrované stavební bloky **<abbr title="LangChain je open-source framework s předpřipravenou architekturou pro agenty a integracemi pro jakýkoliv model nebo nástroj. Umožňuje stavět agenty, kteří se dokážou přizpůsobovat stejně rychle, jako se vyvíjí celý AI ekosystém.">LangChain</abbr>**, takže v něm lze vytvářet komplexní **<abbr title="Agentní systémy (nebo AI agenti) jsou pokročilé implementace umělé inteligence, které nefungují podle předem daného scénáře, ale samostatně rozhodují o postupu k dosažení stanoveného cíle.">agentní systémy</abbr>** bez napsání jediného řádku kódu.

![AI Agent s řídícím mozkem n8n platformy](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-04-a.jpg){: .post-image }

Co budeme potřebovat:

* **n8n** - Centrální mozek. Orchestruje workflow a poskytuje chatovací rozhraní pro uživatele na pokládání dotazů a dávání pokynů.
* **Vektorová databáze** - Místo, kam uložíme vlastní data v podobě, které AI rozumí.
* **Embedding model** - Nástroj, který převede váš lidský text na číselné vektory.
* **Napojení na LLM model** - Předtrénovaný AI model (Gemini, Chat GPT, lokální LLM ...), který dává agentovi schopnost rozumět a generovat text.
* **Paměťová databáze** – Databáze sloužící k tomu, aby si agent pamatoval, co uživatel napsal před minutou.
* **Google účet** - Pro integraci s Gmailem (odesílání e-mailů), Google Diskem (čtení dokumentů) a Google Kalendářem (domlouvání schůzek).

## Jak si vytvořit vlastního chatbota a přidat ho na svůj web

Teorii máme za sebou, pojďme si tedy vyhrnout rukávy a podívat se na to, jak tyto koncepty přetavit v realitu. Ani nemusíte být programátor, abyste vytvořili funkční systém, který dává smysl. Stačí pochopit, jak správně pospojovat jednotlivé stavební bloky od databáze až po samotné chatovací okno.

> **Zajímá vás, kolik stojí provoz takového chatbota?**
> _[Napište mi zprávu](#contact-form) nebo si se mnou domluvte [30 min konzultaci ZDARMA](https://zapti.me/daniel-hladik/konzultace-zdarma), kde to spolu můžeme probrat :)_
{: .alert .alert-idea }

### Krok 1. Příprava dat a uložení do vektorové databáze
V mém případě chci, aby měl AI agent kontext celého webu. Musím tedy nějakým způsobem dostat informace z webu do vektorové databáze, odkud si bude LLM model brát informace ke zpracování odpovědí. Použijeme k tomu data ze **<abbr title="Sitemap (mapa stránek) je soubor, nejčastěji ve formátu .xml, který obsahuje seznam všech důležitých URL adres vašeho webu. Slouží primárně pro roboty vyhledávačů (Google, Seznam), kterým pomáhá efektivněji procházet a indexovat web, což zlepšuje SEO.">sitemapy</abbr>**. Stáhneme z ní url adresy stránek na webu, převedeme je z XML formátu do **<abbr title="Univerzální a lehký datový formát, který slouží k přehlednému ukládání a přenosu informací. V rámci n8n funguje jako hlavní komunikační jazyk.">JSONu</abbr>**.

Poté načteme obsah jednotlivých stránek přes GET HTTP request a **očistíme o přebytečný balast**. Nepotřebujeme totiž celou strukturu webu jako je hlavička nebo patička. Nakonec převedeme výsledný HTML obsah do **<abbr title="Markdown je odlehčený značkovací jazyk, který slouží pro úpravu prostého textu a jeho následný převod na formátovaný text publikovatelný na webu, zejména ve formátu HTML. Umožňuje pomocí jednoduchých formátovacích značek vyznačit v textu nadpisy a seznamy, doplnit odkazy, obrázky atd. Cílem jazyka je, aby byl text dobře čitelný a publikovatelný i v původním formátu prostého textu.">Markdown</abbr>** formátu, kterému AI modely lépe rozumí. A máme vstupní data z webu připravená.

> **Jaká další data můžete svému AI agentovi předhodit?**
> _Vstupní data můžete doplnit například soubory ze svého Google Disku jako jsou PDF soubory, tabulky, textové dokumenty apod. Důležité je však vždy myslet na bezpečnost citlivých dat a krmit agenta jen tím, co ke své roli skutečně potřebuje. Pamatujte, že s rostoucím množstvím a komplexitou dat roste i potřeba data řádně očišťovat a optimalizovat RAG pro rychlé a přesné odpovědi._
{: .alert .alert-info }

Nyní můžeme vyčištěná data uložit do vektorové databáze, odkud si bude AI agent brát informace pro sestavení relevantních odpovědí. Do vektorové databáze však nelze uložit text jen tak napřímo. Aby v něm AI mohla efektivně vyhledávat, musí být text nejdříve převeden na digitální otisk (vektor). K tomu slouží již výše zmíněné **<abbr title="Zatímco my lidé vnímáme svět ve 3 rozměrech, moderní embedding modely pracují v nepředstavitelném prostoru o několika stovkách až tisících dimenzí. Například model od OpenAI (text-embedding-3-small) používá standardně 1 536 dimenzí. Každý úsek textu tak dostane 1 536 souřadnic, které přesně definují jeho význam. Díky tomu pak AI agent dokáže v mžiku najít souvislosti mezi otázkou uživatele a našimi daty na základě jejich hlubokého významu, nikoliv jen shody klíčových slov.">embedding modely</abbr>**.

Před finálním uložením do vektorové databáze se text ještě musí rozdělit na menší celky, tzv. "**chunking**". Jde o to, aby se modelu nepředhodily 42-stránkové obchodní podmínky e-shopu (které stejně nikdo nečte) najednou, ale pouze její menší celky relevantní vůči dotazu. Tím se zásadně šetří kontextové okno modelu a s tím související náklady na tokeny, za jejichž spotřebu se platí.

Obvykle se velikost jednoho kousku ("chunku") pohybuje mezi 500-1000 znaky s překryvem 10-20%. Tento překryv je klíčový, aby se při rozdělení textu neztratil kontext a myšlenka plynule navazovala i v dalším bloku. Samotné rozdělování pak probíhá podle logických pravidel, nejčastěji podle odstavců nebo nadpisů.

![Abstrakce převodu textu na vektory pomocí embedding modelu](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-05.jpg){: .post-image }

Do vektorové databáze tedy ukládáme data ideálně očištěná a rozsekaná na menší části. Abychom neztratili kontext, odkud data pocházejí, doplníme do **metadat** URL adresu a datum poslední aktualizace dané webové stránky. Agent pak může v odpovědi uvést odkaz, odkud čerpal, což zvyšuje jeho důvěryhodnost a dotazující si může odpovědi rovnou ověřit na konkrétním odkazu.

### Krok 2. Sestavení Agenta s jeho nástroji

V n8n propojíme AI Agenta s naší vektorovou databází. Tím získá svou **dlouhodobou paměť** ze zdrojů, které jsme mu předem uložili. Aby si agent pamatoval, co uživatel napsal před minutou, je potřeba mu také přidat **krátkodobou paměť**, kam se bude ukládat historie společné konverzace.

Nyní bychom měli RAG AI Chatbota, ale stále ještě bychom mu nemohli říkat **agentní chatbot**. Co dělá z obyčejného chatbota skutečný agentem je právě schopnost jednat v reálném čase. V tomto případě mu přidáme nástroj, kterým může **odesílat emaily** z našeho Gmailového účtu. Můžeme mu také přidat **přístup do kalendáře**, aby věděl, v jakých časech jsou volné sloty pro domluvení schůzky a schůzku poté zapsat do kalendáře.

Pokud bychom chtěli, mohli bychom mu dát přístup k vyhledávání na internetu nebo napojení na různé externí API, ať už jde o počasí, měnové kurzy či stavy eshopových objednávek, či se v reálném čase dotazovat na zákazníky přímo do svého **CRM**.

### Krok 3. Optimalizace systémového promptu, důkladné testování a re-ranking

Nejdůležitější částí je definice **systémového promptu**. Jde o sadu instrukcí, která definuje osobnost, cíle a mantinely agenta. Nesmíme zapomenout nadefinovat i to, jak má používat připojené nástroje. Jakmile jsme spokojení s pokyny pro AI Agenta, začneme testovat. Budeme testovat relevanci odpovědí a chování podle namyšlených scénářů.

Když zjistíme, že agent odpovídá nepřesně, máme několik možností, co s tím udělat. Můžeme upravit systémový prompt, vyzkoušet jiný AI model nebo zpřesnit výběr dat z vektorové databáze pomocí tzv. **<abbr title="Re-ranking je proces, který zvyšuje přesnost odpovědí v systému RAG. Zatímco vektorové vyhledávání je jako knihovník, který z regálu přinese 10 knih na dané téma. Re-ranking je pak ten moment, kdy si těch 10 knih prolistujete a vyberete jen ty 3, které velmi pravděpodobně obsahují odpověď na vaši otázku. Je to tedy druhý filtr před předáním vstupních dat pro finalizaci odpovědi LLM modelem.">Re-rankingu</abbr>**.

**Re-ranking model** funguje jako druhý, přísnější filtr. Znovu a důkladněji projde výsledky z databáze a seřadí je podle skutečné relevance k dotazu. Teprve ty nejlepší kousky informací pošle finálnímu modelu k vypracování odpovědi. V našem konkrétním případě však není re-ranking nezbytně nutný vzhledem k menšímu objemu vstupních dat, ale je dobré o něm vědět, jakmile váš systém začne růst.

### Krok 4. Automatická aktualizace dat
Vytvoříme workflow, která bude automaticky jednou za čas (např. 1x denně o půlnoci) aktualizovat data ve vektorové databázi, aby vždy odpovídala aktuálnímu stavu informací na webu.

![Low-code nástroj n8n a výsledné workflow AI agenta s RAG modelem](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-02-a.jpg){: .post-image }

### Krok 5. Přidání chatovacího okna na web
Interakce s AI agentem bude probíhat pomocí chatovacího okna, které umístíme do kódu na našem webu. Nativní chatovací okno má už v sobě **n8n** integrované, takže není nutné si psát vlastní chatovací rozhraní či používat aplikaci 3. strany. Vyzkoušíme, zda vše chodí, jak má. Nezapomeneme přidat svoji webovou stránku do CORS.

![Chatovací okno na webu](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-03-a.jpg){: .post-image }

> **Vyzkoušejte si chatbota přímo na mém webu**
> _Pokláboste s Dankou - mojí virtuální asistentkou - přímo teď a tady. Vpravo dole by měla být umístěná bublina s chatem. Nebojte se vyzkoušet, jak na vás bude Danka reagovat. Klidně mi můžete poslat zpětnou vazbu emailem přímo skrz chatovací okno._
{: .alert .alert-idea }

## Shrnutí: Jak to celé funguje v bodech

V momentě, kdy uživatel odešle dotaz, proběhne v n8n tento řetězec událostí:

1. **Analýza záměru**: AI zjistí, zda se uživatel ptá na informaci, nebo chce něco zařídit (např. odeslat vzkaz či domluvit schůzku).
2. Pokud jde o dotaz na znalostní databázi:
  - **Vyhledání**: Agent prohledá vektorovou databázi.
  - **Zpřesnění**: Vybere ty nejrelevantnější kousky informací.
3. Pokud jde o akci:
  - **Akce**: Jestliže uživatel chce např. zanechat vzkaz, agent použije emailový nástroj pro odeslaní zprávy. Pokud však nemá vše, co potřebuje, k odeslání emailu, doptá se na zbývající informace v dalším kroku.
4. **Generování odpovědi**: AI složí srozumitelnou odpověď kombinující data z databáze.

## Na co si dát pozor

* **Kvalita a zpracování vstupních dat** - RAG je jen tak dobrý, jak dobrá jsou vaše zdrojová data.
* **Bezpečnost dat a soukromí** - Nastavte agentovi jasné hranice, k jakým datům smí přistupovat. A také je potřeba se zamyslet vzhledem k citlivosti údajů nad tím, odkud a kam data posíláte a kdo s ni může nakládat (GDPR). Taky je potřeba mít na paměti, že většinou bezplatná napojení na API LLM modelů souvisí s trénováním modelu na vašich datech.
* **Cena a efektivita** - Sledujte spotřebu tokenů. Pro agentní systémy jsou spolehlivější dražší modely, ale ne vždy je nutné střílet z kanonu na vrabce. Pro jednodušší úkoly můžete zkusit levnější modely a ušetřit tak značné náklady.
* **Human-in-the-loop** - U kritických akcí, jako je odesílání důležitých e-mailů nebo mazání dat v CRM, nenechávejte AI zcela o samotě.
* **Logování** - Logování je váš nejlepší nástroj pro následnou optimalizaci systému.

V tomto článku jsem nezacházel do přílišných detailů ohledně samotné stavby workflow v rámci n8n. Cílem bylo poskytnout vám, čtenářům, představu o tom, jak funguje RAG a jak si každý může vytvořit vlastního agentního AI chatbota.

> **Chcete vlastního chatbota na svém webu, ale nevíte si s tím rady?**
> _[Napište mi zprávu](#contact-form) nebo si se mnou domluvte [30 min konzultaci ZDARMA](https://zapti.me/daniel-hladik/konzultace-zdarma)._
{: .alert .alert-info }