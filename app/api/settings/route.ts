import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
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

    return NextResponse.json({
      keywords: user.settings?.keywords || [],
      autoReplyEnabled: user.settings?.autoReplyEnabled || false,
      aiTone: user.settings?.aiTone || 'professional',
      maxRepliesPerMonth: user.settings?.maxRepliesPerMonth || 50,
      notifications: user.settings?.notifications || { email: true, dashboard: true, push: false }
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const body = await request.json();
    const { keywords, autoReplyEnabled, aiTone, maxRepliesPerMonth, notifications } = body;

    const settings = await prisma.settings.upsert({
      where: { userId: user.id },
      update: {
        ...(keywords !== undefined && { keywords }),
        ...(autoReplyEnabled !== undefined && { autoReplyEnabled }),
        ...(aiTone !== undefined && { aiTone }),
        ...(maxRepliesPerMonth !== undefined && { maxRepliesPerMonth }),
        ...(notifications !== undefined && { notifications }),
        updatedAt: new Date()
      },
      create: {
        userId: user.id,
        keywords: keywords || [],
        autoReplyEnabled: autoReplyEnabled || false,
        aiTone: aiTone || 'professional',
        maxRepliesPerMonth: maxRepliesPerMonth || 50,
        notifications: notifications || { email: true, dashboard: true, push: false }
      }
    });

    return NextResponse.json({
      keywords: settings.keywords,
      autoReplyEnabled: settings.autoReplyEnabled,
      aiTone: settings.aiTone,
      maxRepliesPerMonth: settings.maxRepliesPerMonth,
      notifications: settings.notifications
    });
  } catch (error) {
    console.error('Settings PUT error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}