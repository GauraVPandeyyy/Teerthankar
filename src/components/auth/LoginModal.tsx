import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner';

const LoginModal = ({ isOpen, onClose }) => {
  const [mobile, setMobile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate mobile number
    if (!/^\d{10}$/.test(mobile)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    try {
      await login(mobile);
      toast.success('Welcome back!');
      onClose();
      setMobile('');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-center">
            Welcome to <span className="bg-gradient-gold bg-clip-text text-transparent">Luxe Jewels</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mobile Number</label>
            <Input
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
              maxLength={10}
              required
              className="text-base"
            />
            <p className="text-xs text-muted-foreground">
              We'll send you an OTP to verify your number
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-gold hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Continue'}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
