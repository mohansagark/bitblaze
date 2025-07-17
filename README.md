# BitBlaze 🎮

A modern React-based portfolio and gaming application featuring interactive games, applications, and a sleek user interface with multiple themes.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue.svg)
![Material-UI](https://img.shields.io/badge/Material--UI-5.15.11-blue.svg)

## 🚀 Features

### 🎮 Interactive Games

- **Snakes and Ladders** - Classic board game implementation
- **Chess Board** - Interactive chess game interface
- **Rock Paper Scissors** - Play against computer with sound effects
- **Card Game** - 52-card deck game with circular layout

### 📱 Applications

- **WhatsApp Chat Interface** - Modern chat UI replica
- **Horoscope Match** - Compatibility checker application

### 🎨 UI/UX Features

- **Multiple Themes** - Light, Dark, Coral, and Vivid themes
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion powered animations
- **Sound Effects** - Interactive audio feedback
- **Confetti Effects** - Celebration animations
- **Parallax Scrolling** - Engaging visual effects
- **Typewriter Effects** - Dynamic text animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **State Management**: Redux Toolkit
- **Routing**: React Router DOM 6.22.2
- **UI Library**: Material-UI 5.15.11
- **Styling**:
  - Tailwind CSS
  - Sass/SCSS
  - Emotion (CSS-in-JS)
- **Animations**:
  - Framer Motion
  - Lottie React
- **Icons**: React Icons
- **Analytics**: Vercel Analytics & Speed Insights
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mohansagark/games.git
   cd bitblaze
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Available Scripts

### Development

```bash
npm start       # Start development server
npm run dev     # Alternative development command
```

### Production

```bash
npm run build   # Build for production
npm test        # Run test suite
```

### Advanced

```bash
npm run eject   # Eject from Create React App (one-way operation)
```

## 📁 Project Structure

```
bitblaze/
├── public/                 # Static assets
│   ├── audio/             # Sound effects (bell, button, error, etc.)
│   ├── images/            # Public images
│   └── index.html         # HTML template
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── common/        # Generic components (Button, Input, etc.)
│   │   └── Layout/        # Layout components (Header, Footer, etc.)
│   ├── pages/             # Route components
│   │   ├── Games/         # Game implementations
│   │   ├── Apps/          # Application features
│   │   └── common/        # Common pages (404, Error)
│   ├── themes/            # Theme system
│   │   ├── colors/        # Color schemes
│   │   └── modes/         # Theme variants
│   ├── redux/             # State management
│   ├── router/            # Navigation setup
│   ├── helpers/           # Utility functions
│   ├── data/              # Static data files
│   └── assets/            # Images, animations
└── docs/                  # Documentation files
```

## 🎮 Games Documentation

### Snakes and Ladders

- Classic board game with traditional rules
- Interactive dice rolling
- Animated piece movement
- Win condition detection

### Chess Board

- Interactive chess board interface
- Piece movement validation
- Turn-based gameplay

### Rock Paper Scissors

- Player vs Computer gameplay
- Sound effects for wins/losses
- Score tracking
- Animated choices display

### Card Game

- Full 52-card deck
- Circular card layout animation
- Card selection mechanics
- Shuffle algorithm implementation

## 🎨 Theme System

The application supports multiple themes:

- **Light Theme** - Clean, minimal design
- **Dark Theme** - Dark mode for reduced eye strain
- **Coral Theme** - Warm, coral-based color palette
- **Vivid Theme** - High contrast, vibrant colors

Each theme includes both light and dark variants, accessible through the theme settings panel.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```bash
REACT_APP_VERCEL_ANALYTICS_ID=your_analytics_id
```

### Theme Customization

Modify theme files in `src/themes/` to customize colors and styles.

### Audio Files

Place audio files in `public/audio/` and reference them in the audio hooks.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔄 Development Workflow

1. **Component Development**: Create reusable components in `src/components/`
2. **Page Creation**: Add new pages in `src/pages/` and update routing
3. **State Management**: Use Redux slices for complex state
4. **Styling**: Follow the existing theme system and use Tailwind classes
5. **Testing**: Write tests for new components and features

## 📱 Responsive Design

The application is built with mobile-first principles:

- Responsive breakpoints using Tailwind CSS
- Touch-friendly interactions
- Optimized performance for mobile devices
- Adaptive layouts for different screen sizes

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure build settings (automatically detected)
3. Deploy with zero configuration

### Manual Build

```bash
npm run build
# Deploy the 'build' folder to your hosting service
```

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Bundle Analysis**: Optimized chunk splitting
- **Lazy Loading**: Route-based code splitting
- **Asset Optimization**: Compressed images and audio

## 🐛 Troubleshooting

### Common Issues

1. **Build Errors**: Ensure all dependencies are installed

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Theme Not Loading**: Check if theme files are properly imported

3. **Audio Not Playing**: Verify audio files exist in `public/audio/`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mohansagar Killamsetty**

- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [@mohansagark](https://github.com/mohansagark)
- Location: Hyderabad, India

## 🙏 Acknowledgments

- Create React App for the initial boilerplate
- Material-UI for the component library
- Framer Motion for smooth animations
- All contributors and testers

---

**Version**: Beta 0.0.1  
**Last Updated**: July 2025

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
