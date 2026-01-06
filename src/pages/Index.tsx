import { useState, useEffect } from "react";
import WelcomePage from "@/components/WelcomePage";
import LoginPage from "@/components/LoginPage";
import HomeScreen from "@/components/HomeScreen";

const Index = () => {
  const [hasAccepted, setHasAccepted] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already accepted the system
    const accepted = localStorage.getItem("hasAcceptedSystem") === "true";
    const terminated = localStorage.getItem("isTerminated") === "true";
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    if (terminated) {
      setHasAccepted(false); // Show welcome page (which will show terminated state)
    } else {
      setHasAccepted(accepted);
    }
    
    setIsLoggedIn(loggedIn);
  }, []);

  // Listen for login state changes
  useEffect(() => {
    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also check periodically for same-tab changes
    const interval = setInterval(() => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      if (loggedIn !== isLoggedIn) {
        setIsLoggedIn(loggedIn);
      }
    }, 100);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [isLoggedIn]);

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

  // Show welcome page if not accepted
  if (!hasAccepted) {
    return <WelcomePage onAccept={handleAccept} />;
  }

  // Show home screen if logged in
  if (isLoggedIn) {
    return <HomeScreen />;
  }

  // Show login page if accepted but not logged in
  return <LoginPage />;
};

export default Index;
