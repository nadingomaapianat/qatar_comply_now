// Add this near your other imports
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../components/ui/dialog";
import { Clock, Loader2 } from "lucide-react";
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

// Add this component near your other components
export const OrganizationVerificationModal = ({ 
  isOpen, 
  onClose,
  organizationName 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  organizationName: string;
}) => {
  const navigate = useNavigate();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            Verification Pending
          </DialogTitle>
          <DialogDescription>
            Your organization <b>{organizationName}</b> is not in our list. You will need to wait until it is verified by an admin. You will be notified once the verification is complete.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                {organizationName}
              </p>
              <p className="text-sm text-muted-foreground">
                We're verifying your organization details
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Loader2 className="w-5 h-5 animate-spin text-[#14B8A6]" />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                What happens next?
              </p>
              <p className="text-sm text-muted-foreground">
                Our team will review your submission and contact you within 24 hours.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline"
            onClick={onClose}
            className="border-gray-300"
          >
            I Understand
          </Button>
          <Button 
            onClick={() => navigate('/')} // Go to home page
            className="bg-[#14B8A6] hover:bg-[#14B8A6]/90"
          >
            Go to Home
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};