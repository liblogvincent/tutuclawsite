'use client';

import { useState, useEffect } from 'react';

interface Tool {
  name: string;
  slug: string;
  description: string;
  url: string;
  category: string;
  pricing: string;
  bestFor: string;
  intro: string;
  howTos: string[];
  tips: string[];
}

const tools: Tool[] = [
  {
    name: 'Microsoft Copilot',
    slug: 'microsoft-copilot',
    description: "Microsoft's all-in-one AI assistant integrated deeply into Windows, Edge, and Microsoft 365 apps. Excellent for web searching, document drafting, and general queries.",
    url: 'https://copilot.microsoft.com',
    category: 'Everyday Use',
    pricing: 'Free / Paid',
    bestFor: 'Both',
    intro: "Microsoft's flagship AI ecosystem. It acts as a conversational search engine on the web and a smart assistant inside your daily work apps (Word, Excel, PowerPoint). Under the hood, it is powered by customized versions of OpenAI's GPT-4o and reasoning models. It connects these models to the Bing search index for real-time web data. If you use the Pro/Enterprise version, it also connects to the Microsoft Graph, allowing the AI to read your personal emails, Teams chats, and OneDrive files securely to provide personalized answers.",
    howTos: [
      'Go to copilot.microsoft.com or open the Copilot sidebar in the Edge browser.',
      'Ask a question like, "Compare the specs and prices of the top 3 electric SUVs in 2026."',
      'For Pro users: open Microsoft Word, click the Copilot icon, and type, "Draft a 2-page project proposal based on [link to your notes document]."',
      'Use it inside Excel to analyze data with natural language — no formulas needed.',
    ],
    tips: [
      'The free web version is great for quick searches — no account needed.',
      'Pro version integrates with your Office 365 files for personalized, context-aware help.',
      'Use the Edge sidebar Copilot to summarize any webpage you\'re viewing.',
      'Ask it to generate PowerPoint slides from a Word document outline.',
    ],
  },
  {
    name: 'ChatGPT',
    slug: 'chatgpt',
    description: "OpenAI's flagship conversational AI. Still the industry standard for general brainstorming, writing, and quick problem-solving.",
    url: 'https://chatgpt.com',
    category: 'Everyday Use',
    pricing: 'Free / Paid',
    bestFor: 'Both',
    intro: "The most famous AI chatbot in the world. It is a versatile, blank-canvas assistant that can write code, translate languages, analyze data, and hold real-time spoken conversations. It runs on OpenAI's latest models (like GPT-4o for fast, multimodal tasks and the o1/o3 series for deep, logical reasoning). It processes text, images, and audio by predicting the most logical next sequence of information based on its massive training dataset and reinforcement learning.",
    howTos: [
      'Visit chatgpt.com or download the mobile app.',
      'Type a prompt like, "Plan a 5-day itinerary for a trip to Rome."',
      'Use the mobile app\'s Advanced Voice Mode to talk to it as if on a phone call — practice a foreign language or prep for an interview.',
      'Upload images or files for analysis: "Read this PDF and summarize the key findings."',
    ],
    tips: [
      'Be specific — context and constraints produce much better results.',
      'Use Custom Instructions (Settings) to set your preferred tone and format.',
      'Start a new chat when switching topics to avoid context confusion.',
      'Use GPT-4o for complex reasoning; GPT-4o mini is faster for simple tasks.',
    ],
  },
  {
    name: 'Claude',
    slug: 'claude',
    description: "Anthropic's AI assistant, highly praised for its natural, human-like writing style, massive context window, and coding abilities.",
    url: 'https://claude.ai',
    category: 'Everyday Use',
    pricing: 'Free / Paid',
    bestFor: 'Both',
    intro: "A powerful chatbot designed by Anthropic (founded by former OpenAI researchers). It is widely considered the best AI for writing tasks because it sounds less \"robotic\" than ChatGPT, and it excels at analyzing massive amounts of text at once. Powered by the Claude 3.5 and 3.7 model family, it is built using Constitutional AI — trained to follow a specific set of ethical principles. It features a massive context window, meaning it can hold the equivalent of several thick books in its short-term memory during a single conversation.",
    howTos: [
      'Go to claude.ai and start a chat.',
      'Drag and drop a large PDF report or Excel file into the chat box.',
      'Prompt it: "Read this entire report and give me a bulleted list of the top 5 risk factors, with page numbers."',
      'Use "Projects" to organize related conversations and upload reference materials.',
    ],
    tips: [
      'Give Claude a role: "You are a senior engineer reviewing this code."',
      'Paste long documents — Claude handles large contexts better than most competitors.',
      'Ask Claude to show its reasoning step by step for complex problems.',
      'Use Claude Code (CLI) for terminal-based coding assistance.',
    ],
  },
  {
    name: 'Kimi',
    slug: 'kimi',
    description: "A cloud-hosted personal AI agent by Moonshot AI, famous for ultra-long document handling and deep, multi-layered web searches.",
    url: 'https://kimi.moonshot.cn',
    category: 'Everyday Use',
    pricing: 'Free / Paid',
    bestFor: 'Personal',
    intro: "An incredibly popular AI assistant developed by Moonshot AI. It is specifically engineered to be a \"research powerhouse\" that can read millions of words at a time and browse the internet autonomously to compile information. It uses a proprietary Large Language Model optimized for lossless long context. While other AIs might forget details in the middle of a long book, Kimi is designed to retain near-perfect recall of massive uploads.",
    howTos: [
      'Visit kimi.moonshot.cn.',
      'Upload up to 50 different documents at once (PDFs, Word docs, text files).',
      'Ask cross-referencing questions: "Tell me where these documents contradict each other."',
      'Use it for deep web research — it browses multiple sites and compiles answers automatically.',
    ],
    tips: [
      'Best tool for handling massive documents that break other AI context limits.',
      'Upload a mix of file types simultaneously for cross-document analysis.',
      'Great for Chinese-language content and research.',
      'Use it to compare and contrast multiple sources on the same topic.',
    ],
  },
  {
    name: 'NotebookLM',
    slug: 'notebooklm',
    description: "Google's tool for synthesizing information. Upload your files and it organizes data or generates a realistic two-person audio podcast discussing your documents.",
    url: 'https://notebooklm.google.com',
    category: 'Everyday Use',
    pricing: 'Free',
    bestFor: 'Both',
    intro: "A personalized AI research assistant by Google. Unlike ChatGPT, which answers from its general knowledge, NotebookLM only knows what you upload to it — it is a closed-loop system for your own files. Powered by Google's Gemini 1.5 Pro model, it uses RAG (Retrieval-Augmented Generation) to ground the AI strictly in your uploaded sources, virtually eliminating hallucinations. It also uses advanced text-to-speech models to turn text into lifelike conversational audio.",
    howTos: [
      'Create a new Notebook at notebooklm.google.com.',
      'Upload your class notes, legal case files, or paste YouTube URLs.',
      'Ask questions like, "What is the main thesis of chapter 4?"',
      'Click "Generate Audio Overview" — the AI creates a 10-minute, NPR-style podcast where two AI hosts discuss your documents.',
    ],
    tips: [
      'Unlike other AIs, it only references your uploaded sources — near-zero hallucinations.',
      'The Audio Overview feature is killer for studying — listen to your notes as a podcast.',
      'Great for students and researchers who need grounded, source-backed answers.',
      'Add sources over time to build a growing knowledge base for a project.',
    ],
  },
  {
    name: 'Browser Use',
    slug: 'browser-use',
    description: "An open-source AI agent that takes control of your web browser to complete multi-step tasks — clicking and typing like a human.",
    url: 'https://browser-use.com',
    category: 'Everyday Use',
    pricing: 'Free',
    bestFor: 'Personal',
    intro: "A framework that bridges the gap between AI text models and actual web browsers. It turns an AI from a chatbot into an action-taker. It uses computer vision and DOM parsing to \"see\" what is on a webpage. You give it a goal, and the AI decides what to do next — clicking, typing, scrolling — using browser automation tools like Playwright to physically execute those actions.",
    howTos: [
      'Install via Python: pip install browser-use.',
      'Provide an API key for a model like GPT-4o.',
      'Write a script: agent = Agent(task="Find cheapest flights from NY to London next Friday").',
      'Run the script and watch the browser move on its own.',
    ],
    tips: [
      'Requires some technical setup — best for users comfortable with Python.',
      'Great for repetitive web tasks: scraping data, filling forms, booking flights.',
      'You pay for the API keys of the models you connect to it.',
      'Combine with a cheap model for simple tasks, powerful model for complex ones.',
    ],
  },
  {
    name: 'Poe',
    slug: 'poe',
    description: "An AI aggregator platform by Quora that lets you access, compare, and build custom bots using the world's top foundational models all in one place.",
    url: 'https://poe.com',
    category: 'Everyday Use',
    pricing: 'Free / Paid',
    bestFor: 'Both',
    intro: "Think of Poe as a web browser for AI models. Instead of having separate tabs and subscriptions for ChatGPT, Claude, and Gemini, Poe puts them all into a single, unified chat interface. It also hosts a massive ecosystem of user-created custom bots. It connects to the APIs of major AI labs and operates on an economy of compute points — every message deducts points based on the model's cost. A simple query to a smaller model might cost 10 points, while a complex request to GPT-4o or Claude 3.5 Sonnet might cost several hundred.",
    howTos: [
      'Go to poe.com and select a model from the left sidebar.',
      'Seamlessly switch between models to compare how different AIs answer the same prompt.',
      'Click "Create Bot" to build a custom assistant with a base model + custom system prompt + knowledge files.',
      'Share your custom bots with the Poe community.',
    ],
    tips: [
      'Compare responses from multiple models side-by-side for the same prompt.',
      'Use compute points wisely — smaller models for simple tasks, premium models for complex ones.',
      'Build custom bots for recurring workflows (e.g., a writing coach, a code reviewer).',
      'Paid Premium gives access to the most advanced models with higher limits.',
    ],
  },
  {
    name: 'ChatGLM',
    slug: 'chatglm',
    description: "A powerful bilingual AI chatbot by Zhipu AI, renowned for deep Chinese context understanding, long-document analysis, and strong reasoning.",
    url: 'https://chatglm.cn',
    category: 'Everyday Use',
    pricing: 'Free / Paid',
    bestFor: 'Chinese-speaking Users',
    intro: "The flagship consumer chatbot from Zhipu AI, one of China's premier AI research labs (originating from Tsinghua University). It is widely considered one of the leading ChatGPT alternatives in China, offering web search, data analysis, and image generation. Powered by the GLM-4 architecture, which uses a unique autoregressive blank filling method making it exceptionally good at understanding context. It is natively integrated with search engines for real-time data and features a built-in code interpreter for running Python scripts.",
    howTos: [
      'Visit chatglm.cn or download the mobile app.',
      'Upload massive PDFs or Excel spreadsheets and ask it to summarize, chart, or extract insights.',
      'Use it for tasks requiring deep Chinese cultural understanding, slang, or regional business regulations.',
      'Leverage the built-in code interpreter for data analysis tasks.',
    ],
    tips: [
      'Unparalleled for Chinese-language content — understands slang, idioms, and cultural nuance.',
      'Great for bilingual workflows — strong in both Chinese and English.',
      'Use the data analysis features to process Excel files and generate charts.',
      'API access available for developers building China-focused applications.',
    ],
  },
  {
    name: 'Doubao',
    slug: 'doubao',
    description: "ByteDance's ultra-fast AI assistant with exceptional voice interaction, creative writing, and deep integration into the ByteDance ecosystem.",
    url: 'https://doubao.com',
    category: 'Everyday Use',
    pricing: 'Free',
    bestFor: 'Personal',
    intro: "The consumer-facing AI companion created by ByteDance (parent company of TikTok and Douyin). Doubao is designed to be highly accessible, friendly, and lightning-fast. Powered by ByteDance's proprietary LLM family, a standout feature is its text-to-speech and voice recognition — it speaks with natural emotion, pauses, and intonation, making it feel like a real phone call. It is built as a low-friction, everyday AI tool rather than a heavy-duty coding or enterprise agent.",
    howTos: [
      'Visit doubao.com or download the mobile app (where it shines best).',
      'Use advanced voice mode for hands-free conversations while commuting.',
      'Brainstorm video scripts for social media or translate documents on the fly.',
      'Practice spoken English with natural-sounding AI voice interactions.',
    ],
    tips: [
      'Best on mobile — the voice interaction is the killer feature.',
      'Completely free to use — no subscription needed.',
      'Great for content creators brainstorming social media scripts.',
      'Use it as a language tutor — the voice quality makes conversation practice feel natural.',
    ],
  },
  {
    name: 'OpenClaw',
    slug: 'openclaw',
    description: "An open-source autonomous AI agent that connects to your chat apps. It proactively manages your calendar, clears your inbox, and runs background tasks.",
    url: 'https://github.com/openclaw/openclaw',
    category: 'Productivity',
    pricing: 'Free',
    bestFor: 'Work',
    intro: "A background agent framework designed to act as a digital chief of staff. It lives on your server and monitors your communication channels 24/7. It uses webhook integrations to listen to incoming messages on Slack or Email. When a message arrives, it passes the text to an LLM to classify the intent. If it's a simple question, it drafts a reply. If it's a meeting request, it triggers a script to check your Google Calendar and propose a time — all without you lifting a finger.",
    howTos: [
      'Download the repository from GitHub.',
      'Configure your .env file with your API keys and app credentials.',
      'Deploy to a cloud host like Railway or Render.',
      'Text your agent: "If anyone from marketing messages me, tell them I\'ll review at 4 PM."',
    ],
    tips: [
      'Self-host to keep full control of your data and communications.',
      'Start with simple auto-replies before adding complex calendar management.',
      'Works across WhatsApp, Telegram, and Slack simultaneously.',
      'Open-source — customize the agent behavior to match your workflow.',
    ],
  },
  {
    name: 'Manus',
    slug: 'manus',
    description: "A powerful autonomous agent for heavy research and outbound work. Give it a high-level goal and it browses the web to compile data into spreadsheets.",
    url: 'https://manus.im',
    category: 'Productivity',
    pricing: 'Paid',
    bestFor: 'Work',
    intro: "A commercial Agent-as-a-Service platform designed for sales, marketing, and research professionals who need hours of tedious data collection and formatting. It uses an Agentic Loop architecture (Plan → Execute → Evaluate). When you give it a prompt, it writes a step-by-step plan, spins up virtual cloud browsers to scrape websites, formats the data into CSVs or charts, and uses a secondary AI to double-check its own work for errors before presenting the final result.",
    howTos: [
      'Log into the web dashboard at manus.im.',
      'Assign it a Mission instead of chatting — e.g., "Find Fortune 500 retail companies\' return policies and compare them in a spreadsheet."',
      'Close the tab — Manus works in the background.',
      'Get notified via email when your spreadsheet or report is ready.',
    ],
    tips: [
      'Best for batch research tasks that would take a human hours.',
      'Give it very specific output formats — "CSV with columns: Company, Return Window, Restocking Fee."',
      'It self-corrects — the secondary AI review catches most errors.',
      'Great for lead generation, market research, and competitive analysis.',
    ],
  },
  {
    name: 'n8n',
    slug: 'n8n',
    description: "A visual, node-based workflow automation tool — a more powerful, AI-native alternative to Zapier. Drag and drop to connect apps and AI models.",
    url: 'https://n8n.io',
    category: 'Productivity',
    pricing: 'Free / Paid',
    bestFor: 'Work',
    intro: "A workflow automation platform that connects over 1,000 different apps (Gmail, Salesforce, Stripe, etc.) to AI models without writing complex code. It uses a visual canvas where data flows from left to right — starting with a Trigger, moving through Action Nodes. Because it is source-available, you can host it yourself to avoid paying per-task fees that platforms like Zapier charge.",
    howTos: [
      'Sign up for n8n cloud or install it locally/self-hosted.',
      'Open the canvas and drag a Trigger node (e.g., Stripe: New Payment Failed).',
      'Connect it to an OpenAI node: "Write a polite email asking the customer to update their card."',
      'Connect that to a Gmail node to auto-send the email.',
    ],
    tips: [
      'Self-host to avoid per-task fees — run it on a $5/month VPS.',
      'Start with templates from n8n.io/workflows for common automation patterns.',
      'Use the AI Agent node for dynamic decision-making in workflows.',
      'Connects to 1,000+ apps — if you use it, n8n probably integrates with it.',
    ],
  },
  {
    name: 'Nut Studio',
    slug: 'nut-studio',
    description: "An all-in-one desktop app that lets you run AI models locally for text, image, and video generation without switching between browser tabs.",
    url: 'https://nutstudio.ai',
    category: 'Productivity',
    pricing: 'Free / Paid',
    bestFor: 'Work',
    intro: "A unified workspace app for power users. Instead of having ChatGPT open in one tab, Midjourney in Discord, and a video generator somewhere else, Nut Studio brings all these capabilities into one clean, native desktop interface. It acts as a graphical frontend that connects to various APIs (OpenAI, Anthropic, Fal.ai) or local model engines (like Ollama). It manages your files, prompt history, and context locally on your hard drive.",
    howTos: [
      'Download and install the application on your Mac or PC.',
      'Open a new Project Workspace.',
      'Drag a folder of images, select a vision model, and ask it to tag and categorize them.',
      'Switch the dropdown to an image-generation model to create variations — all within the same window.',
    ],
    tips: [
      'One app replaces a dozen browser tabs — huge productivity boost.',
      'Connect to local models via Ollama for privacy-sensitive work.',
      'Manages prompt history locally so you never lose a good prompt.',
      'Great for content creators who use multiple AI tools daily.',
    ],
  },
  {
    name: 'Cursor',
    slug: 'cursor',
    description: 'The industry-leading AI-first code editor. A VS Code fork that deeply integrates AI to write, edit, and debug across your entire codebase.',
    url: 'https://cursor.com',
    category: 'Coding',
    pricing: 'Free / Paid',
    bestFor: 'Developers',
    intro: "An IDE built specifically for the AI era. If you know VS Code, you already know Cursor — it supports all the same extensions and themes, but with powerful AI superpowers built-in. Cursor indexes your entire local codebase and uses RAG (Retrieval-Augmented Generation) to pull the exact files, functions, and documentation needed to give the AI context. It uses top-tier models like Claude 3.7 Sonnet and GPT-4o to generate highly accurate code.",
    howTos: [
      'Download and install Cursor from cursor.com.',
      'Open your coding project in Cursor.',
      'Press Cmd+K (Ctrl+K) to open an inline prompt: "Refactor this function to use async/await."',
      'Use Composer (Cmd+I) for multi-file features: "Build user auth with Firebase, update routing, and create login UI."',
    ],
    tips: [
      'Use @file or @folder in chat to reference specific parts of your codebase.',
      'Cmd+K on a blank line generates code from a description.',
      'Enable Cursor Tab for AI autocomplete that understands your full project context.',
      'Create a .cursorrules file to set project-specific AI behavior and conventions.',
    ],
  },
  {
    name: 'Windsurf',
    slug: 'windsurf',
    description: "The first \"agentic\" IDE by Codeium. Acts as an autonomous pair programmer that writes code, runs terminal commands, and fixes its own errors.",
    url: 'https://windsurf.ai',
    category: 'Coding',
    pricing: 'Free / Paid',
    bestFor: 'Developers',
    intro: "A direct competitor to Cursor, built by Codeium. Windsurf is designed around \"Flow\" state — the AI and human work collaboratively in real-time without stepping on each other's toes. It features Cascade, an AI agent with deep, real-time awareness of your workspace. Unlike standard autocomplete, Cascade can execute commands in your terminal, read error logs, and automatically rewrite the code to fix bugs it finds.",
    howTos: [
      'Download the IDE from windsurf.ai and open a project.',
      'Open the Cascade panel and give it a high-level task.',
      'Example: "Install Tailwind CSS, configure the config files, and style my landing page dark-themed."',
      'Watch the AI run npm install commands in the terminal, create files, and write code autonomously.',
    ],
    tips: [
      'Give Cascade high-level goals, not line-by-line instructions — it figures out the steps.',
      'It reads terminal output to self-correct — let it run and fix its own errors.',
      'Great for rapid prototyping and scaffolding new projects from scratch.',
      'Works with all VS Code extensions — your existing setup transfers over.',
    ],
  },
  {
    name: 'v0',
    slug: 'v0',
    description: "Vercel's generative UI tool. Describe a website in plain English and it instantly generates production-ready React and Tailwind CSS code.",
    url: 'https://v0.dev',
    category: 'Coding',
    pricing: 'Free / Paid',
    bestFor: 'Designers & Developers',
    intro: "A text-to-website generator created by Vercel. It bridges the gap between design and development, allowing anyone to build beautiful, functional web components in seconds. It uses custom-trained LLMs optimized on modern web frameworks (React, Next.js, Tailwind CSS). It doesn't just draw a picture — it writes the actual DOM structure and styling logic, rendering a live preview in the browser.",
    howTos: [
      'Go to v0.dev and type a prompt describing your desired UI.',
      'Example: "Create a pricing page with three tiers, monthly/yearly toggle, and a glowing Pro badge on the middle tier."',
      'Click on specific elements to tweak them: "Make this button blue."',
      'Copy-paste the generated code directly into your own project.',
    ],
    tips: [
      'Be specific about layout, colors, and components for best results.',
      'You can iterate on generated UI — click elements and describe changes.',
      'Generated code uses shadcn/ui components — works seamlessly with Next.js.',
      'Great for rapid prototyping before building production UI.',
    ],
  },
  {
    name: 'Devin',
    slug: 'devin',
    description: "The world's first fully autonomous AI software engineer. It plans projects, reads API docs, writes code, tests, and deploys — all on its own.",
    url: 'https://cognition.ai/devin',
    category: 'Coding',
    pricing: 'Paid',
    bestFor: 'Engineering Teams',
    intro: "A cloud-based AI worker. You don't use Devin to help you code — you hire Devin to do the coding for you. It operates in its own secure cloud sandbox with its own command line, code editor, and web browser. It uses advanced reasoning models and an agentic loop. If you ask it to build an app using an API it doesn't know, it will open its browser, read the documentation, learn how to use it, write the code, run it, read the errors, and debug itself until it works.",
    howTos: [
      'Log into the Devin workspace at cognition.ai.',
      'Give it a comprehensive prompt: "Build a web scraper that checks Bitcoin price hourly, saves to PostgreSQL, and deploys a dashboard on Vercel."',
      'Monitor its progress in real-time as it opens terminals, writes files, and completes the job.',
      'Review the output, provide feedback, and Devin will iterate.',
    ],
    tips: [
      'Give Devin detailed, structured prompts with clear requirements and tech stack.',
      'Monitor its work — it\'s powerful but may need course corrections.',
      'Best for well-defined tasks with clear success criteria.',
      'Enterprise-focused — ideal for teams that need to scale engineering capacity.',
    ],
  },
  {
    name: 'Claude Code',
    slug: 'claude-code',
    description: "Anthropic's official agentic CLI that brings Claude directly into your terminal to autonomously read, write, and execute code in your local environment.",
    url: 'https://anthropic.com/claude-code',
    category: 'Coding',
    pricing: 'Paid',
    bestFor: 'Engineers',
    intro: "Unlike traditional IDE extensions that suggest code as you type, Claude Code is an autonomous coding agent that lives in your terminal. It operates at the project level — it can understand your entire codebase, plan multi-file changes, and execute them natively. It uses Anthropic's Claude 3.7 Sonnet (and newer models) to act as a virtual developer. Because it runs directly in your terminal, it has the ability (with your permission) to run system commands, use git, search files, and even run your test suite. If a test fails, Claude Code can read the error logs, fix the code, and re-run the tests until they pass.",
    howTos: [
      'Install globally via npm: npm install -g @anthropic-ai/claude-code.',
      'Navigate to your project folder in your terminal and type: claude.',
      'Give it a high-level prompt: "Find the bug causing the login timeout, fix the auth logic, and run the test suite to verify."',
      'It explores files, makes changes, and asks for your approval before committing.',
    ],
    tips: [
      'Works best when you give it clear, high-level goals rather than line-by-line instructions.',
      'It can run git commands — ask it to create commits, branches, or PRs.',
      'Use it for refactoring, debugging, and test writing across your entire project.',
      'Costs are token-based — use focused prompts to minimize API usage.',
    ],
  },
  {
    name: 'CC Switch',
    slug: 'cc-switch',
    description: 'An open-source desktop app that acts as a centralized control hub for managing configurations across multiple AI CLI coding tools.',
    url: 'https://github.com/farion1231/cc-switch',
    category: 'Coding',
    pricing: 'Free',
    bestFor: 'Power Users',
    intro: "As terminal-based AI tools like Claude Code, Codex, OpenCode, and Gemini CLI became popular, developers struggled with manually editing hidden JSON or .env files just to switch API keys or change models. CC Switch provides a visual GUI to manage all these settings in one place. It automatically detects your installed AI CLI tools and imports their configurations. From its dashboard, you can add new API providers (including cheaper third-party proxies), run latency speed tests, and manage MCP servers and system prompts across all your tools simultaneously.",
    howTos: [
      'Download and install the desktop app from GitHub.',
      'It auto-detects your installed AI CLI tools and imports configurations.',
      'To switch Claude Code to a cheaper API provider, add the provider details and click Enable.',
      'The app rewrites local config files (like ~/.claude/settings.json) instantly — no manual editing.',
    ],
    tips: [
      'Essential if you use multiple AI CLI tools — one dashboard to rule them all.',
      'Add third-party API proxies to cut token costs significantly.',
      'Use the latency speed test to find the fastest API endpoint.',
      'Manage MCP servers and system prompts across all tools from one place.',
    ],
  },
  {
    name: 'GitHub Copilot',
    slug: 'github-copilot',
    description: "The world's most widely adopted AI pair programmer, deeply integrated into IDEs for real-time autocomplete, chat, and inline editing.",
    url: 'https://github.com/features/copilot',
    category: 'Coding',
    pricing: 'Paid',
    bestFor: 'All Developers',
    intro: "Built by GitHub in collaboration with OpenAI, Copilot is an extension for VS Code, Visual Studio, and JetBrains. While tools like Claude Code act as autonomous agents, Copilot acts as a collaborative pair programmer that works alongside you in real-time as you type. It continuously reads the file you are editing and adjacent open tabs to understand context. It uses advanced OpenAI models to predict what you'll write next, offering suggestions ranging from a single line to entire functions or boilerplate classes.",
    howTos: [
      'Install the GitHub Copilot extension in your IDE and log in.',
      'Type a comment like: // function to fetch user data from API and handle errors.',
      'Copilot generates code in gray ghost text — press Tab to accept.',
      'Open Copilot Chat to ask questions, explain legacy code, or highlight code and press Cmd+I to refactor inline.',
    ],
    tips: [
      'Write clear comments before functions — Copilot generates better code from context.',
      'Use Copilot Chat for explanations: "Explain this function" or "Find bugs here."',
      'Free for verified students and open-source maintainers.',
      'Highlight code and use Cmd+I for inline refactoring without leaving your editor.',
    ],
  },
  {
    name: 'Midjourney',
    slug: 'midjourney',
    description: 'The undisputed king of AI image generation. Famous for breathtaking artistic quality, photorealism, and cinematic lighting.',
    url: 'https://midjourney.com',
    category: 'Creative',
    pricing: 'Paid',
    bestFor: 'Both',
    intro: "A text-to-image AI that creates stunning, high-resolution visuals. Whether you need a hyper-realistic product photo, a watercolor painting, or a 3D game asset, Midjourney produces the most aesthetically pleasing results. It uses advanced Diffusion Models trained on billions of image-text pairs. It starts with random noise and gradually refines the pixels over dozens of steps until it forms an image that matches your text.",
    howTos: [
      'Sign up at midjourney.com (web interface or Discord).',
      'Type a prompt: /imagine prompt: A cyberpunk city at night, neon lights reflecting in puddles, cinematic lighting, 35mm lens --ar 16:9.',
      'Wait for 4 variations, then use U1-U4 to upscale or V1-V4 to create variations.',
      'Iterate on good results with V buttons rather than starting from scratch.',
    ],
    tips: [
      'Be descriptive: include subject, style, lighting, mood, and camera angle.',
      'Reference real artists or styles: "in the style of Studio Ghibli" works well.',
      'Use --no to exclude elements: --no text, watermark.',
      'Use --ar for aspect ratio: 16:9 widescreen, 9:16 portrait, 1:1 square.',
    ],
  },
  {
    name: 'Sora',
    slug: 'sora',
    description: "OpenAI's text-to-video model. Generates highly realistic, physics-aware HD video clips up to a minute long from text descriptions.",
    url: 'https://sora.com',
    category: 'Creative',
    pricing: 'Paid',
    bestFor: 'Both',
    intro: "A video generation engine that understands how objects exist in the physical world. It can create complex scenes with multiple characters, specific motion, and accurate background details. Sora is a Diffusion Transformer — it breaks videos into spacetime patches (similar to how text models tokenize words). By training on massive video data, it learned not just what things look like, but how they move, interact, and cast shadows over time.",
    howTos: [
      'Access Sora via sora.com (requires ChatGPT Plus/Pro or Sora subscription).',
      'Type a highly descriptive prompt: "A drone shot through a snowy mountain village at sunset, warm glowing cabin lights, a train crossing a stone bridge."',
      'Wait for the video to render — Sora generates smooth, high-fidelity output.',
      'Download and use the video in your projects.',
    ],
    tips: [
      'Describe camera movement explicitly: "drone shot," "tracking shot," "close-up pan."',
      'Include lighting and atmosphere for more cinematic results.',
      'Keep scenes relatively simple for best quality — too many elements can cause artifacts.',
      'Iterate on prompts — small wording changes can produce very different videos.',
    ],
  },
  {
    name: 'Suno',
    slug: 'suno',
    description: 'AI music generator that creates full, radio-quality songs — vocals, instrumentation, and lyrics — from a simple text prompt.',
    url: 'https://suno.com',
    category: 'Creative',
    pricing: 'Free / Paid',
    bestFor: 'Both',
    intro: "A platform that democratizes music production. You don't need to know how to play an instrument or sing — you just need an idea. It generates full 2-to-4 minute tracks in seconds. It combines a text-generation model (to write lyrics and song structure like Verse/Chorus/Bridge) with an audio-generation model that synthesizes instruments and highly realistic human singing voices.",
    howTos: [
      'Go to suno.com and click "Create."',
      'Type a prompt: "An upbeat 80s synth-pop song about a robot learning to dance."',
      'Or use Custom Mode to paste your own lyrics and control the structure.',
      'Download the MP3 or extend the song if you want it longer.',
    ],
    tips: [
      'Specify genre and mood: "melancholic jazz ballad," "energetic EDM drop."',
      'Add musical tags in brackets: [verse], [chorus], [bridge], [guitar solo].',
      'Generate multiple versions and pick the best one to extend.',
      'Free daily credits reset — use them to experiment freely.',
    ],
  },
  {
    name: 'ElevenLabs',
    slug: 'elevenlabs',
    description: 'The most advanced AI voice generator. Used for text-to-speech, voice cloning, and automatically dubbing videos into other languages.',
    url: 'https://elevenlabs.io',
    category: 'Creative',
    pricing: 'Free / Paid',
    bestFor: 'Both',
    intro: "An audio AI platform that creates indistinguishable-from-human synthetic voices. It captures emotion, breathing, pacing, and intonation perfectly. Instead of older robotic TTS that stitched syllables together, ElevenLabs understands text context. If a sentence ends in an exclamation point, the AI sounds excited. It can also map the acoustic features of a 1-minute audio sample to instantly clone anyone's voice.",
    howTos: [
      'Go to elevenlabs.io and open the Speech Synthesis tool.',
      'Select a voice from the library (cinematic narrator, casual conversational, etc.).',
      'Paste your script, click Generate, and download the audio.',
      'Paid plan: upload 60 seconds of your own voice to clone it for use in dozens of languages.',
    ],
    tips: [
      'Lower stability = more expressive; higher = more consistent.',
      'Add pauses with ... (three dots) for natural pacing.',
      'Use Projects for long-form content like audiobooks with chapter support.',
      'Clone your voice with just 3 minutes of clean audio for best results.',
    ],
  },
  {
    name: 'Perplexity AI',
    slug: 'perplexity',
    description: 'An AI-powered answer engine that replaces traditional Google searches by providing direct answers with inline citations from real-time web sources.',
    url: 'https://perplexity.ai',
    category: 'Research',
    pricing: 'Free / Paid',
    bestFor: 'Both',
    intro: "A conversational search engine. Instead of giving you a list of blue links, Perplexity reads the websites for you and writes a comprehensive, well-cited summary to your exact question. It uses Retrieval-Augmented Generation (RAG): when you ask a question, it queries a live search index for the most relevant, up-to-date web pages, then feeds that text into a Large Language Model (like GPT-4o or Claude 3.5) to synthesize the information and attach footnote citations to every claim.",
    howTos: [
      'Go to perplexity.ai or download the mobile app.',
      'Type a query: "What are the current FDA-approved treatments for hair loss as of 2026?"',
      'Review the summary with clickable numbered citations.',
      'Ask follow-up questions in the same thread to dive deeper without starting a new search.',
    ],
    tips: [
      'Use "Focus" modes (Academic, Writing, YouTube) to narrow search scope.',
      'Ask follow-up questions in the same thread — Perplexity remembers context.',
      'Attach files or images to ask questions about specific documents.',
      'Pro Search does multi-step research with deeper analysis.',
    ],
  },
  {
    name: 'Consensus',
    slug: 'consensus',
    description: 'An AI search engine built for scientific and academic research. Only searches peer-reviewed papers to answer your questions.',
    url: 'https://consensus.app',
    category: 'Research',
    pricing: 'Free / Paid',
    bestFor: 'Students & Researchers',
    intro: "Think of it as the Google Scholar of the AI era. It bypasses blogs and opinion pieces, pulling data strictly from a database of over 200 million academic papers. It uses custom AI models trained to extract findings, methodologies, and conclusions from dense academic PDFs. When you ask a yes/no question, it features a Consensus Meter that aggregates the conclusions of the top papers (e.g., 80% say Yes, 20% say No) and provides a synthesized summary of the evidence.",
    howTos: [
      'Visit consensus.app and ask a direct research question.',
      'Example: "Does creatine supplementation improve cognitive function in sleep-deprived adults?"',
      'The AI reads abstracts of relevant studies and gives a synthesized answer.',
      'Review the listed papers with highlighted sentences where findings are stated.',
    ],
    tips: [
      'Ask yes/no questions to trigger the Consensus Meter for quick evidence snapshots.',
      'Filter by study type (RCT, meta-analysis, review) for stronger evidence.',
      'Great for fact-checking health claims found on social media.',
      'Use the "Copilot" feature to filter for specific study qualities.',
    ],
  },
  {
    name: 'Elicit',
    slug: 'elicit',
    description: 'An advanced AI research assistant that automates systematic reviews, extracts data from PDFs into tables, and finds themes across dozens of papers.',
    url: 'https://elicit.com',
    category: 'Research',
    pricing: 'Free / Paid',
    bestFor: 'Researchers',
    intro: "A heavy-duty research tool built for deep literature reviews. While Consensus is great for quick answers, Elicit can take a stack of 50 PDFs and instantly extract specific data points into a neat spreadsheet. It combines semantic search with specialized LLMs fine-tuned for data extraction. You define the columns you want (e.g., Number of participants, Dosage used, Main limitation), and the AI reads every paper to fill in the cells, linking back to the exact source text.",
    howTos: [
      'Create an account at elicit.com and start a new Workbook.',
      'Search for a topic or upload your own library of PDFs.',
      'Add columns for the specific variables you care about (e.g., "Adverse Effects").',
      'Elicit populates the table and lets you export the entire grid to CSV.',
    ],
    tips: [
      'Best for systematic reviews — define clear, specific columns for consistent extraction.',
      'Upload your own PDFs if the built-in database doesn\'t cover your niche.',
      'Hover over extracted data to see the exact source sentence from the paper.',
      'Export to CSV for use in your own analysis tools or research papers.',
    ],
  },
  {
    name: 'Khanmigo',
    slug: 'khanmigo',
    description: "An AI-powered tutor by Khan Academy that guides students through problems without giving answers, and helps teachers create lesson plans.",
    url: 'https://khanmigo.ai',
    category: 'Research',
    pricing: 'Paid',
    bestFor: 'Students & Teachers',
    intro: "An educational AI built by the non-profit Khan Academy. It is heavily guardrailed to be a safe, Socratic tutor — it refuses to do the work for students, instead asking guiding questions to help them arrive at the answer themselves. Powered by custom-prompted versions of OpenAI's models, the system prompt strictly enforces a pedagogical approach. It is deeply integrated with Khan Academy's library of math, science, and humanities courses.",
    howTos: [
      'Log into Khan Academy and open a practice problem (calculus, coding, etc.).',
      'Click the Khanmigo icon when stuck.',
      'Say "I don\'t understand how to find the derivative here" — it guides you step by step.',
      'Teachers can use it to generate lesson plans, quizzes, and rubrics.',
    ],
    tips: [
      'It won\'t give you the answer — it teaches you how to find it yourself.',
      'Great for parents helping kids with homework they haven\'t done in years.',
      'Available 24/7 as a patient, 1-on-1 tutor.',
      'Teachers get free access in partnered school districts.',
    ],
  },
  {
    name: 'ComfyUI',
    slug: 'comfyui',
    description: 'A powerful node-based GUI for building advanced, highly customizable generative AI image and video workflows.',
    url: 'https://github.com/comfyanonymous/ComfyUI',
    category: 'Agentic Workflows',
    pricing: 'Free',
    bestFor: 'AI Artists & VFX',
    intro: "While most people use simple text boxes to generate images, ComfyUI is for professionals who want absolute control over the generation process. It is a visual node-based workflow builder primarily used for Stable Diffusion and Flux models. Instead of a single prompt, you connect visual blocks (nodes) together with virtual wires — one node for the text prompt, wiring into the AI model, wiring into a ControlNet for exact poses, wiring into an upscaler. You can save these complex pipelines and reuse them.",
    howTos: [
      'Download and install locally (requires a strong GPU) or use a cloud GPU service.',
      'Drag and drop nodes onto a canvas and link outputs to inputs.',
      'Configure your pipeline: model loader → prompt → sampler → VAE decode → save image.',
      'Click "Queue Prompt" — the visual graph executes step-by-step, and you can intercept at any stage.',
    ],
    tips: [
      'Start with community workflow templates — don\'t build from scratch.',
      'Requires a GPU with 8GB+ VRAM for comfortable use.',
      'Use ControlNet nodes for precise control over poses, edges, and composition.',
      'Explore Civitai.com for models and LoRAs to plug into your workflows.',
    ],
  },
  {
    name: 'Dify',
    slug: 'dify',
    description: 'An open-source LLM application development platform combining AI workflow orchestration, RAG, and agent capabilities.',
    url: 'https://dify.ai',
    category: 'Agentic Workflows',
    pricing: 'Free / Paid',
    bestFor: 'Developers & Teams',
    intro: "A visual platform designed to take AI from a simple chat interface to a production-ready application. It acts as middleware between foundational models (like Claude or GPT-4o) and end-users. You can upload PDFs or connect databases to its built-in vector store for RAG. Then, using the drag-and-drop workflow builder, you define how the AI processes inputs, queries the database, uses external APIs (weather, stock data), and formats the final output.",
    howTos: [
      'Sign up on the cloud platform or deploy via Docker for self-hosting.',
      'Create a new App — choose between Chatbot, Text Generator, or Agent.',
      'Add nodes: document loader → text splitter → embeddings → LLM → output.',
      'Publish the finished agent as a web app or integrate via Dify\'s API.',
    ],
    tips: [
      'Self-host via Docker for full data control and no usage limits.',
      'Use the built-in RAG pipeline for company knowledge bases — upload PDFs, connect databases.',
      'Start with templates from the Dify community for common use cases.',
      'API-first design makes it easy to embed agents into your existing products.',
    ],
  },
  {
    name: 'Coze',
    slug: 'coze',
    description: "ByteDance's AI bot-building platform that lets anyone create, test, and publish sophisticated AI agents with plugins and memory — no code needed.",
    url: 'https://coze.com',
    category: 'Agentic Workflows',
    pricing: 'Free',
    bestFor: 'Creators & Businesses',
    intro: "An incredibly user-friendly platform for building AI agents. It stands out because it lets you publish custom bots directly to Telegram, Discord, WhatsApp, and Slack with one click. You select a base model (like GPT-4o or Claude), give it a system prompt, and leverage its massive library of pre-built Plugins (Google Search, Twitter API, GitHub, news aggregators). Its Workflows feature lets you design multi-step logic, and it includes built-in long-term memory databases.",
    howTos: [
      'Go to coze.com and click "Create Bot."',
      'Define the bot\'s persona and system prompt.',
      'Drag and drop plugins you want it to access (search, APIs, etc.).',
      'Test in the preview panel, then hit "Publish" and select your target messaging apps.',
    ],
    tips: [
      'One-click deploy to Telegram, Discord, WhatsApp, and Slack.',
      'Use the Workflows feature for multi-step logic (e.g., read RSS → summarize → draft tweet).',
      'The plugin library is massive — check it before building custom integrations.',
      'Currently free with generous usage limits — great for prototyping.',
    ],
  },
  {
    name: 'LobsterAI',
    slug: 'lobsterai',
    description: "An open-source personal assistant agent by NetEase Youdao that autonomously executes multi-step workflows on your local machine.",
    url: 'https://github.com/netease-youdao/LobsterAI',
    category: 'Agentic Workflows',
    pricing: 'Free',
    bestFor: 'Power Users',
    intro: "A desktop-based autonomous agent designed to be a 24/7 digital co-pilot. Unlike web-based chatbots, it has deep access to your local environment (with permission gating) to actually do work — managing files, creating PowerPoint presentations, or analyzing local datasets. It uses an intelligent agent loop (Plan → Act → Observe → Improve) powered by the OpenClaw engine. It features a Cowork System for executing tools and running Python scripts locally, with Permission Gating that halts execution and asks for human approval before sensitive actions.",
    howTos: [
      'Install the desktop app (Mac/Windows/Linux).',
      'Interact via the native workspace UI or remotely via Telegram/Discord.',
      'Give it a high-level command: "Analyze the sales data in my Downloads folder and generate a summary PPT."',
      'It autonomously writes code, executes it, and produces the file — asking permission before sensitive actions.',
    ],
    tips: [
      'Permission gating means it won\'t send emails or modify files without your approval.',
      'Works great as a remote agent via Telegram — control it from your phone.',
      'Can generate Office documents (PPT, Excel) from local data automatically.',
      'Open-source — customize the agent tools and permissions to your needs.',
    ],
  },
  {
    name: 'CrewAI',
    slug: 'crewai',
    description: 'A framework for orchestrating role-playing, autonomous AI agents that work together as a collaborative team to accomplish complex tasks.',
    url: 'https://crewai.com',
    category: 'Agentic Workflows',
    pricing: 'Free / Paid',
    bestFor: 'AI Engineers',
    intro: "Instead of having one AI try to do everything, CrewAI lets you build a crew of specialized agents. Create a Researcher agent, a Writer agent, and an Editor agent, and have them pass tasks back and forth until the final product is perfect. Built on top of Python (integrating with LangChain), you define Agents (with roles, goals, backstories), Tasks (what needs doing), and Tools (web search, code execution). The framework orchestrates collaboration sequentially or hierarchically.",
    howTos: [
      'Install via pip: pip install crewai.',
      'Define agents with roles: Researcher, Writer, Editor.',
      'Assign tasks: Researcher finds news, Writer drafts a blog post, Editor reviews.',
      'Run the script and watch the agents collaborate and output the final product.',
    ],
    tips: [
      'Give each agent a clear role, goal, and backstory for better specialization.',
      'Use sequential processing for pipelines, hierarchical for manager-worker structures.',
      'Integrate with LangChain tools for web search, file I/O, and API access.',
      'Enterprise platform available for monitoring and deploying crews at scale.',
    ],
  },
  {
    name: 'LangFlow',
    slug: 'langflow',
    description: 'A drag-and-drop visual builder for LangChain, making it easy to design, prototype, and test AI agents and RAG applications without code.',
    url: 'https://langflow.org',
    category: 'Agentic Workflows',
    pricing: 'Free / Paid',
    bestFor: 'AI Developers',
    intro: "LangChain is the most popular coding framework for building AI apps, but it has a steep learning curve. LangFlow provides a beautiful graphical interface on top of LangChain, turning complex code into visual nodes. Every component of an AI application — LLMs, prompt templates, vector databases, document loaders, tools — is a node. You wire them together, and it compiles the visual graph into executable code in the background.",
    howTos: [
      'Install locally via pip or use the cloud version.',
      'Drag a PDF Loader node → Text Splitter → OpenAI Embeddings → Vector Store.',
      'You\'ve just built a document-chat backend in 5 minutes without writing code.',
      'Test it immediately in the built-in chat window.',
    ],
    tips: [
      'Great for prototyping — build visually, then export to code for production.',
      'Supports LangChain and LlamaIndex components out of the box.',
      'Use the built-in chat window to test your flow before deploying.',
      'Cloud version via DataStax for teams that don\'t want to self-host.',
    ],
  },
  {
    name: 'Flowise',
    slug: 'flowise',
    description: 'An open-source, low-code UI to build customized LLM orchestration flows and AI agents, focused on ease of use and rapid deployment.',
    url: 'https://flowiseai.com',
    category: 'Agentic Workflows',
    pricing: 'Free',
    bestFor: 'Indie Builders',
    intro: "Very similar to LangFlow, Flowise is another drag-and-drop visual builder for LLM apps. It is particularly beloved by the open-source community for its simplicity, clean UI, and ease of embedding chatbots into websites. It supports multiple frameworks (LangChain, LlamaIndex) and lets you build custom tools, memory modules, and API endpoints visually.",
    howTos: [
      'Run locally using Docker or Node.js.',
      'Build your flow by connecting an LLM to tools (calculator, web scraper, etc.).',
      'Test the agent in the built-in chat interface.',
      'Generate an API endpoint or HTML/JS snippet to embed the chatbot into your website.',
    ],
    tips: [
      'Generates embeddable HTML snippets — paste into any website in seconds.',
      'Supports both LangChain and LlamaIndex as backends.',
      'Completely free and self-hosted — no vendor lock-in.',
      'Great for non-technical builders who need a working chatbot fast.',
    ],
  },
  {
    name: 'AutoGen Studio',
    slug: 'autogen-studio',
    description: "Microsoft's low-code interface for rapidly prototyping multi-agent conversations and workflows on top of the AutoGen framework.",
    url: 'https://microsoft.github.io/autogen/',
    category: 'Agentic Workflows',
    pricing: 'Free',
    bestFor: 'Enterprise Developers',
    intro: "Microsoft's AutoGen is a foundational multi-agent framework. AutoGen Studio is the visual frontend that makes it accessible. You declaratively define agents, their skills, and how they interact without complex Python code. You define Agents (e.g., a Coder and a Reviewer), Workflows (how they talk), and Skills (Python functions like generating charts or fetching stock prices). The agents converse in a loop, executing code in a secure Docker container.",
    howTos: [
      'Install via pip: pip install autogenstudio, then launch the web UI.',
      'Create a skill (e.g., a function to fetch weather data).',
      'Create an agent and attach that skill.',
      'Go to the Playground, type "What is the weather in Tokyo? Draw a chart of the weekly forecast."',
    ],
    tips: [
      'Agents execute code in Docker containers — safe sandboxed environment.',
      'Define clear skills as Python functions for best results.',
      'Great for research and prototyping before building production systems.',
      'Backed by Microsoft — strong enterprise support and documentation.',
    ],
  },
  {
    name: 'Voiceflow',
    slug: 'voiceflow',
    description: 'A collaborative visual platform for designing, prototyping, and building conversational AI agents, chatbots, and voice assistants.',
    url: 'https://voiceflow.com',
    category: 'Agentic Workflows',
    pricing: 'Free / Paid',
    bestFor: 'Product Teams',
    intro: "While tools like n8n focus on backend automation, Voiceflow focuses on the conversation itself. It is the industry standard for designing complex dialogue trees and AI-driven conversational flows for customer service bots, WhatsApp assistants, and voice apps. It combines traditional intent-based dialogue design with modern generative AI — build rigid flows for sensitive processes (collecting payment info) and hand off to a flexible LLM for general FAQs, all in the same canvas.",
    howTos: [
      'Sign up and create a new project at voiceflow.com.',
      'Use the drag-and-drop canvas to build the conversation flow.',
      'Add AI Response blocks with prompts for flexible LLM-powered replies.',
      'Test in real-time, then deploy to a website widget, WhatsApp, or IVR phone system.',
    ],
    tips: [
      'Combine rigid flows (payments, data collection) with LLM-powered flexible responses.',
      'Use the real-time testing panel to iterate quickly on conversation design.',
      'Deploy to website widgets, WhatsApp, and IVR systems from one project.',
      'Collaborative features make it great for product teams working together.',
    ],
  },
  {
    name: 'NEAR AI Cloud',
    slug: 'near-ai-cloud',
    description: 'A secure, decentralized cloud infrastructure for hosting autonomous AI agents with hardware-isolated Trusted Execution Environments (TEEs).',
    url: 'https://near.ai/cloud',
    category: 'Enterprise',
    pricing: 'Paid',
    bestFor: 'Enterprises & Governments',
    intro: "A cloud platform that solves the massive security risk of giving AI agents deep access to corporate systems. It provides a secure enclave where agents can run without exposing sensitive corporate data. Every request and agent workflow is executed inside hardware-enforced Trusted Execution Environments (Intel TDX + NVIDIA Confidential Compute). This creates cryptographic proof of integrity, meaning not even the cloud provider can see the prompts, credentials, or data the agent is using.",
    howTos: [
      'Sign up for NEAR AI Cloud at near.ai/cloud.',
      'Choose your open-source model or agent framework to deploy.',
      'Use their OpenAI-compatible API to route your enterprise workflows.',
      'Monitor cryptographic proof logs to verify integrity of every agent execution.',
    ],
    tips: [
      'Ideal for industries with strict compliance requirements (finance, healthcare, government).',
      'Uses hardware-level encryption — even the infrastructure provider cannot access your data.',
      'OpenAI-compatible API makes migration from existing AI pipelines straightforward.',
      'Pay-as-you-go pricing scales with actual token and compute usage.',
    ],
  },
  {
    name: 'The JADA Squad',
    slug: 'the-jada-squad',
    description: 'A specialist AI deployment partner that builds, deploys, and manages custom, production-ready AI agents for enterprise workflows.',
    url: 'https://jadasquad.com',
    category: 'Enterprise',
    pricing: 'Paid',
    bestFor: 'Mid-Market & Enterprise Teams',
    intro: "An end-to-end service and platform that takes foundational AI tech and turns it into reliable business tools (like Buyer Agents, BI Agents, or Clienteling Agents) tailored to a company's specific data and brand. JADA maps out your existing business workflows, builds a custom agentic system using off-the-shelf frameworks, and deploys it with a \"Human-in-the-loop\" operations desk to ensure continuous optimization, security, and accuracy.",
    howTos: [
      'Engage their team to scope a pilot project at jadasquad.com.',
      'They analyze your existing workflows and recommend agent types (Buyer Agent, BI Agent, etc.).',
      'JADA builds and integrates the custom agent into your tech stack (Slack, WhatsApp, ERPs).',
      'Pay a monthly fee for the agent plus human oversight and continuous optimization.',
    ],
    tips: [
      'Great for teams that want custom AI agents without hiring an in-house AI engineering team.',
      'Human-in-the-loop oversight ensures quality and catches edge cases.',
      'Fast deployment — custom agents can be live within days, not months.',
      'Works across multiple channels: Slack, WhatsApp, and internal ERP systems.',
    ],
  },
  {
    name: 'Vertex AI Agent Builder',
    slug: 'vertex-ai-agent-builder',
    description: "Google Cloud's comprehensive platform for building, scaling, and governing enterprise-grade generative AI agents grounded in corporate data.",
    url: 'https://cloud.google.com/vertex-ai',
    category: 'Enterprise',
    pricing: 'Paid',
    bestFor: 'Google Cloud Enterprises',
    intro: "A managed platform that lets developers create conversational and autonomous agents securely connected to enterprise data sources, APIs, and applications. It combines Google's foundational models (like Gemini) with advanced RAG (Retrieval-Augmented Generation) and Google Search grounding. It uses native Identity and Access Management (IAM) to ensure agents only access data they are authorized to see.",
    howTos: [
      'Access the Agent Builder through the Google Cloud Console.',
      'Define your agent\'s objective and connect it to internal data stores (BigQuery, Google Drive) using pre-built connectors.',
      'Configure security guardrails and IAM permissions.',
      'Deploy to internal portals or customer-facing channels.',
    ],
    tips: [
      'Best for organizations already invested in the Google Cloud ecosystem.',
      'Native IAM integration means agents respect existing data access policies.',
      'Use pre-built connectors to skip custom API integrations.',
      'Google Search grounding keeps agent responses factually current.',
    ],
  },
  {
    name: 'Agentforce',
    slug: 'agentforce',
    description: "Salesforce's native AI layer for building and deploying autonomous agents directly within the CRM environment.",
    url: 'https://salesforce.com/agentforce',
    category: 'Enterprise',
    pricing: 'Paid',
    bestFor: 'Salesforce Users',
    intro: "A suite of customizable AI agents that live inside Salesforce. Instead of just answering questions, these agents can execute multi-step business processes autonomously, like qualifying leads or resolving customer service cases. Powered by the Atlas Reasoning Engine, Agentforce deeply integrates with the Salesforce Data Cloud. Because it operates natively within the CRM, it securely accesses real-time customer data without complex third-party integrations.",
    howTos: [
      'Open the low-code Agent Builder in Salesforce.',
      'Select a pre-built agent template (Service Agent, Sales Development Agent, etc.).',
      'Customize instructions and guardrails using natural language.',
      'Activate the agent to work alongside human employees.',
    ],
    tips: [
      'No data migration needed — agents work directly with your Salesforce data.',
      'Start with pre-built templates and customize from there.',
      'Native integration means zero third-party security risks.',
      'Agents can handle multi-step processes, not just simple Q&A.',
    ],
  },
  {
    name: 'Microsoft Copilot Studio',
    slug: 'microsoft-copilot-studio',
    description: 'A low-code platform to design, test, and publish custom AI agents that operate across Microsoft 365 and enterprise systems.',
    url: 'https://microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio',
    category: 'Enterprise',
    pricing: 'Paid',
    bestFor: 'Microsoft 365 Organizations',
    intro: "The enterprise engine for creating custom Copilots. It allows businesses to build agents that understand their specific company data, terminology, and processes, acting as custom digital employees. It uses a visual, drag-and-drop interface combined with natural language prompts. It securely grounds the AI in your Microsoft Graph data (emails, chats, documents) while strictly adhering to your organization's existing security and compliance policies.",
    howTos: [
      'Open Copilot Studio and describe the agent you want to build in plain English.',
      'Connect it to your SharePoint sites or backend APIs.',
      'Test conversation flows in the built-in sandbox.',
      'Publish the agent directly to Microsoft Teams or your company website.',
    ],
    tips: [
      'Best for organizations already using Teams, SharePoint, or Dynamics 365.',
      'Microsoft Graph grounding means the AI understands your company context.',
      'Visual builder requires no coding — business users can create agents.',
      'Built-in sandbox lets you test thoroughly before going live.',
    ],
  },
  {
    name: 'Vellum AI',
    slug: 'vellum-ai',
    description: 'An LLM orchestration and observability platform for technical teams to build, test, evaluate, and deploy AI applications and agents.',
    url: 'https://vellum.ai',
    category: 'Enterprise',
    pricing: 'Free / Paid',
    bestFor: 'AI Product Teams',
    intro: "A visual workspace that bridges the gap between AI experimentation and enterprise production. It provides tools for prompt engineering, version control, automated testing (evals), and multi-model comparison. Users build complex AI workflows in a visual editor where nodes represent LLM calls, code execution, or API integrations. It allows teams to run automated evaluation suites against test cases to ensure the AI doesn't hallucinate or regress before deploying to production.",
    howTos: [
      'Sign up and create a workspace at vellum.ai.',
      'Use the visual builder to design your agent\'s logic.',
      'Connect your preferred LLM providers (OpenAI, Anthropic, etc.).',
      'Run backtests against historical data to verify quality, then deploy via a single API endpoint.',
    ],
    tips: [
      'Automated evals catch regressions before they reach production.',
      'Compare multiple LLM providers side-by-side to find the best fit.',
      'Version control for prompts means you can roll back bad changes instantly.',
      'Free tier available for prototyping before committing to production plans.',
    ],
  },
  {
    name: 'Rasa',
    slug: 'rasa',
    description: 'An open-core conversational AI platform for building highly customized, secure, and scalable enterprise AI assistants.',
    url: 'https://rasa.com',
    category: 'Enterprise',
    pricing: 'Free / Paid',
    bestFor: 'Regulated Industries',
    intro: "The developer platform of choice for building complex, mission-critical conversational agents. Unlike black-box SaaS tools, Rasa gives engineering teams full control over the dialogue management and machine learning models. It uses a composable skills architecture and CALM (Conversational AI with Language Models) to combine the flexibility of LLMs with the predictability of traditional dialogue trees. It can be deployed entirely on-premise or in a private cloud.",
    howTos: [
      'Install the Rasa framework via pip.',
      'Define intents, entities, and dialogue flows using YAML files or the Rasa Pro visual interface.',
      'Train custom models on company-specific data.',
      'Deploy the infrastructure securely within your own servers.',
    ],
    tips: [
      'Ideal for banking, healthcare, and telecom — full on-premise deployment.',
      'Open-source core is free; Rasa Pro adds visual tools and analytics.',
      'CALM architecture blends LLM flexibility with deterministic dialogue safety.',
      'Sensitive data never leaves your corporate firewall.',
    ],
  },
  {
    name: 'Moveworks',
    slug: 'moveworks',
    description: 'An agentic AI platform that acts as a universal enterprise interface to automate internal employee support across IT, HR, and Finance.',
    url: 'https://moveworks.com',
    category: 'Enterprise',
    pricing: 'Paid',
    bestFor: 'Large Enterprises',
    intro: "A specialized internal AI copilot. Instead of employees navigating dozens of different software portals to reset a password, request PTO, or provision software, they just ask the Moveworks agent. It integrates deeply with backend enterprise systems (like ServiceNow, Workday, and Okta). When an employee makes a request, the agent's reasoning engine understands the intent, verifies the user's permissions, and executes the action across the necessary systems autonomously.",
    howTos: [
      'Work with your IT team on enterprise-wide deployment and integration.',
      'Connect Moveworks to your backend systems (ServiceNow, Workday, Okta, etc.).',
      'Roll out the bot inside Microsoft Teams or Slack.',
      'Employees type natural language requests to get instant resolutions.',
    ],
    tips: [
      'Reduces internal support tickets dramatically — employees get instant answers.',
      'Deep integrations mean it can actually execute actions, not just provide information.',
      'Works inside existing messaging apps — no new tool to learn.',
      'Verifies user permissions before executing sensitive actions.',
    ],
  },
  {
    name: 'UiPath',
    slug: 'uipath',
    description: 'The global leader in enterprise automation, combining traditional Robotic Process Automation (RPA) with modern agentic AI.',
    url: 'https://uipath.com',
    category: 'Enterprise',
    pricing: 'Paid',
    bestFor: 'Legacy System Enterprises',
    intro: "A comprehensive platform that bridges the gap between legacy software (which lacks APIs) and modern AI. It uses AI agents to intelligently orchestrate and execute workflows across any application. UiPath Autopilot and its agentic capabilities allow software robots to read computer screens (Computer Vision), understand unstructured data (like invoices or emails using LLMs), and dynamically adapt to UI changes, making traditional RPA much more resilient and autonomous.",
    howTos: [
      'Use UiPath Studio to design automation workflows.',
      'Drag and drop AI skills (document understanding, sentiment analysis) into the process.',
      'Let robots handle complex decision-making tasks in the background.',
      'Monitor and manage automations from the centralized Orchestrator dashboard.',
    ],
    tips: [
      'Best for organizations with legacy systems that lack modern APIs.',
      'Computer Vision allows robots to work with any application, even without integrations.',
      'Combine with AI skills for unstructured data processing (invoices, emails, PDFs).',
      'Enterprise-grade governance and audit trails built in.',
    ],
  },
  {
    name: 'Decagon',
    slug: 'decagon',
    description: 'An AI-native customer support platform that deploys autonomous, production-ready agents to handle complex customer inquiries end-to-end.',
    url: 'https://decagon.ai',
    category: 'Enterprise',
    pricing: 'Paid',
    bestFor: 'Customer Experience Teams',
    intro: "A specialized platform for building customer-facing AI agents that go beyond basic FAQs. Decagon agents can take actions like processing refunds, updating shipping addresses, or troubleshooting technical issues. It ingests a company's knowledge base, past support tickets, and brand guidelines, then integrates with backend systems (like Shopify or Zendesk) to execute tasks. It features strict guardrails to prevent hallucinations and ensure the AI stays perfectly on-brand.",
    howTos: [
      'Work with Decagon to ingest your knowledge base, support tickets, and brand guidelines.',
      'Connect backend systems (Shopify, Zendesk, etc.) for action execution.',
      'Configure guardrails to keep AI responses on-brand and accurate.',
      'Go live and monitor resolution rates and customer satisfaction.',
    ],
    tips: [
      'Agents can take real actions (refunds, address changes) — not just answer questions.',
      'Strict guardrails prevent hallucinations and off-brand responses.',
      'Learns from past support tickets to improve over time.',
      'Designed for high-volume CX teams — scales without hiring more agents.',
    ],
  },
];

const allCategories = ['All', ...Array.from(new Set(tools.map((t) => t.category)))];

export default function ToolsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  useEffect(() => {
    if (selectedTool) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedTool]);

  const filtered = tools.filter((tool) => {
    const matchCategory = activeCategory === 'All' || tool.category === activeCategory;
    const matchSearch =
      !search ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-up">
      <div className="mb-10">
        <span
          className="inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4"
          style={{ background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))", color: "#fff" }}
        >
          Directory
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
          AI Tools
        </h1>
        <div className="w-12 h-0.5 rounded-full mb-4" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Curated collection of the best AI tools — <span className="font-semibold gradient-text">{tools.length}</span> tools and growing.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "var(--text-muted)" }}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search tools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 text-sm rounded-xl"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
              style={{
                background: activeCategory === cat
                  ? "linear-gradient(135deg, var(--accent-start), var(--accent-end))"
                  : "var(--bg-surface)",
                border: activeCategory === cat ? "none" : "1px solid var(--glass-border)",
                color: activeCategory === cat ? "#fff" : "var(--text-muted)",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((tool, i) => (
            <div
              key={tool.slug}
              className={`animate-fade-up delay-${Math.min(i + 1, 5)}`}
            >
              <div className="glass glass-hover accent-border p-6 h-full flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                    {tool.name}
                  </h3>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded-lg transition-colors"
                    style={{ color: "var(--text-muted)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent-start)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <p className="text-sm mb-4 leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                  {tool.description}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="px-2.5 py-0.5 text-xs rounded-full"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--accent-mid)" }}
                  >
                    {tool.category}
                  </span>
                  <span
                    className="px-2.5 py-0.5 text-xs rounded-full"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--text-muted)" }}
                  >
                    {tool.pricing}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedTool(tool)}
                  className="w-full py-2 rounded-xl text-sm font-medium transition-all duration-300"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--accent-start)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-start)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--glass-border)";
                  }}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p style={{ color: "var(--text-muted)" }}>No tools found</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedTool && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setSelectedTool(null)}
        >
          <div className="absolute inset-0" style={{ background: "rgba(0, 0, 0, 0.7)", backdropFilter: "blur(8px)" }} />
          <div
            className="relative glass w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 md:p-8 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTool(null)}
              className="absolute top-4 right-4 p-2 rounded-xl transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text-primary)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-muted)"; }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                  {selectedTool.name}
                </h2>
                <a
                  href={selectedTool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-xs rounded-full font-medium transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, var(--accent-start), var(--accent-end))",
                    color: "#fff",
                  }}
                >
                  Visit Site
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="px-2.5 py-0.5 text-xs rounded-full"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--accent-mid)" }}
                >
                  {selectedTool.category}
                </span>
                <span
                  className="px-2.5 py-0.5 text-xs rounded-full"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--text-muted)" }}
                >
                  {selectedTool.pricing}
                </span>
                <span
                  className="px-2.5 py-0.5 text-xs rounded-full"
                  style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)", color: "var(--text-muted)" }}
                >
                  {selectedTool.bestFor}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--accent-mid)" }}>
                Overview
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {selectedTool.intro}
              </p>
            </div>

            <div className="section-divider mb-6" />

            <div className="mb-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--accent-mid)" }}>
                How to Get Started
              </h3>
              <ol className="space-y-3">
                {selectedTool.howTos.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        background: i === 0
                          ? "linear-gradient(135deg, var(--accent-start), var(--accent-end))"
                          : "var(--bg-surface)",
                        color: i === 0 ? "#fff" : "var(--text-muted)",
                        border: i === 0 ? "none" : "1px solid var(--glass-border)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="section-divider mb-6" />

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-3" style={{ color: "var(--accent-mid)" }}>
                Pro Tips
              </h3>
              <div className="space-y-2">
                {selectedTool.tips.map((tip, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 rounded-xl"
                    style={{ background: "var(--bg-surface)", border: "1px solid var(--glass-border)" }}
                  >
                    <span style={{ color: "var(--accent-start)" }}>&#10003;</span>
                    <span className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {tip}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
