# E-commerce Platform - Deployment Guide

## 📋 Table of Contents

- [Vercel Deployment (Client)](#vercel-deployment-client)
- [Railway Deployment (Server)](#railway-deployment-server)
- [Render Deployment (Server)](#render-deployment-server)
- [Docker Deployment](#docker-deployment)
- [Database Setup](#database-setup)

## 🚀 Vercel Deployment (Client)

### Prerequisites
- GitHub account
- Vercel account ([vercel.com](https://vercel.com))

### Steps

1. **Push your code to GitHub**
   \`\`\`bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   \`\`\`

2. **Connect to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Select the `client` directory as root

3. **Configure Build Settings**
   - Framework Preset: **Next.js**
   - Root Directory: **client**
   - Build Command: \`npm run build\`
   - Output Directory: \`.next\`

4. **Environment Variables**
   Add these in Vercel dashboard:
   \`\`\`env
   NEXT_PUBLIC_API_URL=https://your-server-url.com
   AUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   NODE_ENV=production
   \`\`\`

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at: \`your-project.vercel.app\`

### Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## 🚂 Railway Deployment (Server)

### Prerequisites
- GitHub account
- Railway account ([railway.app](https://railway.app))

### Steps

1. **Create New Project**
   - Go to [railway.app/new](https://railway.app/new)
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Configure Service**
   - Root Directory: **server**
   - Build Command: \`npm install && npm run build\`
   - Start Command: \`npm run start:prod\`

3. **Add PostgreSQL Database**
   - Click "New" > "Database" > "PostgreSQL"
   - Railway will automatically create \`DATABASE_URL\`

4. **Environment Variables**
   Add in Railway dashboard:
   \`\`\`env
   NODE_ENV=production
   APP_PORT=5000
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   JWT_ACCESS_SECRET=your-access-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   SERVER=https://your-server.up.railway.app
   CLIENT=https://your-client.vercel.app
   \`\`\`

5. **Generate Domain**
   - Click "Settings" > "Generate Domain"
   - Copy the URL for your client's \`NEXT_PUBLIC_API_URL\`

## 🎨 Render Deployment (Server)

### Prerequisites
- GitHub account
- Render account ([render.com](https://render.com))

### Steps

1. **Create New Web Service**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New" > "Web Service"
   - Connect your GitHub repository

2. **Configure Service**
   - Name: \`ecommerce-api\`
   - Root Directory: \`server\`
   - Environment: \`Node\`
   - Build Command: \`npm install && npm run build\`
   - Start Command: \`npm run start:prod\`

3. **Add PostgreSQL Database**
   - Click "New" > "PostgreSQL"
   - Copy the connection string

4. **Environment Variables**
   \`\`\`env
   NODE_ENV=production
   APP_PORT=5000
   DATABASE_URL=your-postgres-connection-string
   JWT_ACCESS_SECRET=your-access-secret
   JWT_REFRESH_SECRET=your-refresh-secret
   SERVER=https://your-service.onrender.com
   CLIENT=https://your-client.vercel.app
   \`\`\`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

## 🐳 Docker Deployment

### Using Docker Compose

1. **Update .env files**
   Update production values in both client and server

2. **Build and Run**
   \`\`\`bash
   # Production
   docker-compose up -d
   
   # Development
   docker-compose -f docker-compose.dev.yml up -d
   \`\`\`

3. **Check Status**
   \`\`\`bash
   docker-compose ps
   docker-compose logs -f
   \`\`\`

### Using Individual Dockerfiles

**Build Client:**
\`\`\`bash
cd client
docker build -t ecommerce-client .
docker run -p 3000:3000 ecommerce-client
\`\`\`

**Build Server:**
\`\`\`bash
cd server
docker build -t ecommerce-server .
docker run -p 5000:5000 ecommerce-server
\`\`\`

## 🗄️ Database Setup

### PostgreSQL on Railway

1. **Create Database**
   - In Railway dashboard, click "New" > "PostgreSQL"
   - Copy the \`DATABASE_URL\`

2. **Run Migrations**
   The TypeORM will auto-sync in development.
   For production, disable \`synchronize\` in \`app.module.ts\`:
   \`\`\`typescript
   TypeOrmModule.forRoot({
     synchronize: false, // Disable in production
   })
   \`\`\`

### PostgreSQL on Render

1. **Create Database**
   - Click "New" > "PostgreSQL"
   - Choose plan (Free tier available)

2. **Get Connection String**
   - Copy "Internal Database URL"
   - Use as \`DATABASE_URL\`

### Supabase (Alternative)

1. **Create Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project

2. **Get Connection String**
   - Go to Settings > Database
   - Copy "Connection string"
   - Format: \`postgresql://[user]:[password]@[host]:[port]/[database]\`

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change all secret keys
- [ ] Enable HTTPS
- [ ] Set proper CORS origins
- [ ] Enable rate limiting
- [ ] Add helmet for security headers
- [ ] Set \`NODE_ENV=production\`
- [ ] Disable TypeORM \`synchronize\`
- [ ] Set secure cookie settings
- [ ] Enable database SSL
- [ ] Add error logging service
- [ ] Set up monitoring
- [ ] Configure backups

## 🔧 Environment Variables Summary

### Client (.env.production)
\`\`\`env
NEXT_PUBLIC_API_URL=https://your-api-url.com
AUTH_SECRET=32-character-random-string
NEXTAUTH_URL=https://your-domain.com
NODE_ENV=production
\`\`\`

### Server (.env.production)
\`\`\`env
NODE_ENV=production
APP_PORT=5000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_ACCESS_SECRET=your-secret
JWT_REFRESH_SECRET=your-secret
SERVER=https://your-api-url.com
CLIENT=https://your-client-url.com
\`\`\`

## 📊 Monitoring

### Recommended Services

- **Logging**: [Sentry](https://sentry.io)
- **Monitoring**: [New Relic](https://newrelic.com)
- **Uptime**: [UptimeRobot](https://uptimerobot.com)
- **Analytics**: [Google Analytics](https://analytics.google.com)

## 🆘 Troubleshooting

### Build Fails
- Check Node.js version (18+)
- Verify all dependencies are installed
- Check build logs for errors

### Database Connection Issues
- Verify \`DATABASE_URL\` is correct
- Check if database allows external connections
- Ensure SSL is configured properly

### CORS Errors
- Update \`CLIENT\` in server .env
- Check CORS settings in \`main.ts\`

### 404 Errors
- Verify API routes are correct
- Check \`NEXT_PUBLIC_API_URL\`
- Ensure server is running

## 📚 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [NestJS Deployment Docs](https://docs.nestjs.com/faq/serverless)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)

---

Good luck with your deployment! 🚀
