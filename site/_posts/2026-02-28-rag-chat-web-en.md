---
layout: post
lang: en
page_id: rag-chat-web
title: How to add an AI chatbot agent to your website (RAG tutorial)
description: Learn how to use n8n and RAG to build an AI agent that knows your services, schedules meetings, and sends emails. A practical guide for your website without complicated coding.
lead: Would you like to add a chatbot to your website that sends emails, arranges meetings, and knows your entire website by heart? Read more in the article.
slug: /rag-ai-agent-in-website
reading_time: 7 min
image: /assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-hero.jpg
category: 
tags: [ai-chat, rag, agentic-ai, n8n, llm]
published: true
---

Do you want a **chatbot** on your website that really knows your products, services, price lists, or documentation and doesn&#x27;t just respond with general phrases? In this article, I will guide you through the creation of an &quot;agent&quot; chatbot built using the **n8n** tool. We will show you how to use the **RAG** method to connect **AI** with your website data and how to enable the agent to perform actions such as sending emails or arranging meetings.

Article content:
- toc
{: toc }

## What does RAG mean and why would you want it?
Before we get to the actual creation, it is necessary to understand a key concept without which the model would not give us relevant answers. That is **<abbr title="RAG (Retrieval-Augmented Generation, v překladu Generování rozšířené o vyhledávání ): Proces, kdy si AI nejdříve přečte vaše dokumenty a až pak odpoví uživateli.">RAG</abbr>**.

The abbreviation **RAG (Retrieval-Augmented Generation)** translates into Czech as _generation augmented by retrieval_. It is a concept that prevents your AI model from &quot;hallucinating&quot; (making things up), but instead generates answers based on a knowledge database that you provide.

![Comparison of asking a question to a regular AI model and a RAG AI model](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-01.jpg){: .post-image }

A standard AI model is like a highly educated person who, however, stopped following the news at a certain point and knows nothing about your specific business. If you ask them something from your internal documentation, they won&#x27;t know and may even make things up. If you give that same person your materials (price list, documentation, articles, FAQ) and tell them, &quot;Answer only based on what you find here,&quot; they will find the right answer. This is how the RAG AI Model works in a very simplified way.

What the RAG process looks like in practice:

1. **Data preparation**: Documents cleaned of duplicates and unnecessary content are broken down into smaller pieces. These pieces are converted into **<abbr title="V kontextu AI je vektor číselné vyjádření významu slova, věty nebo celého dokumentu. Protože počítače nerozumí textu tak jako lidé, používají k porovnávání informací dlouhé seznamy čísel (souřadnice). Tyto souřadnice určují přesnou polohu dané informace v pomyslném prostoru znalostí. Pokud mají dva texty podobný význam, leží jejich vektory v databázi blízko sebe. V rámci RAG umožňují systému bleskově najít souvislosti mezi otázkou uživatele a vašimi daty.">vectors</abbr>** using <abbr title="Embedding model je specializovaný typ umělé inteligence, který slouží jako překladač mezi lidskou řečí a světem čísel. Jeho jedinou úlohou je vzít kus textu (slovo, větu nebo odstavec) a vypočítat pro něj jeho vektor. V rámci procesu RAG se při ukládání převádějí dokumenty na vektory, aby se daly uložit do vektorové databáze. Při dotazu se otázka uživatele převede na vektory, aby ji systém mohl porovnat s uloženými daty.">an</abbr> **<abbr title="Embedding model je specializovaný typ umělé inteligence, který slouží jako překladač mezi lidskou řečí a světem čísel. Jeho jedinou úlohou je vzít kus textu (slovo, větu nebo odstavec) a vypočítat pro něj jeho vektor. V rámci procesu RAG se při ukládání převádějí dokumenty na vektory, aby se daly uložit do vektorové databáze. Při dotazu se otázka uživatele převede na vektory, aby ji systém mohl porovnat s uloženými daty.">embedding model</abbr>** and stored in a special vector database where AI can quickly search them.
2. **Query processing**: When a user asks a question, the system converts the query into a vector using the same model and finds the closest contextual match in the database. This way, it only pulls up paragraphs that are actually relevant to the question.
3. **Answer generation**: These selected paragraphs are appended to the original question and sent to <abbr title="LLM (Large Language Model): Velký jazykový model je typ umělé inteligence (např. Chat GPT, Claude nebo Gemini) vytrénovaný na obrovském množství textu. Slouží jako „mozek“ celého systému, který dokáže rozumět lidské řeči, generovat text a logicky uvažovat.">the </abbr>**<abbr title="LLM (Large Language Model): Velký jazykový model je typ umělé inteligence (např. Chat GPT, Claude nebo Gemini) vytrénovaný na obrovském množství textu. Slouží jako „mozek“ celého systému, který dokáže rozumět lidské řeči, generovat text a logicky uvažovat.">LLM model</abbr>**, which compiles them into a final answer. The answer therefore includes not only the knowledge trained in the LLM model, but also the information found.

## Tools used

There are several ways to build a smart AI chat and place it on your website. I really like the low-code automation tool **<abbr title="n8n: Low-code platforma pro automatizaci workflow, která propojuje stovky aplikací bez nutnosti složitého kódování.">n8n</abbr>**, where you can visually see how information travels from one node to another in the workflow. So I will describe the implementation with this tool.

For those of you who are unfamiliar with it, n8n is like a virtual Merkur construction set, but for **automation**. It has **<abbr title="LangChain je open-source framework s předpřipravenou architekturou pro agenty a integracemi pro jakýkoliv model nebo nástroj. Umožňuje stavět agenty, kteří se dokážou přizpůsobovat stejně rychle, jako se vyvíjí celý AI ekosystém.">LangChain</abbr>** building blocks integrated directly into it, so you can create complex **<abbr title="Agentní systémy (nebo AI agenti) jsou pokročilé implementace umělé inteligence, které nefungují podle předem daného scénáře, ale samostatně rozhodují o postupu k dosažení stanoveného cíle.">agent systems</abbr>** without writing a single line of code.

![AI Agent with the n8n platform&#x27;s control brain](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-04-a.jpg){: .post-image }

What we will need:

* **n8n** - Central brain. It orchestrates the workflow and provides a chat interface for users to ask questions and give instructions.
* **Vector database** - A place to store your own data in a form that AI understands.
* **Embedding model** - A tool that converts your human text into numerical vectors.
* **Connection to LLM model** - A pre-trained AI model (Gemini, Chat GPT, local LLM, etc.) that gives the agent the ability to understand and generate text.
* **Memory database** - A database that allows the agent to remember what the user wrote a minute ago.
* **Google account** - For integration with Gmail (sending emails), Google Drive (reading documents), and Google Calendar (scheduling meetings).

## How to create your own chatbot and add it to your website

Now that we&#x27;ve covered the theory, let&#x27;s roll up our sleeves and see how to turn these concepts into reality. You don&#x27;t even need to be a programmer to create a functional system that makes sense. All you need to do is understand how to properly connect the individual building blocks, from the database to the chat window itself.

&gt; **Are you interested in how much it costs to run such a chatbot?**
&gt; _[Send me a message](#contact-form) or arrange a [30-minute FREE consultation](https://zapti.me/daniel-hladik/konzultace-zdarma) with me, where we can discuss it together :)_
{: .alert .alert-idea }

### Step 1. Preparing data and saving it to a vector database
In my case, I want the AI agent to have the context of the entire website. So I need to somehow get the information from the website into a vector database, from which the LLM model will take information to process responses. We will use data from <abbr title="Sitemap (mapa stránek) je soubor, nejčastěji ve formátu .xml, který obsahuje seznam všech důležitých URL adres vašeho webu. Slouží primárně pro roboty vyhledávačů (Google, Seznam), kterým pomáhá efektivněji procházet a indexovat web, což zlepšuje SEO.">the</abbr> **<abbr title="Sitemap (mapa stránek) je soubor, nejčastěji ve formátu .xml, který obsahuje seznam všech důležitých URL adres vašeho webu. Slouží primárně pro roboty vyhledávačů (Google, Seznam), kterým pomáhá efektivněji procházet a indexovat web, což zlepšuje SEO.">sitemap</abbr>** for this. We will download the URLs of the pages on the website and convert them from XML format to **<abbr title="Univerzální a lehký datový formát, který slouží k přehlednému ukládání a přenosu informací. V rámci n8n funguje jako hlavní komunikační jazyk.">JSON</abbr>**.

Then we will load the content of each page via a GET HTTP request and **clean up any excess ballast**. We don&#x27;t need the entire structure of the website, such as the header or footer. Finally, we convert the resulting HTML content to **<abbr title="Markdown je odlehčený značkovací jazyk, který slouží pro úpravu prostého textu a jeho následný převod na formátovaný text publikovatelný na webu, zejména ve formátu HTML. Umožňuje pomocí jednoduchých formátovacích značek vyznačit v textu nadpisy a seznamy, doplnit odkazy, obrázky atd. Cílem jazyka je, aby byl text dobře čitelný a publikovatelný i v původním formátu prostého textu.">Markdown</abbr>** format, which AI models understand better. And we have the input data from the website ready.

&gt; **What other data can you feed your AI agent?**
&gt; _You can supplement the input data with files from your Google Drive, such as PDF files, spreadsheets, text documents, etc. However, it is important to always think about the security of sensitive data and only feed the agent what it really needs for its role. Remember that as the amount and complexity of data grows, so does the need to properly clean and optimize RAG for fast and accurate responses._
{: .alert .alert-info }

Now we can store the cleaned data in a vector database, from which the AI agent will retrieve information to compile relevant responses. However, text cannot be stored directly in a vector database. In order for the AI to search it effectively, the text must first be converted into a digital fingerprint (vector). This is done using <abbr title="Zatímco my lidé vnímáme svět ve 3 rozměrech, moderní embedding modely pracují v nepředstavitelném prostoru o několika stovkách až tisících dimenzí. Například model od OpenAI (text-embedding-3-small) používá standardně 1 536 dimenzí. Každý úsek textu tak dostane 1 536 souřadnic, které přesně definují jeho význam. Díky tomu pak AI agent dokáže v mžiku najít souvislosti mezi otázkou uživatele a našimi daty na základě jejich hlubokého významu, nikoliv jen shody klíčových slov.">the</abbr> aforementioned embedding<abbr title="Zatímco my lidé vnímáme svět ve 3 rozměrech, moderní embedding modely pracují v nepředstavitelném prostoru o několika stovkách až tisících dimenzí. Například model od OpenAI (text-embedding-3-small) používá standardně 1 536 dimenzí. Každý úsek textu tak dostane 1 536 souřadnic, které přesně definují jeho význam. Díky tomu pak AI agent dokáže v mžiku najít souvislosti mezi otázkou uživatele a našimi daty na základě jejich hlubokého významu, nikoliv jen shody klíčových slov."> models</abbr>.

Before being finally stored in the vector database, the text must be divided into smaller units, known as chunking. The idea is not to feed the model 42 pages of e-shop terms and conditions (which no one reads anyway) all at once, but only smaller units relevant to the query. This significantly saves the model&#x27;s context window and the associated costs of tokens, which are paid for as they are consumed.

Usually, the size of one piece (&quot;chunk&quot;) ranges between 500-1000 characters with an overlap of 10-20%. This overlap is crucial so that the context is not lost when the text is divided and the idea continues smoothly in the next block. The division itself is then carried out according to logical rules, most often according to paragraphs or headings.

![Abstraction of text conversion to vectors using an embedding model](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-05.jpg){: .post-image }

Ideally, we store data that has been cleaned and broken down into smaller parts in the vector database. In order not to lose the context from which the data originates, we add the URL address and the date of the last update of the website to the **metadata**. The agent can then include a link to the source in its response, which increases its credibility and allows the questioner to verify the answer directly at the specific link.

### Step 2. Building the Agent with its Tools

In n8n, we connect the AI Agent to our vector database. This gives it its **long-term memory** from the sources we have stored for it in advance. In order for the agent to remember what the user wrote a minute ago, it also needs to have **short-term memory**, where the history of the conversation will be stored.

Now we have a RAG AI Chatbot, but we still can&#x27;t call it an **agent chatbot**. What makes an ordinary chatbot a real agent is its ability to act in real time. In this case, we will add a tool that allows it to **send emails** from our Gmail account. We can also give it **access to the calendar** so that it knows when there are free slots for scheduling a meeting and then enters the meeting into the calendar.

If we wanted to, we could give it access to search the internet or connect to various external APIs, whether it&#x27;s weather, exchange rates, or e-shop order statuses, or query customers directly in its CRM in real time.

### Step 3. System prompt optimization, thorough testing, and re-ranking

The most important part is defining the **system prompt**. This is a set of instructions that defines the agent&#x27;s personality, goals, and boundaries. We must not forget to define how it should use the connected tools. Once we are satisfied with the instructions for the AI Agent, we will start testing. We will test the relevance of responses and behavior according to predefined scenarios.

If we find that the agent is responding inaccurately, we have several options for what to do about it. We can modify the system prompt, try a different AI model, or refine the selection of data from the vector database using **<abbr title="Re-ranking je proces, který zvyšuje přesnost odpovědí v systému RAG. Zatímco vektorové vyhledávání je jako knihovník, který z regálu přinese 10 knih na dané téma. Re-ranking je pak ten moment, kdy si těch 10 knih prolistujete a vyberete jen ty 3, které velmi pravděpodobně obsahují odpověď na vaši otázku. Je to tedy druhý filtr před předáním vstupních dat pro finalizaci odpovědi LLM modelem.">re-ranking</abbr>**.

The **re-ranking model** acts as a second, stricter filter. It goes through the results from the database again, more thoroughly, and ranks them according to their actual relevance to the query. Only the best pieces of information are sent to the final model to generate a response. In our specific case, however, re-ranking is not absolutely necessary due to the smaller volume of input data, but it is good to know about it once your system starts to grow.

### Step 4. Automatic data update
We will create a workflow that will automatically update the data in the vector database once in a while (e.g., once a day at midnight) so that it always corresponds to the current state of information on the web.

![Low-code tool n8n and the resulting AI agent workflow with the RAG model](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-02-a.jpg){: .post-image }

### Step 5. Adding a chat window to the website
Interaction with the AI agent will take place via a chat window, which we will place in the code on our website. The native chat window already has **n8n** integrated, so there is no need to write your own chat interface or use a third-party application. We will test whether everything is working as it should. Don&#x27;t forget to add your website to CORS.

![Chat window on the website](/assets/files/images/posts/2026-02-28-rag-chat-web/rag-ai-03-a.jpg){: .post-image }

&gt; **Try the chatbot directly on my website**
&gt; _Chat with Danka, my virtual assistant, right here and now. There should be a chat bubble in the bottom right corner. Don&#x27;t be afraid to try out how Danka will respond to you. Feel free to send me feedback by email directly through the chat window._
{: .alert .alert-idea }

## Summary: How it all works in a nutshell

When a user submits a query, the following sequence of events takes place in n8n:

1. **Intent analysis**: AI determines whether the user is asking for information or wants to do something (e.g., send a message or arrange a meeting).
2. If it is a query to the knowledge database:
  - **Search**: The agent searches the vector database.
  - **Refinement**: It selects the most relevant pieces of information.
3. For actions:
  - **Action**: If the user wants to leave a message, for example, the agent uses an email tool to send the message. However, if it does not have everything it needs to send the email, it will ask for the remaining information in the next step.
4. **Response generation**: AI composes a comprehensible response combining data from the database.

## What to watch out for

* **Quality and processing of input data** - RAG is only as good as your source data.
* **Data security and privacy** - Set clear boundaries for the agent regarding what data it can access. It is also necessary to consider the sensitivity of the data, where you are sending the data from and to, and who can handle it (GDPR). It is also important to keep in mind that most free connections to LLM model APIs are related to training the model on your data.
* **Price and efficiency** - Monitor token consumption. More expensive models are more reliable for agent systems, but it is not always necessary to use a sledgehammer to crack a nut. For simpler tasks, you can try cheaper models and save significant costs.
* **Human-in-the-loop** - For critical actions, such as sending important emails or deleting data in CRM, don&#x27;t leave AI completely on its own.
* **Logging** - Logging is your best tool for subsequent system optimization.

In this article, I did not go into too much detail about the actual construction of the workflow within n8n. The goal was to give you, the readers, an idea of how RAG works and how anyone can create their own AI chatbot agent.

&gt; **Want your own chatbot on your website, but don&#x27;t know how to go about it?**
&gt; _[Send me a message](#contact-form) or schedule a [30-minute FREE consultation](https://zapti.me/daniel-hladik/konzultace-zdarma) with me._
{: .alert .alert-info }