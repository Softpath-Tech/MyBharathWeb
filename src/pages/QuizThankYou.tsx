import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Star } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

export const QuizThankYou: React.FC = () => {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleStarClick = (starNumber: number) => {
    setRating(starNumber);
  };

  const handleSubmitFeedback = () => {
    // Handle feedback submission
    console.log('Rating:', rating, 'Feedback:', feedback);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="text-center space-y-8">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-success/10 rounded-full flex items-center justify-center">
              <CheckCircle className="h-16 w-16 text-success" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-secondary">
            Thank you {user?.firstName} {user?.lastName}
          </h1>

          {/* Submission Details */}
          <div className="space-y-4">
            <p className="text-muted-foreground text-lg">
              Your quiz response was successfully submitted at{' '}
              <span className="font-medium text-foreground">
                {new Date().toLocaleTimeString()}
              </span>
              . Please note this time for your records. Thank you for completing the quiz.
            </p>

            <div className="bg-muted rounded-lg p-4">
              <p className="text-lg font-medium">
                You have scored <span className="text-primary">0</span> out of{' '}
                <span className="text-primary">20</span> (
                <span className="text-primary">0%</span>)
              </p>
            </div>

            <Button 
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
              onClick={() => window.location.href = '/certificate'}
            >
              Download Certificate
            </Button>
          </div>

          {/* Feedback Section */}
          <div className="bg-card rounded-lg border p-6 text-left space-y-6">
            <h2 className="text-xl font-bold text-center">
              Please share your valuable feedback and rating to help us improve in the future.
            </h2>

            {/* Rating */}
            <div className="space-y-3">
              <div className="flex items-center space-x-1">
                <span className="font-medium">Rating</span>
                <span className="text-destructive">*</span>
              </div>
              
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className="transition-colors"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating
                          ? 'fill-primary text-primary'
                          : 'text-muted-foreground hover:text-primary'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Feedback Text */}
            <div className="space-y-3">
              <label className="font-medium text-muted-foreground">
                Provide your valuable feedback
              </label>
              <Textarea
                placeholder="Write here (250 characters)"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                maxLength={250}
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                onClick={handleSubmitFeedback}
                className="bg-gradient-primary hover:opacity-90 transition-opacity px-8"
                disabled={rating === 0}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};