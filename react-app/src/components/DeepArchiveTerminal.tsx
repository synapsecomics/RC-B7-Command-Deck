import { useState, useRef, useEffect } from 'react';
import { VideoModal } from './VideoModal';
import archiveData from '../data/archiveFiles.json';

interface TerminalLine {
  id: number;
  content: string;
  type: 'input' | 'output' | 'error' | 'success' | 'warning';
}

interface ArchiveFile {
  name: string;
  type: string;
  content?: string;
  children?: ArchiveFile[];
  hidden?: boolean;
  path?: string;
}

interface DeepArchiveTerminalProps {
  searchQuery?: string;
}

export const DeepArchiveTerminal: React.FC<DeepArchiveTerminalProps> = ({ searchQuery }) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState('');
  const [volatility, setVolatility] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
  const [lastDrift, setLastDrift] = useState(Date.now());
  const [lineCounter, setLineCounter] = useState(0);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; path: string; title: string }>({
    isOpen: false,
    path: '',
    title: ''
  });
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLine = (content: string, type: TerminalLine['type'] = 'output') => {
    setLines(prev => [...prev, { id: lineCounter, content, type }]);
    setLineCounter(prev => prev + 1);
  };

  const addDivider = () => {
    addLine('─'.repeat(60), 'output');
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle external search queries
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  // Volatility drift simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastDrift > 60000) { // 1 minute for demo
        setLastDrift(now);
        setVolatility(prev => {
          const next = prev === 'LOW' ? 'MEDIUM' : prev === 'MEDIUM' ? 'HIGH' : 'HIGH';
          if (next !== prev) {
            addLine(`[Archive drift detected • Volatility: ${next}]`, 'warning');
          }
          return next;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [lastDrift]);

  // Boot sequence
  useEffect(() => {
    addLine('[FIFTH‑LIGHT INTERFACE • Build rcb7‑da‑1.0]', 'warning');
    addLine('Welcome to the Deep Archive. Type <help> to begin.', 'output');
    addDivider();
    handleLs();
  }, []);

  const findFile = (name: string): ArchiveFile | null => {
    // Search visible files
    const searchInArray = (files: ArchiveFile[]): ArchiveFile | null => {
      for (const file of files) {
        if (file.name === name) return file;
        if (file.type === 'folder' && file.children) {
          const found = searchInArray(file.children);
          if (found) return found;
        }
      }
      return null;
    };

    let found = searchInArray(archiveData.visibleFiles);
    if (found) return found;

    // Search hidden files
    return archiveData.hiddenFiles.find(f => f.name === name) || null;
  };

  const getAllFiles = (): ArchiveFile[] => {
    const files: ArchiveFile[] = [];
    
    const addFromArray = (arr: ArchiveFile[]) => {
      arr.forEach(f => {
        if (f.type === 'folder' && f.children) {
          addFromArray(f.children);
        } else {
          files.push(f);
        }
      });
    };

    addFromArray(archiveData.visibleFiles);
    archiveData.hiddenFiles.forEach(f => files.push(f));
    
    return files;
  };

  const driftContent = (content: string): string => {
    if (volatility === 'LOW') return content;
    
    let drifted = content;
    const swaps = [
      ['light', 'lɪɢʜt'],
      ['song', 's͟o͟n͟g'],
      ['child', 'c͟h͟i͟l͟d'],
      ['map', 'mᵃp']
    ];
    
    swaps.forEach(([from, to]) => {
      if (Math.random() < 0.5) {
        drifted = drifted.replace(new RegExp(from, 'gi'), to);
      }
    });
    
    return drifted;
  };

  const handleLs = () => {
    addLine('ARCHIVE CONTENTS (visible):', 'output');
    archiveData.visibleFiles.forEach(file => {
      if (file.type === 'folder') {
        addLine(`📁 ${file.name}/`, 'output');
        if (file.children) {
          file.children.forEach(child => {
            addLine(`   📄 ${child.name}`, 'output');
          });
        }
      } else {
        addLine(`📄 ${file.name}`, 'output');
      }
    });
    addLine('', 'output');
    addLine('Use "search <keyword>" to find hidden files', 'warning');
  };

  const handleSearch = (keyword: string) => {
    const allFiles = getAllFiles();
    const matches = allFiles.filter(f => 
      (f.content || '').toLowerCase().includes(keyword.toLowerCase()) ||
      f.name.toLowerCase().includes(keyword.toLowerCase())
    );

    if (matches.length === 0) {
      addLine(`No results for "${keyword}"`, 'warning');
      return;
    }

    addLine(`Search results for "${keyword}":`, 'success');
    matches.forEach(file => {
      addLine(`📄 ${file.name}${file.hidden ? ' (hidden)' : ''}`, 'success');
      if (file.content) {
        const preview = file.content.substring(0, 100);
        addLine(`   Preview: ${preview}${file.content.length > 100 ? '...' : ''}`, 'output');
      }
    });
  };

  const handleView = (filename: string) => {
    const file = findFile(filename);
    if (!file) {
      addLine(`FILE NOT FOUND: ${filename}`, 'error');
      return;
    }

    if (file.type === 'folder') {
      addLine(`DIRECTORY: ${filename}`, 'warning');
      if (file.children && file.children.length > 0) {
        file.children.forEach(child => {
          addLine(`  📄 ${child.name}`, 'output');
        });
      } else {
        addLine('  [empty]', 'warning');
      }
      return;
    }

    if (file.type === 'video') {
      handlePlay(filename);
      return;
    }

    if (file.content) {
      const content = driftContent(file.content);
      addLine(`=== ${filename} ===`, 'success');
      content.split('\n').forEach(line => addLine(line, 'output'));
      addLine('=== END ===', 'success');

      // Special handling for Omelas test
      if (filename === 'omelas_test.txt') {
        setPendingPrompt('omelas-choice');
        addLine('', 'output');
        addLine('Do you walk away? (y/n)', 'warning');
      }
    }
  };

  const handlePlay = (filename: string) => {
    const file = findFile(filename);
    if (!file || file.type !== 'video') {
      addLine(`VIDEO NOT FOUND: ${filename}`, 'error');
      return;
    }

    addLine(`Playing: ${filename}`, 'success');
    addLine('Press <Esc> to close playback.', 'warning');
    
    setVideoModal({
      isOpen: true,
      path: file.path || `/public/${filename}`,
      title: filename
    });
  };

  const handleHelp = () => {
    addLine('Available commands:', 'output');
    addLine('  help                     Show this help', 'output');
    addLine('  ls                       List archive (visible)', 'output');
    addLine('  view <file>              View a text file', 'output');
    addLine('  play <media>             Play a media file', 'output');
    addLine('  search <keyword>         Search across visible + hidden', 'output');
    addLine('  clear                    Clear the screen', 'output');
    addLine('Noun:Verb forms:', 'output');
    addLine('  file:view <file>   video:play <media>   search:run <kw>', 'output');
    addDivider();
    addLine('Hints:', 'output');
    addLine('  Some files are hidden. Use search to find: valindra, omelas, butler', 'output');
    addLine('  Files may drift when idle. If it looks different, trust your eyes.', 'output');
  };

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      if (!command) return;

      addLine(`> ${command}`, 'input');
      setInput('');

      // Handle pending prompts
      if (pendingPrompt === 'omelas-choice') {
        if (command.toLowerCase() === 'y' || command.toLowerCase() === 'yes') {
          addLine('You choose to walk away from Omelas.', 'success');
          addLine('Some paths require courage to take the first step.', 'output');
        } else {
          addLine('You remain in the city.', 'warning');
          addLine('The song continues. The child still weeps.', 'output');
        }
        setPendingPrompt(null);
        return;
      }

      // Parse command
      const parts = command.split(' ');
      const verb = parts[0].toLowerCase();
      const arg = parts.slice(1).join(' ');

      // Handle noun:verb format
      if (verb.includes(':')) {
        const [noun, action] = verb.split(':');
        switch (noun) {
          case 'file':
            if (action === 'view') handleView(arg);
            break;
          case 'video':
            if (action === 'play') handlePlay(arg);
            break;
          case 'search':
            if (action === 'run') handleSearch(arg);
            break;
          default:
            addLine(`UNKNOWN NOUN:VERB: ${verb}`, 'error');
        }
        return;
      }

      // Handle regular commands
      switch (verb) {
        case 'help':
          handleHelp();
          break;
        case 'ls':
          handleLs();
          break;
        case 'view':
          if (arg) handleView(arg);
          else addLine('Usage: view <filename>', 'warning');
          break;
        case 'play':
          if (arg) handlePlay(arg);
          else addLine('Usage: play <filename>', 'warning');
          break;
        case 'search':
          if (arg) handleSearch(arg);
          else addLine('Usage: search <keyword>', 'warning');
          break;
        case 'clear':
          setLines([]);
          break;
        default:
          addLine(`UNKNOWN COMMAND: ${verb}`, 'error');
      }
    }
  };

  const getLineClass = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input': return 'text-crt-accent';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-crt-text';
    }
  };

  return (
    <div className="w-full">
      <div className="crt-panel p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-mono text-crt-accent text-glow">
              RC‑B7 • Fifth Light Deep Archive Terminal
            </h2>
            <p className="text-sm text-crt-muted font-mono">
              Type <span className="text-crt-accent">help</span> • Try{' '}
              <span className="text-crt-accent">ls</span>,{' '}
              <span className="text-crt-accent">search valindra</span>,{' '}
              <span className="text-crt-accent">play valindra_idle.mp4</span>
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-mono">
              <span className="text-crt-muted">ARCHIVE VOLATILITY: </span>
              <span className={volatility === 'HIGH' ? 'text-red-400' : volatility === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}>
                {volatility}
              </span>
            </div>
          </div>
        </div>

        {/* Terminal Display */}
        <div 
          ref={terminalRef}
          className="bg-black/50 border border-crt-muted/30 rounded p-4 h-96 overflow-y-auto font-mono text-sm relative crt-scanlines"
        >
          {lines.map(line => (
            <div key={line.id} className={getLineClass(line.type)}>
              {line.content}
            </div>
          ))}
          
          {/* Input line */}
          <div className="flex items-center text-crt-accent">
            <span>&gt; </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInput}
              className="bg-transparent border-none outline-none flex-1 text-crt-accent"
              autoComplete="off"
            />
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal(prev => ({ ...prev, isOpen: false }))}
        videoPath={videoModal.path}
        title={videoModal.title}
      />
    </div>
  );
};