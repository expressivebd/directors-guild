"use client"

import type React from "react"

import { AdminLayout } from "@/components/admin/admin-layout"
import { useAdminAuth } from "@/lib/admin-auth"
import { UnauthorizedMessage } from "@/components/admin/unauthorized-message"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Edit, Trash2, MoreVertical, Search } from "lucide-react"
import { useState } from "react"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  status: "draft" | "published" | "archived"
  publishDate: string
  views: number
  featured: boolean
}

const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "Annual Film Festival 2024 Announces Winners",
    excerpt:
      "The Directors Guild's annual film festival concluded with remarkable achievements from emerging filmmakers.",
    content: "Full article content here...",
    author: "John Smith",
    category: "Events",
    status: "published",
    publishDate: "2024-01-20",
    views: 1250,
    featured: true,
  },
  {
    id: "2",
    title: "New Workshop Series: Advanced Cinematography",
    excerpt:
      "Join our comprehensive workshop series covering advanced cinematography techniques and industry best practices.",
    content: "Full article content here...",
    author: "Sarah Johnson",
    category: "Education",
    status: "published",
    publishDate: "2024-01-18",
    views: 890,
    featured: false,
  },
  {
    id: "3",
    title: "Industry Partnership with Major Studios",
    excerpt:
      "The Directors Guild announces new partnerships with leading film studios to provide more opportunities for members.",
    content: "Full article content here...",
    author: "Michael Chen",
    category: "Partnerships",
    status: "draft",
    publishDate: "2024-01-22",
    views: 0,
    featured: false,
  },
]

function NewsDetailsDialog({ article, onClose }: { article: NewsArticle; onClose: () => void }) {
  return (
    <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-white">Article Details</DialogTitle>
        <DialogDescription className="text-slate-400">Complete article information and content</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-300">Title</label>
            <p className="text-white font-medium">{article.title}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Author</label>
            <p className="text-white">{article.author}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Category</label>
            <Badge variant="outline" className="border-slate-600 text-slate-300">
              {article.category}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Status</label>
            <Badge
              className={
                article.status === "published"
                  ? "bg-green-600 text-white"
                  : article.status === "draft"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-600 text-white"
              }
            >
              {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
            </Badge>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Publish Date</label>
            <p className="text-white">{new Date(article.publishDate).toLocaleDateString()}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-300">Views</label>
            <p className="text-white">{article.views.toLocaleString()}</p>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">Excerpt</label>
          <p className="text-slate-200 mt-2">{article.excerpt}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-300">Content</label>
          <div className="mt-2 p-4 bg-slate-700 rounded-lg">
            <p className="text-slate-200">{article.content}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-600">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </DialogContent>
  )
}

function NewsForm({ article, onClose }: { article?: NewsArticle; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: article?.title || "",
    excerpt: article?.excerpt || "",
    content: article?.content || "",
    category: article?.category || "",
    status: article?.status || "draft",
    featured: article?.featured || false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving article:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title" className="text-slate-200">
            Article Title
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Enter article title"
            required
          />
        </div>

        <div>
          <Label htmlFor="excerpt" className="text-slate-200">
            Excerpt
          </Label>
          <Textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Brief description of the article"
            rows={3}
            required
          />
        </div>

        <div>
          <Label htmlFor="content" className="text-slate-200">
            Content
          </Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
            placeholder="Full article content"
            rows={8}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category" className="text-slate-200">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="Events" className="text-white hover:bg-slate-600">
                  Events
                </SelectItem>
                <SelectItem value="Education" className="text-white hover:bg-slate-600">
                  Education
                </SelectItem>
                <SelectItem value="Partnerships" className="text-white hover:bg-slate-600">
                  Partnerships
                </SelectItem>
                <SelectItem value="Industry News" className="text-white hover:bg-slate-600">
                  Industry News
                </SelectItem>
                <SelectItem value="Member Spotlight" className="text-white hover:bg-slate-600">
                  Member Spotlight
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="status" className="text-slate-200">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="draft" className="text-white hover:bg-slate-600">
                  Draft
                </SelectItem>
                <SelectItem value="published" className="text-white hover:bg-slate-600">
                  Published
                </SelectItem>
                <SelectItem value="archived" className="text-white hover:bg-slate-600">
                  Archived
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded border-slate-600 bg-slate-700 text-purple-600 focus:ring-purple-500"
          />
          <Label htmlFor="featured" className="text-slate-200">
            Featured Article
          </Label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-slate-600">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 hover:text-white"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-purple-500/25"
        >
          {article ? "Update Article" : "Create Article"}
        </Button>
      </div>
    </form>
  )
}

export default function NewsControl() {
  const { admin, hasPermission } = useAdminAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null)
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)

  if (!admin || !hasPermission("news.read")) {
    return (
      <AdminLayout>
        <UnauthorizedMessage
          message="You don't have permission to manage news"
          description="Contact your administrator to get the required permissions."
        />
      </AdminLayout>
    )
  }

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || article.status === statusFilter
    const matchesCategory = categoryFilter === "all" || article.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">News Control</h1>
            <p className="text-slate-400 text-sm md:text-base">
              Create, edit, and manage news articles and announcements
            </p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-purple-500/25">
                <Plus className="w-4 h-4 mr-2" />
                Create Article
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white">Create New Article</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Create a new news article or announcement for the Directors Guild.
                </DialogDescription>
              </DialogHeader>
              <NewsForm onClose={() => setIsCreateDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Total Articles</p>
                <p className="text-xl md:text-3xl font-bold text-white">{mockArticles.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Published</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockArticles.filter((a) => a.status === "published").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Draft Articles</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockArticles.filter((a) => a.status === "draft").length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 md:p-6">
              <div className="text-center">
                <p className="text-xs md:text-sm font-medium text-slate-400 mb-2">Total Views</p>
                <p className="text-xl md:text-3xl font-bold text-white">
                  {mockArticles.reduce((sum, a) => sum + a.views, 0).toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search articles by title, content, or author..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white hover:bg-slate-600">
                      All Status
                    </SelectItem>
                    <SelectItem value="published" className="text-white hover:bg-slate-600">
                      Published
                    </SelectItem>
                    <SelectItem value="draft" className="text-white hover:bg-slate-600">
                      Draft
                    </SelectItem>
                    <SelectItem value="archived" className="text-white hover:bg-slate-600">
                      Archived
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-40 bg-slate-700 border-slate-600 text-white focus:border-purple-500">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all" className="text-white hover:bg-slate-600">
                      All Categories
                    </SelectItem>
                    <SelectItem value="Events" className="text-white hover:bg-slate-600">
                      Events
                    </SelectItem>
                    <SelectItem value="Education" className="text-white hover:bg-slate-600">
                      Education
                    </SelectItem>
                    <SelectItem value="Partnerships" className="text-white hover:bg-slate-600">
                      Partnerships
                    </SelectItem>
                    <SelectItem value="Industry News" className="text-white hover:bg-slate-600">
                      Industry News
                    </SelectItem>
                    <SelectItem value="Member Spotlight" className="text-white hover:bg-slate-600">
                      Member Spotlight
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 md:p-6">
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white truncate">{article.title}</h3>
                    <p className="text-sm text-slate-400 truncate">{article.author}</p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <div className="overflow-x-auto">
                      <div className="flex items-center space-x-2 min-w-max">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedArticle(article)}
                              className="bg-slate-600 border-slate-500 text-slate-200 hover:bg-slate-500 whitespace-nowrap"
                            >
                              View Details
                            </Button>
                          </DialogTrigger>
                          {selectedArticle && (
                            <NewsDetailsDialog article={selectedArticle} onClose={() => setSelectedArticle(null)} />
                          )}
                        </Dialog>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-slate-400 hover:text-white hover:bg-slate-600"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-700 border-slate-600" align="end">
                            <DropdownMenuItem
                              className="text-slate-200 hover:bg-slate-600 cursor-pointer"
                              onClick={() => setEditingArticle(article)}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Article
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-slate-600 cursor-pointer">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Article
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-400">No articles found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={!!editingArticle} onOpenChange={() => setEditingArticle(null)}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-white">Edit Article</DialogTitle>
              <DialogDescription className="text-slate-400">
                Make changes to the article details and content.
              </DialogDescription>
            </DialogHeader>
            {editingArticle && <NewsForm article={editingArticle} onClose={() => setEditingArticle(null)} />}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  )
}
