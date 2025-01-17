import React, { useState } from 'react';
import { Video, Plus, Settings, X, Sparkles } from 'lucide-react';

export function Header() {
  const [showSettings, setShowSettings] = useState(false);

  const handleNewProject = () => {
    // In real world, this would create a new project in the database
    console.log('Creating new project...');
  };

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="bg-white/10 p-2 rounded-lg">
              <Video className="h-8 w-8 text-white" />
            </div>
            <div className="ml-3">
              <span className="text-xl font-bold text-white">VideoSync AI</span>
              <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full text-white">BETA</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleNewProject}
              className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-sm font-medium rounded-lg text-white transition-all duration-200 border border-white/20 backdrop-blur-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </button>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showSettings
                  ? 'bg-white/20 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Settings"
            >
              {showSettings ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="absolute right-4 mt-2 w-96 rounded-xl shadow-lg bg-white/10 backdrop-blur-xl border border-white/20 p-6 text-white">
          <h3 className="text-lg font-medium mb-4">AI Settings</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">AI Model</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                <option value="gpt4">GPT-4 (Recommended)</option>
                <option value="gpt3">GPT-3.5 Turbo</option>
                <option value="custom">Custom Model</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Video Quality</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/20">
                <option value="4k">4K Ultra HD</option>
                <option value="1080p">1080p Full HD</option>
                <option value="720p">720p HD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Style Transfer</label>
              <div className="grid grid-cols-4 gap-2">
                {['Modern', 'Cinematic', 'Vintage', 'Minimal'].map((style) => (
                  <button
                    key={style}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-medium transition-all duration-200"
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}