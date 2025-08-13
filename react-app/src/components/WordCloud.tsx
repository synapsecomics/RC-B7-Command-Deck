import { useState } from 'react';
import archiveData from '../data/archiveFiles.json';

interface WordCloudProps {
  onHintClick: (hint: string) => void;
}

export const WordCloud: React.FC<WordCloudProps> = ({ onHintClick }) => {
  const [activeHint, setActiveHint] = useState<string | null>(null);
  
  const hints = archiveData.searchHints;
  
  const handleHintClick = (hint: string) => {
    setActiveHint(hint);
    onHintClick(hint);
    
    // Clear active state after animation
    setTimeout(() => setActiveHint(null), 300);
  };

  const getHintSize = (hint: string) => {
    // Vary sizes based on hint importance/frequency
    const sizes = {
      'valindra': 'text-xl',
      'omelas': 'text-lg', 
      'butler': 'text-lg',
      'song': 'text-base',
      'child': 'text-base',
      'map': 'text-base',
      'drift': 'text-sm',
      'echo': 'text-sm',
      'void': 'text-sm'
    };
    return sizes[hint as keyof typeof sizes] || 'text-base';
  };

  const getHintColor = (hint: string) => {
    // Color coding for different hint categories
    const colors = {
      'valindra': 'text-crt-accent hover:text-crt-accent-2',
      'omelas': 'text-red-400 hover:text-red-300',
      'butler': 'text-yellow-400 hover:text-yellow-300',
      'song': 'text-green-400 hover:text-green-300',
      'child': 'text-pink-400 hover:text-pink-300',
      'map': 'text-blue-400 hover:text-blue-300',
      'drift': 'text-purple-400 hover:text-purple-300',
      'echo': 'text-cyan-400 hover:text-cyan-300',
      'void': 'text-gray-400 hover:text-gray-300'
    };
    return colors[hint as keyof typeof colors] || 'text-crt-text hover:text-crt-accent';
  };

  return (
    <div className="w-full">
      <div className="crt-panel p-6">
        <h3 className="text-lg font-mono text-crt-accent text-glow mb-4">
          Archive Search Hints
        </h3>
        
        <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px]">
          {hints.map((hint, index) => (
            <button
              key={hint}
              onClick={() => handleHintClick(hint)}
              className={`
                font-mono px-3 py-2 rounded border border-crt-muted/30 
                transition-all duration-200 hover:border-current
                ${getHintSize(hint)} ${getHintColor(hint)}
                ${activeHint === hint ? 'animate-pulse border-current scale-110' : ''}
                hover:scale-105 hover:shadow-lg hover:shadow-current/20
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
                transform: `rotate(${(Math.random() - 0.5) * 4}deg)`
              }}
            >
              {hint}
            </button>
          ))}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-crt-muted font-mono">
            Click any hint to search the deep archive
          </p>
          <p className="text-xs text-crt-muted/70 font-mono mt-1">
            Some files are hidden and can only be found through search
          </p>
        </div>
      </div>
    </div>
  );
};