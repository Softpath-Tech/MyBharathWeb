import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Users, Search } from 'lucide-react';
import { QuizInstructionModal } from '@/components/modals/QuizInstructionModal';

interface Quiz {
  id: string;
  title: string;
  organizer: string;
  image: string;
  startDate: string;
  endDate: string;
  expiryDate: string;
  totalQuestions: number;
  duration: string;
  attemptCount: number;
  totalScore: number;
  passingScore: number;
  status: 'ongoing' | 'upcoming' | 'past';
}

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Viksit Bharat Young Leaders Dialogue (VBYLD) 2026',
    organizer: 'Department of Youth Affairs',
    image: '/quiz-banner-1.jpg',
    startDate: '1 Sep, 2025',
    endDate: '15 Oct, 2025',
    expiryDate: '15th Oct, 2025',
    totalQuestions: 20,
    duration: '00:10',
    attemptCount: 1,
    totalScore: 20,
    passingScore: 7,
    status: 'ongoing'
  },
  {
    id: '2',
    title: 'National Ayurveda Quiz Competition',
    organizer: 'ALL INDIA INSTITUTE OF AYURVEDA',
    image: '/quiz-banner-2.jpg',
    startDate: '19 Sep, 2025',
    endDate: '23 Sep, 2025',
    expiryDate: '23rd Sep, 2025',
    totalQuestions: 20,
    duration: '00:15',
    attemptCount: 1,
    totalScore: 20,
    passingScore: 13,
    status: 'ongoing'
  }
];

export const Quizzes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'upcoming' | 'past' | 'my-quiz' | 'all'>('ongoing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showInstructionModal, setShowInstructionModal] = useState(false);

  const filteredQuizzes = mockQuizzes.filter(quiz => {
    if (activeTab !== 'all' && activeTab !== 'my-quiz' && quiz.status !== activeTab) return false;
    if (searchQuery && !quiz.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleStartQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setShowInstructionModal(true);
  };

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-background">
        {/* Search Header */}
        <div className="bg-gradient-secondary py-8">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Quiz Name</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Start Date</label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">End Date</label>
                <Select>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="bg-primary hover:bg-primary-dark text-primary-foreground">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b bg-background">
          <div className="container mx-auto px-4">
            <div className="flex space-x-8">
              {[
                { key: 'ongoing', label: 'Ongoing' },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'past', label: 'Past' },
                { key: 'my-quiz', label: 'My Quiz' },
                { key: 'all', label: 'All' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-2 border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-primary text-primary font-medium'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Quiz Cards */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-6">
            {filteredQuizzes.map(quiz => (
              <Card key={quiz.id} className="overflow-hidden shadow-card hover:shadow-government transition-shadow">
                <div className="relative">
                  <div className="h-48 bg-gradient-hero flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-lg font-bold mb-2">{quiz.title.substring(0, 50)}...</h3>
                      <p className="text-sm opacity-90">{quiz.organizer}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-black/20 text-white border-white/20">
                      Expiry Date: {quiz.expiryDate}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-secondary">
                    {quiz.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">From Date</div>
                        <div className="text-primary">{quiz.startDate}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <div className="font-medium text-foreground">To Date</div>
                        <div className="text-primary">{quiz.endDate}</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-primary" />
                      <div>
                        <div className="text-muted-foreground">Attempt Count</div>
                        <div className="font-medium">{quiz.attemptCount}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 bg-success rounded-full flex-shrink-0"></div>
                      <div>
                        <div className="text-muted-foreground">Total Score</div>
                        <div className="font-medium">{quiz.totalScore}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 h-4 w-4 bg-destructive rounded-full flex-shrink-0"></div>
                      <div>
                        <div className="text-muted-foreground">Passing Score</div>
                        <div className="font-medium">{quiz.passingScore}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-success">{quiz.totalQuestions}</div>
                        <div className="text-sm text-muted-foreground">Questions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{quiz.duration}</div>
                        <div className="text-sm text-muted-foreground">Hours</div>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => handleStartQuiz(quiz)}
                      className="bg-gradient-primary hover:opacity-90 transition-opacity"
                    >
                      Start Quiz
                    </Button>
                  </div>

                  <div className="mt-4 text-center text-sm text-muted-foreground bg-muted px-4 py-2 rounded">
                    {quiz.organizer}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <QuizInstructionModal
        open={showInstructionModal}
        onOpenChange={setShowInstructionModal}
        quiz={selectedQuiz}
      />
    </>
  );
};