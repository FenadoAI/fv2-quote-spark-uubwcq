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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header with Hero Image */}
        <div className="text-center mb-16 relative">
          {/* Hero Background */}
          <div className="relative mb-12 rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-12 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-lg">
                    <Sparkles className="w-10 h-10 text-white" />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    AI Quote Spark
                  </h1>
                </div>
                <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
                  Transform any moment with AI-crafted wisdom. Choose your inspiration, and let artificial intelligence create the perfect quote for your soul.
                </p>
                <div className="flex items-center justify-center gap-2 mt-6 text-gray-600">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white shadow-sm"></div>
                    <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full border-2 border-white shadow-sm"></div>
                  </div>
                  <span className="text-sm font-medium ml-2">Trusted by thousands of inspiration seekers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Theme Grid */}
        {!currentQuote && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
                Choose Your Inspiration
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Select a theme that resonates with your current mood and let AI craft the perfect words for you
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {THEMES.map((theme, index) => {
                const IconComponent = theme.icon;
                return (
                  <Card
                    key={theme.name}
                    className={`cursor-pointer theme-card-hover border-0 text-white relative overflow-hidden group transform scale-in ${
                      isGenerating && selectedTheme?.name === theme.name
                        ? 'gentle-pulse scale-105'
                        : ''
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`
                    }}
                    onClick={() => !isGenerating && generateQuote(theme)}
                  >
                    <div className={`${theme.color} absolute inset-0 group-hover:scale-110 transition-transform duration-500`} />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />

                    {/* Sparkle Effect */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Sparkles className="w-4 h-4 text-white/80 animate-sparkle" />
                    </div>

                    <CardContent className="relative z-10 p-8 text-center h-full flex flex-col justify-between">
                      <div>
                        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-12 h-12 mx-auto drop-shadow-lg" />
                        </div>
                        <h3 className="font-bold text-xl mb-3 drop-shadow-sm">{theme.name}</h3>
                        <p className="text-sm opacity-90 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed">
                          {theme.description}
                        </p>
                      </div>

                      {/* Interactive Hover Effect */}
                      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="w-full h-0.5 bg-white/30 rounded-full">
                          <div className="h-full bg-white rounded-full w-0 group-hover:w-full transition-all duration-500"></div>
                        </div>
                        <p className="text-xs mt-2 font-medium">Click to generate</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Enhanced Loading State */}
        {isGenerating && (
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-2xl shadow-2xl">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6">
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="relative">
                      <RefreshCw className="w-8 h-8 animate-spin text-blue-600" />
                      <div className="absolute inset-0 w-8 h-8 border-2 border-blue-200 rounded-full animate-ping"></div>
                    </div>
                    <div className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Crafting your {selectedTheme?.name?.toLowerCase()} quote...
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse transform scale-x-0 origin-left"
                         style={{
                           animation: 'progressBar 3s ease-in-out infinite'
                         }}>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mt-3">
                    AI is analyzing thousands of inspirational thoughts...
                  </p>
                </div>
              </div>

              {/* Floating Sparkles */}
              <div className="absolute -top-4 -left-4 text-yellow-400 animate-bounce">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -right-4 text-purple-400 animate-bounce" style={{animationDelay: '1s'}}>
                <Sparkles className="w-4 h-4" />
              </div>
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

        {/* Enhanced Generated Quote Display */}
        {currentQuote && !isGenerating && (
          <div className="max-w-5xl mx-auto mb-16 relative">
            {/* Quote Card with Beautiful Design */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl transform scale-110 animate-pulse"></div>

              <Card className="relative bg-white/95 backdrop-blur-sm shadow-2xl border-0 overflow-hidden quote-reveal">
                {/* Animated Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 rounded-lg">
                  <div className="bg-white h-full w-full rounded-lg"></div>
                </div>

                <div className="relative z-10">
                  <CardHeader className="text-center pb-6 pt-12">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      {selectedTheme && (
                        <div className={`p-3 rounded-2xl shadow-lg ${selectedTheme.color}`}>
                          <selectedTheme.icon className="w-8 h-8 text-white" />
                        </div>
                      )}
                      <div className="text-center">
                        <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider block">
                          {currentQuote.theme}
                        </span>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-2"></div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="text-center px-12 pb-12">
                    {/* Quote Text with Enhanced Typography */}
                    <div className="relative mb-8">
                      <div className="absolute -top-4 -left-4 text-6xl text-blue-200 font-serif opacity-50">"</div>
                      <blockquote className="text-3xl md:text-4xl font-serif text-gray-800 leading-relaxed italic relative z-10 px-8">
                        {currentQuote.text}
                      </blockquote>
                      <div className="absolute -bottom-8 -right-4 text-6xl text-purple-200 font-serif opacity-50 rotate-180">"</div>
                    </div>

                    <p className="text-xl text-gray-600 mb-10 font-medium">
                      — {currentQuote.author}
                    </p>

                    {/* Enhanced Action Buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <Button
                        onClick={copyQuote}
                        variant="outline"
                        size="lg"
                        className={`gap-2 border-2 hover:scale-105 transition-all duration-300 ${
                          copiedQuote
                            ? 'border-green-500 text-green-600 bg-green-50'
                            : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        <Copy className="w-5 h-5" />
                        {copiedQuote ? 'Copied!' : 'Copy Quote'}
                      </Button>

                      <Button
                        onClick={shareQuote}
                        variant="outline"
                        size="lg"
                        className="gap-2 border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 hover:scale-105 transition-all duration-300"
                      >
                        <Share2 className="w-5 h-5" />
                        Share
                      </Button>

                      <Button
                        onClick={regenerateQuote}
                        size="lg"
                        className="gap-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 hover:scale-105 transition-all duration-300 shadow-lg btn-glow"
                      >
                        <RefreshCw className="w-5 h-5" />
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
                        className="gap-2 hover:bg-gradient-to-r hover:from-pink-50 hover:to-orange-50 hover:scale-105 transition-all duration-300"
                      >
                        <Sparkles className="w-5 h-5" />
                        Choose New Theme
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 text-yellow-400 animate-float">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="absolute -top-6 -right-12 text-pink-400 animate-float" style={{animationDelay: '2s'}}>
              <Star className="w-6 h-6" />
            </div>
            <div className="absolute -bottom-6 -left-12 text-blue-400 animate-float" style={{animationDelay: '4s'}}>
              <Heart className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* Enhanced Footer */}
        <footer className="relative text-center py-16 mt-16">
          <div className="relative z-10">
            <div className="mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-blue-300 rounded-full"></div>
                <Sparkles className="w-6 h-6 text-blue-500" />
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-purple-300 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent mb-2">
                AI Quote Spark
              </h3>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                Transforming thoughts into inspiration, one quote at a time. Powered by advanced AI technology.
              </p>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Brain className="w-4 h-4" />
                <span>AI Powered</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4" />
                <span>Instant Generation</span>
              </div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4 text-red-400" />
                <span>Made with Love</span>
              </div>
            </div>

            <p className="text-gray-500 text-sm">
              Created by{' '}
              <a
                href="https://fenado.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200"
              >
                Fenado
              </a>
              {' '}• Inspiring minds worldwide
            </p>
          </div>

          {/* Footer Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 to-transparent rounded-t-3xl"></div>
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
