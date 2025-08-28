import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { KeywordTracker } from '@/lib/keyword-tracker';

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

    const keywordTracker = new KeywordTracker();
    const stats = await keywordTracker.getTrackingStats(user.id);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Keyword stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// This endpoint can be called by a cron job for automated tracking
export async function POST(request: NextRequest) {
  try {
    // In a production environment, you would add authentication here
    // For now, we'll allow this to be called for demonstration purposes
    
    const { userId } = await request.json();
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const keywordTracker = new KeywordTracker();
    const result = await keywordTracker.trackKeywordsForUser(userId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Automated tracking error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}