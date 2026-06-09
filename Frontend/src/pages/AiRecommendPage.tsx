import React, { useState } from 'react';
import { useAiRecommend } from '../hooks/useAiRecommend';
import { CatPawSpinner } from '../components/ui/Loader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Sparkles, Users, Building2, HelpCircle, Send, AlertTriangle } from 'lucide-react';
// Custom Markdown Parser to render beautiful styled text blocks
const MarkdownRenderer: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;
  const lines = content.split('\n');
  return (
    <div className="space-y-3.5 text-[#1A0A10]/80 leading-relaxed">
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        // Horizontal Rules
        if (trimmed === '---' || trimmed === '***') {
          return <hr key={idx} className="border-pink-100 my-4" />;
        }
        // Headers
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={idx} className="text-md font-bold text-[#C9184A] mt-4 mb-1 flex items-center gap-1">
              <span>🐾</span> {parseInlineMarkdown(trimmed.substring(4))}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={idx} className="text-lg font-black text-[#1A0A10] mt-6 mb-2 border-b border-pink-100 pb-1 flex items-center gap-1.5">
              <span>✨</span> {parseInlineMarkdown(trimmed.substring(3))}
            </h3>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h2 key={idx} className="text-xl font-extrabold text-[#C9184A] mt-6 mb-3 bg-gradient-to-r from-[#FF6B9D] to-[#C9184A] bg-clip-text text-transparent">
              {parseInlineMarkdown(trimmed.substring(2))}
            </h2>
          );
        }
        // Bullet Lists
        if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-4">
              <span className="text-[#FF6B9D] mt-1 shrink-0 font-bold text-lg">•</span>
              <span className="text-[#1A0A10]/75">{parseInlineMarkdown(trimmed.substring(2))}</span>
            </div>
          );
        }
        // Empty lines
        if (trimmed === '') {
          return <div key={idx} className="h-1.5" />;
        }
        // Standard Text Paragraphs
        return (
          <p key={idx} className="text-[#1A0A10]/75">
            {parseInlineMarkdown(line)}
          </p>
        );
      })}
    </div>
  );
};
// Helper to support Bold and Code text parsing
function parseInlineMarkdown(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-extrabold text-[#C9184A]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={index} className="bg-pink-50 text-[#C9184A] px-1.5 py-0.5 rounded font-mono text-xs border border-pink-100/50">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
export const AiRecommendPage: React.FC = () => {
  const {
    kidsFriendly,
    setKidsFriendly,
    apartmentFriendly,
    setApartmentFriendly,
    recommendation,
    setRecommendation,
    loading,
    error,
    getRecommendation,
    askCustomPrompt,
  } = useAiRecommend();
  const [activeTab, setActiveTab] = useState<'lifestyle' | 'prompt'>('lifestyle');
  const [customPrompt, setCustomPrompt] = useState('');
  const handleLifestyleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getRecommendation();
  };
  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;
    askCustomPrompt(customPrompt);
  };
  return (
    <div className="page-transition w-full max-w-3xl mx-auto space-y-8 pb-12">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1 bg-pink-100 text-[#C9184A] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          AI Cat Consultant
        </div>
        <h1 className="text-4xl font-extrabold text-[#1A0A10] tracking-tight">
          Ask Our Cat AI 🐱
        </h1>
        <p className="text-[#1A0A10]/60 font-medium max-w-md mx-auto text-sm">
          Use state of the art AI to get custom adoption matching suggestions or ask questions about cat behaviors.
        </p>
      </div>
      {/* Tabs */}
      <div className="flex bg-white p-1.5 rounded-2xl shadow-sm max-w-md mx-auto border border-pink-100/50">
        <button
          onClick={() => {
            setActiveTab('lifestyle');
            setRecommendation('');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'lifestyle'
              ? 'bg-[#FF6B9D] text-white shadow-sm'
              : 'text-[#1A0A10]/65 hover:text-[#FF6B9D] hover:bg-[#FFF0F6]'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Lifestyle Matcher
        </button>
        <button
          onClick={() => {
            setActiveTab('prompt');
            setRecommendation('');
          }}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === 'prompt'
              ? 'bg-[#FF6B9D] text-white shadow-sm'
              : 'text-[#1A0A10]/65 hover:text-[#FF6B9D] hover:bg-[#FFF0F6]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Ask Anything
        </button>
      </div>
      {/* Inputs Form */}
      <Card className="p-8 border border-pink-100/40">
        {activeTab === 'lifestyle' ? (
          <form onSubmit={handleLifestyleSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-[#1A0A10] border-b border-pink-50 pb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#FF6B9D]" />
              Cat Matcher Criteria
            </h3>
            <p className="text-xs text-[#1A0A10]/50">
              Select your household living setup details, and our AI will search matching cat characteristics.
            </p>
            <div className="space-y-4">
              {/* Kids Friendly Toggle */}
              <div 
                onClick={() => setKidsFriendly(!kidsFriendly)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  kidsFriendly 
                    ? 'border-[#FF6B9D] bg-pink-50/30' 
                    : 'border-pink-50 bg-white hover:border-pink-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${kidsFriendly ? 'bg-[#FF6B9D] text-white' : 'bg-[#FFF0F6] text-[#FF6B9D]'}`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A0A10]">Kids Friendly</h4>
                    <p className="text-xs text-[#1A0A10]/60">Requires a gentle, patient cat for households with active kids.</p>
                  </div>
                </div>
                {/* Switch indicator */}
                <div className={`w-11 h-6 rounded-full flex items-center p-0.5 transition-colors duration-300 ${kidsFriendly ? 'bg-[#FF6B9D]' : 'bg-pink-100'}`}>
                  <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ${kidsFriendly ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
              {/* Apartment Friendly Toggle */}
              <div 
                onClick={() => setApartmentFriendly(!apartmentFriendly)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  apartmentFriendly 
                    ? 'border-[#FF6B9D] bg-pink-50/30' 
                    : 'border-pink-50 bg-white hover:border-pink-100'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${apartmentFriendly ? 'bg-[#FF6B9D] text-white' : 'bg-[#FFF0F6] text-[#FF6B9D]'}`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1A0A10]">Apartment Friendly</h4>
                    <p className="text-xs text-[#1A0A10]/60">Ideal for smaller spaces, matching with low-noise and quiet cats.</p>
                  </div>
                </div>
                {/* Switch indicator */}
                <div className={`w-11 h-6 rounded-full flex items-center p-0.5 transition-colors duration-300 ${apartmentFriendly ? 'bg-[#FF6B9D]' : 'bg-pink-100'}`}>
                  <div className={`bg-white w-5 h-5 rounded-full shadow-sm transform transition-transform duration-300 ${apartmentFriendly ? 'translate-x-5' : 'translate-x-0'}`} />
                </div>
              </div>
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              fullWidth
              className="py-3.5 cursor-pointer"
            >
              Get AI Recommendation ✨
            </Button>
          </form>
        ) : (
          <form onSubmit={handlePromptSubmit} className="space-y-6">
            <h3 className="text-xl font-bold text-[#1A0A10] border-b border-pink-50 pb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#FF6B9D]" />
              Ask Cat AI Whiskers
            </h3>
            <p className="text-xs text-[#1A0A10]/50">
              Type custom questions about cat behaviors, breeds, training, or healthcare!
            </p>
            <div className="relative">
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Why do cats knead blankets? What are the traits of a British Shorthair?"
                rows={4}
                className="w-full bg-white text-[#1A0A10] border-2 border-pink-100 rounded-2xl p-4 focus:outline-none focus:border-[#FF6B9D] focus:ring-4 focus:ring-[#FF6B9D]/15 placeholder-pink-300 transition-all duration-300 font-medium resize-none"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !customPrompt.trim()}
              fullWidth
              className="py-3.5 cursor-pointer"
            >
              <Send className="w-4 h-4 mr-2" /> Send Prompt to AI
            </Button>
          </form>
        )}
      </Card>
      {/* Loading & Recommendation Response Block */}
      <div className="min-h-[100px]">
        {/* Loading Spinner */}
        {loading && (
          <div className="bg-white rounded-3xl p-8 border border-pink-100/50 shadow-[0_8px_32px_rgba(255,107,157,0.15)] flex justify-center items-center">
            <CatPawSpinner text="AI is scanning cat whiskers..." />
          </div>
        )}
        {/* Error State */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-8 text-center space-y-3 shadow-sm">
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-[#C9184A] mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-[#1A0A10]">AI Consultant encountered an error</h4>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        )}
        {/* AI Recommendation Result Block */}
        {!loading && !error && recommendation && (
          <div className="bg-white rounded-3xl p-8 border-2 border-pink-100 shadow-[0_12px_40px_rgba(255,107,157,0.2)] animate-[slide-up_0.4s_ease-out_forwards]">
            {/* Header info */}
            <div className="flex items-center gap-3 border-b border-pink-50 pb-4 mb-6">
              <div className="w-10 h-10 bg-[#FFF0F6] rounded-xl flex items-center justify-center text-[#FF6B9D]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-[#1A0A10]">AI Recommendation Result</h4>
                <p className="text-xs text-gray-400">Response generated in real-time</p>
              </div>
            </div>
            {/* Markdown rendered content */}
            <div className="bg-gradient-to-tr from-pink-50/20 to-transparent p-6 rounded-2xl border border-pink-50/50">
              <MarkdownRenderer content={recommendation} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};