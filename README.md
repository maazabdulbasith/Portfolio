# Maaz Abdul Basith - Modern Portfolio

A stunning, modern portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Features a dark/light theme, smooth animations, and responsive design.

## ✨ Features

### 🎨 Modern Design
- **Dark/Light Theme Toggle** - Seamless theme switching with smooth transitions
- **Gradient Text Effects** - Beautiful gradient typography throughout
- **Glass Morphism** - Modern glass-like components with backdrop blur
- **Responsive Design** - Perfect on all devices and screen sizes
- **Smooth Animations** - Framer Motion powered animations and transitions

### 📱 Pages & Components
- **Hero Section** - Animated landing with gradient backgrounds
- **About Page** - Professional background and skills showcase
- **Projects Page** - GitHub API integration with filtering
- **Dashboard** - Analytics, stats, and progress tracking
- **Calendar** - Interactive scheduling and event management
- **FAQ** - Expandable questions with category filtering
- **Contact** - Modern form with validation and animations

### 🛠 Technical Stack
- **Next.js 14** - App Router with server-side rendering
- **TypeScript** - Full type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons
- **GitHub API** - Real-time project data integration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd MyPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
MyPortfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with theme context
│   ├── page.tsx           # Home page with hero section
│   ├── about/             # About page
│   ├── projects/          # Projects showcase
│   ├── dashboard/         # Analytics dashboard
│   ├── calendar/          # Interactive calendar
│   ├── faq/              # FAQ with filtering
│   ├── contact/           # Contact form
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   ├── ProjectCard.tsx    # Project display cards
│   ├── SkillsShowcase.tsx # Skills with progress bars
│   ├── ContactForm.tsx    # Contact form with validation
│   └── AnimatedSection.tsx # Animation wrapper
├── public/               # Static assets
└── tailwind.config.js    # Tailwind configuration
```

## 🎯 Key Components

### Navigation
- Responsive navigation with mobile menu
- Theme toggle functionality
- Smooth scroll navigation
- Active page highlighting

### ProjectCard
- Hover animations and effects
- Technology tags display
- GitHub and live link integration
- Featured project highlighting

### SkillsShowcase
- Animated progress bars
- Category-based organization
- Icon integration
- Responsive grid layout

### ContactForm
- Real-time validation
- Success/error states
- Loading animations
- Contact information display

## 🎨 Customization

### Colors & Themes
The portfolio uses a custom color palette defined in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
  },
  secondary: {
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
  },
  dark: {
    800: '#1f2937',
    900: '#111827',
  }
}
```

### Adding New Pages
1. Create a new directory in `app/`
2. Add a `page.tsx` file
3. Update navigation in `components/Navigation.tsx`

### Customizing Content
- Update personal information in respective page components
- Modify GitHub username in projects page for API integration
- Customize skills and experience in dashboard and about pages

## 📊 Performance Features

- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Lazy Loading** - Components load only when needed
- **SEO Optimized** - Meta tags and structured data
- **Accessibility** - ARIA labels and keyboard navigation

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
```

### Environment Variables

Create a `.env.local` file for environment variables:

```env
NEXT_PUBLIC_GITHUB_USERNAME=your-github-username
NEXT_PUBLIC_EMAIL=your-email@example.com
```

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Other Platforms
- **Netlify** - Configure build settings
- **AWS Amplify** - Connect repository and deploy
- **Docker** - Use provided docker-compose.yml

## 📱 Mobile Responsiveness

The portfolio is fully responsive with:
- Mobile-first design approach
- Touch-friendly interactions
- Optimized navigation for mobile
- Responsive typography and spacing

## 🎭 Animations

Built with Framer Motion for smooth animations:
- Page transitions
- Component entrance animations
- Hover effects
- Loading states
- Scroll-triggered animations

## 🔒 Security

- **Input Validation** - Form validation and sanitization
- **XSS Protection** - Content Security Policy
- **HTTPS** - Secure connections in production
- **API Rate Limiting** - GitHub API usage limits

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS
- **Framer Motion** - For smooth animations
- **Lucide** - For beautiful icons

---

**Built with ❤️ by Maaz Abdul Basith**

Connect with me:
- [GitHub](https://github.com/maazabdulbasith)
- [LinkedIn](https://linkedin.com/in/abdul-basith-maaz)
- [Email](mailto:maazabdulbasith@gmail.com) 