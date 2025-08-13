import { useEffect, useRef, useState } from 'react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoPath: string;
  title?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({ 
  isOpen, 
  onClose, 
  videoPath, 
  title = "Video Playback" 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showGlyphFlash, setShowGlyphFlash] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play();
      
      // Trigger glyph flash on video start
      setShowGlyphFlash(true);
      setTimeout(() => setShowGlyphFlash(false), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleVideoEnd = () => {
    // Auto-close after video ends
    setTimeout(onClose, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="relative max-w-4xl w-full">
        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none z-10 crt-scanlines opacity-30"></div>
        
        {/* Glyph Flash Effect */}
        {showGlyphFlash && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="text-6xl text-crt-accent glyph-flash font-mono">
              ⟨8⟩
            </div>
          </div>
        )}
        
        {/* Video Container */}
        <div className="crt-panel p-6 relative">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-mono text-crt-accent text-glow">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-crt-muted hover:text-crt-text transition-colors font-mono"
              aria-label="Close video"
            >
              [ESC]
            </button>
          </div>
          
          <div className="relative bg-black rounded border border-crt-accent/50">
            <video
              ref={videoRef}
              className="w-full h-auto max-h-[70vh] rounded"
              controls
              onEnded={handleVideoEnd}
              preload="metadata"
            >
              <source src={videoPath} type="video/mp4" />
              <p className="text-crt-muted p-4">
                Video playback not supported. Please ensure the video file exists at: {videoPath}
              </p>
            </video>
          </div>
          
          <div className="mt-4 text-sm text-crt-muted font-mono">
            Press <span className="text-crt-accent">[ESC]</span> to close playback
          </div>
        </div>
      </div>
    </div>
  );
};