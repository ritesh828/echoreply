"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  MessageCircle,
  Reply,
  Settings,
  Crown,
  Search,
  Filter,
  MoreHorizontal,
  Heart,
  Repeat2,
  Share,
  Clock,
  User,
  Twitter,
  Plus,
  X,
  Copy,
  Check,
  ChevronDown,
  LogOut,
} from "lucide-react"
import { signOut } from "next-auth/react"

interface User {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  twitterId?: string
  username?: string
  displayName?: string
  planType?: string
  settings?: any
}

interface DashboardClientProps {
  user: User
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState("mentions")
  const [isLoaded, setIsLoaded] = useState(false)
  const [typingReply, setTypingReply] = useState("")
  const [showTyping, setShowTyping] = useState(false)
  const [settings, setSettings] = useState({
    brandName: user.displayName || user.name || "EchoReply",
    productDescription:
      "AI-powered social media engagement tool that helps businesses turn conversations into conversions.",
    keywords: ["social media", "AI", "engagement", "Twitter", "customer service"],
    autoReplyMode: true,
    twitterConnected: true,
    aiStyle: "Professional",
    notifications: {
      email: true,
      dashboard: true,
      push: false,
    },
    apiKey: "sk-1234567890abcdef",
  })

  const [newKeyword, setNewKeyword] = useState("")
  const [keywordInputFocused, setKeywordInputFocused] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [apiKeyCopied, setApiKeyCopied] = useState(false)
  const [showAiStyleDropdown, setShowAiStyleDropdown] = useState(false)
  const [saveButtonPulsing, setSaveButtonPulsing] = useState(false)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)

  const handleSettingsChange = (field: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleNotificationChange = (type: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value,
      },
    }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !settings.keywords.includes(newKeyword.trim())) {
      setSettings((prev) => ({
        ...prev,
        keywords: [...prev.keywords, newKeyword.trim()],
      }))
      setNewKeyword("")
    }
  }

  const removeKeyword = (keyword: string) => {
    setSettings((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keyword),
    }))
  }

  const copyApiKey = () => {
    navigator.clipboard.writeText(settings.apiKey)
    setApiKeyCopied(true)
    setTimeout(() => setApiKeyCopied(false), 2000)
  }

  const saveSettings = () => {
    setSaveButtonPulsing(true)
    setTimeout(() => {
      setSaveButtonPulsing(false)
      setShowSaveSuccess(true)
      setTimeout(() => setShowSaveSuccess(false), 3000)
    }, 1000)
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const simulateTyping = (text: string) => {
    setShowTyping(true)
    setTypingReply("")
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setTypingReply((prev) => prev + text.charAt(i))
        i++
      } else {
        clearInterval(timer)
        setShowTyping(false)
      }
    }, 50)
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`w-64 bg-black text-white flex flex-col transition-transform duration-500 ease-out ${
          isLoaded ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white">
              <MessageCircle className="w-5 h-5 text-black" />
            </div>
            <span className="text-xl font-bold font-serif">EchoReply</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("mentions")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out group ${
                  activeTab === "mentions"
                    ? "bg-gray-800 text-white shadow-lg border-l-2 border-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <MessageCircle
                  className={`w-5 h-5 transition-all duration-300 ${
                    activeTab === "mentions" ? "scale-110" : "group-hover:scale-105"
                  }`}
                />
                <span
                  className={`font-medium transition-all duration-300 ${
                    activeTab === "mentions" ? "" : "group-hover:translate-x-1"
                  }`}
                >
                  Mentions
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("replies")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out group ${
                  activeTab === "replies"
                    ? "bg-gray-800 text-white shadow-lg border-l-2 border-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Reply
                  className={`w-5 h-5 transition-all duration-300 ${
                    activeTab === "replies" ? "scale-110" : "group-hover:scale-105"
                  }`}
                />
                <span
                  className={`font-medium transition-all duration-300 ${
                    activeTab === "replies" ? "" : "group-hover:translate-x-1"
                  }`}
                >
                  Replies
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out group ${
                  activeTab === "settings"
                    ? "bg-gray-800 text-white shadow-lg border-l-2 border-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Settings
                  className={`w-5 h-5 transition-all duration-300 ${
                    activeTab === "settings" ? "scale-110" : "group-hover:scale-105"
                  }`}
                />
                <span
                  className={`font-medium transition-all duration-300 ${
                    activeTab === "settings" ? "" : "group-hover:translate-x-1"
                  }`}
                >
                  Settings
                </span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("upgrade")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ease-in-out group ${
                  activeTab === "upgrade"
                    ? "bg-gray-800 text-white shadow-lg border-l-2 border-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Crown
                  className={`w-5 h-5 transition-all duration-300 ${
                    activeTab === "upgrade" ? "scale-110" : "group-hover:scale-105"
                  }`}
                />
                <span
                  className={`font-medium transition-all duration-300 ${
                    activeTab === "upgrade" ? "" : "group-hover:translate-x-1"
                  }`}
                >
                  Upgrade Plan
                </span>
              </button>
            </li>
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name || "User"}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">{user.name || "User"}</p>
              <p className="text-xs text-gray-400">@{user.username || "user"}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="text-gray-400 hover:text-white transition-colors"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className={`transition-all duration-500 ease-out ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <h1 className="text-2xl font-bold text-black">
                {activeTab === "mentions" && "Mentions"}
                {activeTab === "replies" && "Replies"}
                {activeTab === "settings" && "Settings"}
                {activeTab === "upgrade" && "Upgrade Plan"}
              </h1>
              <p className="text-gray-600">
                {activeTab === "mentions" && "Monitor and respond to conversations about your brand"}
                {activeTab === "replies" && "View your AI-generated replies and their performance"}
                {activeTab === "settings" && "Configure your EchoReply preferences"}
                {activeTab === "upgrade" && "Unlock premium features and higher limits"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-gray-300 bg-transparent text-black">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300 bg-transparent text-black">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div
          className={`p-6 transition-all duration-500 ease-out ${
            isLoaded ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
          }`}
        >
          {activeTab === "mentions" && (
            <div className="space-y-4">
              {/* Mention Card */}
              <Card
                className={`border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out ${
                  isLoaded ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">SM</span>
                      </div>
                      <div>
                        <p className="font-medium text-black">Sarah Miller</p>
                        <p className="text-sm text-gray-500">@sarahmiller • 2h ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="mb-4 text-black">
                    Looking for a good social media management tool. Any recommendations? Need something that can help
                    with Twitter engagement.
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">12</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                        <Repeat2 className="w-4 h-4" />
                        <span className="text-sm">3</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                    <Button
                      size="sm"
                      className="bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                      onClick={() =>
                        simulateTyping(
                          "Hi Sarah! 👋 I'd recommend checking out EchoReply - it's an AI-powered tool that helps monitor Twitter keywords and generates smart replies automatically. Perfect for engagement!",
                        )
                      }
                    >
                      Reply with AI
                    </Button>
                  </div>
                  {showTyping && (
                    <div className="mt-4 p-3 bg-black rounded-lg text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <span className="text-xs font-medium text-black">AI</span>
                        </div>
                        <span className="text-sm font-medium">Generating reply...</span>
                      </div>
                      <p className="text-sm">
                        {typingReply}
                        <span className="animate-pulse">|</span>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Another Mention Card */}
              <Card
                className={`border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out ${
                  isLoaded ? "animate-fade-in-up" : ""
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">MJ</span>
                      </div>
                      <div>
                        <p className="font-medium text-black">Mike Johnson</p>
                        <p className="text-sm text-gray-500">@mikej • 4h ago</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="mb-4 text-black">
                    Just tried a new AI tool for social media replies. Game changer! Anyone else using AI for customer
                    engagement?
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">8</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                        <Repeat2 className="w-4 h-4" />
                        <span className="text-sm">2</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                        <Share className="w-4 h-4" />
                      </button>
                    </div>
                    <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                      Reply with AI
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Empty State for More Content */}
              <Card
                className={`border border-gray-200 rounded-xl shadow-sm ${isLoaded ? "animate-fade-in-up" : ""}`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">All caught up!</h3>
                  <p className="text-gray-400">
                    No new mentions to review. We'll notify you when new conversations appear.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "replies" && (
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <Card
                  key={index}
                  className={`border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out ${
                    isLoaded ? "animate-fade-in-up" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Replied {index === 1 ? "3 hours ago" : index === 2 ? "1 day ago" : "2 days ago"}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    {/* Original Tweet */}
                    <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-gray-300">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-xs font-medium text-black">SM</span>
                        </div>
                        <div>
                          <p className="font-medium text-black text-sm">Sarah Miller</p>
                          <p className="text-xs text-gray-500">@sarahmiller</p>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">
                        Looking for a good social media management tool. Any recommendations? Need something that can
                        help with Twitter engagement.
                      </p>
                    </div>

                    {/* Your Reply */}
                    <div className="bg-black rounded-lg p-4 text-white">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                          <span className="text-xs font-medium text-black">JD</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{user.name || "User"}</p>
                          <p className="text-xs text-gray-300">@{user.username || "user"}</p>
                        </div>
                      </div>
                      <p className="text-sm">
                        {index === 1
                          ? "Hi Sarah! 👋 I'd recommend checking out EchoReply - it's an AI-powered tool that helps monitor Twitter keywords and generates smart replies automatically. Perfect for engagement!"
                          : index === 2
                            ? "Absolutely agree, Mike! AI is revolutionizing customer engagement. We're seeing incredible results with automated yet personalized responses. The key is finding the right balance between automation and authentic human touch. 🚀"
                            : "Great question, Alex! Focus on providing value first - share insights, answer questions, and engage authentically. Monitor relevant keywords to join conversations naturally. Consistency and genuine interest in helping others goes a long way! 💪"}
                      </p>
                    </div>

                    {/* Reply Stats */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-6 text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span className="text-sm">
                            {index === 1 ? "5 likes" : index === 2 ? "12 likes" : "8 likes"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Repeat2 className="w-4 h-4" />
                          <span className="text-sm">
                            {index === 1 ? "2 retweets" : index === 2 ? "4 retweets" : "1 retweet"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Reply className="w-4 h-4" />
                          <span className="text-sm">
                            {index === 1 ? "1 reply" : index === 2 ? "3 replies" : "2 replies"}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-green-600 font-medium">
                        ✓ {index === 1 ? "Successful engagement" : index === 2 ? "High engagement" : "Helpful response"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-4xl space-y-6">
              <Card
                className={`border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-out ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader>
                  <h2 className="text-xl font-semibold text-black flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>Profile & Account</span>
                  </h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || "User"}
                        className="w-16 h-16 rounded-full"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
                        <span className="text-lg font-medium text-white">
                          {(user.name || "U").charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-black">{user.name || "User"}</h3>
                      <p className="text-gray-400">{user.email || "No email"}</p>
                      <p className="text-sm text-gray-400">Plan: {user.planType || "Free"}</p>
                    </div>
                    <Button
                      variant={settings.twitterConnected ? "outline" : "default"}
                      className={`transition-all duration-300 ${
                        settings.twitterConnected
                          ? "border-red-500 text-red-500 hover:bg-red-50"
                          : "bg-blue-500 hover:bg-blue-600 text-white"
                      }`}
                      onClick={() => handleSettingsChange("twitterConnected", !settings.twitterConnected)}
                    >
                      <Twitter className="w-4 h-4 mr-2" />
                      {settings.twitterConnected ? "Disconnect Twitter" : "Connect Twitter"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-out ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ animationDelay: "0.2s" }}
              >
                <CardHeader>
                  <h2 className="text-xl font-semibold text-black">Keyword Management</h2>
                  <p className="text-gray-400">Monitor these keywords across Twitter to find relevant conversations.</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      onFocus={() => setKeywordInputFocused(true)}
                      onBlur={() => setKeywordInputFocused(false)}
                      onKeyPress={(e) => e.key === "Enter" && addKeyword()}
                      placeholder="Add new keyword..."
                      className={`border-black bg-white text-black transition-all duration-300 ${
                        keywordInputFocused ? "ring-2 ring-black/20 scale-105" : ""
                      }`}
                    />
                    <Button
                      onClick={addKeyword}
                      className="bg-black text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {settings.keywords.map((keyword, index) => (
                      <div
                        key={keyword}
                        className={`inline-flex items-center space-x-2 bg-black text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 animate-bounce-in`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span>{keyword}</span>
                        <button
                          onClick={() => removeKeyword(keyword)}
                          className="hover:bg-white/20 rounded-full p-0.5 transition-all duration-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-out ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ animationDelay: "0.3s" }}
              >
                <CardHeader>
                  <h2 className="text-xl font-semibold text-black">Auto-Reply Settings</h2>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <Label className="text-sm font-medium text-black">Auto-reply Mode</Label>
                      <p className="text-xs text-gray-400">Automatically generate replies to relevant mentions</p>
                    </div>
                    <Switch
                      checked={settings.autoReplyMode}
                      onCheckedChange={(checked) => handleSettingsChange("autoReplyMode", checked)}
                      className={`data-[state=checked]:bg-black transition-all duration-500 ${
                        settings.autoReplyMode ? "translate-x-1" : "-translate-x-1"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-black">AI Reply Style</Label>
                    <div className="relative">
                      <Button
                        variant="outline"
                        onClick={() => setShowAiStyleDropdown(!showAiStyleDropdown)}
                        className={`w-full justify-between border-black bg-white text-black transition-all duration-300 ${
                          showAiStyleDropdown ? "ring-2 ring-black/20" : ""
                        }`}
                      >
                        {settings.aiStyle}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${showAiStyleDropdown ? "rotate-180" : ""}`}
                        />
                      </Button>
                      {showAiStyleDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-black rounded-lg shadow-lg z-10 animate-fade-in">
                          {["Professional", "Friendly", "Sarcastic", "Custom"].map((style) => (
                            <button
                              key={style}
                              onClick={() => {
                                handleSettingsChange("aiStyle", style)
                                setShowAiStyleDropdown(false)
                              }}
                              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                            >
                              {style}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card
                className={`border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-out ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ animationDelay: "0.4s" }}
              >
                <CardHeader>
                  <h2 className="text-xl font-semibold text-black">Notification Preferences</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(settings.notifications).map(([type, enabled]) => (
                    <div key={type} className="flex items-center space-x-3">
                      <Checkbox
                        id={type}
                        checked={enabled}
                        onCheckedChange={(checked) => handleNotificationChange(type, checked as boolean)}
                        className="data-[state=checked]:bg-black data-[state=checked]:border-black"
                      />
                      <Label htmlFor={type} className="text-sm font-medium text-black capitalize">
                        {type === "push"
                          ? "Push Notifications"
                          : `${type.charAt(0).toUpperCase() + type.slice(1)} Notifications`}
                      </Label>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card
                className={`border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-500 ease-out ${
                  isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ animationDelay: "0.5s" }}
              >
                <CardHeader>
                  <h2 className="text-xl font-semibold text-black">API & Integration</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-black">API Key</Label>
                    <div className="flex space-x-2">
                      <Input
                        value={showApiKey ? settings.apiKey : "••••••••••••••••"}
                        readOnly
                        className="border-black bg-white text-black font-mono"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="border-black text-black hover:bg-gray-100"
                      >
                        {showApiKey ? "Hide" : "Show"}
                      </Button>
                      <Button
                        onClick={copyApiKey}
                        className={`bg-black text-white hover:bg-gray-800 transition-all duration-300 ${
                          apiKeyCopied ? "bg-green-600 hover:bg-green-700" : ""
                        }`}
                      >
                        {apiKeyCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "upgrade" && (
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="border border-gray-200 rounded-xl shadow-sm">
                <CardContent className="p-8 text-center">
                  <Crown className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-black mb-2">Upgrade Plan</h3>
                  <p className="text-gray-400 mb-6">Unlock premium features and higher limits with our Pro plan.</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="border border-gray-200">
                      <CardHeader>
                        <h4 className="text-lg font-semibold">Free Plan</h4>
                        <p className="text-2xl font-bold">$0/month</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• 100 replies/month</li>
                          <li>• Basic keyword tracking</li>
                          <li>• Standard AI responses</li>
                          <li>• Email support</li>
                        </ul>
                      </CardContent>
                    </Card>
                    <Card className="border border-black bg-black text-white">
                      <CardHeader>
                        <h4 className="text-lg font-semibold">Pro Plan</h4>
                        <p className="text-2xl font-bold">$29/month</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li>• 1,000 replies/month</li>
                          <li>• Advanced keyword tracking</li>
                          <li>• Premium AI responses</li>
                          <li>• Priority support</li>
                          <li>• Custom AI training</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {activeTab === "settings" && (
        <div className="fixed bottom-6 right-6">
          <Button
            onClick={saveSettings}
            className={`bg-black text-white hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl ${
              saveButtonPulsing ? "animate-pulse scale-110" : "hover:scale-105"
            }`}
          >
            {showSaveSuccess ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Saved Successfully
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      )}

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}