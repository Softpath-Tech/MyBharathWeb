import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import { Quizzes } from "./pages/Quizzes";
import { QuizTaking } from "./pages/QuizTaking";
import { QuizThankYou } from "./pages/QuizThankYou";
import { BasicInfo } from "./pages/BasicInfo";
import { ProfilePage } from "./pages/ProfilePage";

import { Certificate } from "./pages/Certificate";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/quiz/:quizId" element={<QuizTaking />} />
            <Route path="/quiz-thank-you" element={<QuizThankYou />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/basic-info" element={<BasicInfo />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
