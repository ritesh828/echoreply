import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Simple test endpoint to verify keyword tracking system
export async function GET() {
  try {
    // Test database connection
    const userCount = await prisma.user.count();
    const settingsCount = await prisma.settings.count();
    const tweetCount = await prisma.tweet.count();

    return NextResponse.json({
      success: true,
      message: "Keyword tracking system is operational",
      database: {
        users: userCount,
        settings: settingsCount,
        tweets: tweetCount
      },
      endpoints: [
        "/api/settings",
        "/api/keywords/search",
        "/api/keywords/stats",
        "/api/keywords/test"
      ],
      services: [
        "TwitterApiService",
        "KeywordTracker"
      ]
    });
  } catch (error) {
    console.error('Keyword tracking test error:', error);
    return NextResponse.json({
      success: false,
      error: 'System check failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}