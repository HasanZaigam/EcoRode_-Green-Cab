"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Calendar, Check, Gamepad2, Leaf, Trophy } from "lucide-react"

export default function GamesPage() {
  const [ecoQuizScore, setEcoQuizScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [quizStarted, setQuizStarted] = useState(false)

  // Mock quiz questions
  const quizQuestions = [
    {
      question: "Which transportation option has the lowest carbon footprint?",
      options: ["Car", "Bike", "Airplane", "Motorcycle"],
      correctAnswer: 1,
    },
    {
      question: "How much CO₂ does an average car emit per kilometer?",
      options: ["120g", "50g", "200g", "300g"],
      correctAnswer: 0,
    },
    {
      question: "Which of these is NOT a renewable energy source?",
      options: ["Solar", "Wind", "Natural Gas", "Hydroelectric"],
      correctAnswer: 2,
    },
    {
      question: "How many trees does it take to absorb 1 ton of CO₂ over its lifetime?",
      options: ["5", "20", "40", "100"],
      correctAnswer: 1,
    },
    {
      question: "What percentage of carbon emissions come from transportation globally?",
      options: ["5%", "15%", "25%", "40%"],
      correctAnswer: 2,
    },
  ]

  const handleAnswerSelect = (selectedIndex: number) => {
    if (selectedIndex === quizQuestions[currentQuestion].correctAnswer) {
      setEcoQuizScore(ecoQuizScore + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setEcoQuizScore(0)
    setCurrentQuestion(0)
    setShowResults(false)
    setQuizStarted(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Games & Challenges</h1>
        <p className="text-muted-foreground">Have fun while learning about sustainability and earn extra Green Coins</p>
      </div>

      <Tabs defaultValue="games">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="games">Games</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        <TabsContent value="games" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Eco Quiz</CardTitle>
                <CardDescription>Test your knowledge about sustainability</CardDescription>
              </CardHeader>
              <CardContent>
                {!quizStarted ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Gamepad2 className="h-16 w-16 text-primary opacity-80" />
                    <h3 className="mt-4 text-xl font-semibold">Eco Knowledge Quiz</h3>
                    <p className="mt-2 text-center text-sm text-muted-foreground">
                      Answer 5 questions about sustainability and earn up to 10 Green Coins!
                    </p>
                    <Button className="mt-6" onClick={() => setQuizStarted(true)}>
                      Start Quiz
                    </Button>
                  </div>
                ) : showResults ? (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Trophy className="h-16 w-16 text-primary" />
                    <h3 className="mt-4 text-xl font-semibold">Quiz Complete!</h3>
                    <p className="mt-2 text-center text-sm">
                      You scored {ecoQuizScore} out of {quizQuestions.length}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-primary" />
                      <span className="font-medium">+{ecoQuizScore * 2} Green Coins</span>
                    </div>
                    <Button className="mt-6" onClick={resetQuiz}>
                      Play Again
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                      <span>{ecoQuizScore} correct</span>
                    </div>
                    <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} />
                    <div className="mt-4 space-y-4">
                      <h3 className="text-lg font-medium">{quizQuestions[currentQuestion].question}</h3>
                      <div className="grid gap-2">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="justify-start"
                            onClick={() => handleAnswerSelect(index)}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Carbon Footprint Calculator</CardTitle>
                <CardDescription>Calculate and reduce your carbon footprint</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <Leaf className="h-16 w-16 text-primary opacity-80" />
                  <h3 className="mt-4 text-xl font-semibold">Coming Soon</h3>
                  <p className="mt-2 text-center text-sm text-muted-foreground">
                    We're working on an interactive carbon footprint calculator game. Check back soon!
                  </p>
                  <Button className="mt-6" disabled>
                    Play Game
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Game Achievements</CardTitle>
              <CardDescription>Unlock achievements by playing eco-friendly games</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="mt-2 text-sm font-medium">Quiz Master</h3>
                  <p className="text-center text-xs text-muted-foreground">Score 100% on the Eco Quiz</p>
                  <Badge variant="outline" className="mt-2">
                    {ecoQuizScore === 5 ? "Unlocked" : "Locked"}
                  </Badge>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Award className="h-8 w-8 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium">Carbon Saver</h3>
                  <p className="text-center text-xs text-muted-foreground">Complete the Carbon Calculator game</p>
                  <Badge variant="outline" className="mt-2">
                    Locked
                  </Badge>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Award className="h-8 w-8 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium">Game Champion</h3>
                  <p className="text-center text-xs text-muted-foreground">Play all eco games at least once</p>
                  <Badge variant="outline" className="mt-2">
                    Locked
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="challenges" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Challenges</CardTitle>
                <CardDescription>Complete challenges to earn extra rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Bike to Work Week</h3>
                        <Badge className="bg-primary">Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Use a bike for your commute 3 times this week</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Leaf className="h-4 w-4 text-primary" />
                        <span>Reward: +15 Green Coins</span>
                      </div>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary bg-primary/10 text-primary">
                      <span className="text-sm font-medium">1/3</span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Carpool Champion</h3>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Share 5 rides with others this month</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Leaf className="h-4 w-4 text-primary" />
                        <span>Reward: +25 Green Coins</span>
                      </div>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-muted bg-muted/10 text-muted-foreground">
                      <span className="text-sm font-medium">0/5</span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Zero Emission Week</h3>
                        <Badge variant="outline">Upcoming</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Use only zero-emission transportation for a week</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Leaf className="h-4 w-4 text-primary" />
                        <span>Reward: +30 Green Coins</span>
                      </div>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-muted bg-muted/10 text-muted-foreground">
                      <Calendar className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Challenge History</CardTitle>
                <CardDescription>Your completed eco challenges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Electric Explorer</h3>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Take 3 rides in electric vehicles</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Leaf className="h-4 w-4 text-primary" />
                        <span>Reward: +20 Green Coins</span>
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-start justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">First Tree Milestone</h3>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Plant your first tree with Green Coins</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Leaf className="h-4 w-4 text-primary" />
                        <span>Reward: +10 Green Coins</span>
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="flex items-start justify-between rounded-lg border p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">Weekend Warrior</h3>
                        <Badge variant="secondary">Completed</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Take 5 eco-friendly rides on weekends</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Leaf className="h-4 w-4 text-primary" />
                        <span>Reward: +15 Green Coins</span>
                      </div>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Challenge Achievements</CardTitle>
              <CardDescription>Special badges earned from completing challenges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="mt-2 text-sm font-medium">Green Starter</h3>
                  <p className="text-center text-xs text-muted-foreground">Complete your first challenge</p>
                  <Badge className="mt-2 bg-primary">Unlocked</Badge>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="mt-2 text-sm font-medium">Tree Hugger</h3>
                  <p className="text-center text-xs text-muted-foreground">Plant your first tree</p>
                  <Badge className="mt-2 bg-primary">Unlocked</Badge>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Award className="h-8 w-8 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium">Challenge Master</h3>
                  <p className="text-center text-xs text-muted-foreground">Complete 10 challenges</p>
                  <Badge variant="outline" className="mt-2">
                    3/10
                  </Badge>
                </div>
                <div className="flex flex-col items-center rounded-lg border p-4">
                  <Award className="h-8 w-8 text-muted-foreground opacity-50" />
                  <h3 className="mt-2 text-sm font-medium">Carbon Warrior</h3>
                  <p className="text-center text-xs text-muted-foreground">Save 100kg of CO₂</p>
                  <Badge variant="outline" className="mt-2">
                    45.2/100
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

