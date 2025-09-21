import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import governmentLogo from '@/assets/government-logo.png';
import { Smartphone } from 'lucide-react';

interface MobileRegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOTPSent: (mobile: string) => void;
  onSwitchToLogin: () => void;
}

export const MobileRegisterModal: React.FC<MobileRegisterModalProps> = ({
  open,
  onOpenChange,
  onOTPSent,
  onSwitchToLogin
}) => {
  const [mobile, setMobile] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleGetOTP = () => {
    if (mobile && acceptTerms) {
      onOTPSent(mobile);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={governmentLogo} alt="Government of India" className="h-12 w-12" />
          </div>
          <DialogTitle className="text-xl font-bold text-secondary">Register</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-sm font-medium">
              Mobile Number <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="pl-10"
                maxLength={10}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I accept the{' '}
              <a href="#" className="text-primary underline">
                Terms of Use
              </a>
            </label>
          </div>

          <Button
            onClick={handleGetOTP}
            disabled={!mobile || !acceptTerms || mobile.length !== 10}
            className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Get OTP
          </Button>

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={onSwitchToLogin}
              className="text-primary hover:text-primary/90"
            >
              Login with Password
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};