# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# 🚀 Wallace Wambulwa - Personal Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth animations, dark mode support, and a comprehensive showcase of projects and skills.

![Portfolio Preview](./public/vite.svg)

## ✨ Features

- 🎨 **Modern Design** - Clean and professional UI/UX
- 🌓 **Dark Mode** - Seamless light/dark theme switching
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🎭 **Smooth Animations** - Enhanced with Framer Motion
- 🎯 **Type Safe** - Built with TypeScript
- 🎨 **Tailwind CSS** - Utility-first styling
- 📊 **Interactive Projects** - Filterable project showcase
- 💼 **Skills Tree** - Visual skills representation
- 📬 **Contact Section** - Easy ways to get in touch

## 🛠️ Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **Linting:** ESLint

## 📁 Project Structure

```
portfolio/
├── docs/                      # Documentation files
│   ├── README.md             # Documentation index
│   ├── ABOUT_SECTION_*       # About section docs
│   ├── HERO_SECTION_*        # Hero section docs
│   ├── NAVBAR_*              # Navbar docs
│   ├── PROJECTS_SECTION_*    # Projects section docs
│   ├── SKILLS_*              # Skills section docs
│   └── ...                   # Other documentation
├── public/                    # Static assets
├── src/
│   ├── assets/               # Images and media
│   ├── components/           # React components
│   │   ├── layout/           # Layout components
│   │   ├── sections/         # Page sections
│   │   └── ui/               # Reusable UI components
│   ├── constants/            # Constants and data
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   ├── styles/               # Global styles
│   ├── types/                # TypeScript types
│   ├── utils/                # Utility functions
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles
├── eslint.config.js          # ESLint configuration
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── package.json              # Project dependencies

```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wallacetrixie/PERSONAL_PORTIFOLIO.git
cd PERSONAL_PORTIFOLIO/portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking

## 📚 Documentation

Comprehensive documentation for each section is available in the [`/docs`](./docs) directory:

- [About Section](./docs/ABOUT_SECTION_README.md)
- [Hero Section](./docs/HERO_SECTION_README.md)
- [Navbar](./docs/NAVBAR_README.md)
- [Projects Section](./docs/PROJECTS_SECTION_README.md)
- [Skills Section](./docs/SKILLS_TREE_QUICK_START.md)
- [Integration Guide](./docs/INTEGRATION_QUICK_REFERENCE.md)

## 🎨 Customization

### Update Personal Information

Edit `/src/constants/index.ts` to update:
- Personal details
- Social links
- Navigation items
- Projects data
- Skills information

### Modify Styling

- Global styles: `src/index.css`
- Tailwind config: `tailwind.config.js`
- Component-specific styles: Individual component files

## 🌐 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory, ready to be deployed to any static hosting service.

### Recommended Hosting Platforms

- [Vercel](https://vercel.com)
- [Netlify](https://netlify.com)
- [GitHub Pages](https://pages.github.com)
- [Cloudflare Pages](https://pages.cloudflare.com)

## 👤 Author

**Wallace Wambulwa**
- Email: wallacewambulwa@gmail.com
- Location: Nairobi, Kenya
- GitHub: [@wallacetrixie](https://github.com/wallacetrixie)
- LinkedIn: [wallacewambulwa](https://linkedin.com/in/wallacewambulwa)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Built with ❤️ by Wallace Wambulwa**

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
