import { useState } from "react";
import { Languages, ArrowRightLeft, Loader2, Copy, Check, Linkedin, Github, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelect, languages } from "@/components/LanguageSelect";
import { TranslationBox } from "@/components/TranslationBox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("en");
  const [targetLanguage, setTargetLanguage] = useState("ur");
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    if (sourceLanguage === targetLanguage) {
      toast.error("Source and target languages cannot be the same");
      return;
    }

    setIsTranslating(true);
    setTranslatedText("");

    try {
      const { data, error } = await supabase.functions.invoke('translate', {
        body: {
          text: sourceText,
          sourceLanguage: languages.find(l => l.code === sourceLanguage)?.name,
          targetLanguage: languages.find(l => l.code === targetLanguage)?.name,
        },
      });

      if (error) throw error;

      if (data?.translatedText) {
        setTranslatedText(data.translatedText);
        toast.success("Translation complete!");
      } else {
        throw new Error("No translation received");
      }
    } catch (error) {
      console.error('Translation error:', error);
      toast.error("Translation failed. Please try again.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleClear = () => {
    setSourceText("");
    setTranslatedText("");
    setCopied(false);
  };

  const handleCopy = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-center gap-4 animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-75 animate-pulse"></div>
                <div className="relative p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl">
                  <Languages className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent py-2">
  Language Translator
</h1>

            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl animate-slide-up">
          <div className="relative backdrop-blur-xl bg-white/5 rounded-[32px] shadow-2xl border border-white/10 overflow-hidden">
            {/* Glass overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/5 pointer-events-none"></div>
            
            <div className="relative z-10">
              {/* Language Selection */}
              <div className="p-8 border-b border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-6 items-end">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      From
                    </label>
                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20">
                      <LanguageSelect
                        value={sourceLanguage}
                        onValueChange={setSourceLanguage}
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSwapLanguages}
                    className="hidden md:flex mb-2 w-14 h-14 items-center justify-center backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-full border border-white/20 transition-all duration-300 hover:rotate-180 hover:shadow-xl hover:shadow-indigo-500/30 hover:scale-110"
                  >
                    <ArrowRightLeft className="h-5 w-5 text-white" />
                  </button>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      To
                    </label>
                    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-4 hover:bg-white/15 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                      <LanguageSelect
                        value={targetLanguage}
                        onValueChange={setTargetLanguage}
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSwapLanguages}
                  className="md:hidden mt-6 w-full flex items-center justify-center gap-2 py-3 px-6 backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 text-white transition-all duration-300 hover:shadow-lg"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                  <span className="font-medium">Swap Languages</span>
                </button>
              </div>

              {/* Translation Boxes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                {/* Source Text */}
                <div className="p-8">
                  <label className="block text-sm font-medium text-white/70 mb-4">
                    Enter text
                  </label>
                  <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 shadow-inner hover:bg-white/10 transition-all duration-300 focus-within:border-indigo-400/50 focus-within:shadow-lg focus-within:shadow-indigo-500/20">
                    <textarea
                      value={sourceText}
                      onChange={(e) => setSourceText(e.target.value)}
                      placeholder="Type or paste text to translate..."
                      className="w-full h-64 bg-transparent text-white placeholder:text-white/30 resize-none focus:outline-none text-lg leading-relaxed"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    />
                    {sourceText && (
                      <div className="absolute bottom-4 right-4 text-xs text-white/40">
                        {sourceText.length} characters
                      </div>
                    )}
                  </div>
                </div>

                {/* Translated Text */}
                <div className="p-8 bg-gradient-to-br from-white/5 via-transparent to-transparent">
                  <label className="block text-sm font-medium text-white/70 mb-4">
                    Translation
                  </label>
                  <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 shadow-inner">
                    <textarea
                      value={translatedText}
                      readOnly
                      placeholder="Translation will appear here..."
                      className="w-full h-64 bg-transparent text-white placeholder:text-white/30 resize-none focus:outline-none text-lg leading-relaxed"
                      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                    />
                    {translatedText && (
                      <>
                        <button
                          onClick={handleCopy}
                          className="absolute top-4 right-4 p-2.5 backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                        >
                          {copied ? (
                            <Check className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4 text-white/70 group-hover:text-white" />
                          )}
                        </button>
                        <div className="absolute bottom-4 right-4 text-xs text-white/40">
                          {translatedText.length} characters
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-8 border-t border-white/10">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={handleTranslate}
                    disabled={isTranslating || !sourceText.trim()}
                    className="relative group px-8 py-4 rounded-2xl font-semibold text-white text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-2xl"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400"></div>
                    <span className="relative flex items-center justify-center gap-2">
                      {isTranslating ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Translating...
                        </>
                      ) : (
                        <>
                          <Languages className="h-5 w-5" />
                          Translate
                        </>
                      )}
                    </span>
                  </button>

                  <button
                    onClick={handleClear}
                    disabled={!sourceText && !translatedText}
                    className="px-8 py-4 rounded-2xl font-semibold text-white/80 hover:text-white text-lg backdrop-blur-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 px-4 mt-12">
          <div className="container mx-auto max-w-6xl">
            <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8">
              <div className="flex flex-col items-center gap-6">
                <p className="text-white/90 text-lg font-medium text-center">
                  Developed by <span className="whitespace-nowrap bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">Muzammil Ahmed</span>
                </p>
                
                <div className="flex items-center gap-6">
                  <a
                    href="https://www.linkedin.com/in/muzammil-ahmed-0902612a5/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-blue-500/30"
                  >
                    <Linkedin className="h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
                    <div className="absolute inset-0 rounded-2xl bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                  </a>
                  
                  <a
                    href="https://github.com/MuzammilBaloch-22"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30"
                  >
                    <Github className="h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
                    <div className="absolute inset-0 rounded-2xl bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                  </a>
                  
                  <a
                    href="https://www.instagram.com/muzammil_baloch_22/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 backdrop-blur-xl bg-white/10 hover:bg-white/20 rounded-2xl border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-pink-500/30"
                  >
                    <Instagram className="h-6 w-6 text-white/70 group-hover:text-white transition-colors" />
                    <div className="absolute inset-0 rounded-2xl bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Index;