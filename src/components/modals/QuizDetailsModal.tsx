import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { X } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import governmentLogo from '@/assets/government-logo.png';

interface QuizDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
}

export const QuizDetailsModal: React.FC<QuizDetailsModalProps> = ({
  open,
  onOpenChange,
  onProceed,
}) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: user?.firstName + ' ' + user?.lastName || '',
    state: user?.state || '',
    district: user?.district || '',
    areaType: user?.areaType || 'urban',
    ulb: user?.ulb || '',
    pincode: user?.pincode || '',
    mobile: user?.mobile || '',
    dateOfBirth: user?.dateOfBirth || { day: '', month: '', year: '' },
    isDivyang: false
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateDateOfBirth = (field: 'day' | 'month' | 'year', value: string) => {
    setFormData(prev => ({
      ...prev,
      dateOfBirth: {
        ...prev.dateOfBirth,
        [field]: value,
      },
    }));
  };

  const generateDays = () => Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const generateMonths = () => [
    '01', '02', '03', '04', '05', '06',
    '07', '08', '09', '10', '11', '12'
  ];
  const generateYears = () => Array.from({ length: 50 }, (_, i) => (new Date().getFullYear() - i).toString());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-card">
        <DialogHeader className="relative border-b pb-4">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-0 top-0 p-2 hover:bg-muted rounded-md"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex justify-center mb-4">
            <img 
              src={governmentLogo} 
              alt="Government Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-secondary text-center">
            Check your details before proceeding for Quiz
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name*</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="bg-muted"
              readOnly
            />
          </div>

          {/* State and District */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>State*</Label>
              <Select value={formData.state} onValueChange={(value) => updateFormData('state', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ANDHRA PRADESH">ANDHRA PRADESH</SelectItem>
                  <SelectItem value="KARNATAKA">KARNATAKA</SelectItem>
                  <SelectItem value="TAMIL NADU">TAMIL NADU</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>District*</Label>
              <Select value={formData.district} onValueChange={(value) => updateFormData('district', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select district" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KURNOOL">KURNOOL</SelectItem>
                  <SelectItem value="ANANTAPUR">ANANTAPUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Area Type */}
          <div className="space-y-4">
            <Label>To which area do you belong?*</Label>
            <RadioGroup
              value={formData.areaType}
              onValueChange={(value: 'urban' | 'rural') => updateFormData('areaType', value)}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urban" id="urban" />
                <Label htmlFor="urban">Urban</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rural" id="rural" />
                <Label htmlFor="rural">Rural</Label>
              </div>
            </RadioGroup>
          </div>

          {/* ULB and Pincode */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>ULB</Label>
              <Select value={formData.ulb} onValueChange={(value) => updateFormData('ulb', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ULB" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KURNOOL">KURNOOL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pincode</Label>
              <Input
                value={formData.pincode}
                onChange={(e) => updateFormData('pincode', e.target.value)}
                placeholder="Enter pincode"
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile*</Label>
            <Input
              id="mobile"
              value={formData.mobile}
              onChange={(e) => updateFormData('mobile', e.target.value)}
              className="bg-muted"
              readOnly
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label>Date of Birth*</Label>
            <div className="grid grid-cols-3 gap-2">
              <Select value={formData.dateOfBirth.day} onValueChange={(value) => updateDateOfBirth('day', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {generateDays().map(day => (
                    <SelectItem key={day} value={day}>{day}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={formData.dateOfBirth.month} onValueChange={(value) => updateDateOfBirth('month', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {generateMonths().map(month => (
                    <SelectItem key={month} value={month}>{month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={formData.dateOfBirth.year} onValueChange={(value) => updateDateOfBirth('year', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {generateYears().map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Divyang Question */}
          <div className="space-y-4">
            <Label>Whether Divyang or not?*</Label>
            <RadioGroup
              value={formData.isDivyang ? 'yes' : 'no'}
              onValueChange={(value) => updateFormData('isDivyang', value === 'yes')}
              className="flex space-x-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="divyang-yes" />
                <Label htmlFor="divyang-yes">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="divyang-no" />
                <Label htmlFor="divyang-no">No</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={onProceed}
            className="bg-gradient-primary hover:opacity-90 transition-opacity px-8"
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};