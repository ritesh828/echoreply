# Neon Tech Database Setup Guide

## Overview
This guide will help you set up a Neon Tech PostgreSQL database for the EchoReply SaaS application.

## Prerequisites
- Neon Tech account (https://neon.tech)
- Node.js and npm installed
- Basic understanding of PostgreSQL

## Step 1: Create Neon Tech Database

### 1.1 Sign Up for Neon Tech
1. Go to https://neon.tech and sign up for a free account
2. Create a new project named `echoreply-saas`
3. Choose the region closest to your users

### 1.2 Create Database
1. In your Neon dashboard, create a new database named `echoreply`
2. Navigate to the database settings
3. Copy the connection string (it will look like):
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-1.aws.neon.tech/echoreply?sslmode=require
   ```

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the `DATABASE_URL` in `.env` with your Neon connection string:
   ```bash
   DATABASE_URL="postgresql://your-username:your-password@ep-xxx-xxx.region.aws.neon.tech/echoreply?sslmode=require"
   ```

## Step 3: Database Migration

### 3.1 Generate Prisma Client
```bash
npx prisma generate
```

### 3.2 Create Database Tables
```bash
npx prisma db push
```

### 3.3 Verify Database Schema
```bash
npx prisma studio
```
This will open Prisma Studio at http://localhost:5555 where you can verify your tables.

## Step 4: Test Database Connection

Create a test file to verify the connection:

```typescript
// test-connection.ts
import { prisma } from './lib/prisma'

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully')
    
    // Test creating a user
    const user = await prisma.user.create({
      data: {
        twitterId: 'test123',
        username: 'testuser',
        displayName: 'Test User',
        email: 'test@example.com',
        planType: 'free'
      }
    })
    
    console.log('✅ User created:', user)
    
    // Clean up
    await prisma.user.delete({
      where: { id: user.id }
    })
    
    console.log('✅ Test completed successfully')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
```

Run the test:
```bash
npx tsx test-connection.ts
```

## Step 5: Database Schema Overview

### Tables Created:
- **users**: User accounts and profile information
- **settings**: User preferences and configuration
- **tweets**: Monitored tweets with keyword matches
- **replies**: Generated replies and their status
- **usage_tracking**: Monthly usage counters for billing

### Relationships:
- User → Settings (1:1)
- User → Tweets (1:N)
- User → Replies (1:N)
- Tweet → Replies (1:N)
- User → UsageTracking (1:N)

## Step 6: Production Considerations

### Security
- Use connection pooling for production
- Enable SSL/TLS encryption
- Use environment variables for sensitive data
- Implement proper access controls

### Performance
- Add database indexes for frequently queried columns
- Use read replicas for analytics queries
- Implement connection pooling
- Monitor query performance

### Backup
- Neon provides automatic backups
- Set up additional manual backups for critical data
- Test restore procedures regularly

## Troubleshooting

### Common Issues

1. **Connection Timeouts**
   - Check firewall settings
   - Verify connection string format
   - Ensure SSL mode is set to 'require'

2. **Permission Errors**
   - Verify database user permissions
   - Check if the database exists
   - Ensure the connection string is correct

3. **Schema Migrations**
   - Use `npx prisma migrate dev` for development
   - Use `npx prisma migrate deploy` for production

### Getting Help
- Check Neon Tech documentation: https://neon.tech/docs
- Prisma documentation: https://prisma.io/docs
- Check your Neon dashboard for connection details

## Next Steps

Once the database is set up, proceed with:
1. Setting up NextAuth.js for Twitter OAuth
2. Creating API endpoints for user management
3. Implementing the keyword tracking system
4. Building the AI reply generator service