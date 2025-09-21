import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import governmentLogo from "@/assets/government-logo.png";
import mybharatLogo from "@/assets/mybharat-logo.png";

export const Certificate: React.FC = () => {
  const [user, setUser] = useState<any>(null); // To store the user data from localStorage
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);

  // Fetch user data from localStorage when the component mounts
  // Fetch user data from localStorage when the component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    console.log("Fetched Users from localStorage:", storedUsers); // Debugging line to check the users data
    if (storedUsers.length > 0) {
      const firstUser = storedUsers[0]; // Get the first user from the array
      setUser(firstUser); // Update state with the first user from the array
    }
  }, []);

  const handleDownload = () => {
    // In a real implementation, this would generate a PDF
    // For now, we'll simulate download
    if (certificateRef.current) {
      window.print();
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="outline"
            onClick={handleGoHome}
            className="flex items-center space-x-2"
          >
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          <Button
            onClick={handleDownload}
            className="bg-gradient-primary hover:opacity-90 transition-opacity flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Certificate</span>
          </Button>
        </div>

        {/* Certificate */}
        <div
          ref={certificateRef}
          className="bg-white border-4 border-primary rounded-lg p-12 shadow-xl print:shadow-none print:border-2"
          style={{
            background: "linear-gradient(135deg, #fff 0%, #f8f9ff 100%)",
            minHeight: "700px",
          }}
        >
          {/* Header Logos */}
          <div className="flex justify-between items-start mb-8">
            <img
              src={governmentLogo}
              alt="Government of India"
              className="h-16 w-16 object-contain"
            />
            <img
              src={mybharatLogo}
              alt="MY Bharat"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Decorative Border */}
          <div className="text-center mb-8">
            <div className="inline-block">
              <svg
                width="100"
                height="20"
                viewBox="0 0 100 20"
                className="text-primary"
              >
                <path
                  d="M0 10 Q25 0 50 10 T100 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-secondary mb-8 tracking-wide">
            CERTIFICATE OF PARTICIPATION
          </h1>

          {/* Ministry */}
          <p className="text-xl text-center text-muted-foreground mb-8">
            Ministry of Youth Affairs & Sports
          </p>

          {/* Congratulations */}
          <p className="text-lg text-center text-primary mb-8 italic">
            Congratulations
          </p>

          {/* User Name */}
          <h2 className="text-5xl font-bold text-center text-destructive mb-8 tracking-wide">
            {user?.firstName?.toUpperCase()} {user?.lastName?.toUpperCase()}
          </h2>

          {/* Description */}
          <div className="text-center space-y-4 mb-8">
            <p className="text-lg text-primary">
              for successfully participating in the
            </p>
            <p className="text-lg text-primary">Online Quiz on</p>
          </div>

          {/* Event Banner */}
          <div className="bg-secondary text-white py-4 px-8 mx-auto max-w-2xl text-center mb-8 rounded">
            <h3 className="text-2xl font-bold">
              Viksit Bharat Young Leaders Dialogue (VBYLD) 2026
            </h3>
          </div>

          {/* Platform */}
          <p className="text-center text-lg mb-8">
            conducted on{" "}
            <span className="text-destructive font-semibold">MYBharat</span>
          </p>

          {/* Appreciation Text */}
          <div className="text-center space-y-2 mb-8">
            <p className="text-base text-muted-foreground">
              We appreciate your enthusiasm and acknowledge your valuable
              participation.
            </p>
            <p className="text-base text-muted-foreground">
              Keep contributing towards a Viksit Bharat.
            </p>
          </div>

          {/* Decorative Border */}
          <div className="text-center mb-8">
            <div className="inline-block">
              <svg
                width="100"
                height="20"
                viewBox="0 0 100 20"
                className="text-primary"
              >
                <path
                  d="M0 10 Q25 0 50 10 T100 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Date */}
          <p className="text-center text-lg font-semibold text-secondary">
            Participation Date:{" "}
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>

          {/* Footer Border */}
          <div className="mt-8 border-t-2 border-l-2 border-r-2 border-primary h-4 rounded-t-lg opacity-50"></div>
          <div className="border-b-2 border-l-2 border-r-2 border-destructive h-4 rounded-b-lg opacity-50"></div>
        </div>

        {/* Print Instructions */}
        <div className="text-center mt-8 text-muted-foreground print:hidden">
          <p className="text-sm">
            Click the Download button to print or save as PDF
          </p>
        </div>
      </div>
    </div>
  );
};
