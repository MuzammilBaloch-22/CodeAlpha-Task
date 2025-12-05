import { Copy, Volume2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface TranslationBoxProps {
  value: string;
  onChange?: (value: string) => void;
  label: string;
  placeholder: string;
  isOutput?: boolean;
  onClear?: () => void;
}

export const TranslationBox = ({
  value,
  onChange,
  label,
  placeholder,
  isOutput = false,
  onClear,
}: TranslationBoxProps) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success("Copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy text");
    }
  };

  const handleSpeak = () => {
    if (!value) {
      toast.error("No text to speak");
      return;
    }

    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(value);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      window.speechSynthesis.speak(utterance);
      toast.success("Speaking...");
    } else {
      toast.error("Text-to-speech not supported in your browser");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-foreground/80">{label}</label>
        {isOutput && value && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-2 hover:bg-secondary"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSpeak}
              className="h-8 px-2 hover:bg-secondary"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="h-8 px-2 hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      <Textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`flex-1 min-h-[200px] resize-none bg-card border-border focus:border-primary/50 transition-colors ${
          isOutput ? 'bg-secondary/30' : ''
        }`}
        readOnly={isOutput}
      />
    </div>
  );
};
