import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const [selectedLanguage, setSelectedLanguage] = useState("english");
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
      <DialogContent className="max-w-4xl w-full max-h-[90vh] bg-white p-0 md:p-6 overflow-hidden">
        <DialogHeader className="relative border-b pb-4 px-4 md:px-6">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 p-2 hover:bg-gray-100 rounded-md"
          >
            <X className="h-4 w-4 text-[#00064D]" />
          </button>
          <DialogTitle className="text-2xl font-bold text-[#00064D] text-center">
            Quiz Instruction
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable content */}
        <div className="flex flex-col md:flex-row max-h-[80vh] overflow-auto p-4 md:p-6 gap-4">
          {/* Left Panel - Quiz Details */}
          <div className="w-full md:w-1/3 flex-shrink-0">
            <div className="space-y-4">
              {/* Quiz Banner */}
              <div className="bg-[#00064D] rounded-lg p-4 text-white text-center">
                <h3 className="font-bold text-lg mb-2">
                  {quiz.title.length > 30
                    ? quiz.title.substring(0, 30) + "..."
                    : quiz.title}
                </h3>
                <p className="text-sm opacity-90">{quiz.organizer}</p>
              </div>

              <div className="bg-[#E0E0F0] rounded p-3">
                <div className="text-sm font-medium mb-2 text-[#00064D]">
                  Expiry Date: 15th Oct, 2025
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-lg text-[#00064D]">
                  {quiz.title}
                </h4>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-[#00064D]/70">From Date</div>
                    <div className="font-medium text-[#00064D]">
                      {quiz.startDate}
                    </div>
                  </div>
                  <div>
                    <div className="text-[#00064D]/70">To Date</div>
                    <div className="font-medium text-[#00064D]">
                      {quiz.endDate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div>
                    <div className="text-[#00064D]/70">Attempt Count</div>
                    <div className="font-medium">1</div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-[#E0E0F0] rounded p-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00064D]">
                      {quiz.totalQuestions}
                    </div>
                    <div className="text-sm text-[#00064D]/70">Questions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#00064D]">
                      {quiz.duration}
                    </div>
                    <div className="text-sm text-[#00064D]/70">Hours</div>
                  </div>
                </div>

                <div className="bg-[#E0E0F0] rounded p-3 text-center">
                  <div className="text-sm text-[#00064D]">{quiz.organizer}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Instructions */}
          <div className="flex-1 flex flex-col">
            <div className="space-y-6 flex-1 overflow-auto">
              {[
                "No entry fee is required to participate.",
                "भाग लेने के लिए किसी प्रवेश शुल्क की आवश्यकता नहीं है।",
                "The quiz consists of multiple-choice questions, and each question has 2-4 options with only one correct answer.",
                "इस प्रश्नोत्तरी में बहुविकल्पीय प्रश्न होंगे, और प्रत्येक प्रश्न के 2-4 विकल्प होंगी जिनमें से केवल एक ही सही उत्तर होगा।",
                "The quiz is open to all registered users but only youth aged 15-29 (as on 1st September, 2025) will be considered for advancing in further stages.",
                "यह प्रश्नोत्तर सभी पंजीकृत उपयोगकर्ताओं के लिए है, लेकिन केवल 15-29 वर्ष की आयु वर्ग के युवाओं (1 सितंबर, 2025 के अनुसार) को ही आगे चरणों में आगे बढ़ने के लिए पात्र माना जाएगा।",
                "Winners will be chosen via a computer-based selection process.",
              ].map((text, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#00064D] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-[#00064D]">{text}</p>
                </div>
              ))}

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="language"
                    className="text-base font-medium text-[#00064D]"
                  >
                    Select Language *
                  </Label>
                  <Select
                    value={selectedLanguage}
                    onValueChange={setSelectedLanguage}
                  >
                    <SelectTrigger className="w-full max-w-xs border-[#00064D]">
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
              </div>
            </div>

            {/* Start Quiz Button always visible */}
            <div className="mt-4 flex-shrink-0">
              <Button
                onClick={handleStartQuiz}
                className="bg-[#00064D] text-white hover:bg-[#000051] transition-opacity px-8 py-3 text-lg w-full"
              >
                Start Quiz
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
