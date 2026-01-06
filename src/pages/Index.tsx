import { useState, useEffect } from "react";
import WelcomePage from "@/components/WelcomePage";
import LoginPage from "@/components/LoginPage";

const Index = () => {
  const [hasAccepted, setHasAccepted] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has already accepted the system
    const accepted = localStorage.getItem("hasAcceptedSystem") === "true";
    const terminated = localStorage.getItem("isTerminated") === "true";
    
    if (terminated) {
      setHasAccepted(false); // Show welcome page (which will show terminated state)
    } else {
      setHasAccepted(accepted);
    }
  }, []);

  const handleAccept = () => {
    setHasAccepted(true);
  };

  // Loading state while checking localStorage
  if (hasAccepted === null) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Show welcome page if not accepted, login page if accepted
  if (!hasAccepted) {
    return <WelcomePage onAccept={handleAccept} />;
  }

  return <LoginPage />;
};

export default Index;
