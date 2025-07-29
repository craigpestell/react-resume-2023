# Craig Pestell - Portfolio Website

A modern, responsive portfolio website for Craig Pestell, Senior Software Engineer, built with Next.js 15 and TailwindCSS. Features dynamic resume generation, theme customization, and modern animations.

## Features

- **Modern Design**: Clean, responsive design with multiple theme options and dark/light mode toggle
- **Dynamic Resume Generation**: Click to download a professionally formatted PDF resume
- **Theme Customization**: Multiple theme variants, font selection, and letter spacing controls
- **Smooth Animations**: Framer Motion animations for enhanced user experience  
- **Responsive Layout**: Optimized for all devices and screen sizes
- **SEO Optimized**: Built with Next.js 15 for optimal performance with structured data
- **Email Integration**: Contact form with EmailJS integration
- **Easy Customization**: Centralized data source for easy content updates

## Sections

- **Hero**: Animated introduction with call-to-action buttons
- **Skills**: Interactive skill bars organized by category
- **Projects**: Showcase of featured and other projects
- **Experience**: Timeline view of professional experience and education
- **Contact**: Contact form and social links

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS v4
- **Animations**: Framer Motion
- **PDF Generation**: @react-pdf/renderer
- **Email Service**: EmailJS
- **Icons**: Lucide React
- **Typography**: Geist font family
- **TypeScript**: Full type safety
- **Development**: Storybook for component development
- **Testing**: Vitest with browser testing capabilities

## Getting Started

### Prerequisites

- Node.js 22+ (specified in package.json engines)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/craigpestell/resume-2025.git
   cd craigpestell.com
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   The development server uses Turbopack for ultra-fast builds.

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code linting
- `npm run storybook` - Start Storybook development server
- `npm run build-storybook` - Build Storybook for production

## Customization

### 1. Update Your Information

Edit `src/data/portfolio.ts` to customize all content:

- Personal information (name, title, contact details)
- Skills and proficiency levels
- Project details and links
- Work experience and achievements
- Education history

### 2. Customize Styling

- **Colors**: Update `tailwind.config.js` for custom color scheme (using TailwindCSS v4)
- **Fonts**: The project uses Geist font family, modify `src/app/layout.tsx` for different fonts
- **Themes**: Multiple theme variants available in `src/components/ThemeChooser.tsx`
- **Components**: Edit individual components in `src/components/`

### 3. Add Images

Place project images in the `public/images/` directory and update the `imageUrl` fields in your project data.

### 4. Resume Customization

Modify `src/components/ResumeGenerator.tsx` to:
- Change PDF styling and layout
- Add/remove sections
- Modify formatting and colors

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page component
│   ├── globals.css         # Global styles
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── api/                # API routes
│   ├── dashboard/          # Dashboard routes
│   └── themes/             # Theme-related routes
├── components/
│   ├── Header.tsx          # Navigation header with theme toggle
│   ├── Hero.tsx            # Hero section with introduction
│   ├── Skills.tsx          # Skills showcase with progress bars
│   ├── Projects.tsx        # Project portfolio grid
│   ├── Experience.tsx      # Experience timeline and education
│   ├── Contact.tsx         # Contact form with EmailJS
│   ├── ResumeGenerator.tsx # PDF resume generation
│   ├── ThemeChooser.tsx    # Theme selection component
│   ├── FontSelector.tsx    # Font customization
│   ├── LetterSpacingSelector.tsx # Typography controls
│   ├── StructuredData.tsx  # SEO structured data
│   └── ...                 # Other components
├── data/
│   └── portfolio.ts        # All portfolio data and types
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── stories/                # Storybook stories
└── middleware.ts           # Next.js middleware
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

The site is currently deployed at: [https://www.craigpestell.com](https://www.craigpestell.com)

### Other Platforms

The site works on any platform that supports Next.js:
- Netlify
- Railway  
- Digital Ocean App Platform
- AWS Amplify

## Development Tools

### Storybook

Run Storybook for component development:

```bash
npm run storybook
# or
yarn storybook
```

### Testing

Run tests with Vitest:

```bash
npm test
# or
yarn test
```

## Performance Features

- **Turbopack**: Ultra-fast development builds
- **Image Optimization**: Automatic image optimization with Next.js
- **Code Splitting**: Automatic code splitting for optimal loading
- **SEO**: Built-in SEO optimization with structured data
- **Edge Config**: Vercel Edge Config integration for dynamic content

**Built with ❤️ by Craig Pestell using Next.js, TailwindCSS, and TypeScript**

---

*This portfolio showcases modern web development practices and serves as both a personal website and a demonstration of technical skills in React, Next.js, and full-stack development.*
