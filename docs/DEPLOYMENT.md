# Deployment Guide

This guide covers deployment strategies, environment configuration, and maintenance procedures for the BitBlaze application.

## Deployment Overview

BitBlaze is a client-side React application that can be deployed to various hosting platforms. The application is optimized for static hosting with CDN distribution.

## Build Process

### Production Build

```bash
# Create optimized production build
npm run build

# The build folder contains:
build/
├── static/
│   ├── css/           # Minified CSS files
│   ├── js/            # Minified JavaScript bundles
│   └── media/         # Optimized images and assets
├── index.html         # Main HTML file
└── manifest.json      # PWA manifest
```

### Build Optimization Features

- **Code Splitting**: Automatic route-based code splitting
- **Tree Shaking**: Unused code elimination
- **Asset Optimization**: Image compression and optimization
- **CSS Minification**: Compressed CSS files
- **Bundle Analysis**: Generated source maps for debugging

### Environment Configuration

#### Environment Variables

Create environment-specific `.env` files:

```bash
# .env.local (development)
REACT_APP_ENV=development
REACT_APP_DEBUG=true
REACT_APP_API_URL=http://localhost:3001

# .env.production
REACT_APP_ENV=production
REACT_APP_DEBUG=false
REACT_APP_API_URL=https://api.bitblaze.com
REACT_APP_VERCEL_ANALYTICS_ID=your_analytics_id
```

#### Build Scripts

```json
{
  "scripts": {
    "build": "react-scripts build",
    "build:staging": "REACT_APP_ENV=staging react-scripts build",
    "build:production": "REACT_APP_ENV=production react-scripts build",
    "analyze": "npm run build && npx source-map-explorer 'build/static/js/*.js'"
  }
}
```

## Deployment Platforms

### 1. Vercel (Recommended)

Vercel provides seamless deployment with built-in optimizations.

#### Automatic Deployment

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login and link project
   vercel login
   vercel link
   ```

2. **Configuration File**
   Create `vercel.json`:

   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "build"
         }
       }
     ],
     "routes": [
       {
         "src": "/static/(.*)",
         "headers": {
           "cache-control": "public, max-age=31536000, immutable"
         }
       },
       {
         "src": "/(.*)",
         "dest": "/index.html"
       }
     ],
     "env": {
       "REACT_APP_VERCEL_ANALYTICS_ID": "@vercel_analytics_id"
     }
   }
   ```

3. **Deploy**

   ```bash
   # Deploy to preview
   vercel

   # Deploy to production
   vercel --prod
   ```

#### Vercel Features

- **Automatic HTTPS**: SSL certificates automatically provisioned
- **Global CDN**: Edge caching worldwide
- **Analytics**: Built-in performance monitoring
- **Preview Deployments**: Every PR gets a preview URL

### 2. Netlify

Alternative static hosting with similar features.

#### Netlify Configuration

Create `netlify.toml`:

```toml
[build]
  publish = "build"
  command = "npm run build"

[build.environment]
  REACT_APP_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/static/*"
  [headers.values]
    cache-control = "public, max-age=31536000, immutable"
```

#### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify deploy --prod --dir=build
```

### 3. GitHub Pages

Free hosting option for open-source projects.

#### GitHub Pages Setup

1. **Install gh-pages**

   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add Deploy Script**

   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://mohansagark.github.io/games"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

### 4. AWS S3 + CloudFront

Enterprise-grade hosting solution.

#### S3 Configuration

```bash
# Install AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://bitblaze-app

# Enable static website hosting
aws s3 website s3://bitblaze-app \
  --index-document index.html \
  --error-document index.html

# Upload build files
aws s3 sync build/ s3://bitblaze-app --delete
```

#### CloudFront Distribution

```json
{
  "DistributionConfig": {
    "Origins": [
      {
        "Id": "S3-bitblaze-app",
        "DomainName": "bitblaze-app.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ],
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3-bitblaze-app",
      "ViewerProtocolPolicy": "redirect-to-https",
      "CachePolicyId": "4135ea2d-6df8-44a3-9df3-4b5a84be39ad"
    },
    "CustomErrorResponses": [
      {
        "ErrorCode": 404,
        "ResponseCode": 200,
        "ResponsePagePath": "/index.html"
      }
    ]
  }
}
```

## Custom Domain Configuration

### DNS Setup

```bash
# For Vercel
vercel domains add yourdomain.com

# DNS Records
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

### SSL Certificate

Most modern hosting platforms provide automatic SSL:

- **Vercel**: Automatic Let's Encrypt certificates
- **Netlify**: Automatic SSL for custom domains
- **CloudFront**: AWS Certificate Manager integration

## CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test -- --coverage --watchAll=false

      - name: Run linting
        run: npm run lint

      - name: Build application
        run: npm run build
        env:
          REACT_APP_ENV: production

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "18"
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build for production
        run: npm run build
        env:
          REACT_APP_ENV: production
          REACT_APP_VERCEL_ANALYTICS_ID: ${{ secrets.VERCEL_ANALYTICS_ID }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

### Environment Secrets

Configure secrets in GitHub repository settings:

- `VERCEL_TOKEN`: Vercel API token
- `ORG_ID`: Vercel organization ID
- `PROJECT_ID`: Vercel project ID
- `VERCEL_ANALYTICS_ID`: Analytics tracking ID

## Performance Optimization

### Build Optimization

```javascript
// webpack-bundle-analyzer for bundle analysis
npm install --save-dev webpack-bundle-analyzer

// Add to package.json
"scripts": {
  "analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"
}
```

### Caching Strategy

```javascript
// Service worker for caching (if PWA enabled)
const CACHE_NAME = "bitblaze-v1";
const urlsToCache = ["/", "/static/js/bundle.js", "/static/css/main.css"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});
```

### CDN Configuration

```javascript
// Configure public path for CDN
// In public/index.html
<link rel="preload" href="%PUBLIC_URL%/fonts/roboto.woff2" as="font" type="font/woff2" crossorigin>

// For external CDN
<script>
  window.__webpack_public_path__ = 'https://cdn.bitblaze.com/';
</script>
```

## Monitoring and Analytics

### Performance Monitoring

```javascript
// Web Vitals tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals";

function sendToAnalytics(metric) {
  // Send to analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Error Tracking

```javascript
// Error boundary with reporting
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to error reporting service
    console.error("Error caught by boundary:", error, errorInfo);

    if (process.env.NODE_ENV === "production") {
      // Send to error tracking service (e.g., Sentry)
    }
  }
}
```

### Analytics Configuration

```javascript
// Vercel Analytics
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <Router />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
```

## Security Considerations

### Content Security Policy

```html
<!-- In public/index.html -->
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://vercel.live; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data: https:; 
               font-src 'self' https://fonts.gstatic.com;"
/>
```

### Environment Variable Security

```javascript
// Never expose sensitive data
// ❌ Bad
const API_KEY = process.env.REACT_APP_SECRET_KEY; // Exposed in bundle

// ✅ Good - handle sensitive operations on backend
const PUBLIC_API_URL = process.env.REACT_APP_API_URL; // Safe to expose
```

## Maintenance and Updates

### Regular Maintenance Tasks

#### Weekly Tasks

- Monitor application performance
- Check for security vulnerabilities
- Review error logs
- Update dependencies (patch versions)

#### Monthly Tasks

- Update minor dependencies
- Performance audit
- Security audit
- Backup deployment configurations

#### Quarterly Tasks

- Major dependency updates
- Infrastructure review
- Cost optimization review
- Security penetration testing

### Dependency Management

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Security audit
npm audit
npm audit fix

# Check for vulnerabilities
npx audit-ci --config audit-ci.json
```

### Rollback Strategy

```bash
# Vercel rollback
vercel rollback [deployment-url]

# Git-based rollback
git revert HEAD
git push origin main

# Tagged releases for stable rollback points
git tag -a v1.0.1 -m "Release version 1.0.1"
git push origin v1.0.1
```

### Monitoring Checklist

- [ ] Application uptime (99.9% target)
- [ ] Page load times (<3 seconds)
- [ ] Error rates (<1%)
- [ ] Core Web Vitals scores
- [ ] Security certificate validity
- [ ] CDN cache hit rates
- [ ] Build pipeline success rates

## Troubleshooting Common Issues

### Build Failures

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for conflicting dependencies
npm ls

# Verify Node.js version compatibility
node --version
npm --version
```

### Deployment Issues

```bash
# Check environment variables
echo $REACT_APP_ENV

# Verify build output
ls -la build/

# Test local build
npm run build
npx serve -s build
```

### Performance Issues

```bash
# Analyze bundle size
npm run analyze

# Check for memory leaks
npm run build -- --analyze

# Performance profiling
lighthouse https://your-domain.com --view
```

This deployment guide ensures reliable, secure, and performant hosting of the BitBlaze application across various platforms.
