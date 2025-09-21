import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Quiz {
  id: string;
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  totalQuestions: number;
  duration: string;
}

interface QuizInstructionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quiz: Quiz | null;
}

export const QuizInstructionModal: React.FC<QuizInstructionModalProps> = ({
  open,
  onOpenChange,
  quiz,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (quiz) {
      navigate(`/quiz/${quiz.id}`);
      onOpenChange(false);
    }
  };

  if (!quiz) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-card">
        <DialogHeader className="relative border-b pb-4">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 p-2 hover:bg-muted rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
          <DialogTitle className="text-2xl font-bold text-secondary text-center">
            Quiz Instruction
          </DialogTitle>
        </DialogHeader>

        <div className="flex h-[600px]">
          {/* Left Panel - Quiz Details */}
          <div className="w-1/3 border-r pr-6">
            <div className="space-y-4">
              {/* Quiz Banner */}
              <div className="bg-gradient-hero rounded-lg p-4 text-white text-center">
                <h3 className="font-bold text-lg mb-2">{quiz.title.substring(0, 30)}...</h3>
                <p className="text-sm opacity-90">{quiz.organizer}</p>
              </div>

              <div className="bg-muted rounded p-3">
                <div className="text-sm font-medium mb-2">Expiry Date: 15th Oct, 2025</div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-lg text-secondary">{quiz.title}</h4>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">From Date</div>
                    <div className="font-medium text-primary">{quiz.startDate}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">To Date</div>
                    <div className="font-medium text-primary">{quiz.endDate}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Attempt Count</div>
                    <div className="font-medium">1</div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-muted rounded p-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{quiz.totalQuestions}</div>
                    <div className="text-sm text-muted-foreground">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{quiz.duration}</div>
                    <div className="text-sm text-muted-foreground">Hours</div>
                  </div>
                </div>

                <div className="bg-accent rounded p-3 text-center">
                  <div className="text-sm text-accent-foreground">{quiz.organizer}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Instructions */}
          <div className="flex-1 pl-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">No entry fee is required to participate.</p>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">भाग लेने के लिए किसी प्रवेश शुल्क की आवश्यकता नहीं है।</p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    The quiz consists of multiple-choice questions, and each question has 2-4 options with only one correct answer.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    इस प्रश्नोत्तरी में बहुविकल्पीय प्रश्न होंगे, और प्रत्येक प्रश्न के 2-4 विकल्प होंगी जिनमें से केवल एक ही सही उत्तर होगा।
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    The quiz is open to all registered users but only youth aged 15-29 (as on 1st September, 2025) will be considered for advancing in further stages.
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    यह प्रश्नोत्तर सभी पंजीकृत उपयोगकर्ताओं के लिए है, लेकिन केवल 15-29 वर्ष की आयु वर्ग के युवाओं (1 सितंबर, 2025 के अनुसार) को ही आगे चरणों में आगे बढ़ने के लिए पात्र माना जाएगा।
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-foreground">
                    Winners will be chosen via a computer-based selection process.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-base font-medium">
                    Select Language *
                  </Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  onClick={handleStartQuiz}
                  className="bg-gradient-primary hover:opacity-90 transition-opacity px-8 py-3 text-lg"
                >
                  Start Quiz
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};