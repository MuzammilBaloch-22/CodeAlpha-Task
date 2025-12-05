import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const languages = [
  { code: 'en', name: 'English' },
  { code: 'ur', name: 'Urdu' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'tr', name: 'Turkish' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
];

interface LanguageSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
}

export const LanguageSelect = ({ value, onValueChange, label }: LanguageSelectProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-foreground/80 mb-2 block">{label}</label>
      )}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-full bg-card border-border hover:border-primary/50 transition-colors">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
