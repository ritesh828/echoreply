import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { TwitterApiService } from '@/lib/twitter-api';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { settings: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const settings = user.settings;
    if (!settings || settings.keywords.length === 0) {
      return NextResponse.json({ 
        error: 'No keywords configured',
        tweetsFound: 0 
      }, { status: 400 });
    }

    const twitterService = new TwitterApiService();
    
    try {
      const tweets = await twitterService.searchTweetsByKeywords(
        user.id,
        settings.keywords
      );

      return NextResponse.json({
        success: true,
        tweetsFound: tweets.length,
        tweets: tweets
      });
    } catch (error: any) {
      console.error('Twitter API error:', error);
      return NextResponse.json({ 
        error: 'Failed to search tweets',
        details: error.message 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Keyword search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { settings: true }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const settings = user.settings;
    if (!settings) {
      return NextResponse.json({ tweets: [] });
    }

    const twitterService = new TwitterApiService();
    const tweets = await twitterService.getTweetsByKeywords(
      user.id,
      settings.keywords
    );

    return NextResponse.json({ tweets });
  } catch (error) {
    console.error('Get tweets error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}