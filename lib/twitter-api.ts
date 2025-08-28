import { prisma } from './prisma';

interface TwitterApiResponse {
  data?: Array<{
    id: string;
    text: string;
    author_id: string;
    created_at: string;
  }>;
  includes?: {
    users?: Array<{
      id: string;
      username: string;
      name: string;
    }>;
  };
  meta?: {
    newest_id?: string;
    oldest_id?: string;
    result_count: number;
  };
}

export class TwitterApiService {
  private baseUrl = 'https://api.twitter.com/2';
  
  private async getAccessToken(userId: string): Promise<string | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { accounts: true }
    });

    if (!user?.accounts?.length) return null;
    
    const twitterAccount = user.accounts.find(
      account => account.provider === 'twitter'
    );

    return twitterAccount?.access_token || null;
  }

  async searchTweetsByKeywords(userId: string, keywords: string[]): Promise<any[]> {
    const accessToken = await this.getAccessToken(userId);
    if (!accessToken) {
      throw new Error('Twitter access token not found');
    }

    const searchResults: any[] = [];

    for (const keyword of keywords) {
      try {
        const query = encodeURIComponent(keyword);
        const url = `${this.baseUrl}/tweets/search/recent?query=${query}&max_results=10&tweet.fields=created_at,author_id&user.fields=username,name&expansions=author_id`;
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error(`Twitter API error for keyword "${keyword}":`, response.status);
          continue;
        }

        const data: TwitterApiResponse = await response.json();
        
        if (data.data && data.includes?.users) {
          const userMap = new Map(
            data.includes.users.map(user => [user.id, user])
          );

          for (const tweet of data.data) {
            const author = userMap.get(tweet.author_id);
            if (author) {
              const tweetData = {
                tweetId: tweet.id,
                tweetText: tweet.text,
                authorUsername: author.username,
                authorDisplayName: author.name,
                matchedKeywords: [keyword],
                createdAt: new Date(tweet.created_at),
              };

              // Check if tweet already exists
              const existingTweet = await prisma.tweet.findUnique({
                where: { tweetId: tweet.id }
              });

              if (!existingTweet) {
                // Create new tweet record
                await prisma.tweet.create({
                  data: {
                    tweetId: tweet.id,
                    tweetText: tweet.text,
                    authorUsername: author.username,
                    authorDisplayName: author.name,
                    matchedKeywords: [keyword],
                    userId,
                    createdAt: new Date(tweet.created_at),
                  }
                });
                searchResults.push(tweetData);
              } else {
                // Update existing tweet with new keyword
                await prisma.tweet.update({
                  where: { tweetId: tweet.id },
                  data: {
                    matchedKeywords: {
                      push: keyword
                    }
                  }
                });
              }
            }
          }
        }
      } catch (error) {
        console.error(`Error searching tweets for keyword "${keyword}":`, error);
      }
    }

    return searchResults;
  }

  async getUserTweets(userId: string, limit: number = 50) {
    return await prisma.tweet.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        replies: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  async getTweetsByKeywords(userId: string, keywords: string[]) {
    return await prisma.tweet.findMany({
      where: {
        userId,
        matchedKeywords: {
          hasSome: keywords
        }
      },
      orderBy: { createdAt: 'desc' },
      include: {
        replies: {
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }
}