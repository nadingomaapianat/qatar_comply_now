import { CheckCircle } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

interface AssessmentQuestion {
  id: string;
  label: string;
  question: string;
  options?: string[];
}

interface AssessmentSectionProps {
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  resultInfo?: {
    title: string;
    items: { condition: string; result: string }[];
  };
  triggerText?: string;
}

const AssessmentSection = ({ title, description, questions, resultInfo, triggerText = "Start Free Assessment" }: AssessmentSectionProps) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);

  const defaultOptions = ['Implemented', 'Partially Implemented', 'Not Implemented'];

  return (
    <section className="py-20 bg-muted/20">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">{title}</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            {description}
          </p>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="btn-gradient text-lg px-8 py-6">
                {triggerText}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-xl border-border/50">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold gradient-text">{title}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-8 mt-4">
                {questions.map((q) => (
                  <div key={q.id} className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg btn-gradient flex items-center justify-center text-white font-bold text-sm">
                        {q.label}
                      </span>
                      <p className="text-foreground font-medium leading-relaxed pt-1 text-left">
                        {q.question}
                      </p>
                    </div>
                    <RadioGroup
                      value={answers[q.id] || ''}
                      onValueChange={(value) => setAnswers(prev => ({ ...prev, [q.id]: value }))}
                      className="ml-11 space-y-2"
                    >
                      {(q.options || defaultOptions).map((option) => (
                        <div key={option} className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`${q.id}-${option}`} />
                          <Label 
                            htmlFor={`${q.id}-${option}`} 
                            className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ))}
              </div>

              {resultInfo && (
                <div className="mt-8 pt-6 border-t border-border/50">
                  <h4 className="font-semibold text-foreground mb-4">{resultInfo.title}</h4>
                  <ul className="space-y-2">
                    {resultInfo.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm">
                        <CheckCircle size={16} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground text-left">
                          <span className="text-foreground font-medium">{item.condition}:</span> {item.result}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default AssessmentSection;
