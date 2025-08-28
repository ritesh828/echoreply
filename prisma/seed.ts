import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create test users
  const user1 = await prisma.user.upsert({
    where: { twitterId: 'test_user_1' },
    update: {},
    create: {
      twitterId: 'test_user_1',
      username: 'testuser1',
      displayName: 'Test User 1',
      email: 'test1@example.com',
      planType: 'free',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { twitterId: 'test_user_2' },
    update: {},
    create: {
      twitterId: 'test_user_2',
      username: 'testuser2',
      displayName: 'Test User 2',
      email: 'test2@example.com',
      planType: 'pro',
    },
  })

  // Create settings for users
  await prisma.settings.upsert({
    where: { userId: user1.id },
    update: {},
    create: {
      userId: user1.id,
      keywords: ['#AI', '#SaaS', '#startup'],
      autoReplyEnabled: true,
      aiTone: 'professional',
      maxRepliesPerMonth: 50,
    },
  })

  await prisma.settings.upsert({
    where: { userId: user2.id },
    update: {},
    create: {
      userId: user2.id,
      keywords: ['#marketing', '#growth', '#business'],
      autoReplyEnabled: true,
      aiTone: 'casual',
      maxRepliesPerMonth: 500,
    },
  })

  // Create sample tweets
  const tweet1 = await prisma.tweet.create({
    data: {
      tweetId: '1234567890',
      userId: user1.id,
      tweetText: 'Just launched my new AI SaaS product! Excited to share it with the world 🚀',
      authorUsername: 'randomuser',
      authorDisplayName: 'Random User',
      matchedKeywords: ['#AI', '#SaaS'],
    },
  })

  const tweet2 = await prisma.tweet.create({
    data: {
      tweetId: '0987654321',
      userId: user2.id,
      tweetText: 'Looking for the best marketing tools for my startup. Any recommendations?',
      authorUsername: 'anotheruser',
      authorDisplayName: 'Another User',
      matchedKeywords: ['#marketing', '#startup'],
    },
  })

  // Create sample replies
  await prisma.reply.create({
    data: {
      tweetId: tweet1.id,
      userId: user1.id,
      replyText: 'Congratulations on your launch! AI SaaS is definitely the future. Would love to learn more about your product.',
      status: 'posted',
    },
  })

  await prisma.reply.create({
    data: {
      tweetId: tweet2.id,
      userId: user2.id,
      replyText: 'Hey! I\'d recommend checking out some AI-powered marketing tools. They can really help scale your efforts efficiently.',
      status: 'draft',
    },
  })

  // Create usage tracking
  const currentMonthYear = new Date().toISOString().slice(0, 7) // YYYY-MM format

  await prisma.usageTracking.upsert({
    where: {
      userId_monthYear: {
        userId: user1.id,
        monthYear: currentMonthYear,
      },
    },
    update: {},
    create: {
      userId: user1.id,
      monthYear: currentMonthYear,
      repliesSent: 5,
      keywordsTracked: 3,
    },
  })

  await prisma.usageTracking.upsert({
    where: {
      userId_monthYear: {
        userId: user2.id,
        monthYear: currentMonthYear,
      },
    },
    update: {},
    create: {
      userId: user2.id,
      monthYear: currentMonthYear,
      repliesSent: 25,
      keywordsTracked: 5,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log({
    users: [user1, user2],
    settings: 2,
    tweets: 2,
    replies: 2,
    usageTracking: 2,
  })
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })