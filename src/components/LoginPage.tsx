import { useState } from "react";
import { User, Lock, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for login/signup logic
    console.log(isLogin ? "Login" : "Sign up", { email, password });
  };

  return (
    <div className="fixed inset-0 system-background flex items-center justify-center overflow-hidden">
      {/* Ambient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 animate-fade-in">
        <div className="glow-border glass-panel rounded-lg w-[90vw] max-w-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-system text-primary text-xl tracking-[0.2em] uppercase animate-text-glow mb-2">
              {isLogin ? "SYSTEM LOGIN" : "CREATE ACCOUNT"}
            </h1>
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Enter your credentials to continue" : "Register as a new Player"}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8" />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-secondary/30 border border-border/50 rounded py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-system text-sm tracking-wide"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-secondary/30 border border-border/50 rounded py-3 pl-12 pr-4 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all font-system text-sm tracking-wide"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full system-btn-primary text-primary py-3 px-6 rounded font-semibold text-sm flex items-center justify-center gap-2 group"
            >
              <span>{isLogin ? "ENTER SYSTEM" : "REGISTER"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-muted-foreground text-sm hover:text-primary transition-colors"
            >
              {isLogin ? "Need an account? " : "Already have an account? "}
              <span className="text-primary/80 hover:text-primary">
                {isLogin ? "Register" : "Login"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
