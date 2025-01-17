import React, { useState, useEffect } from 'react';
import { Music, Type, Video, Wand2, Play, Pause, Download, Share2, AlertCircle, Sparkles, Zap, Clock, Settings2 } from 'lucide-react';

export function ProjectEditor() {
  const [activeTab, setActiveTab] = useState('script');
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isPreviewingVoice, setIsPreviewingVoice] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [script, setScript] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Split script into lines for lyrical display
  const scriptLines = script.split(/[.!?]+/).filter(line => line.trim().length > 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && scriptLines.length > 0) {
      interval = setInterval(() => {
        setCurrentLyricIndex((prev) => (prev + 1) % scriptLines.length);
      }, 3000); // Change line every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying, scriptLines.length]);

  const handleGenerateScript = async () => {
    if (!script.trim()) {
      setError('Please enter some text to generate a script.');
      return;
    }

    try {
      setIsGeneratingScript(true);
      setError(null);
      
      // Simulate AI processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // AI-enhanced script with smart suggestions
      const enhancedScript = `🎬 AI-Enhanced Video Script

📝 Scene Breakdown:

1. Opening Hook (0:00 - 0:15)
${script.split('.')[0]}
[AI Suggestion: Start with a dynamic aerial shot]

2. Main Content (0:15 - 1:30)
${script}
[AI Suggestion: Use split-screen transitions for key points]

3. Call to Action (1:30 - 2:00)
[AI Suggestion: End with an immersive 3D animation]

🎨 Style Recommendations:
• Modern minimalist aesthetic
• Cinematic color grading
• Dynamic text animations
• Seamless scene transitions

🎵 Music Suggestions:
• Upbeat electronic for opening
• Ambient background during main content
• Rising crescendo for call to action

🎯 Engagement Optimizations:
• Add motion graphics for statistics
• Include subtle particle effects
• Use depth-of-field for emphasis
• Implement smooth camera movements`;

      setGeneratedScript(enhancedScript);
      setAiSuggestions([
        'Add dynamic transitions between scenes',
        'Include subtle background animations',
        'Optimize pacing for engagement',
        'Enhance visual hierarchy with motion',
      ]);
      setActiveTab('preview');
      setVideoPreview('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1600&auto=format&fit=crop');
      setIsPlaying(true);
      setCurrentLyricIndex(0);
    } catch (err) {
      setError('AI processing failed. Please try again.');
    } finally {
      setIsGeneratingScript(false);
    }
  };

  const handlePreviewVoice = async () => {
    try {
      setIsPreviewingVoice(true);
      setError(null);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (err) {
      setError('Voice generation failed. Please try again.');
    } finally {
      setIsPreviewingVoice(false);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex h-full bg-gray-900">
      {/* Left Sidebar */}
      <div className="w-16 bg-gray-800 border-r border-gray-700">
        <div className="flex flex-col items-center py-4 space-y-4">
          {[
            { id: 'script', icon: Type, label: 'Script' },
            { id: 'music', icon: Music, label: 'Music' },
            { id: 'preview', icon: Video, label: 'Preview' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`p-3 rounded-lg transition-all duration-200 group relative ${
                activeTab === id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              onClick={() => setActiveTab(id)}
            >
              <Icon className="h-6 w-6" />
              <span className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-900 overflow-y-auto text-white">
        {error && (
          <div className="m-6 p-4 bg-red-900/50 border border-red-500/50 rounded-lg flex items-center text-red-200">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        {activeTab === 'script' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-indigo-400" />
                AI Script Generator
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Estimated processing: 2-3 min
                </span>
                <span className="flex items-center">
                  <Settings2 className="h-4 w-4 mr-1" />
                  GPT-4 Powered
                </span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <textarea
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="w-full h-48 p-4 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-white placeholder-gray-500"
                  placeholder="Enter your video concept here..."
                />
                <div className="absolute bottom-4 right-4 text-sm text-gray-500">
                  {script.length} characters
                </div>
              </div>
              
              {generatedScript && (
                <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
                  <h3 className="text-sm font-medium text-gray-300 mb-4 flex items-center">
                    <Zap className="h-4 w-4 mr-2 text-indigo-400" />
                    AI Enhanced Script
                  </h3>
                  <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono">{generatedScript}</pre>
                </div>
              )}

              {aiSuggestions.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {aiSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-4 bg-gray-800/30 rounded-lg border border-gray-700 flex items-start">
                      <Sparkles className="h-4 w-4 mr-2 text-indigo-400 mt-0.5" />
                      <span className="text-sm text-gray-300">{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleGenerateScript}
                  disabled={isGeneratingScript || !script.trim()}
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/30"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  {isGeneratingScript ? 'AI Processing...' : 'Generate AI Script'}
                </button>
                <button
                  onClick={handlePreviewVoice}
                  disabled={isPreviewingVoice || !script}
                  className="inline-flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed border border-gray-700"
                >
                  {isPreviewingVoice ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isPreviewingVoice ? 'Playing...' : 'Preview Voiceover'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'music' && (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Music className="h-5 w-5 mr-2 text-indigo-400" />
              AI Music Selection
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 1, name: 'Dynamic Tech', duration: '3:24', category: 'AI Generated', bpm: 128 },
                { id: 2, name: 'Ambient Flow', duration: '2:45', category: 'AI Generated', bpm: 90 },
                { id: 3, name: 'Corporate Energy', duration: '3:10', category: 'AI Generated', bpm: 110 },
                { id: 4, name: 'Future Pulse', duration: '2:55', category: 'AI Generated', bpm: 140 },
              ].map((track) => (
                <div
                  key={track.id}
                  onClick={() => setSelectedTrack(track.id)}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedTrack === track.id
                      ? 'bg-indigo-600/20 border-indigo-500'
                      : 'bg-gray-800/50 border-gray-700 hover:border-indigo-500'
                  } border`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">{track.name}</h3>
                      <p className="text-sm text-gray-400">
                        {track.category} • {track.duration} • {track.bpm} BPM
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Would play audio preview
                      }}
                      className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                    >
                      <Play className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <Video className="h-5 w-5 mr-2 text-indigo-400" />
                AI Video Preview
              </h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {/* Would share video */}}
                  disabled={!videoPreview}
                  className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed border border-gray-700"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
                <button
                  onClick={() => {/* Would download video */}}
                  disabled={!videoPreview}
                  className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-800/50 text-white text-sm font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed border border-gray-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-9 aspect-h-16 bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
                {videoPreview ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={videoPreview} 
                      alt="AI Generated Video Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                      {/* Lyrical Text Display */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center px-8 py-4 backdrop-blur-sm bg-black/40 rounded-xl max-w-lg">
                          <p className="text-2xl font-bold text-white leading-relaxed tracking-wide animate-fade-in">
                            {scriptLines[currentLyricIndex]}
                          </p>
                        </div>
                      </div>
                      {/* Play/Pause Button */}
                      <button
                        onClick={togglePlayPause}
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white/20 hover:bg-white/30 rounded-full p-4 backdrop-blur-sm transition-all duration-200"
                      >
                        {isPlaying ? (
                          <Pause className="h-8 w-8 text-white" />
                        ) : (
                          <Play className="h-8 w-8 text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6">
                    <div className="mb-4">
                      {generatedScript ? (
                        <div className="text-gray-400 mb-4">
                          AI script is ready! Generate your video now.
                        </div>
                      ) : (
                        <div className="text-gray-400 mb-4">
                          Start by generating an AI script in the Script tab.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}