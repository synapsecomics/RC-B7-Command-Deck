# RC-B7 Command Deck

**Velvet Loop Initiative — Command Deck UI**

## 🚀 Features

- **Crew Manifest Integration:**  
  All crew listed in the manifest (leadership, agents, rogue elements) are dynamically rendered in the UI.
- **Live EKG Pulse & Status:**  
  Each crew member has a live-updating status indicator (Nominal, Strained, Fatigued) with animated pulse bars.
- **Filtering by Crew Group:**  
  Use the dropdown to filter by Leadership, Agents, or Rogue Element.
- **Clickable Crew Cards:**  
  Click (or press Enter) on any crew card to open a modal with full role, assignment, quote, and lore details. Keyboard accessible; close with Escape, click-out, or ×.
- **Story Event Status Wiring:**  
  Crew status is now responsive to story events (e.g. “Complete Claude Briefing” sets Claude’s status to Nominal). Easily extendable for future narrative triggers.
- **Oracle Mode & Birthday Cake Mode:**  
  Sci-fi rain/glitch overlay in dark mode; pastel confetti sprinkles in light mode.

## 🛠 How to Test

1. **Run locally or deploy on GitHub Pages.**
2. Use the filter dropdown above the crew list to change visible crew groups.
3. Click or keyboard-select any crew card for a detail modal.
4. Watch crew status update live, and see status changes triggered by story events (demo event fires after 8s).
5. Toggle between Oracle and Cake modes with the top-right theme button.

## 🧑‍💻 Developer Notes

- Crew manifest is defined in `scripts/script.js` for local testing; can be loaded via fetch for production.
- Story events are stubbed as an array of triggerable actions.  
- UI is fully keyboard-accessible, and responsive for mobile.
- Easily extensible for log events, ARG hooks, and future narrative integration.

---
