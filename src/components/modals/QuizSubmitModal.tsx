import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface QuizSubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const QuizSubmitModal: React.FC<QuizSubmitModalProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card">
        <DialogHeader className="text-center pb-6">
          <DialogTitle className="text-2xl font-bold text-secondary">
            Are you sure you want to submit the Quiz?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-center">
          <p className="text-muted-foreground text-lg">
            Once you submit the quiz, you won't be able to edit it again.
            Please review your answers before submitting.
          </p>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="px-8"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="bg-gradient-primary hover:opacity-90 transition-opacity px-8"
            >
              Submit Quiz
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};