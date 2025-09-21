import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, useUser } from "@/contexts/UserContext"; // Import useUser hook
import { saveUserData } from "../../lib/storage"; // Import utility functions

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin?: () => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  open,
  onOpenChange,
  onSwitchToLogin,
}) => {
  const [formData, setFormData] = useState<Partial<User>>({
    areaType: "urban",
    kheloIndiaParticipant: false,
  });

  const updateFormData = (field: keyof User, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { login } = useUser(); // Access login function to set isLoggedIn to true

  const updateDateOfBirth = (
    field: "day" | "month" | "year",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: {
        ...prev.dateOfBirth,
        [field]: value,
      } as any,
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Registration data:", formData);

    // Simulate the user data for successful registration
    const userData: User = {
      id: "1", // Placeholder user ID, you'll get this from your registration process
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      mobile: formData.mobile || "",
      dateOfBirth: formData.dateOfBirth || { day: "", month: "", year: "" },
      gender: formData.gender || "",
      state: formData.state || "",
      district: formData.district || "",
      areaType: formData.areaType || "urban",
      pincode: formData.pincode || "",
      youthType: formData.youthType || "",
      kheloIndiaParticipant: formData.kheloIndiaParticipant || false,
      profileImage: formData.profileImage || "",
      username: formData.username || "",
    };

    // Use the login function to set the user and mark as logged in
    login(userData); // This will set isLoggedIn to true and store user data in context
    saveUserData(userData); // Save user data in localStorage for persistence

    onOpenChange(false); // Close the registration modal
  };

  const generateDays = () =>
    Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, "0"));
  const generateMonths = () => [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const generateYears = () =>
    Array.from({ length: 50 }, (_, i) =>
      (new Date().getFullYear() - i).toString()
    );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] bg-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-secondary text-center">
            Registration Form
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[75vh] pr-4">
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName || ""}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName || ""}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input
                  id="mobile"
                  value={formData.mobile || ""}
                  onChange={(e) => updateFormData("mobile", e.target.value)}
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select
                  onValueChange={(value) => updateDateOfBirth("day", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateDays().map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => updateDateOfBirth("month", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateMonths().map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  onValueChange={(value) => updateDateOfBirth("year", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {generateYears().map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Gender and Blood Group */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Gender *</Label>
                <Select
                  onValueChange={(value) => updateFormData("gender", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Blood Group</Label>
                <Select
                  onValueChange={(value) => updateFormData("bloodGroup", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* State and District */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>State *</Label>
                <Select
                  onValueChange={(value) => updateFormData("state", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="andhra-pradesh">
                      Andhra Pradesh
                    </SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>District *</Label>
                <Select
                  onValueChange={(value) => updateFormData("district", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kurnool">Kurnool</SelectItem>
                    <SelectItem value="anantapur">Anantapur</SelectItem>
                    <SelectItem value="kadapa">Kadapa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Area Type */}
            <div className="space-y-4">
              <Label>To which area do you belong? *</Label>
              <RadioGroup
                value={formData.areaType}
                onValueChange={(value: "urban" | "rural") =>
                  updateFormData("areaType", value)
                }
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

            {/* Location-specific fields */}
            {formData.areaType === "urban" ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>ULB (Urban Local Body) *</Label>
                  <Select
                    onValueChange={(value) => updateFormData("ulb", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select ULB" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kurnool-municipal">
                        Kurnool Municipal Corporation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Pincode *</Label>
                  <Input
                    value={formData.pincode || ""}
                    onChange={(e) => updateFormData("pincode", e.target.value)}
                    placeholder="Enter pincode"
                    maxLength={6}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Block *</Label>
                    <Select
                      onValueChange={(value) => updateFormData("block", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select block" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kurnool-block">
                          Kurnool Block
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Panchayat *</Label>
                    <Select
                      onValueChange={(value) =>
                        updateFormData("panchayat", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select panchayat" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sample-panchayat">
                          Sample Panchayat
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Village *</Label>
                    <Select
                      onValueChange={(value) =>
                        updateFormData("village", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select village" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sample-village">
                          Sample Village
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Pincode *</Label>
                    <Input
                      value={formData.pincode || ""}
                      onChange={(e) =>
                        updateFormData("pincode", e.target.value)
                      }
                      placeholder="Enter pincode"
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Youth Type and Sports */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Youth Type *</Label>
                <Select
                  onValueChange={(value) => updateFormData("youthType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select youth type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nss">NSS</SelectItem>
                    <SelectItem value="ncc">NCC</SelectItem>
                    <SelectItem value="mybharat">MYBharat</SelectItem>
                    <SelectItem value="bsg">BSG</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Sports Talent</Label>
                <Select
                  onValueChange={(value) =>
                    updateFormData("sportsTalent", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="archery">Archery</SelectItem>
                    <SelectItem value="cricket">Cricket</SelectItem>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="athletics">Athletics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="khelo-india"
                  checked={formData.kheloIndiaParticipant}
                  onCheckedChange={(checked) =>
                    updateFormData("kheloIndiaParticipant", checked)
                  }
                />
                <Label htmlFor="khelo-india">
                  Do you wish to participate in Khelo India Talent Hunt?
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="consent" />
                <Label htmlFor="consent">I consent to the Terms of Use *</Label>
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => onSwitchToLogin?.()}>
                Already have an account?
              </Button>
              <Button
                onClick={handleSubmit}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                Submit Registration
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
