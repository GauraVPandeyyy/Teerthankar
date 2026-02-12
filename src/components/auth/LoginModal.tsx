import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { Sparkles } from "lucide-react"; // Ek premium icon ke liye
import Logo from "../../assets/logo.png"; // Apne logo ka path yahan daalein

const LoginModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { googleLogin } = useAuth();
  const navigate = useNavigate();

  const redirectAfterLogin = () => {
    const redirect = sessionStorage.getItem("postLoginRedirect");
    if (redirect) {
      navigate(redirect);
      sessionStorage.removeItem("postLoginRedirect");
    } else {
        navigate("/dashboard"); // Default redirect agar kuch na ho toh
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] border-none bg-white/95 backdrop-blur-md p-0 overflow-hidden rounded-2xl shadow-2xl">
        {/* Decorative Top Bar */}
        <div className="h-2 bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-200" />
        
        <div className="p-8">
          <DialogHeader className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2">
              {/* <Sparkles className="text-amber-600 w-6 h-6" /> */}
              <img
              src={Logo}
              alt="Teerthankar Logo"
              className="w-14 h-14 object-contain mb-4 shadow-glow"
            />
            </div>
            <DialogTitle className="text-center text-3xl font-serif text-slate-800 tracking-tight">
              Welcome Back
            </DialogTitle>
            <p className="text-center text-slate-500 text-sm font-light">
              Discover timeless elegance. Sign in to access your curated jewelry collection.
            </p>
          </DialogHeader>

          <div className="mt-8 space-y-4">
            {/* Google Login Container */}
            <div className="flex justify-center flex-col items-center gap-4">
              <div className="w-full border-t border-slate-100 relative mb-2">
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] uppercase tracking-widest text-slate-400">
                  Secure Access
                </span>
              </div>
              
              <div className="w-full flex justify-center py-2 transition-transform hover:scale-[1.02] active:scale-95">
                <GoogleLogin
                  onSuccess={async (cred) => {
                    try {
                      await googleLogin(cred.credential!);
                      toast.success("Welcome to our collection!");
                      onClose();
                      redirectAfterLogin();
                    } catch {
                      toast.error("Authentication failed. Please try again.");
                    }
                  }}
                  shape="pill"
                  theme="outline"
                  size="large"
                  text="continue_with"
                  width="300"
                  onError={() => toast.error("Google login failed")}
                />
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-400 mt-6 leading-relaxed">
              By continuing, you agree to our <br />
              <span className="underline cursor-pointer hover:text-amber-600">Terms of Service</span> and <span className="underline cursor-pointer hover:text-amber-600">Privacy Policy</span>.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;