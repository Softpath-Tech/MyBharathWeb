import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/contexts/UserContext"; // Assuming this is your context for user data

export const ProfilePage = () => {
  const { user, updateUser } = useUser(); // Get the user data from context

  // Fetching user data from localStorage
  const userDataFromLocalStorage = JSON.parse(
    localStorage.getItem("userData") || "{}"
  );

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    gender: "",
    dob: { day: "", month: "", year: "" },
    state: "",
    district: "",
    areaType: "urban",
    pincode: "",
    youthType: "",
    sportsTalent: "",
    kheloIndiaParticipant: false,
  });

  // Load data from context or fallback to localStorage if context data is not available
  useEffect(() => {
    if (user) {
      setFormData(user);
    } else if (userDataFromLocalStorage) {
      setFormData(userDataFromLocalStorage);
    }
  }, [user, userDataFromLocalStorage]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (e, field) => {
    setFormData({
      ...formData,
      dob: {
        ...formData.dob,
        [field]: e.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData); // Update the user's profile with new data
    localStorage.setItem("userData", JSON.stringify(formData)); // Also store the updated data in localStorage
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
    <div className="profile-container max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold mb-6">
        Profile Information
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              value={formData.firstName || ""}
              onChange={handleInputChange}
              name="firstName"
              placeholder="Enter first name"
              className="p-3 border rounded-md w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              value={formData.lastName || ""}
              onChange={handleInputChange}
              name="lastName"
              placeholder="Enter last name"
              className="p-3 border rounded-md w-full"
            />
          </div>
        </div>

        {/* Email and Mobile */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              name="email"
              placeholder="Enter email"
              className="p-3 border rounded-md w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              value={formData.mobile || ""}
              onChange={handleInputChange}
              name="mobile"
              placeholder="Enter mobile number"
              className="p-3 border rounded-md w-full"
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="space-y-2">
          <Label>Date of Birth *</Label>
          <div className="grid grid-cols-3 gap-2">
            <Select
              value={formData.dob?.day || ""}
              onValueChange={(value) =>
                handleDateChange({ target: { value } }, "day")
              }
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
              value={formData.dob?.month || ""}
              onValueChange={(value) =>
                handleDateChange({ target: { value } }, "month")
              }
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
              value={formData.dob?.year || ""}
              onValueChange={(value) =>
                handleDateChange({ target: { value } }, "year")
              }
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
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Gender *</Label>
            <Select
              value={formData.gender || ""}
              onValueChange={(value) =>
                handleInputChange({ target: { name: "gender", value } })
              }
              className="p-3 border rounded-md w-full"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Blood Group</Label>
            <Select
              value={formData.bloodGroup || ""}
              onValueChange={(value) =>
                handleInputChange({ target: { name: "bloodGroup", value } })
              }
              className="p-3 border rounded-md w-full"
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

        {/* Area Type and Youth Type */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Area Type *</Label>
            <RadioGroup
              value={formData.areaType || "urban"}
              onValueChange={(value) =>
                handleInputChange({ target: { name: "areaType", value } })
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
          <div className="space-y-2">
            <Label>Youth Type *</Label>
            <Select
              value={formData.youthType || ""}
              onValueChange={(value) =>
                handleInputChange({ target: { name: "youthType", value } })
              }
              className="p-3 border rounded-md w-full"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select youth type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MYBharat">MYBharat</SelectItem>
                <SelectItem value="NSS">NSS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Sports Talent */}
        <div className="space-y-2">
          <Label>Sports Talent</Label>
          <Select
            value={formData.sportsTalent || ""}
            onValueChange={(value) =>
              handleInputChange({ target: { name: "sportsTalent", value } })
            }
            className="p-3 border rounded-md w-full"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select sport" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Cricket">Cricket</SelectItem>
              <SelectItem value="Football">Football</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Khelo India Participation */}
        <div className="space-y-2 flex items-center">
          <Checkbox
            checked={formData.kheloIndiaParticipant || false}
            onCheckedChange={(checked) =>
              handleInputChange({
                target: { name: "kheloIndiaParticipant", value: checked },
              })
            }
          />
          <Label htmlFor="kheloIndia">Khelo India Talent Hunt</Label>
        </div>

        <Button
          type="submit"
          className="mt-6 bg-gradient-primary hover:opacity-90"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};
