# Netlify Deployment Guide

## Issue: Prisma Client Missing

The error "Cannot find module '.prisma/client/default'" occurs because the Prisma client is not being generated during the Netlify build process.

## Solution Steps

### 1. Package.json Updates ✅
The following changes have been made to your package.json:
- Updated `build` script to include Prisma generation: `"build": "prisma generate && next build"`
- Added `postinstall` script: `"postinstall": "prisma generate"`

### 2. Netlify Configuration ✅
Updated `netlify.toml` with proper build configuration:
- Set Node.js version to 20
- Added Prisma generation to build process
- Configured Next.js plugin

### 3. Environment Variables Setup

#### Required Environment Variables for Netlify:
1. **DATABASE_URL** - Your Neon Tech database connection string
2. **NEXTAUTH_URL** - Your Netlify domain (e.g., `https://your-app.netlify.app`)
3. **NEXTAUTH_SECRET** - Generate a secure random string
4. **TWITTER_CLIENT_ID** - Your Twitter API client ID
5. **TWITTER_CLIENT_SECRET** - Your Twitter API client secret

#### Optional Environment Variables:
- **OPENAI_API_KEY** - For AI reply generation
- **STRIPE_PUBLISHABLE_KEY** - For billing integration
- **STRIPE_SECRET_KEY** - For billing integration
- **STRIPE_WEBHOOK_SECRET** - For billing integration

### 4. Deployment Steps

#### Step 1: Set up Netlify Environment Variables
1. Go to your Netlify dashboard
2. Navigate to Site settings → Environment variables
3. Add all required environment variables from above

#### Step 2: Verify Database Connection
Ensure your Neon Tech database is accessible from Netlify's IP ranges. You may need to:
- Whitelist Netlify IP ranges in your Neon Tech settings
- Use connection pooling for better performance

#### Step 3: Deploy to Netlify
```bash
# Push changes to GitHub
git add .
git commit -m "Fix: Add Prisma client generation for Netlify deployment"
git push origin main
```

#### Step 4: Monitor Build
Check the Netlify deploy log to ensure:
- Prisma client is generated successfully
- Build completes without errors
- All environment variables are loaded

### 5. Troubleshooting Common Issues

#### Issue: "Cannot find module '@prisma/client'"
**Solution**: Ensure `@prisma/client` is in dependencies (already in your package.json)

#### Issue: "DATABASE_URL not found"
**Solution**: Double-check environment variables in Netlify dashboard

#### Issue: "Prisma schema not found"
**Solution**: Ensure `prisma/schema.prisma` is committed to GitHub

#### Issue: Build timeout
**Solution**: Consider using Netlify's build cache or optimizing your build process

### 6. Verification

After successful deployment:
1. Visit your Netlify URL
2. Check if the app loads correctly
3. Test database connection by visiting `/api/keywords/test`
4. Verify Twitter OAuth works with your Netlify domain

### 7. Additional Configuration

#### For Twitter OAuth:
- Update Twitter Developer Console with your Netlify URL as callback URL
- Ensure the callback URL format: `https://your-app.netlify.app/api/auth/callback/twitter`

#### For Production:
- Consider setting up a custom domain
- Enable HTTPS redirects
- Set up monitoring and error tracking

### Quick Commands for Local Testing
```bash
# Test the build process locally
npm run build

# Test Prisma generation
npm run db:generate

# Test with production build
npm run build && npm start
```

Your project should now deploy successfully to Netlify with Prisma client properly generated during the build process.