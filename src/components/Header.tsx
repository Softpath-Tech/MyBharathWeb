import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { LoginModal } from "./modals/LoginModal";
import { RegisterModal } from "./modals/RegisterModal";
import { MobileRegisterModal } from "./modals/MobileRegisterModal";
import { OTPModal } from "./modals/OTPModal";
import yasLogo from "@/assets/yas-logo.png";
import mybharatLogo from "@/assets/mybharat-logo.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export const Header: React.FC = () => {
  const { user, isLoggedIn, logout } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showMobileRegisterModal, setShowMobileRegisterModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleModalSwitch = (modalName: string) => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
    setShowMobileRegisterModal(false);
    setShowOTPModal(false);
    if (modalName === "login") setShowLoginModal(true);
    if (modalName === "register") setShowRegisterModal(true);
    if (modalName === "mobileRegister") setShowMobileRegisterModal(true);
    if (modalName === "otp") setShowOTPModal(true);
  };

  const handleLoginError = (error: string) => {
    setErrorMessage(`Login failed: ${error}`);
  };

  const handleOTPError = (error: string) => {
    setErrorMessage(`OTP verification failed: ${error}`);
  };

  const handleRegistrationError = (error: string) => {
    setErrorMessage(`Registration failed: ${error}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <img
                  src={yasLogo}
                  alt="Ministry of Youth Affairs & Sports"
                  className="h-12 w-auto object-contain"
                />
                <img
                  src={mybharatLogo}
                  alt="MY Bharat"
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#youth"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Youth
              </a>
              {isLoggedIn ? (
                <a
                  href="/quizzes"
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  Quiz
                </a>
              ) : (
                <Button
                  variant="link" // Using variant="link" to make the button look like a link
                  onClick={() => handleModalSwitch("mobileRegister")}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  Quiz
                </Button>
              )}
              <a
                href="#cv-builder"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                CV Builder
              </a>
              <a
                href="#experimental-learning"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Experimental Learning
              </a>
              <a
                href="#volunteer"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Volunteer for Bharat
              </a>
              <a
                href="#vbyld"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                VBYLD-2026
              </a>
              <a
                href="#mega-events"
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                Mega Events
              </a>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-10 w-10 rounded-full"
                      aria-label="User menu"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.firstName?.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <Link to="/profile">MY Bharat Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleModalSwitch("login")}
                    className="text-foreground hover:text-primary"
                    aria-label="Sign In"
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-gradient-primary hover:opacity-90 transition-opacity"
                    onClick={() => handleModalSwitch("mobileRegister")}
                    aria-label="Register"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {errorMessage && (
        <div className="text-red-600 text-center mb-4">{errorMessage}</div>
      )}

      <LoginModal
        open={showLoginModal}
        onOpenChange={setShowLoginModal}
        onSwitchToRegister={() => handleModalSwitch("register")}
        onError={handleLoginError}
      />
      <MobileRegisterModal
        open={showMobileRegisterModal}
        onOpenChange={setShowMobileRegisterModal}
        onOTPSent={(mobile) => {
          setMobileNumber(mobile);
          handleModalSwitch("otp");
        }}
        onSwitchToLogin={() => handleModalSwitch("login")}
        onError={handleRegistrationError}
      />
      <OTPModal
        open={showOTPModal}
        onOpenChange={setShowOTPModal}
        mobileNumber={mobileNumber}
        onVerifySuccess={() => {
          setShowOTPModal(false);
          handleModalSwitch("register");
        }}
        onError={handleOTPError}
      />
      <RegisterModal
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
        onSwitchToLogin={() => handleModalSwitch("login")}
        onError={handleRegistrationError}
      />
    </>
  );
};
