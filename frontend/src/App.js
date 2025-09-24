import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Copy, Share2, Sparkles, RefreshCw, Heart, Brain, Star, Sun, Target, Users, BookOpen, Zap, Mountain, Smile } from "lucide-react";

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const API = `${API_BASE}/api`;

const THEMES = [
  { name: "Love", icon: Heart, color: "bg-gradient-to-br from-pink-500 to-rose-400", description: "Quotes about love, relationships, and connection" },
  { name: "Wisdom", icon: Brain, color: "bg-gradient-to-br from-purple-500 to-indigo-400", description: "Deep insights and life lessons" },
  { name: "Success", icon: Star, color: "bg-gradient-to-br from-yellow-500 to-orange-400", description: "Achievement, ambition, and triumph" },
  { name: "Hope", icon: Sun, color: "bg-gradient-to-br from-blue-500 to-cyan-400", description: "Optimism and positive outlook" },
  { name: "Motivation", icon: Target, color: "bg-gradient-to-br from-green-500 to-emerald-400", description: "Inspiration and drive to succeed" },
  { name: "Friendship", icon: Users, color: "bg-gradient-to-br from-teal-500 to-blue-400", description: "Bonds, loyalty, and companionship" },
  { name: "Learning", icon: BookOpen, color: "bg-gradient-to-br from-indigo-500 to-purple-400", description: "Growth, education, and discovery" },
  { name: "Innovation", icon: Zap, color: "bg-gradient-to-br from-orange-500 to-red-400", description: "Creativity and breakthrough thinking" },
  { name: "Peace", icon: Mountain, color: "bg-gradient-to-br from-slate-500 to-gray-400", description: "Tranquility and inner calm" },
  { name: "Happiness", icon: Smile, color: "bg-gradient-to-br from-amber-500 to-yellow-400", description: "Joy and contentment" }
];

const QuoteGenerator = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [copiedQuote, setCopiedQuote] = useState(false);

  const generateQuote = async (theme) => {
    setIsGenerating(true);
    setError(null);
    setSelectedTheme(theme);

    try {
      const response = await axios.post(`${API}/generate-quote`, {
        theme: theme.name
      });

      if (response.data.success) {
        setCurrentQuote({
          text: response.data.quote,
          theme: response.data.theme,
          author: response.data.author
        });
      } else {
        setError(response.data.error || 'Failed to generate quote');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Quote generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyQuote = async () => {
    if (currentQuote) {
      try {
        await navigator.clipboard.writeText(`"${currentQuote.text}" - ${currentQuote.author}`);
        setCopiedQuote(true);
        setTimeout(() => setCopiedQuote(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const shareQuote = async () => {
    if (currentQuote && navigator.share) {
      try {
        await navigator.share({
          title: 'AI Generated Quote',
          text: `"${currentQuote.text}" - ${currentQuote.author}`,
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    } else {
      // Fallback to copy
      copyQuote();
    }
  };

  const regenerateQuote = () => {
    if (selectedTheme) {
      generateQuote(selectedTheme);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Quote Generator
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover unique, AI-created quotes tailored to any theme. Select a topic below to generate fresh inspiration.
          </p>
        </div>

        {/* Theme Grid */}
        {!currentQuote && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              Choose Your Theme
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {THEMES.map((theme) => {
                const IconComponent = theme.icon;
                return (
                  <Card
                    key={theme.name}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 text-white relative overflow-hidden group ${
                      isGenerating && selectedTheme?.name === theme.name
                        ? 'animate-pulse'
                        : ''
                    }`}
                    onClick={() => !isGenerating && generateQuote(theme)}
                  >
                    <div className={`${theme.color} absolute inset-0`} />
                    <CardContent className="relative z-10 p-6 text-center">
                      <IconComponent className="w-8 h-8 mx-auto mb-3" />
                      <h3 className="font-bold text-lg mb-2">{theme.name}</h3>
                      <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                        {theme.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-white rounded-lg shadow-lg">
              <RefreshCw className="w-5 h-5 animate-spin text-blue-600" />
              <span className="text-lg font-medium text-gray-700">
                Generating your {selectedTheme?.name?.toLowerCase()} quote...
              </span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-red-600">{error}</span>
            </div>
          </div>
        )}

        {/* Generated Quote Display */}
        {currentQuote && !isGenerating && (
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
              <CardHeader className="text-center pb-4">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {selectedTheme && <selectedTheme.icon className="w-6 h-6 text-gray-600" />}
                  <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                    {currentQuote.theme}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="text-center px-8 pb-8">
                <blockquote className="text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed mb-6 italic">
                  "{currentQuote.text}"
                </blockquote>
                <p className="text-lg text-gray-600 mb-8">— {currentQuote.author}</p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    onClick={copyQuote}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    {copiedQuote ? 'Copied!' : 'Copy Quote'}
                  </Button>

                  <Button
                    onClick={shareQuote}
                    variant="outline"
                    size="lg"
                    className="gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>

                  <Button
                    onClick={regenerateQuote}
                    size="lg"
                    className="gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    New Quote
                  </Button>

                  <Button
                    onClick={() => {
                      setCurrentQuote(null);
                      setSelectedTheme(null);
                      setError(null);
                    }}
                    variant="ghost"
                    size="lg"
                    className="gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Choose New Theme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8">
          <p className="text-gray-500 text-sm">
            Powered by AI • Created with ❤️ by{' '}
            <a
              href="https://fenado.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Fenado
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuoteGenerator />}>
            <Route index element={<QuoteGenerator />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
