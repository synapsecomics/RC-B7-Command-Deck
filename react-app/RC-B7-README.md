# RC-B7 Command Deck - React Implementation

A React/TypeScript implementation of the RC-B7 Command Deck interface featuring the Fifth Light Deep Archive Terminal, Crew Manifest system, and interactive search components.

## 🚀 Quick Start

```bash
cd react-app
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## 🎯 Features

### DeepArchiveTerminal.tsx
- **Fifth Light Protocol CLI Terminal** with archive volatility simulation
- **Noun:verb command system** (e.g., `file:view`, `video:play`, `search:run`)
- **Hidden files discovery** via search functionality
- **Omelas Test** interactive fiction with Butler quote
- **Content drift simulation** based on volatility levels
- **Video modal integration** for media playback

### VideoModal.tsx
- **CRT scanline overlay** for authentic retro display
- **Auto-closing playback** after video completion
- **Glyph flash effects** on video start
- **Keyboard navigation** (ESC to close)

### CrewManifest.tsx
- **Live crew status** with real-time updates
- **EKG pulse visualization** for vital signs
- **Status flash effects** when crew status changes
- **Morale and fatigue tracking** with color-coded indicators
- **Interactive crew cards** with detailed modal views

### WordCloud.tsx
- **Clickable hint chips** for archive search terms
- **Auto-navigation** to archive terminal with search execution
- **Color-coded categories** for different hint types
- **Animated hover effects** and scaling

## 🎨 Styling

The application uses **Tailwind CSS** with a custom galaxy purple CRT theme:

- **Color Palette**: Galaxy purple (`#b293ff`), cyan accents (`#6be3ff`), dark backgrounds
- **CRT Effects**: Scanlines, glowing text, retro terminal aesthetics
- **Animations**: EKG pulses, glyph flashes, hover transitions
- **Typography**: Monospace fonts for terminal authenticity

## 📁 Project Structure

```
react-app/
├── src/
│   ├── components/
│   │   ├── DeepArchiveTerminal.tsx
│   │   ├── VideoModal.tsx
│   │   ├── CrewManifest.tsx
│   │   └── WordCloud.tsx
│   ├── data/
│   │   ├── crew.json
│   │   └── archiveFiles.json
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── public/
│   └── valindra_idle.mp4.README
└── package.json
```

## 🎮 Commands

### Terminal Commands
- `help` - Show available commands
- `ls` - List visible archive files
- `search <keyword>` - Search for hidden files
- `view <filename>` - Display file contents
- `play <filename>` - Open video modal
- `clear` - Clear terminal screen

### Noun:Verb Commands
- `file:view <filename>`
- `video:play <filename>`
- `search:run <keyword>`

## 📊 Data Files

### crew.json
Contains crew member data with:
- Personal information (name, role, callsign)
- Status tracking (nominal, active, alert, etc.)
- Morale and fatigue percentages
- Dynamic quotes and assignments

### archiveFiles.json
Archive structure with:
- **Visible files**: Accessible via `ls` command
- **Hidden files**: Discoverable through search
- **Content**: Text files, folders, video references
- **Search hints**: Keyword suggestions for discovery

## 🔍 Hidden Content

The archive contains several hidden files discoverable through search:

- **omelas_test.txt**: Interactive fiction based on Ursula K. Le Guin's work
- **octavia_butler_quote.txt**: Quote from Octavia E. Butler
- **valindra_idle.mp4**: Video file (placeholder - user must provide actual video)

## 🎥 Video Integration

The application expects a video file at `/public/valindra_idle.mp4`. This file is referenced but not included. Users should place their own MP4 video at this location for full functionality.

## 🛠 Development

### Building
```bash
npm run build
```

### Type Checking
```bash
npm run tsc
```

### Technologies Used
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Custom CSS animations** for CRT effects

## 🎯 Usage Examples

1. **Search for hidden files**: Type `search valindra` in the terminal
2. **View the Omelas test**: `view omelas_test.txt` and interact with the prompt
3. **Check crew status**: Navigate to Crew Manifest to see live updates
4. **Use search hints**: Click any hint in the Word Cloud to auto-search

## ⚠️ Known Issues

- React key warnings in console (duplicate keys from rapid terminal updates)
- Tailwind utility class warnings for custom CSS variables
- Video modal requires actual video file to function fully

## 🎨 Customization

### Adding New Crew Members
Edit `src/data/crew.json` and add new crew objects with required fields.

### Adding Archive Files
Modify `src/data/archiveFiles.json` to include new visible or hidden files.

### Styling Updates
Modify `tailwind.config.js` and `src/index.css` for theme changes.

## 📜 License

Part of the RC-B7 Command Deck / Velvet Loop Initiative project.

---

**Status**: OPERATIONAL • **Protocol**: FIFTH LIGHT • **Build**: rcb7-da-1.0