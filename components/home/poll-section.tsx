"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { BarChartIcon as ChartBarIcon, CheckCircle2, BarChart3 } from "lucide-react"

// Sample poll data - in a real app, this would come from an API
const pollData = {
  question: "What filmmaking topic would you like to see covered in our next workshop?",
  options: [
    { id: "1", text: "Advanced Camera Techniques", votes: 42 },
    { id: "2", text: "Directing Actors for Authentic Performances", votes: 78 },
    { id: "3", text: "Visual Storytelling and Composition", votes: 63 },
    { id: "4", text: "Post-Production Workflows", votes: 35 },
  ],
  totalVotes: 218, // Pre-existing votes
  endsAt: "2025-06-15",
}

export default function PollSection() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)
  const [results, setResults] = useState(pollData.options)
  const [totalVotes, setTotalVotes] = useState(pollData.totalVotes)
  const { toast } = useToast()

  const handleVote = () => {
    if (!selectedOption) return

    // Update the vote count for the selected option
    const updatedResults = results.map((option) => {
      if (option.id === selectedOption) {
        return { ...option, votes: option.votes + 1 }
      }
      return option
    })

    setResults(updatedResults)
    setTotalVotes(totalVotes + 1)
    setHasVoted(true)

    toast({
      title: "Vote submitted!",
      description: "Thank you for participating in our poll.",
    })
  }

  // Calculate the percentage for each option
  const getPercentage = (votes: number) => {
    return Math.round((votes / totalVotes) * 100)
  }

  return (
    <Card className="bg-zinc-900/80 backdrop-blur-md border-zinc-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ChartBarIcon className="h-5 w-5 text-green-400" />
          <CardTitle>Community Poll</CardTitle>
        </div>
        <CardDescription>
          Vote to help us plan future events. Poll ends on {new Date(pollData.endsAt).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-bold mb-6">{pollData.question}</h3>

        <AnimatePresence mode="wait">
          {!hasVoted ? (
            <motion.div
              key="voting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {results.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedOption === option.id
                      ? "bg-green-600/20 border border-green-500"
                      : "bg-zinc-800 hover:bg-zinc-700 border border-transparent"
                  }`}
                  onClick={() => setSelectedOption(option.id)}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.text}</span>
                    {selectedOption === option.id && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <Button onClick={handleVote} disabled={!selectedOption} className="w-full">
                  Submit Vote
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Poll Results
                </h4>
                <span className="text-sm text-gray-400">{totalVotes} total votes</span>
              </div>

              {results
                .sort((a, b) => b.votes - a.votes) // Sort by votes (highest first)
                .map((option) => {
                  const percentage = getPercentage(option.votes)
                  return (
                    <div key={option.id} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{option.text}</span>
                        <span className="font-bold">{percentage}%</span>
                      </div>
                      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-green-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="text-xs text-gray-400">{option.votes} votes</div>
                    </div>
                  )
                })}

              <div className="mt-6">
                <Button variant="outline" onClick={() => setHasVoted(false)} className="w-full">
                  Back to Poll
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
