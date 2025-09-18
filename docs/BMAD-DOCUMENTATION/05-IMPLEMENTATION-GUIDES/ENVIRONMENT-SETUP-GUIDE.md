# Environment Setup Guide
*SISO Unified Platform Development Environment*

## 🚀 Quick Start Setup (30 minutes)

### **Prerequisites Checklist**
- [ ] **Node.js 18+** - `node --version` should return v18.16.0 or higher
- [ ] **npm 8+** - `npm --version` should return 8.0.0 or higher  
- [ ] **Git** - Latest version with SSH keys configured
- [ ] **VS Code** - Recommended editor with extensions
- [ ] **Chrome/Edge** - For debugging and testing

### **Step 1: Repository Setup (5 minutes)**
```bash
# Clone the repository
git clone git@github.com:your-org/siso-unified-platform.git
cd siso-unified-platform

# Install dependencies
npm install

# Verify installation
npm run dev --check
```

### **Step 2: Supabase Configuration (10 minutes)**
```bash
# Install Supabase CLI
npm install -g @supabase/cli

# Login to Supabase
supabase login

# Initialize local development
supabase init

# Start local Supabase services
supabase start
```

**Expected Output:**
```
Started supabase local development setup.

         API URL: http://localhost:54321
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Step 3: Environment Variables (5 minutes)**
```bash
# Copy environment template
cp .env.example .env.local

# Edit with your Supabase credentials
nano .env.local
```

**Required Environment Variables:**
```bash
# .env.local
VITE_SUPABASE_URL=http://localhost:54321
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_APP_ENV=development
VITE_APP_VERSION=1.0.0
```

### **Step 4: Database Setup (5 minutes)**
```bash
# Apply initial database migrations
supabase db reset

# Seed with sample data
npm run db:seed

# Verify database setup
npm run db:verify
```

### **Step 5: Start Development Server (5 minutes)**
```bash
# Start the development server
npm run dev

# In a new terminal, start real-time services
npm run dev:realtime

# Verify everything is working
open http://localhost:3000
```

**Success Indicators:**
- ✅ Login page loads without errors
- ✅ Registration creates new user successfully  
- ✅ Real-time connection established (green indicator)
- ✅ Console shows no critical errors

---

## 🛠️ Detailed Development Setup

### **VS Code Configuration**
Install these essential extensions:
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode", 
    "ms-vscode.vscode-typescript-next",
    "supabase.supabase-vscode",
    "ms-vscode.vscode-json",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

**Workspace Settings (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["classnames\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### **Package Scripts Reference**
```json
{
  "scripts": {
    "dev": "vite --host",
    "dev:realtime": "node scripts/realtime-dev.js",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "db:reset": "supabase db reset",
    "db:seed": "supabase db seed",
    "db:verify": "node scripts/verify-db.js",
    "generate-types": "supabase gen types typescript --local > src/types/database.ts"
  }
}
```

### **Database Development Workflow**
```bash
# Create new migration
supabase migration new add_new_feature

# Edit migration file in supabase/migrations/
# Apply migration
supabase db reset

# Generate TypeScript types
npm run generate-types

# Test migration on staging
supabase db push --environment staging
```

---

## 🔧 Troubleshooting Common Issues

### **Issue: Supabase Connection Failed**
**Symptoms:** `Error: Invalid API URL or key`
**Solution:**
```bash
# Check if Supabase is running
supabase status

# If not running, start it
supabase start

# Verify environment variables match supabase status output
cat .env.local
```

### **Issue: Real-time Messages Not Working**
**Symptoms:** Messages send but don't appear for other users
**Solution:**
```bash
# Check real-time connection in browser console
# Should see: "REALTIME: Connected to wss://..."

# Verify RLS policies allow real-time subscriptions
supabase db logs

# Reset real-time service
supabase restart
```

### **Issue: Build Fails with TypeScript Errors**
**Symptoms:** `npm run build` fails with TS errors
**Solution:**
```bash
# Update TypeScript types from Supabase
npm run generate-types

# Check for type mismatches
npm run type-check

# Clear TypeScript cache
rm -rf node_modules/.cache
```

### **Issue: Hot Reload Not Working**
**Symptoms:** Changes don't reflect immediately
**Solution:**
```bash
# Check if using correct host setting
npm run dev -- --host 0.0.0.0

# Clear Vite cache
rm -rf node_modules/.vite

# Restart development server
npm run dev
```

---

## 🧪 Testing Environment Setup

### **Unit Testing with Vitest**
```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm run test:watch
```

### **E2E Testing with Playwright**
```bash
# Install Playwright
npm install -D @playwright/test

# Install browsers
npx playwright install

# Run E2E tests
npm run test:e2e

# Run tests in headed mode
npm run test:e2e:headed
```

### **Database Testing**
```bash
# Use test database for testing
SUPABASE_DB_URL=postgresql://postgres:postgres@localhost:54322/test_db

# Run test suite with clean database
npm run test:integration
```

---

## 📱 Mobile Development Setup

### **iOS Testing (macOS only)**
```bash
# Install iOS Simulator
xcode-select --install

# Start iOS simulator
open -a Simulator

# Test PWA on iOS
# Navigate to localhost:3000 in Safari
# Add to Home Screen
```

### **Android Testing**
```bash
# Install Android Studio
# Enable USB debugging on Android device
adb devices

# Test PWA on Android
# Navigate to localhost:3000 in Chrome
# Add to Home Screen
```

### **PWA Testing**
```bash
# Test service worker registration
npm run build
npm run preview

# Check PWA manifest
# Open DevTools > Application > Manifest
# Verify all icons and settings are correct
```

---

## 🚀 Production Environment Setup

### **Vercel Deployment**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to staging
vercel --prod=false

# Deploy to production
vercel --prod
```

### **Environment Variables for Production**
```bash
# Set production environment variables
vercel env add VITE_SUPABASE_URL production
vercel env add VITE_SUPABASE_ANON_KEY production
vercel env add VITE_APP_ENV production

# Verify environment variables
vercel env ls
```

### **Supabase Production Setup**
```bash
# Create production project
supabase projects create siso-unified-platform-prod

# Link to production project
supabase link --project-ref your-prod-ref

# Deploy database changes
supabase db push

# Configure production auth
# Enable OAuth providers in Supabase dashboard
# Set redirect URLs for production domain
```

---

## 📊 Development Monitoring

### **Performance Monitoring**
```typescript
// Add to main.tsx for development monitoring
if (import.meta.env.DEV) {
  // Log performance metrics
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      console.log(`${entry.name}: ${entry.duration}ms`);
    }
  }).observe({ entryTypes: ['measure', 'navigation'] });
}
```

### **Error Monitoring**
```typescript
// Error boundary for development
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});
```

### **Real-time Connection Monitoring**
```typescript
// Monitor Supabase connection status
supabase.realtime.channels[0].socket.onOpen = () => {
  console.log('✅ Real-time connected');
};

supabase.realtime.channels[0].socket.onClose = () => {
  console.log('❌ Real-time disconnected');
};
```

---

## ✅ Development Checklist

### **Daily Development Routine**
- [ ] Pull latest changes: `git pull origin main`
- [ ] Install new dependencies: `npm install`
- [ ] Update database: `supabase db reset`
- [ ] Start services: `npm run dev` & `npm run dev:realtime`
- [ ] Run type check: `npm run type-check`
- [ ] Run tests: `npm run test`

### **Before Committing**
- [ ] Lint code: `npm run lint:fix`
- [ ] Type check: `npm run type-check`
- [ ] Run tests: `npm run test`
- [ ] Build succeeds: `npm run build`
- [ ] Test on mobile: Check responsive design

### **Weekly Maintenance**
- [ ] Update dependencies: `npm update`
- [ ] Clear caches: `rm -rf node_modules/.cache`
- [ ] Backup database: `supabase db dump`
- [ ] Review performance: Check bundle size
- [ ] Update documentation: Keep guides current

---

*Environment Success = Consistent setup + automated testing + performance monitoring*