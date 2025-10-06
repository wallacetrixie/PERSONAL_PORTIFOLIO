📘 README (Project Overview)
About the Project

This is a personal portfolio website built to showcase the professional journey, technical expertise, and creative projects of Wallace Wambulwa, a software developer and founder of E-sail Tech Company.

The portfolio emphasizes modern UI/UX design, dynamic animations, and high performance, leveraging React.js and Tailwind CSS. It integrates motion design principles to deliver an interactive and visually appealing experience — highlighting skills, experience, and projects in an elegant, storytelling-oriented format.

Core Objectives

Build a fast, responsive, and aesthetic developer portfolio.

Integrate modern animations (spirals, fade-ins, staggered transitions, parallax scrolls).

Demonstrate real-world frontend engineering best practices.

Act as a personal brand hub for networking, opportunities, and credibility.

Showcase projects, technologies, and achievements with clean visual hierarchy.

Tech Stack
Layer	Technology
Frontend Framework	React.js (with Vite and typescript)
Styling Framework	Tailwind CSS
Animations	Framer Motion + React Spring
Routing	React Router
Icons & Graphics	Lucide React / FontAwesome
Typography	Google Fonts (Poppins / Inter / Space Grotesk)
Deployment	Vercel / Netlify
Version Control	Git + GitHub
Key Features

 Animated Hero Section (spiral or orbit-style motion)

Project Showcase Grid with hover animations

About Me + Skills section with animated progress bars

 Smooth transitions and interactive micro-interactions
 Contact Form with API integration (Formspree / Node backend)

 Dark Mode toggle with persistent state

 Fully responsive and mobile-optimized design

 Development Methodology

This project will follow a modular and iterative development approach, similar to a real-world agile product cycle.

Methodology:

Design-driven development — UI mockups and visual flow come first.

Component-based architecture — reusable and atomic design principles.

Motion-first thinking — meaningful animations that support the storytelling.

Responsive-first — mobile, tablet, and desktop optimization at every stage.

Continuous refinement — iterative improvements to accessibility, performance, and interactivity.






Prompt / Spec to Build the Projects Component

Here’s a detailed prompt/spec you can use to start implementing this Projects section in React + Tailwind + animation (Framer Motion or similar):

Projects Section Spec

Goal: Showcase 9 projects with high visual fidelity, interactive hover overlays, and scroll-reveal animations, giving emphasis to design + backend + full stack work.

Structure

<section id="projects">

Title heading: “Projects” (or “Selected Projects”) + optional subtitle: “Dashboard & Main Pages”

Optional filter / category tabs / chips above grid (e.g. “All”, “Frontend”, “Backend”,)

Grid container with 9 project cards.

Content per Project Card

Screenshot: Dashboard or main page image (could be desktop view or combined desktop + mobile).

Overlay on hover: shows project title, a one-line description (what it solves or main feature), tech stack icons (e.g. React, Node.js, Tailwind).

Action links: “View Live” / “GitHub” / “Details” inside overlay or below card.

Animations & Motion

Use scroll triggers (Framer Motion’s useInView or other) to reveal cards in a staggered animation: fade up + slight upward translation.

On hover of card: scale image slightly (1.05x), show overlay with smooth fade.

Optional: subtle parallax effect on card image background or layered screenshot on scroll.

Styling & Theme

Dark background for section (bg-very-dark or #0a0a0f etc).

Cards: dark card backgrounds (if screenshots have white, maybe add border or shadow to separate).

Rounded corners, medium to large spacing between grid items.

Accent color for hover overlay, title text, icons.

Responsive Behavior



On mobile, overlay could appear on tap (instead of hover).

Lazy load images for performance.

Optional Features (for polish)

Featured project: make the first project (or a chosen project) span two columns or have a larger card.

Lightbox / modal view for project when clicked to show more screenshots.

“Next Project” previews at bottom (if using case study pages).

Accessibility

Alt text for all project images.

Focus styles for keyboard navigation (cards / links).

Contrast for overlay text must be sufficient
nhanced Projects Section Prompt (with Project Cards)

Build a Projects section in your portfolio that displays 9 project cards grouped into Frontend and Backend categories. Each card should show a screenshot (dashboards / main pages) plus:

Title

Short refined description

List of relevant technologies used

Overlay on hover with project info + action buttons (e.g. “View Project”, “GitHub” or “Demo”)

Use a responsive grid layout (3×3 on desktop, scaling down for tablet / mobile).
Implement scroll-reveal animations: cards fade & slide in staggered. Hover animations for zoom / overlay.

Use the following project data (grouped):

Frontend Projects:
  • Green Store — “A digital marketplace offering eco-friendly products like sustainable tools and meals... etc.” Technologies: React, TypeScript, Tailwind, REST API, Stripe UI, Responsive Design.
  • Taskify — “A job-searching platform that helps applicants find work and employers post opportunities... etc.” Technologies: React, TypeScript, Tailwind, React Router, State Management, UI/UX design.
  • Resume Maker — “Web app that lets users build professional resumes via templates, live preview, export to PDF... etc.” Technologies: React, TypeScript, Tailwind, Template System, Client-side PDF export, UX principles.

Backend Projects:
  • ForAUTH — “Authentication & authorization system, with JWT / OAuth, role-based access, etc.” Technologies: Node.js, Express, MySQL/MongoDB, JWT/OAuth, Security.
  • AI Health Companion App — “Backend engine for health data and AI-driven insights... etc.” Technologies: Node.js, Express, MongoDB, REST API, Data Validation.
  • ContentGuard — “Detect plagiarism and AI content with reports via admin dashboard... etc.” Technologies: Node.js, Express, MySQL/MongoDB, NLP similarities.
  • Solution Hub — “Platform connecting freelancers & clients: job posting, profiles, payments... etc.” Technologies: Node.js, Express, MySQL, Authentication, Billing.
  • Chat App — “Real-time messaging via WebSockets with persistence, user roles, etc.” Technologies: Node.js, Express, WebSocket (Socket.io), MongoDB or Redis, Real-time Events.

Style the section with dark theme, accent colors, hover overlays, and ensure crispness in the screenshot thumbnails. Prioritize performance (lazy loading), smooth animations, and responsive design.

