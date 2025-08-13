import { useState } from 'react';
import { DeepArchiveTerminal } from './components/DeepArchiveTerminal';
import { CrewManifest } from './components/CrewManifest';
import { WordCloud } from './components/WordCloud';

type View = 'command-deck' | 'archive' | 'crew' | 'word-cloud';

interface CrewMember {
  id: string;
  name: string;
  callsign?: string;
  role: string;
  assignment?: string;
  status: string;
  morale: number;
  fatigue: number;
  quote: string;
  origin?: string;
}

function App() {
  const [currentView, setCurrentView] = useState<View>('command-deck');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCrew, setSelectedCrew] = useState<CrewMember | null>(null);

  const handleHintClick = (hint: string) => {
    setSearchQuery(hint);
    setCurrentView('archive');
  };

  const handleCrewClick = (crew: CrewMember) => {
    setSelectedCrew(crew);
    // Could open a modal or navigate to crew detail view
  };

  const renderView = () => {
    switch (currentView) {
      case 'command-deck':
        return (
          <div className="space-y-8">
            <div className="crt-panel p-8 text-center">
              <div className="mb-6">
                {/* Logo */}
                <div className="w-16 h-16 mx-auto mb-4 relative rounded-lg bg-gradient-to-br from-crt-accent/35 to-crt-accent-2/25 border border-crt-accent/25 crt-scanlines">
                  <div className="absolute inset-0 flex items-center justify-center text-crt-accent text-xl font-bold text-glow">
                    ⟨8⟩
                  </div>
                </div>
                
                <h1 className="text-3xl font-mono text-crt-accent text-glow mb-2">
                  RC-B7 Command Deck
                </h1>
                <p className="text-crt-muted font-mono">
                  Fifth Light Deep Archive • Velvet Loop Initiative
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => setCurrentView('archive')}
                  className="crt-panel p-6 hover:border-crt-accent/50 transition-all text-center group"
                >
                  <div className="text-2xl mb-2 group-hover:text-crt-accent transition-colors">📁</div>
                  <div className="font-mono text-crt-text group-hover:text-crt-accent transition-colors">
                    Deep Archive
                  </div>
                  <div className="text-xs text-crt-muted mt-1">
                    Terminal Access
                  </div>
                </button>

                <button
                  onClick={() => setCurrentView('crew')}
                  className="crt-panel p-6 hover:border-crt-accent/50 transition-all text-center group"
                >
                  <div className="text-2xl mb-2 group-hover:text-crt-accent transition-colors">👥</div>
                  <div className="font-mono text-crt-text group-hover:text-crt-accent transition-colors">
                    Crew Manifest
                  </div>
                  <div className="text-xs text-crt-muted mt-1">
                    Live Status
                  </div>
                </button>

                <button
                  onClick={() => setCurrentView('word-cloud')}
                  className="crt-panel p-6 hover:border-crt-accent/50 transition-all text-center group"
                >
                  <div className="text-2xl mb-2 group-hover:text-crt-accent transition-colors">🔍</div>
                  <div className="font-mono text-crt-text group-hover:text-crt-accent transition-colors">
                    Search Hints
                  </div>
                  <div className="text-xs text-crt-muted mt-1">
                    Archive Queries
                  </div>
                </button>
              </div>

              <div className="mt-8 text-sm text-crt-muted font-mono">
                <p>
                  Status: <span className="text-green-400">OPERATIONAL</span> • 
                  Protocol: <span className="text-crt-accent">FIFTH LIGHT</span> • 
                  Build: <span className="text-crt-accent-2">rcb7-da-1.0</span>
                </p>
              </div>
            </div>
          </div>
        );

      case 'archive':
        return <DeepArchiveTerminal searchQuery={searchQuery} />;

      case 'crew':
        return <CrewManifest onCrewClick={handleCrewClick} />;

      case 'word-cloud':
        return <WordCloud onHintClick={handleHintClick} />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        {currentView !== 'command-deck' && (
          <div className="mb-6">
            <nav className="flex items-center gap-4 text-sm font-mono">
              <button
                onClick={() => setCurrentView('command-deck')}
                className="text-crt-accent hover:text-crt-accent-2 transition-colors"
              >
                ← Command Deck
              </button>
              
              <span className="text-crt-muted">/</span>
              
              <span className="text-crt-text capitalize">
                {currentView.replace('-', ' ')}
              </span>
            </nav>
          </div>
        )}

        {/* Main Content */}
        {renderView()}

        {/* Crew Detail Modal */}
        {selectedCrew && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="crt-panel p-6 max-w-md w-full">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-mono text-crt-accent text-glow">
                  Crew Detail
                </h3>
                <button
                  onClick={() => setSelectedCrew(null)}
                  className="text-crt-muted hover:text-crt-text transition-colors font-mono"
                >
                  [CLOSE]
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-mono text-crt-text font-semibold text-lg">
                    {selectedCrew.name}
                    {selectedCrew.callsign && (
                      <span className="text-crt-muted text-base ml-2">
                        ({selectedCrew.callsign})
                      </span>
                    )}
                  </h4>
                  <p className="text-crt-muted">{selectedCrew.role}</p>
                  {selectedCrew.assignment && (
                    <p className="text-crt-accent text-sm">{selectedCrew.assignment}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-crt-muted">Status: </span>
                    <span className="text-green-400 font-mono">
                      {selectedCrew.status.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="text-crt-muted">Morale: </span>
                    <span className="text-green-400 font-mono">
                      {Math.round(selectedCrew.morale)}%
                    </span>
                  </div>
                </div>

                <div className="border-t border-crt-muted/20 pt-4">
                  <p className="text-crt-accent italic font-mono text-sm">
                    "{selectedCrew.quote}"
                  </p>
                </div>

                {selectedCrew.origin && (
                  <div className="text-xs text-crt-muted">
                    Origin: {selectedCrew.origin}
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

export default App;
