import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage = () => {
  const [codename, setCodename] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ codename?: boolean; email?: boolean; password?: boolean }>({});
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoverySent, setRecoverySent] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = {
      codename: !codename.trim(),
      email: !email.trim() || !validateEmail(email),
      password: !password.trim() || password.length < 6,
    };
    
    setErrors(newErrors);
    
    if (Object.values(newErrors).some(Boolean)) {
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Store login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userCodename', codename);
    
    // Navigate to home (you can replace this with actual navigation)
    window.location.reload();
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recoveryEmail.trim() || !validateEmail(recoveryEmail)) {
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    setRecoverySent(true);
  };

  const inputBaseClasses = "w-full bg-secondary/30 border rounded py-3 px-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none transition-all font-system text-sm tracking-wide";
  const inputNormalClasses = "border-border/50 focus:border-primary/60 focus:ring-1 focus:ring-primary/30";
  const inputErrorClasses = "border-destructive/60 focus:border-destructive/80 focus:ring-1 focus:ring-destructive/30 shadow-[0_0_10px_hsl(var(--destructive)/0.3)]";

  // Forgot Password Modal
  if (showForgotPassword) {
    return (
      <div className="fixed inset-0 system-background flex items-center justify-center overflow-hidden">
        {/* Ambient effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 animate-fade-in">
          <div className="glow-border glass-panel rounded-lg w-[90vw] max-w-md p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-system text-primary text-xl tracking-[0.2em] uppercase animate-text-glow mb-2">
                PASSWORD RECOVERY
              </h1>
              <p className="text-muted-foreground text-sm">
                {recoverySent ? "Recovery link sent" : "Enter your email to reset"}
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8" />

            {recoverySent ? (
              <div className="text-center space-y-6">
                <p className="text-muted-foreground text-sm">
                  If an account exists with this email, you will receive a password reset link.
                </p>
                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    setRecoverySent(false);
                    setRecoveryEmail("");
                  }}
                  className="w-full system-btn-primary text-primary py-3 px-6 rounded font-semibold text-sm"
                >
                  RETURN TO LOGIN
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotPassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-system text-foreground/80 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={recoveryEmail}
                    onChange={(e) => setRecoveryEmail(e.target.value)}
                    className={`${inputBaseClasses} ${inputNormalClasses}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full system-btn-primary text-primary py-3 px-6 rounded font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "SEND RESET LINK"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setShowForgotPassword(false)}
                  className="w-full text-muted-foreground text-sm hover:text-primary transition-colors"
                >
                  Back to login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 system-background flex items-center justify-center overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 animate-fade-in animate-float">
        <div className="glow-border glass-panel rounded-lg w-[90vw] max-w-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-system text-primary text-2xl tracking-[0.2em] uppercase animate-text-glow mb-2">
              LOGIN
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/40" />
              <p className="text-muted-foreground text-sm">
                Enter the system
              </p>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/40" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Codename Input */}
            <div className="space-y-2">
              <label className="block text-sm font-system text-foreground/80 tracking-wide">
                Codename
              </label>
              <input
                type="text"
                placeholder="Choose your codename"
                value={codename}
                onChange={(e) => {
                  setCodename(e.target.value);
                  if (errors.codename) setErrors(prev => ({ ...prev, codename: false }));
                }}
                className={`${inputBaseClasses} ${errors.codename ? inputErrorClasses : inputNormalClasses}`}
              />
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-system text-foreground/80 tracking-wide">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors(prev => ({ ...prev, email: false }));
                }}
                className={`${inputBaseClasses} ${errors.email ? inputErrorClasses : inputNormalClasses}`}
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-system text-foreground/80 tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: false }));
                  }}
                  className={`${inputBaseClasses} pr-12 ${errors.password ? inputErrorClasses : inputNormalClasses}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/60 hover:text-primary transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full system-btn-primary text-primary py-3 px-6 rounded font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 active:scale-[0.98] transition-transform"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <span>ENTER</span>
                )}
              </button>
            </div>
          </form>

          {/* Forgot Password */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowForgotPassword(true)}
              className="text-primary/60 text-sm hover:text-primary transition-colors font-system tracking-wide"
            >
              Forgot password?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
