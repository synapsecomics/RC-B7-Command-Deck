# ⚡ RC-B7 Command Deck

A deployable, sci-fi web app for mission control, status tracking, and interactive console actions aboard SFS Wanderer.  
This deck reflects the psychological toll of resistance against the Rain Protocol, Vector Prime, and Five Lights Axiom with immersive and dynamic UI.

![Command Deck Screenshot](images/screenshot.png)

---

## Features

- **Live Crew Status**: Color-coded vitals, EKG pulse animations, anchor tracking
- **Central Console**: Status indicator, command buttons, network map
- **Node Navigation**: CREW bios, NAV star chart, DATA STREAM search, COMMS panel
- **Activity Log**: Timestamped, clickable entries for directives and ARG hooks
- **Faction Comms**: Dynamic trust/casualty stats, narrative interactions
- **Dark/Light Mode Toggle**:  
  - **Default**: Rain Protocol/Oracle color scheme (neon cyan, amber, deep navy, black glass, glitch/rain overlays)  
  - **Birthday Cake Mode**: Pastel pink, blue, yellow, white, playful gradients
- **Responsive & Accessible**: ARIA, semantic HTML, mobile-friendly
- **Narrative Integration**: Rain/glitch overlays, trust pop-ups, UI degradation, lore tooltips

---

## Getting Started

### Prerequisites

- Modern browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for local dev server)

### Installation

```sh
git clone https://github.com/synapsecomics/RC-B7-Command-Deck.git
cd RC-B7-Command-Deck
```
Open `index.html` in your browser, or run a local dev server:

```sh
npx serve
```

---

## Usage

- Use node navigation to switch panels (CREW, NAV, DATA STREAM, COMMS)
- Interact with command buttons:
    - **INITIATE**: Begin systems check
    - **ENGAGE**: Activate command deck
    - **OPEN LINK**: Open artifact in new tab
    - **COOPIMATES**: Send co-op ping
- Monitor live status and activity log for updates
- Toggle dark/light mode via the button in the UI

---

## Customization

- Edit `/styles/styles.css` for colors, fonts, and rain/glitch overlays (default mode = Oracle colors, light mode = birthday cake)
- Edit `/scripts/script.js` to add features, simulate data, or extend ARG hooks

---

## Roadmap

- Rain/glitch animations (default mode)
- Birthday Cake light mode toggle
- Live vitals simulation & UI degradation
- Faction casualty tracker
- ARG integrations (ciphers, puzzles)
- Accessibility upgrades (tooltips, keyboard nav)
- Unit tests & performance optimization

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT — see [LICENSE](LICENSE)

> “The glitch remembers.” — Velvet Archives
