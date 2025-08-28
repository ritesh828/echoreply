import { prisma } from './prisma';
import { TwitterApiService } from './twitter-api';

export class KeywordTracker {
  private twitterService: TwitterApiService;

  constructor() {
    this.twitterService = new TwitterApiService();
  }

  async trackKeywordsForAllUsers() {
    try {
      const usersWithSettings = await prisma.user.findMany({
        include: {
          settings: true
        }
      });

      const results = [];

      for (const user of usersWithSettings) {
        if (!user.settings || user.settings.keywords.length === 0) {
          continue;
        }

        try {
          const tweets = await this.twitterService.searchTweetsByKeywords(
            user.id,
            user.settings.keywords
          );

          results.push({
            userId: user.id,
            username: user.username,
            keywords: user.settings.keywords,
            tweetsFound: tweets.length,
            success: true
          });
        } catch (error) {
          console.error(`Error tracking keywords for user ${user.id}:`, error);
          results.push({
            userId: user.id,
            username: user.username,
            keywords: user.settings.keywords,
            tweetsFound: 0,
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      return results;
    } catch (error) {
      console.error('Error in trackKeywordsForAllUsers:', error);
      throw error;
    }
  }

  async trackKeywordsForUser(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { settings: true }
      });

      if (!user || !user.settings || user.settings.keywords.length === 0) {
        return {
          userId,
          tweetsFound: 0,
          keywords: [],
          success: true,
          message: 'No keywords configured'
        };
      }

      const tweets = await this.twitterService.searchTweetsByKeywords(
        userId,
        user.settings.keywords
      );

      return {
        userId,
        tweetsFound: tweets.length,
        keywords: user.settings.keywords,
        success: true
      };
    } catch (error) {
      console.error(`Error tracking keywords for user ${userId}:`, error);
      return {
        userId,
        tweetsFound: 0,
        keywords: [],
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getTrackingStats(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { settings: true }
      });

      if (!user) {
        throw new Error('User not found');
      }

      const totalTweets = await prisma.tweet.count({
        where: { userId }
      });

      const recentTweets = await prisma.tweet.count({
        where: {
          userId,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
          }
        }
      });

      const keywords = user.settings?.keywords || [];

      return {
        totalKeywords: keywords.length,
        totalTweets,
        recentTweets,
        keywords
      };
    } catch (error) {
      console.error('Error getting tracking stats:', error);
      throw error;
    }
  }
}