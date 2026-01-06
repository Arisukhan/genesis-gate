import { useState, useEffect, useCallback } from "react";
import { AlertCircle } from "lucide-react";

interface WelcomePageProps {
  onAccept: () => void;
}

const WelcomePage = ({ onAccept }: WelcomePageProps) => {
  const [noCount, setNoCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [isExiting, setIsExiting] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);

  const handleYes = useCallback(() => {
    setIsExiting(true);
    // Store acceptance in localStorage
    localStorage.setItem("hasAcceptedSystem", "true");
    localStorage.removeItem("noCount");
    setTimeout(() => {
      onAccept();
    }, 500);
  }, [onAccept]);

  const handleNo = useCallback(() => {
    const newCount = noCount + 1;
    setNoCount(newCount);
    localStorage.setItem("noCount", String(newCount));

    if (newCount === 1) {
      setWarningMessage("Refusing the system will result in termination.");
      setShowWarning(true);
    } else if (newCount === 2) {
      setWarningMessage("Further refusal will terminate the application.");
      setShowWarning(true);
    } else if (newCount >= 3) {
      // Terminate - show black screen
      setIsTerminated(true);
      localStorage.setItem("isTerminated", "true");
    }
  }, [noCount]);

  // Auto-hide warning after 5 seconds
  useEffect(() => {
    if (showWarning) {
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showWarning]);

  // Load saved state on mount
  useEffect(() => {
    const savedNoCount = localStorage.getItem("noCount");
    const terminated = localStorage.getItem("isTerminated");
    
    if (terminated === "true") {
      setIsTerminated(true);
    } else if (savedNoCount) {
      setNoCount(parseInt(savedNoCount, 10));
    }
  }, []);

  // Terminated state - black screen
  if (isTerminated) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <p className="font-system text-destructive/60 text-sm tracking-widest animate-pulse">
          SYSTEM TERMINATED
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 system-background flex items-center justify-center overflow-hidden">
      {/* Ambient particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Warning Toast */}
      {showWarning && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className={`glow-border ${noCount === 2 ? 'danger-border' : 'warning-border'} glass-panel rounded-lg px-6 py-4`}>
            <div className="flex items-center gap-3">
              <AlertCircle className={`w-5 h-5 ${noCount === 2 ? 'text-danger-glow' : 'text-warning-glow'}`} />
              <div>
                <p className={`font-system text-xs uppercase tracking-wider ${noCount === 2 ? 'text-danger-glow' : 'text-warning-glow'}`}>
                  {noCount === 2 ? 'FINAL WARNING' : 'WARNING'}
                </p>
                <p className="text-foreground/90 text-sm mt-1">
                  {warningMessage}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main System Card */}
      <div
        className={`relative z-10 ${isExiting ? 'animate-fade-out' : 'animate-fade-in'} animate-float`}
      >
        <div className="glow-border glass-panel rounded-lg w-[90vw] max-w-md p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full border border-primary/60 flex items-center justify-center animate-pulse-glow">
              <span className="text-primary font-bold text-lg">!</span>
            </div>
            <h1 className="font-system text-primary text-lg tracking-[0.3em] uppercase animate-text-glow">
              NOTIFICATION
            </h1>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8" />

          {/* Main Message */}
          <div className="text-center mb-10 space-y-2">
            <p className="text-foreground/90 text-lg leading-relaxed">
              You have acquired the qualifications
            </p>
            <p className="text-foreground/90 text-lg leading-relaxed">
              to be a <span className="text-primary font-semibold animate-text-glow">Player</span>.
            </p>
            <p className="text-foreground/90 text-lg leading-relaxed mt-4">
              Will you accept?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleYes}
              className="flex-1 system-btn-primary text-primary py-3 px-6 rounded font-semibold text-sm"
            >
              YES
            </button>
            <button
              onClick={handleNo}
              className="flex-1 system-btn-secondary text-foreground/70 py-3 px-6 rounded font-semibold text-sm"
            >
              NO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
