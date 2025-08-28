"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Search, Plus, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface KeywordManagerProps {
  initialKeywords?: string[]
  onKeywordsUpdate?: (keywords: string[]) => void
}

export function KeywordManager({ initialKeywords = [], onKeywordsUpdate }: KeywordManagerProps) {
  const [keywords, setKeywords] = useState<string[]>(initialKeywords)
  const [newKeyword, setNewKeyword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadKeywords()
  }, [])

  const loadKeywords = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setKeywords(data.keywords || [])
      }
    } catch (error) {
      console.error('Failed to load keywords:', error)
    }
  }

  const addKeyword = async () => {
    if (!newKeyword.trim()) return
    
    if (keywords.includes(newKeyword.trim())) {
      toast({
        title: "Keyword already exists",
        description: "This keyword is already in your list.",
        variant: "destructive",
      })
      return
    }

    const updatedKeywords = [...keywords, newKeyword.trim()]
    setKeywords(updatedKeywords)
    setNewKeyword("")
    
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords: updatedKeywords }),
      })

      if (response.ok) {
        toast({
          title: "Keyword added",
          description: `"${newKeyword}" has been added to your tracking list.`,
        })
        onKeywordsUpdate?.(updatedKeywords)
      } else {
        throw new Error('Failed to save keyword')
      }
    } catch (error) {
      console.error('Failed to add keyword:', error)
      setKeywords(keywords) // Revert on error
      toast({
        title: "Failed to add keyword",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const removeKeyword = async (keywordToRemove: string) => {
    const updatedKeywords = keywords.filter(k => k !== keywordToRemove)
    setKeywords(updatedKeywords)
    
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keywords: updatedKeywords }),
      })

      if (response.ok) {
        toast({
          title: "Keyword removed",
          description: `"${keywordToRemove}" has been removed from tracking.`,
        })
        onKeywordsUpdate?.(updatedKeywords)
      } else {
        throw new Error('Failed to remove keyword')
      }
    } catch (error) {
      console.error('Failed to remove keyword:', error)
      setKeywords([...keywords, keywordToRemove]) // Revert on error
      toast({
        title: "Failed to remove keyword",
        description: "Please try again.",
        variant: "destructive",
      })
    }
  }

  const searchKeywords = async () => {
    if (keywords.length === 0) {
      toast({
        title: "No keywords configured",
        description: "Please add some keywords to track first.",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch('/api/keywords/search', {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        setSearchResults(data.tweets || [])
        toast({
          title: "Search completed",
          description: `Found ${data.tweetsFound} new tweets matching your keywords.`,
        })
      } else {
        throw new Error('Search failed')
      }
    } catch (error) {
      console.error('Failed to search keywords:', error)
      toast({
        title: "Search failed",
        description: "Failed to search for tweets. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSearching(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addKeyword()
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Keyword Tracking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a keyword to track..."
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={addKeyword}
              disabled={!newKeyword.trim()}
              size="icon"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {keywords.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword) => (
                <Badge key={keyword} variant="secondary" className="text-sm">
                  {keyword}
                  <button
                    onClick={() => removeKeyword(keyword)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}

          <Button 
            onClick={searchKeywords}
            disabled={keywords.length === 0 || isSearching}
            className="w-full"
          >
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search for New Tweets
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Tweets Found ({searchResults.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {searchResults.map((tweet) => (
                <div key={tweet.tweetId} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">@{tweet.authorUsername}</p>
                      <p className="text-sm text-gray-600">{tweet.tweetText}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(tweet.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tweet.matchedKeywords.join(", ")}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}