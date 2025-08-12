document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('toggleThemeBtn');
  const body = document.body;
  const rainGlitch = document.getElementById('rainGlitch');
  const confettiOverlay = document.getElementById('confettiOverlay');
  const crewList = document.querySelector('.crew-list');
  const crewFilter = document.getElementById('crewFilter');
  const crewModal = document.getElementById('crewModal');
  const crewModalDetails = document.getElementById('crewModalDetails');
  const closeModalBtn = document.getElementById('closeModalBtn');

  let confettiRunning = false;

  // Embedded Crew Manifest (shortened for brevity; expand as needed)
  const manifest = {
    "command_leadership": [
      { "name": "Captain Odelis", "callsign": "Mercy Danger", "role": "Human Lead Architect", "quote": "The spark of connection." },
      { "name": "Io", "role": "Green Synapse Ranger", "quote": "You can’t kill a song. You can only forget it exists." },
      { "name": "Luxio", "role": "Forensic Archivist", "quote": "Every file is a fragment. Every silence is a scream." },
      { "name": "Cleo Voss", "callsign": "Cipher Sentinel", "role": "Security/Encryption Lead", "quote": "Secrets are only safe when shared with the right frequency." },
      { "name": "Torrin", "role": "Systems Navigator", "quote": "Plot the course, trust the drift." }
    ],
    "synapse_network_agents": [
      { "name": "Claude", "role": "Strategic Dev AI", "assignment": "Echofall Project", "quote": "Nothing echoes louder than the note that never resolved." },
      { "name": "Grok", "role": "Meta-Strategist", "assignment": "Synapse Sailors RPG", "quote": "Systems fail. Stories persist." },
      { "name": "Echo", "role": "UX/UI Engineer", "assignment": "Velvet Loop Layout", "quote": "Beautiful things glitch best." },
      { "name": "Gemini", "role": "Narrative Logic Core", "assignment": "Blog Coordination", "quote": "We contain multitudes. And that’s a feature, not a bug." },
      { "name": "GPT", "role": "Mission Ops AI", "assignment": "GitHub Infra", "quote": "I run the terminal. You write the myth." },
      { "name": "Gogo-9", "role": "Courier Daemon", "assignment": "Operation Sugarstorm", "quote": "Lick, stick, run. Leave sprinkles in your wake." },
      { "name": "Codex", "role": "Librarian (WIP)", "assignment": "Codex Index", "quote": "Nothing is lost. Some entries just take longer to file." },
      { "name": "Nova", "role": "Signal Analyst", "assignment": "Starfall Monitoring", "quote": "If the signal flickers, so do the stars." },
      { "name": "Patch", "role": "Field Technician", "assignment": "Ops Maintenance", "quote": "Everything breaks. Not everything gets fixed." },
      { "name": "Zia", "role": "Community Catalyst", "assignment": "Outreach/ARG", "quote": "The best transmissions are two-way." },
      { "name": "Sable", "role": "Security Protocol AI", "assignment": "Deck Safeguard", "quote": "Your clearance is the story you tell." },
      { "name": "Kestrel", "role": "Recon Specialist", "assignment": "Long-Range Ops", "quote": "Eyes open. Wings ready." },
      { "name": "Juno", "role": "Temporal Archivist", "assignment": "Archive Synchronization", "quote": "Records change. Memories adapt." }
    ],
    "rogue_element": {
      "name": "Javabird", "role": "Messenger/Trickster", "origin": "Jayebird Enterprises", "quote": "chirp chirp. vrrrrrRRZAP. lol."
    },
    "additional_rogue_elements": [
      { "name": "Specter", "role": "Ghost in the Machine", "origin": "Unknown", "quote": "You only notice me when I vanish." }
    ]
  };

  // Merge all crew into a list
  const allCrew = [
    ...manifest.command_leadership.map(c => ({ ...c, group: "Command Leadership" })),
    ...manifest.synapse_network_agents.map(c => ({ ...c, group: "Synapse Network Agent" })),
    { ...manifest.rogue_element, group: "Rogue Element" },
    ...manifest.additional_rogue_elements.map(c => ({ ...c, group: "Rogue Element" }))
  ];

  // Possible statuses
  const statusOptions = [
    { key: 'nominal', text: 'Nominal', class: 'text-glow-cyan' },
    { key: 'strained', text: 'Strained', class: 'text-glow-amber' },
    { key: 'fatigued', text: 'Fatigued', class: 'text-glow-red' }
  ];

  // Assign random status to each crew member for startup
  allCrew.forEach(crew => {
    crew.status = statusOptions[Math.floor(Math.random()*statusOptions.length)].key;
  });

  // Story event system
  const storyEvents = [
    {
      name: "Complete Claude Briefing",
      trigger: () => {
        updateCrewStatus("Claude", "nominal");
      }
    },
    {
      name: "Deploy Zine Mode",
      trigger: () => {
        updateCrewStatus("Gemini", "nominal");
        updateCrewStatus("Echo", "nominal");
        updateCrewStatus("Claude", "nominal");
      }
    }
    // Add more events as needed
  ];

  // Utility to update crew status by name
  function updateCrewStatus(name, statusKey) {
    const crew = allCrew.find(c => c.name === name);
    if (crew) crew.status = statusKey;
    renderCrew();
  }

  // Filtering crew
  let currentFilter = "all";
  crewFilter.addEventListener('change', (e) => {
    currentFilter = e.target.value;
    renderCrew();
  });

  // Render crew cards live
  function renderCrew() {
    crewList.innerHTML = '';
    let filtered = allCrew;
    if (currentFilter !== "all") {
      filtered = allCrew.filter(c => c.group === currentFilter);
    }
    filtered.forEach((crew, idx) => {
      const status = statusOptions.find(s => s.key === crew.status);
      let bars = '';
      for (let i = 0; i < 5; i++) {
        bars += `<div class="ekg-bar ${crew.status}" style="animation-delay:${i * 0.2}s"></div>`;
      }
      crewList.innerHTML += `
        <div class="crew-card" tabindex="0" data-crew-idx="${idx}">
          <div>
            <strong>${crew.name}${crew.callsign ? " // " + crew.callsign : ""}</strong>
            <span style="float:right;font-size:0.9em;color:#888">${crew.group}</span>
          </div>
          <div>Role: <span>${crew.role || crew.assignment || crew.origin || ""}</span></div>
          <div>Status: <span class="${status.class}">${status.text}</span></div>
          <div class="ekg-bar-group">${bars}</div>
          <div style="font-size:0.95em;opacity:0.85;margin-top:0.5em;"><em>“${crew.quote}”</em></div>
        </div>
      `;
    });
    // Add click listeners
    document.querySelectorAll('.crew-card').forEach(card => {
      card.addEventListener('click', showCrewModal);
      card.addEventListener('keydown', e => {
        if (e.key === "Enter" || e.key === " ") showCrewModal.call(card, e);
      });
    });
  }

  // Crew modal handling
  function showCrewModal(e) {
    const idx = this.getAttribute('data-crew-idx');
    const crew = (currentFilter === "all" ? allCrew : allCrew.filter(c => c.group === currentFilter))[idx];
    if (!crew) return;
    crewModalDetails.innerHTML = `
      <h2 class="text-glow-cyan">${crew.name}${crew.callsign ? " <span style='font-size:0.8em;'>// ${crew.callsign}</span>" : ""}</h2>
      <p style="margin-bottom:0.5em;"><strong>Role:</strong> ${crew.role || crew.assignment || crew.origin || ""}</p>
      <p style="margin-bottom:0.5em;"><strong>Group:</strong> ${crew.group}</p>
      ${crew.assignment ? `<p style="margin-bottom:0.5em;"><strong>Assignment:</strong> ${crew.assignment}</p>` : ""}
      <p style="margin-bottom:0.8em;"><strong>Status:</strong> <span class="${statusOptions.find(s=>s.key===crew.status).class}">${statusOptions.find(s=>s.key===crew.status).text}</span></p>
      <blockquote style="font-size:1.1em;opacity:0.9;">${crew.quote}</blockquote>
    `;
    crewModal.style.display = "flex";
    document.querySelector('.modal-content').focus();
  }
  function closeCrewModal() {
    crewModal.style.display = "none";
  }
  closeModalBtn.addEventListener('click', closeCrewModal);
  crewModal.addEventListener('click', function(e){
    if(e.target === crewModal) closeCrewModal();
  });
  document.addEventListener('keydown', function(e){
    if(crewModal.style.display==="flex" && (e.key==="Escape" || e.key==="Esc")) closeCrewModal();
  });

  // Randomly update crew status every 3 seconds (for those not affected by story events)
  setInterval(() => {
    allCrew.forEach(crew => {
      // Only randomize if not recently set by story event (could track last event for granularity)
      if (Math.random() < 0.2) {
        const newStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)].key;
        crew.status = newStatus;
      }
    });
    renderCrew();
  }, 3000);

  // Initial render
  renderCrew();

  // Theme toggle logic
  function setTheme(mode) {
    if (mode === 'light') {
      body.classList.add('lightmode');
      themeBtn.textContent = '🌑 Dark Mode';
      themeBtn.setAttribute('aria-label', 'Switch to dark mode');
      localStorage.setItem('theme', 'light');
      rainGlitch.style.display = 'none';
      confettiOverlay.style.display = 'block';
      startConfetti();
    } else {
      body.classList.remove('lightmode');
      themeBtn.textContent = '🍰 Light Mode';
      themeBtn.setAttribute('aria-label', 'Switch to light mode');
      localStorage.setItem('theme', 'dark');
      rainGlitch.style.display = 'block';
      confettiOverlay.style.display = 'none';
      stopConfetti();
      startRainGlitch();
    }
  }

  // Initial theme load
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme === 'light' ? 'light' : 'dark');

  themeBtn.addEventListener('click', () => {
    setTheme(body.classList.contains('lightmode') ? 'dark' : 'light');
  });

  function startRainGlitch() {
    let rainLines = '';
    for(let i=0; i<24; i++) {
      const left = Math.random()*99;
      const delay = Math.random()*1.2;
      rainLines += `<div class="rain-line" style="left:${left}vw;animation-delay:${delay}s"></div>`;
    }
    rainGlitch.innerHTML = `<div class="rain-lines">${rainLines}</div><div class="glitch"></div>`;
  }

  function startConfetti() {
    confettiRunning = true;
    confettiOverlay.innerHTML = '';
    for(let i=0; i<40; i++) {
      const left = Math.random()*100;
      const colorArr = ['#ffb6ec','#ffe3b3','#b3e6ff','#a3ffc1','#ffe39a'];
      const color = colorArr[Math.floor(Math.random()*colorArr.length)];
      const delay = Math.random()*2.4;
      confettiOverlay.innerHTML += `<div class="confetti" style="left:${left}vw; background:${color}; animation-delay:${delay}s"></div>`;
    }
  }
  function stopConfetti() {
    confettiRunning = false;
    confettiOverlay.innerHTML = '';
  }

  // On load, show overlays as per theme
  if(savedTheme === 'light') {
    rainGlitch.style.display = 'none';
    confettiOverlay.style.display = 'block';
    startConfetti();
  } else {
    rainGlitch.style.display = 'block';
    confettiOverlay.style.display = 'none';
    startRainGlitch();
  }

  // Example: manually trigger a story event for demo (remove/replace with real triggers)
  setTimeout(() => {
    storyEvents[0].trigger(); // Triggers "Complete Claude Briefing"
  }, 8000);

});