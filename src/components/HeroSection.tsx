import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import { MobileRegisterModal } from "./modals/MobileRegisterModal";
import { OTPModal } from "./modals/OTPModal";
import { RegisterModal } from "./modals/RegisterModal";
import { useUser } from "@/contexts/UserContext";

import bann from "@/assets/bann.png"; // Use only this image

export const HeroSection: React.FC = () => {
  const { isLoggedIn } = useUser();
  const [showMobileRegisterModal, setShowMobileRegisterModal] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleModalSwitch = (modalName: string) => {
    setShowMobileRegisterModal(false);
    setShowOTPModal(false);
    setShowRegisterModal(false);

    if (modalName === "mobileRegister") setShowMobileRegisterModal(true);
    if (modalName === "otp") setShowOTPModal(true);
    if (modalName === "register") setShowRegisterModal(true);
  };

  return (
    <>
      {/* HERO SECTION with single image */}
      <section
        className="relative w-full h-screen bg-contain bg-no-repeat bg-top overflow-hidden"
        style={{ backgroundImage: `url(${bann})` }}
      >
        <div className="absolute inset-0 z-0" />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-center text-white px-6 py-24 w-full">
          {!isLoggedIn ? (
            <Button
              size="lg"
              className="bg-[#00064F] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300"
              onClick={() => handleModalSwitch("mobileRegister")}
            >
              🚀 Register Now
            </Button>
          ) : (
            <Button
              size="lg"
              className="bg-[#00064F] text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300"
              onClick={() => (window.location.href = "./#/quizzes")}
            >
              🧠 Take a Quiz
            </Button>
          )}
        </div>
      </section>

      {/* Mobile Register Modal */}
      <MobileRegisterModal
        open={showMobileRegisterModal}
        onOpenChange={setShowMobileRegisterModal}
        onOTPSent={(mobile) => {
          setMobileNumber(mobile);
          handleModalSwitch("otp");
        }}
      />

      {/* OTP Modal */}
      <OTPModal
        open={showOTPModal}
        onOpenChange={setShowOTPModal}
        mobileNumber={mobileNumber}
        onVerifySuccess={() => {
          setShowOTPModal(false);
          handleModalSwitch("register");
        }}
        onError={(error) => {
          console.log("OTP verification failed:", error);
        }}
      />

      {/* Register Modal */}
      <RegisterModal
        open={showRegisterModal}
        onOpenChange={setShowRegisterModal}
        onSwitchToLogin={() => handleModalSwitch("login")}
        onError={(error) => console.log("Registration failed:", error)}
      />

      {/* Additional CTA Section */}
      <section className="py-20 bg-white text-center" data-aos="fade-up">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of ambitious youth taking the leap toward a brighter
            future through digital empowerment.
          </p>

          {!isLoggedIn ? (
            <Button
              size="lg"
              className="bg-gradient-primary px-10 py-4 rounded-full text-white text-lg font-semibold hover:brightness-110 transition"
              onClick={() => handleModalSwitch("mobileRegister")}
            >
              🌟 Get Started
            </Button>
          ) : (
            <Button
              size="lg"
              className="bg-gradient-secondary px-10 py-4 rounded-full text-white text-lg font-semibold hover:brightness-110 transition"
              onClick={() => (window.location.href = "/quizzes")}
            >
              🔍 Explore More
            </Button>
          )}
        </div>
      </section>
    </>
  );
};
