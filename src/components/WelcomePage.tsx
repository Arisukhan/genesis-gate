import { useState, useEffect, useCallback } from "react";
import { AlertCircle } from "lucide-react";

interface WelcomePageProps {
  onAccept: () => void;
}

const WelcomePage = ({ onAccept }: WelcomePageProps) => {
  const [noCount, setNoCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [warningLevel, setWarningLevel] = useState<1 | 2>(1);
  const [isExiting, setIsExiting] = useState(false);
  const [isTerminated, setIsTerminated] = useState(false);

  const handleYes = useCallback(() => {
    if (showWarning) return; // Prevent action during warning
    setIsExiting(true);
    localStorage.setItem("hasAcceptedSystem", "true");
    localStorage.removeItem("noCount");
    setTimeout(() => {
      onAccept();
    }, 500);
  }, [onAccept, showWarning]);

  const handleNo = useCallback(() => {
    if (showWarning) return; // Prevent action during warning
    
    const newCount = noCount + 1;
    setNoCount(newCount);
    localStorage.setItem("noCount", String(newCount));

    if (newCount === 1) {
      setWarningLevel(1);
      setShowWarning(true);
    } else if (newCount === 2) {
      setWarningLevel(2);
      setShowWarning(true);
    } else if (newCount >= 3) {
      setIsTerminated(true);
      localStorage.setItem("isTerminated", "true");
    }
  }, [noCount, showWarning]);

  // Auto-hide warning after 5 seconds and return to normal state
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

  const getBorderClass = () => {
    if (!showWarning) return "glow-border";
    return warningLevel === 2 ? "glow-border danger-border" : "glow-border warning-border";
  };

  const getHeaderColor = () => {
    if (!showWarning) return "text-primary";
    return warningLevel === 2 ? "text-danger-glow" : "text-warning-glow";
  };

  const getIconColor = () => {
    if (!showWarning) return "border-primary/60 text-primary";
    return warningLevel === 2 
      ? "border-danger-glow/60 text-danger-glow" 
      : "border-warning-glow/60 text-warning-glow";
  };

  return (
    <div className="fixed inset-0 system-background flex items-center justify-center overflow-hidden">
      {/* Ambient particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Main System Card */}
      <div
        className={`relative z-10 ${isExiting ? 'animate-fade-out' : 'animate-fade-in'} animate-float`}
      >
        <div className={`${getBorderClass()} glass-panel rounded-lg w-[90vw] max-w-md p-8 transition-all duration-300`}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`w-8 h-8 rounded-full border ${getIconColor()} flex items-center justify-center animate-pulse-glow transition-colors duration-300`}>
              {showWarning ? (
                <AlertCircle className="w-5 h-5" />
              ) : (
                <span className="font-bold text-lg">!</span>
              )}
            </div>
            <h1 className={`font-system ${getHeaderColor()} text-lg tracking-[0.3em] uppercase animate-text-glow transition-colors duration-300`}>
              {showWarning 
                ? (warningLevel === 2 ? "FINAL WARNING" : "WARNING") 
                : "NOTIFICATION"
              }
            </h1>
          </div>

          {/* Divider */}
          <div className={`h-px bg-gradient-to-r from-transparent ${showWarning ? (warningLevel === 2 ? 'via-danger-glow/40' : 'via-warning-glow/40') : 'via-primary/40'} to-transparent mb-8 transition-colors duration-300`} />

          {/* Content - switches between normal and warning */}
          <div className="text-center mb-10 min-h-[120px] flex flex-col justify-center">
            {showWarning ? (
              <div className="animate-fade-in">
                <p className={`${warningLevel === 2 ? 'text-danger-glow/90' : 'text-warning-glow/90'} text-lg leading-relaxed`}>
                  {warningLevel === 2 
                    ? "Further refusal will terminate the application."
                    : "Refusing the system will result in termination."
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-2">
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
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleYes}
              disabled={showWarning}
              className={`flex-1 system-btn-primary text-primary py-3 px-6 rounded font-semibold text-sm transition-opacity duration-300 ${showWarning ? 'opacity-30 cursor-not-allowed' : ''}`}
            >
              YES
            </button>
            <button
              onClick={handleNo}
              disabled={showWarning}
              className={`flex-1 system-btn-secondary text-foreground/70 py-3 px-6 rounded font-semibold text-sm transition-opacity duration-300 ${showWarning ? 'opacity-30 cursor-not-allowed' : ''}`}
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
