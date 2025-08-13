import { useState, useEffect } from 'react';
import crewData from '../data/crew.json';

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

interface CrewManifestProps {
  onCrewClick?: (crew: CrewMember) => void;
}

const statusColors = {
  nominal: 'text-green-400',
  active: 'text-green-400',
  focused: 'text-blue-400',
  alert: 'text-yellow-400',
  analyzing: 'text-cyan-400',
  creating: 'text-purple-400',
  writing: 'text-purple-400',
  monitoring: 'text-blue-400',
  scanning: 'text-cyan-400',
  chaotic: 'text-red-400',
  strained: 'text-orange-400',
  fatigued: 'text-red-400',
};

export const CrewManifest: React.FC<CrewManifestProps> = ({ onCrewClick }) => {
  const [crew, setCrew] = useState<CrewMember[]>(crewData.crew);
  const [flashingCrewId, setFlashingCrewId] = useState<string | null>(null);

  // Simulate live status updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCrew(prevCrew => 
        prevCrew.map(member => {
          // Randomly update status for some crew members
          if (Math.random() < 0.1) {
            const statuses = ['nominal', 'active', 'focused', 'alert'];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
            
            // Flash effect when status changes
            if (newStatus !== member.status) {
              setFlashingCrewId(member.id);
              setTimeout(() => setFlashingCrewId(null), 500);
            }
            
            return {
              ...member,
              status: newStatus,
              morale: Math.max(60, Math.min(100, member.morale + (Math.random() - 0.5) * 5)),
              fatigue: Math.max(0, Math.min(50, member.fatigue + (Math.random() - 0.5) * 3))
            };
          }
          return member;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getMoraleColor = (morale: number) => {
    if (morale >= 80) return 'text-green-400';
    if (morale >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getFatigueColor = (fatigue: number) => {
    if (fatigue <= 20) return 'text-green-400';
    if (fatigue <= 35) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full space-y-4">
      <div className="crt-panel p-6">
        <h2 className="text-2xl font-mono text-crt-accent text-glow mb-6">
          RC-B7 Crew Manifest
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {crew.map((member) => (
            <div
              key={member.id}
              className={`
                crt-panel p-4 cursor-pointer hover:border-crt-accent/50 transition-all
                ${flashingCrewId === member.id ? 'animate-pulse border-crt-accent' : ''}
              `}
              onClick={() => onCrewClick?.(member)}
            >
              {/* Name and Role */}
              <div className="mb-3">
                <h3 className="font-mono text-crt-text font-semibold">
                  {member.name}
                  {member.callsign && (
                    <span className="text-crt-muted text-sm ml-2">
                      ({member.callsign})
                    </span>
                  )}
                </h3>
                <p className="text-sm text-crt-muted">{member.role}</p>
                {member.assignment && (
                  <p className="text-xs text-crt-accent">{member.assignment}</p>
                )}
              </div>

              {/* Status */}
              <div className="mb-3">
                <span className="text-xs text-crt-muted">STATUS: </span>
                <span className={`font-mono text-xs font-semibold ${
                  statusColors[member.status as keyof typeof statusColors] || 'text-crt-text'
                }`}>
                  {member.status.toUpperCase()}
                </span>
              </div>

              {/* EKG Pulse Visualization */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-crt-muted">VITALS:</span>
                </div>
                <div className="h-6 flex items-end space-x-1 bg-black/30 rounded p-1">
                  {Array(16).fill(0).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 pulse-ekg ${getMoraleColor(member.morale)}`}
                      style={{
                        height: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.1}s`
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Morale and Fatigue */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-crt-muted">MORALE: </span>
                  <span className={getMoraleColor(member.morale)}>
                    {Math.round(member.morale)}%
                  </span>
                </div>
                <div>
                  <span className="text-crt-muted">FATIGUE: </span>
                  <span className={getFatigueColor(member.fatigue)}>
                    {Math.round(member.fatigue)}%
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-3 pt-3 border-t border-crt-muted/20">
                <p className="text-xs text-crt-accent italic font-mono">
                  "{member.quote}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};