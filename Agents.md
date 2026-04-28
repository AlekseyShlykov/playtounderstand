# AGENTS.md — Build to Understand

## Project Context

You are building **Build to Understand** — a simple one-page website for a personal creator-led series of interactive educational games.

The project is not an agency website, not a startup landing page, and not an aggressive newsletter funnel.

It is a calm, minimal, slightly ironic home for educational games that help people understand complex ideas through play.

The core idea:

> I make interactive educational games based on books, lectures, and complex ideas — short enough to play in 10–20 minutes, meaningful enough to remember.

The website should help users:

1. Understand what the project is
2. Explore existing games
3. Leave their email to get notified about future games

The main business goal is **email collection** for future audience building and possible Patreon monetization later.

---

# Product Rules

## Primary Goal

The main conversion goal is:

> User leaves their email to get notified about new games.

The main user action is:

> Explore projects.

The site should first make users curious enough to try a game, then gently invite them to subscribe.

---

# Scope

Build a **single-page static website**.

Do not create a complex multi-page app.
Do not add unnecessary navigation.
Do not add login, accounts, dashboards, comments, CMS, or heavy backend logic.

The MVP should be simple, beautiful, fast, and easy to host on GitHub Pages.

---

# Tech Requirements

## Hosting

The final project must be compatible with **GitHub Pages**.

Prefer a static export setup.

If using Next.js:

* configure static export properly
* ensure all asset paths work on GitHub Pages
* avoid server-only features
* avoid API routes unless absolutely necessary
* make sure the final build can be deployed as static files

If using Vite / React:

* keep the app fully static
* use clean component structure
* ensure base path can be configured if deployed under a repo path

## Email Form

For MVP, implement the email form as a frontend component ready to connect to an email provider later.

Do not invent a fake backend.
Do not store emails locally.
Do not create insecure custom email collection logic.

The form should support future integration with:

* MailerLite
* ConvertKit / Kit
* Buttondown
* Substack embed
* simple external form endpoint

For now, use a clean placeholder integration pattern:

* email input
* submit button
* success state
* error state
* clear TODO comment for provider integration

---

# Content Structure

The website should include these sections in this order:

1. Hero
2. Projects
3. Subscribe
4. Short About / Creator block
5. Footer

Keep everything on one page.

---

# Hero Section

## Purpose

Within 10 seconds, the user should understand:

* this is a personal educational games project
* each game explains a complex idea through play
* new games are released regularly, roughly monthly or sometimes less often
* they can explore the projects immediately

## Required Elements

* project name: **Build to Understand**
* short headline
* short subheadline
* primary CTA: **Explore projects**
* secondary CTA: **Get the next game by email**

## Suggested Copy Direction

Use this as inspiration, but improve if needed:

**Build to Understand**

Interactive educational games about complex ideas.

I take concepts from books, lectures, philosophy, science, psychology, and history — and turn them into small playable experiences you can finish in 10–20 minutes.

Probably better than doomscrolling.

Buttons:

* Explore projects
* Get the next game

---

# Projects Section

## Purpose

Show existing educational games clearly and beautifully.

Each card should make the user want to click and play.

## Current Projects

### 1. The Choice

Description:

An interactive journey through moral philosophy and ethical dilemmas. Make choices, face trade-offs, and see which ethical approach your decisions lean toward.

Tags:

* Ethics
* Philosophy
* Moral Dilemmas

URL:

[https://thechoice.quest/](https://thechoice.quest/)

### 2. Evolution of Civilizations

Description:

A playable exploration of how geography, resources, and human decisions shape the rise and fall of civilizations, inspired by *Guns, Germs, and Steel*.

Tags:

* History
* Civilization
* Geography

URL:

[https://evolutionofcivilizations.earth/](https://evolutionofcivilizations.earth/)

### 3. How the Brain Shapes Behavior

Description:

A short quiz about how different brain systems influence behavior, turning neuroscience into simple pattern recognition.

Tags:

* Psychology
* Neuroscience
* Behavior

URL:

[https://buildtounderstand.dev/thebrain/](https://buildtounderstand.dev/thebrain/)

### 4. Reasonable Doubt

Description:

A decision-based game about AI, predictive justice, and the ethics of judging guilt based on incomplete information.

Tags:

* AI Ethics
* Justice
* Decision Making

URL:

Use placeholder until final URL is available.

## Card Requirements

Each project card should include:

* image / visual placeholder
* title
* short description
* tags
* Play button

Optional:

* duration badge, e.g. “10–20 min”

---

# Subscribe Section

## Purpose

Collect emails gently and honestly.

No aggressive marketing.
No popups for MVP.
No fake scarcity.

## Copy Direction

Tone: soft, lightly ironic, personal.

Possible copy:

> I try to make a new educational game about once a month. Sometimes less often, because life is not a content calendar.
>
> Leave your email if you’d like to get the next one when it’s ready.

Form:

* email input
* button: “Notify me” or “Send me the next game”

After submit:

* show success message
* do not redirect unless required later by provider

Success message idea:

> You’re in. I’ll send you the next game when it exists.

---

# About Section

## Purpose

Briefly explain the creator behind the project.

Keep it short.

This is not a full biography.
This is not a resume.
This is not an agency sales pitch.

## Copy Direction

Possible copy:

> I’m Alex. I build small interactive projects that help people understand complicated ideas through play.
>
> Most of these games start as notes from a book, lecture, or question I can’t stop thinking about. Then I turn them into something you can click through, test, and feel — instead of just read about.

Include external blog link:

* Substack link placeholder

Do not add too many social links.
For MVP, subscription is more important than social media.

---

# Footer

Keep it minimal.

Include:

* Build to Understand
* short line: “Small games. Big ideas.”
* optional Substack link
* optional copyright

---

# Visual Direction

## Overall Feel

Minimal, calm, intellectual, slightly handmade.

The design should feel like:

* a personal creative studio
* an educational notebook
* a quiet game collection
* a small museum of playable ideas

It should not feel like:

* a SaaS landing page
* a Web3 product page
* a corporate portfolio
* a course funnel
* a loud startup site

## Visual Style

Use a restrained minimalist layout with possible watercolor-inspired details.

Possible elements:

* soft watercolor stains or blurred washes
* off-white background
* editorial typography
* subtle borders
* generous spacing
* project cards with quiet depth
* no loud gradients
* no neon startup look

Watercolor elements should be subtle and should not hurt readability.

---

# UX Rules

## Important

The site should be very easy to understand.

A first-time visitor should not need to think about where to click.

Main flow:

1. Read hero
2. Click Explore Projects
3. Pick a game
4. Optionally subscribe

## CTA Priority

Primary CTA:

* Explore projects

Secondary CTA:

* Subscribe / Get the next game

Do not make subscription feel forced before users see the projects.

---

# Writing Rules

Use simple, clear English.

Avoid:

* hype
* buzzwords
* “revolutionary”
* “unlock your potential”
* corporate marketing clichés
* overexplaining
* generic AI-sounding copy

Prefer:

* plain language
* short paragraphs
* gentle humor
* creator voice
* concrete descriptions

Do not use em dashes too often.
Prefer clean sentence structure.

---

# Performance Rules

The site should load fast.

Requirements:

* optimize images
* avoid heavy libraries unless needed
* avoid unnecessary animations
* keep JavaScript minimal
* make the page usable on mobile
* ensure good Lighthouse scores

Animations are allowed only if subtle.

---

# Accessibility Rules

Implement basic accessibility:

* semantic HTML
* proper heading hierarchy
* good contrast
* visible focus states
* accessible buttons and links
* form labels or aria-labels
* keyboard navigation support

---

# Mobile Rules

Mobile experience is very important.

The site should feel natural on a phone:

* readable text
* large tap targets
* project cards stacked vertically
* email form easy to use
* no tiny buttons
* no layout shifts

---

# Suggested Component Structure

Use a clean component structure such as:

```txt
src/
  components/
    Hero.tsx
    ProjectCard.tsx
    ProjectsSection.tsx
    SubscribeSection.tsx
    AboutSection.tsx
    Footer.tsx
  data/
    projects.ts
  styles/
    globals.css
```

Keep project data in a separate file so new games can be added easily.

---

# Project Data Model

Use a simple data structure for projects:

```ts
export type Project = {
  title: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
  duration?: string;
  status?: 'live' | 'coming-soon';
};
```

This makes it easy to add new projects later.

---

# Deployment Requirements

Before finishing, verify:

* production build works
* static export works
* all links work
* all images load correctly
* GitHub Pages path issues are handled
* no broken asset paths
* page works on mobile
* email form has a clear integration TODO

If using GitHub Pages with a custom domain, make sure the app works from root path.

If deploying under a repository path, configure the base path correctly.

---

# Do Not Do

Do not:

* create multiple pages for MVP
* build a CMS
* add authentication
* add comments
* add a complex blog system
* add Patreon now
* add analytics now unless explicitly requested later
* overdesign the page
* bury the project cards below too much text
* make the email signup aggressive

---

# Final Quality Bar

The finished MVP should feel like:

> A quiet, memorable homepage for a creator who turns complicated ideas into small playable learning experiences.

The user should leave thinking:

> I want to try one of these games.

And ideally:

> I want to know when the next one comes out.

---

# Final Self-Check Before Completion

Before marking the task complete, check:

* Is the site one page?
* Is the first screen immediately understandable?
* Are projects easy to explore?
* Is email signup visible but not annoying?
* Does the tone feel calm and slightly ironic?
* Does the design avoid startup/agency vibes?
* Does it work well on mobile?
* Is it ready for GitHub Pages?
* Can a new project be added easily?
* Are all placeholder URLs and TODOs clearly marked?
