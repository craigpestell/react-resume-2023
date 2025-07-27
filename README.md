# Modern Portfolio Website

A responsive portfolio website built with Next.js 15 and TailwindCSS, featuring dynamic resume generation and modern animations.

## Features

- **Modern Design**: Clean, responsive design with dark/light mode toggle
- **Dynamic Resume Generation**: Click to download a professionally formatted PDF resume
- **Smooth Animations**: Framer Motion animations for enhanced user experience  
- **Responsive Layout**: Optimized for all devices and screen sizes
- **SEO Optimized**: Built with Next.js 15 for optimal performance
- **Easy Customization**: Centralized data source for easy content updates

## Sections

- **Hero**: Animated introduction with call-to-action buttons
- **Skills**: Interactive skill bars organized by category
- **Projects**: Showcase of featured and other projects
- **Experience**: Timeline view of professional experience and education
- **Contact**: Contact form and social links

## Technologies Used

- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **PDF Generation**: @react-pdf/renderer
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
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

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### 1. Update Your Information

Edit `src/data/portfolio.ts` to customize all content:

- Personal information (name, title, contact details)
- Skills and proficiency levels
- Project details and links
- Work experience and achievements
- Education history

### 2. Customize Styling

- **Colors**: Update `tailwind.config.js` for custom color scheme
- **Fonts**: Modify `src/app/layout.tsx` for different fonts
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
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header with theme toggle
│   ├── Hero.tsx            # Hero section with introduction
│   ├── Skills.tsx          # Skills showcase with progress bars
│   ├── Projects.tsx        # Project portfolio grid
│   ├── Experience.tsx      # Experience timeline and education
│   ├── Contact.tsx         # Contact form and information
│   └── ResumeGenerator.tsx # PDF resume generation
└── data/
    └── portfolio.ts        # All portfolio data and types
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Other Platforms

The site works on any platform that supports Next.js:
- Netlify
- Railway  
- Digital Ocean App Platform
- AWS Amplify

## Performance Features

- **Turbopack**: Ultra-fast development builds
- **Image Optimization**: Automatic image optimization
- **Code Splitting**: Automatic code splitting for optimal loading
- **SEO**: Built-in SEO optimization

**Built with ❤️ using Next.js and TailwindCSS**
