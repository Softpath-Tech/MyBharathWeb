import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import { MobileRegisterModal } from "./modals/MobileRegisterModal"; // Import MobileRegisterModal
import { OTPModal } from "./modals/OTPModal"; // Import OTPModal
import { RegisterModal } from "./modals/RegisterModal"; // Import RegisterModal
import { useUser } from "@/contexts/UserContext";

import hero1 from "@/assets/hero1.png";
import hero2 from "@/assets/hero2.png";
import hero3 from "@/assets/hero3.png";
// Add more images if needed

const images = [hero1, hero2, hero3];

export const HeroSection: React.FC = () => {
  const { isLoggedIn } = useUser();
  const [showMobileRegisterModal, setShowMobileRegisterModal] = useState(false); // State for Mobile Register Modal
  const [showOTPModal, setShowOTPModal] = useState(false); // State for OTP Modal
  const [showRegisterModal, setShowRegisterModal] = useState(false); // State for Register Modal
  const [mobileNumber, setMobileNumber] = useState(""); // State to store the mobile number for OTP
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleModalSwitch = (modalName: string) => {
    // Reset all modals
    setShowMobileRegisterModal(false);
    setShowOTPModal(false);
    setShowRegisterModal(false);

    // Open the respective modal based on the name passed
    if (modalName === "mobileRegister") setShowMobileRegisterModal(true);
    if (modalName === "otp") setShowOTPModal(true);
    if (modalName === "register") setShowRegisterModal(true);
  };

  return (
    <>
      {/* HERO SECTION with content fixed at the bottom */}
      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${images[currentIndex]})` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />

        {/* CONTENT at the bottom of the image */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-10 text-center text-white px-6 py-24">
          <h1 className="text-5xl font-extrabold leading-tight mb-4 drop-shadow-xl">
            Empowering <span className="text-primary-light">India’s Youth</span>
          </h1>
          <p className="text-xl mb-6 max-w-xl mx-auto drop-shadow-xl">
            Discover government programs, tools, and quizzes to help you grow
            and contribute to nation-building.
          </p>

          {!isLoggedIn ? (
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300"
              onClick={() => handleModalSwitch("mobileRegister")} // Open Mobile Register Modal
            >
              🚀 Register Now
            </Button>
          ) : (
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-teal-400 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300"
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
          setMobileNumber(mobile); // Set the mobile number for OTP
          handleModalSwitch("otp"); // Open OTP Modal
        }}
      />

      {/* OTP Modal */}
      <OTPModal
        open={showOTPModal}
        onOpenChange={setShowOTPModal}
        mobileNumber={mobileNumber} // Pass mobile number to OTP Modal
        onVerifySuccess={() => {
          setShowOTPModal(false); // Close OTP Modal
          handleModalSwitch("register"); // Open Register Modal after OTP verification
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

      {/* Additional Content Section */}
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
              onClick={() => handleModalSwitch("mobileRegister")} // Open Mobile Register Modal
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
