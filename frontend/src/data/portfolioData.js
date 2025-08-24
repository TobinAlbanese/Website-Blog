// src/data/PortfolioData.js

const PortfolioData = {
  "Employers & Work Experience": [
    // populate later from your DB/resume; schema kept consistent across file
  ],

  "Computer Science Projects": [
    {
      volume: "PORTFOLIO — PROJECT",
      title: "NAOMI PROJECT",
      slug: "naomi",
      author: "Tobin M. Albanese",
      date: "2024-03-05",
      excerpt:
        "Neural Analysis Of Micro-Intent — real-time micro-expressions → inferred intent.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",

      content: [
        {
          text: "<p><strong>Overview.</strong> NAOMI ingests live or recorded video and analyzes rapid facial micro-movements to surface likely states such as stress, confidence, or deception. Outputs include per-frame landmarks, temporal deltas, and calibrated confidence scores designed for human-in-the-loop review.</p>",
        },

        {
          text: "<p><strong>Why this matters.</strong> Human evaluators miss sub-second changes under time pressure. NAOMI provides a second set of eyes: high-frequency, explainable cues that <em>assist</em> (not replace) judgment in interviews, investigations, user research, and training simulations.</p>",
        },

        {
          text: "<p><strong>Objectives.</strong></p><ul><li>Realtime (< 40ms latency) overlays for analysts.</li><li>Explainable outputs: AUs, heatmaps, and per-window deltas.</li><li>Robustness to pose, occlusion, and lighting shifts.</li><li>Auditable traces + privacy-first design.</li></ul>",
        },

        {
          text: "<p><strong>Architecture.</strong> Modular pipeline with two paths:</p><ul><li><em>Edge</em> (browser/WebRTC or desktop): detector + lightweight temporal model.</li><li><em>Server</em> (GPU): high-accuracy models + batch analytics + storage.</li></ul><p>Components: <em>capture</em> → <em>preprocess</em> → <em>landmark/feature</em> → <em>temporal model</em> → <em>intent head</em> → <em>calibration</em> → <em>reporting</em>.</p>",
        },

        {
          text: "<p><strong>Signal pipeline.</strong> Face detection → landmark tracking → micro-window differencing (tens of ms) → temporal model (BiLSTM/Temporal-CNN) → intent classifier. The pipeline is resilient to jitter via smoothing and occlusion handling.</p>",
        },

        {
          text: "<p><strong>Features.</strong></p><ul><li>Landmarks: 68/106-pt normalized to canonical frame.</li><li>Micro-deltas: ∆x/∆y per landmark in 30–80ms windows.</li><li>AUs: estimated via regression over localized regions.</li><li>Stabilization: optical-flow aided tracking + EMA smoothing.</li></ul>",
        },

        {
          text: "<p><strong>Modeling & training.</strong> Transfer learning from expression corpora with domain adaptation. Emphasis on label hygiene, inter-rater reliability, and post-hoc calibration (Platt/temperature scaling) to keep scores honest.</p>",
        },

        {
          text: "<p><strong>Data & labeling.</strong> Mix of public corpora + synthetic augmentations (pose, illumination, occlusion). Dual-rater labels with adjudication. All datasets tracked via DVC with provenance.</p>",
        },

        {
          text: "<p><strong>Evaluation.</strong></p><ul><li>Latency: 25–38ms per frame on RTX-class GPU; 12–18fps on modern laptops (edge path).</li><li>Robustness: ±15° yaw/pitch without significant drift.</li><li>Calibration: ECE ≤ 0.06 after temperature scaling.</li></ul>",
        },

        {
          text: "<p><strong>Interface.</strong> Analysts see overlays (action units, heatmaps), clip scrubbing, and frame-level charts. Batch mode supports bulk uploads; live mode supports WebRTC streams with adjustable sampling rate.</p>",
        },

        {
          text: '<p><strong>API (excerpt).</strong></p><pre>{\n  "frame": 1532,\n  "landmarks": [[x,y], ...],\n  "au": { "AU01": 0.22, "AU04": 0.61, ... },\n  "microDeltaRMS": 0.047,\n  "intent": { "stress": 0.73, "confidence": 0.18, "deception": 0.09 },\n  "calibrated": true,\n  "timestamp": "2024-03-05T21:11:10Z"\n}</pre>',
        },

        {
          text: "<p><strong>Deployment.</strong></p><ul><li><em>Edge:</em> WebAssembly + WebGL; no video leaves device.</li><li><em>Server:</em> gRPC/REST; autoscaled GPU workers; object storage for traces.</li><li>CI/CD: GitHub Actions → container registry → IaC templates.</li></ul>",
        },

        {
          text: "<p><strong>Security & privacy.</strong> Role-based access, encryption at rest/in transit, and retention controls. Designed to be auditable with exportable inference traces. Optional on-device only mode (no upload).</p>",
        },

        {
          text: "<p><strong>Limitations.</strong> Sensitive to extreme occlusion; cultural and personal variation require careful thresholding. The system is an <em>indicator</em> — never a sole determiner of intent.</p>",
        },

        {
          text: "<p><strong>Ethics.</strong> Human-in-the-loop only. Clear consent, documented purpose limits, and transparency about error rates. Red-team reviews for misuse scenarios.</p>",
        },

        {
          text: "<p><strong>Roadmap.</strong></p><ul><li>Multimodal fusion (voice prosody, keystroke dynamics).</li><li>Improved self-supervised pretraining for low-light video.</li><li>Edge-optimized transformer with distillation.</li><li>Richer analyst notes → weak labels for continual learning.</li></ul>",
        },

        {
          text: "<p><strong>Stack.</strong> PyTorch, ONNX, OpenCV, WebRTC, FastAPI/gRPC, React, D3, Docker, Terraform.</p>",
        },
      ],

      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],

      resources: {
        "Docs & Code": [
          {
            label: "NAOMI GitHub Repo",
            url: "https://github.com/TobinAlbanese/naomi",
            external: true,
          },
          {
            label: "GitHub (Profile)",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
        ],
        "Project Links": [
          { label: "Portfolio Hub", url: "/Portfolio", external: false },
          { label: "About / CV", url: "/About", external: false },
        ],
        "Research & References": [
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
          {
            label: "Facial Action Coding System (FACS) — Overview",
            url: "https://en.wikipedia.org/wiki/Facial_Action_Coding_System",
            external: true,
          },
        ],
        "Related Work": [
          {
            label: "Midnight Bureau (Case Notes)",
            url: "/MidnightBureau",
            external: false,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — PROJECT",
      title: "STELLARIS — OSINT NLP & Knowledge Graphs",
      slug: "stellaris",
      author: "Tobin M. Albanese",
      date: "2024-01-20",
      excerpt:
        "Stream → extract entities/relations → visualize as interactive knowledge graphs.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p><strong>Mission.</strong> STELLARIS turns public text streams into navigable knowledge graphs so analysts can trace people, organizations, locations, and events across sources.</p>",
        },
        {
          text: "<p><strong>Capabilities.</strong> NER, relation extraction, event detection, entity resolution, and graph exploration with filters, timelines, and saved views.</p>",
        },
        {
          text: "<p><strong>Stack.</strong> Ingestion workers, FastAPI services, Transformer-based NLP, Elastic for search, and a graph store (e.g., Neo4j). Frontend renders graphs and dossiers with fast type-ahead and pivoting.</p>",
        },
        {
          text: "<p><strong>Reliability.</strong> Backpressure via queues, idempotent ingestion, and provenance tracking for every edge/claim to support verification and rollback.</p>",
        },
        {
          text: "<p><strong>Roadmap.</strong> Cross-lingual NER, stance clustering, and natural-language graph queries.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "OSINT Overview", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          {
            label: "Methodology Notes",
            url: "/Notes/OSINT-Methods",
            external: false,
          },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — PROJECT",
      title: "COSMOS — Cyber Threat Intelligence Dashboard",
      slug: "cosmos",
      author: "Tobin M. Albanese",
      date: "2024-05-12",
      excerpt:
        "Unifies feeds, DW intel, CVEs, and incident workflows into one pane.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p><strong>Purpose.</strong> COSMOS centralizes heterogeneous threat data to reduce swivel-chair analysis and accelerate triage and response.</p>",
        },
        {
          text: "<p><strong>Features.</strong> Multi-feed ingestion, IOC correlation, dark-web monitoring, CVE tracking with patch posture, and analyst playbooks with checklists/notes.</p>",
        },
        {
          text: "<p><strong>Analytics.</strong> Behavioral baselines, anomaly scoring, and clustering by TTPs; drill-downs link to raw artifacts and sandbox results.</p>",
        },
        {
          text: "<p><strong>Integrations.</strong> SIEM/SOAR webhooks, ticketing, and notifications. RBAC and workspace isolation for teams/tenants.</p>",
        },
        {
          text: "<p><strong>Outcome.</strong> From feeds to findings with full provenance and auditability.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Security Notes", url: "/Notes/Sec", external: false },
        ],
        FormalStudies: [
          {
            label: "Threat Modeling Write-up",
            url: "/Notes/Threat-Modeling",
            external: false,
          },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — PROJECT",
      title: "ECHO — Encrypted/Noisy Audio Intelligence",
      slug: "echo",
      author: "Tobin M. Albanese",
      date: "2024-06-17",
      excerpt:
        "ASR + keyword heatmaps + stress/tone in noisy or degraded audio.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p><strong>Scope.</strong> ECHO extracts transcripts, speakers, and acoustic cues from difficult audio. It emphasizes robustness to noise and support for multiple languages.</p>",
        },
        {
          text: "<p><strong>Pipeline.</strong> Denoise → diarize → transcribe → keyword/phrase spotting → acoustic features (pitch, jitter, shimmer, tempo) → per-segment scoring and highlights.</p>",
        },
        {
          text: "<p><strong>UI.</strong> Waveform view with overlays, jump-to-event, and export of clips with redaction options for PII.</p>",
        },
        {
          text: "<p><strong>Security.</strong> Storage is encrypted, and all processing steps record parameters for reproducibility.</p>",
        },
        {
          text: "<p><strong>Next.</strong> Real-time streaming and model personalization per device/channel.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Audio Notes", url: "/Notes/Audio", external: false },
        ],
        FormalStudies: [
          {
            label: "Signal Processing Primer",
            url: "/Notes/DSP",
            external: false,
          },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — PROJECT",
      title: "VAULT — Encrypted File & Folder Manager",
      slug: "vault-project",
      author: "Tobin M. Albanese",
      date: "2023-12-01",
      excerpt:
        "Client-side AES-GCM, sharing & versioning with full audit trails.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p><strong>Design goal.</strong> Keep plaintext on the client, always. Servers only ever see ciphertext and metadata required for sync/sharing.</p>",
        },
        {
          text: "<p><strong>Features.</strong> End-to-end encryption, role-based sharing, link keys, version history, and device-bound access with revocation.</p>",
        },
        {
          text: "<p><strong>Architecture.</strong> Desktop/mobile clients; metadata APIs; encrypted object storage; background sync and conflict handling.</p>",
        },
        {
          text: "<p><strong>Safety.</strong> Recovery keys, tamper-evident logs, and optional hardware-backed key storage.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Security Notes", url: "/Notes/Sec", external: false },
        ],
        FormalStudies: [
          { label: "Crypto Basics", url: "/Notes/Crypto", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — PROJECT",
      title: "NOTES — End-to-End Encrypted Notes",
      slug: "notes-project",
      author: "Tobin M. Albanese",
      date: "2024-02-15",
      excerpt: "Zero-knowledge notes with offline-first sync and rich editing.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p><strong>Why.</strong> Fast, private knowledge capture that works offline and syncs safely across devices.</p>",
        },
        {
          text: "<p><strong>Core.</strong> Client-side crypto; CRDT/OT syncing; tags, search, and attachments; conflict resolution; exports and backups.</p>",
        },
        {
          text: "<p><strong>Privacy.</strong> Zero-knowledge design; servers store ciphertext only. Share by exchanging keys out-of-band or via link keys.</p>",
        },
        {
          text: "<p><strong>Extensibility.</strong> Plugin hooks for templates, tasking, and API integrations.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "App UX Notes", url: "/Notes/UX", external: false },
        ],
        FormalStudies: [
          { label: "CRDT Primer", url: "/Notes/CRDT", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — PROJECT",
      title: "4D — AI Visual Reconstruction from 2D",
      slug: "4d-project",
      author: "Tobin M. Albanese",
      date: "2024-08-01",
      excerpt: "2D → 3D/4D via depth + temporal layering; VR/AR-ready exports.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p><strong>Concept.</strong> Rebuild volumetric scenes from images with monocular depth, neural rendering, and temporal interpolation.</p>",
        },
        {
          text: "<p><strong>Pipeline.</strong> Depth estimation → point cloud/mesh → temporal alignment → refinement & super-resolution → GLTF export.</p>",
        },
        {
          text: "<p><strong>Applications.</strong> Surveillance review, cultural heritage, immersive media, and scientific visualization.</p>",
        },
        {
          text: "<p><strong>Performance.</strong> GPU-accelerated reconstruction with progressive previews for large scenes.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "3D Showcase", url: "/Gallery/3D", external: false },
        ],
        FormalStudies: [
          { label: "Papers & Notes", url: "/Notes/4D", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — PROJECT",
      title: "Portfolio & Research Hub (this site)",
      slug: "portfolio-hub",
      author: "Tobin M. Albanese",
      date: "2025-01-01",
      excerpt:
        "Unified hub for projects, essays, and the Midnight Bureau archive.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p><strong>Goals.</strong> Clean reading experience, fast discovery, and a unified schema that scales with your research and builds.</p>",
        },
        {
          text: "<p><strong>UX.</strong> Responsive cards → deep-dive slugs; resource sections for outbound links; image galleries per entry.</p>",
        },
        {
          text: "<p><strong>Next.</strong> Search across portfolio & Bureau, shared tagging, and server-side rendering for SEO.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          {
            label: "Live Site",
            url: "https://www.tobinalbanese.com",
            external: true,
          },
          { label: "Midnight Bureau", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
  ],

  "Research & Analysis Projects": [
    {
      volume: "PORTFOLIO — RESEARCH",
      title: "Behavioral AI for Threat Detection",
      slug: "behavioral-ai-threat-detection",
      author: "Tobin M. Albanese",
      date: "2023-11-01",
      excerpt: "Temporal facial cues as probabilistic indicators of risk.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Explores whether micro-expressions can reliably augment traditional threat models without over-claiming certainty.</p>",
        },
        {
          text: "<p>Focus areas: dataset bias, rater agreement, calibration, and operational thresholds for action.</p>",
        },
        {
          text: "<p>Outcomes include evaluation protocols and guidance for human-over-machine decision loops.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          {
            label: "Research Notes",
            url: "/Notes/Behavioral-AI",
            external: false,
          },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — RESEARCH",
      title: "Open-Source Intelligence Methodologies",
      slug: "osint-methodologies",
      author: "Tobin M. Albanese",
      date: "2023-11-15",
      excerpt: "Provenance, verification, and fusion at OSINT scale.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Codifies intake pipelines, de-duplication, and reliability scoring for public-data environments.</p>",
        },
        {
          text: "<p>Emphasizes reproducibility, audit trails, and minimization of accidental PII capture.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          {
            label: "OSINT Notes",
            url: "/Notes/OSINT-Methods",
            external: false,
          },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — RESEARCH",
      title: "Disinformation & Social Media Influence",
      slug: "disinformation-social-media",
      author: "Tobin M. Albanese",
      date: "2023-12-01",
      excerpt: "Coordination patterns, amplifier nodes, and counter-measures.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Identifies narrative supply chains and temporal dynamics of campaigns.</p>",
        },
        {
          text: "<p>Tests inoculation strategies and friction-based interventions while monitoring collateral impact.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "Study Notes", url: "/Notes/Disinfo", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — RESEARCH",
      title: "Ethical AI Governance Models",
      slug: "ethical-ai-governance",
      author: "Tobin M. Albanese",
      date: "2024-01-10",
      excerpt:
        "Oversight, auditability, and deployment constraints for sensitive AI.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Compares governance frameworks emphasizing measurable safeguards and red-team rituals.</p>",
        },
        {
          text: "<p>Outlines accountability layers from model cards to operational waivers.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Ethics Notes", url: "/Notes/Ethics", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — RESEARCH",
      title: "Facial Recognition & Privacy",
      slug: "facial-recognition-privacy",
      author: "Tobin M. Albanese",
      date: "2024-02-01",
      excerpt: "Balancing capability with consent, minimization, and policy.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Surveys regulatory regimes and proposes deployment patterns with privacy by design.</p>",
        },
        {
          text: "<p>Argues for conservative defaults, transparency, and independent auditing.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Policy Notes", url: "/Notes/Policy", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — RESEARCH",
      title: "Cyber Threat Actor Profiling",
      slug: "cyber-threat-profiling",
      author: "Tobin M. Albanese",
      date: "2024-03-01",
      excerpt: "Clustering adversary behavior by TTPs and infra reuse.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Builds behavioral profiles from campaign telemetry and infrastructure linkages.</p>",
        },
        {
          text: "<p>Targets durable signals that survive obfuscation and copycatting.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Threat Notes", url: "/Notes/Threats", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
  ],

  "Analytical Writing & Publications": [
    {
      volume: "PORTFOLIO — WRITING",
      title: "AI Ethics in National Security",
      slug: "ai-ethics-national-security",
      author: "Tobin M. Albanese",
      date: "2023-05-01",
      excerpt: "Where mission requirements meet ethical constraints.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Discusses frameworks for deploying high-stakes AI with measurable safeguards.</p>",
        },
        {
          text: "<p>Emphasizes accountability, transparency, and the cost of false positives/negatives in operational contexts.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — WRITING",
      title: "The Rise of Behavioral Surveillance",
      slug: "behavioral-surveillance",
      author: "Tobin M. Albanese",
      date: "2023-06-01",
      excerpt: "Behavioral sensing vs. civil liberties.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Examines inference pipelines that turn behavior into decisions, and the governance needed to bound misuse.</p>",
        },
        {
          text: "<p>Argues for purpose limitation, data minimization, and independent oversight.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — WRITING",
      title: "Open-Source Intelligence in Modern Conflict",
      slug: "osint-modern-conflict",
      author: "Tobin M. Albanese",
      date: "2023-07-01",
      excerpt: "How OSINT changes tempo, attribution, and narrative.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Explores transparency effects on strategy and public diplomacy, and the tooling required for verification at speed.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — WRITING",
      title: "Digital Disinformation: Challenges & Solutions",
      slug: "digital-disinformation",
      author: "Tobin M. Albanese",
      date: "2023-08-01",
      excerpt: "Detection to inoculation — a practical playbook.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Catalogs tactics (bots, brigading, laundering) and countermeasures (friction, counterspeech, provenance).</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — WRITING",
      title: "Future of Autonomous Systems in Warfare",
      slug: "autonomous-systems-future",
      author: "Tobin M. Albanese",
      date: "2023-09-01",
      excerpt: "Doctrine, risk, and guardrails for autonomy.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Argues that speed without accountability increases strategic risk; proposes layered controls and testing regimes.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
  ],

  "Current & In-Progress Work": [
    {
      volume: "PORTFOLIO — IN PROGRESS",
      title: "Midnight Bureau Blog Expansion",
      slug: "midnight-bureau-expansion",
      author: "Tobin M. Albanese",
      date: "2025-02-01",
      excerpt: "Better discovery, smoother reading, richer archives.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Upgrading archive navigation, adding topic/entity filters, and refining long-form readability across devices.</p>",
        },
        {
          text: "<p>Planned: unified tagging with portfolio and cross-search.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Midnight Bureau", url: "/MidnightBureau", external: false },
          {
            label: "Live Site",
            url: "https://www.tobinalbanese.com",
            external: true,
          },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — IN PROGRESS",
      title: "Real-time Facial Recognition Prototype",
      slug: "facial-recognition-prototype",
      author: "Tobin M. Albanese",
      date: "2025-04-01",
      excerpt: "End-to-end live identity experiments with policy gates.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Prototyping a low-latency video pipeline with detection, matching, and governance hooks for safe testing.</p>",
        },
        {
          text: "<p>Focus on evaluation, latency budgets, and opt-in controls.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Policy Notes", url: "/Notes/Policy", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — IN PROGRESS",
      title: "OSINT Data Aggregation Pipeline",
      slug: "osint-data-pipeline",
      author: "Tobin M. Albanese",
      date: "2025-06-01",
      excerpt: "Scalable ingestion with provenance and PII safety.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Standing up resilient intake with dedupe, provenance tracking, and safe storage patterns.</p>",
        },
        {
          text: "<p>Planned features: source scoring and alerting thresholds.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "OSINT Overview", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
  ],

  "Education & Certifications": [
    {
      volume: "PORTFOLIO — EDUCATION",
      title: "B.S. Computer Science",
      slug: "csus-computer-science",
      author: "Tobin M. Albanese",
      date: "2026-12-01",
      excerpt: "CSU Sacramento — AI, cybersecurity, software engineering.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Coursework spans algorithms, systems, ML, and security with applied projects and research threads.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "About / CV", url: "/About", external: false },
          { label: "Project Hub", url: "/Portfolio", external: false },
        ],
        FormalStudies: [
          { label: "Study Notes", url: "/Notes/CS", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          { label: "Home", url: "/", external: false },
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
        ],
      },
    },
    {
      volume: "PORTFOLIO — CERTIFICATION",
      title: "Certified Ethical Hacker (CEH)",
      slug: "ceh-certification",
      author: "Tobin M. Albanese",
      date: "2024-04-01",
      excerpt: "EC-Council CEH (2024).",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Hands-on exposure to adversarial techniques that inform practical defensive engineering.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "About / CV", url: "/About", external: false },
          { label: "Project Hub", url: "/Portfolio", external: false },
        ],
        FormalStudies: [
          { label: "Cert Details", url: "/Notes/CEH", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          { label: "Home", url: "/", external: false },
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
        ],
      },
    },
    {
      volume: "PORTFOLIO — EDUCATION",
      title: "AI Ethics Workshop (MIT Professional Education)",
      slug: "ai-ethics-mit",
      author: "Tobin M. Albanese",
      date: "2023-08-15",
      excerpt: "Responsible AI development workshop.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Covered risk assessment, documentation, and oversight patterns for responsible AI deployment.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "About / CV", url: "/About", external: false },
          { label: "Project Hub", url: "/Portfolio", external: false },
        ],
        FormalStudies: [
          { label: "Notes", url: "/Notes/Ethics", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          { label: "Home", url: "/", external: false },
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
        ],
      },
    },
    {
      volume: "PORTFOLIO — EDUCATION",
      title: "OSINT Fundamentals (SANS Institute)",
      slug: "osint-fundamentals",
      author: "Tobin M. Albanese",
      date: "2023-06-01",
      excerpt: "Foundations of open-source intelligence.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Introduces disciplined collection, verification, and analyst hygiene for public data.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "About / CV", url: "/About", external: false },
          { label: "Project Hub", url: "/Portfolio", external: false },
        ],
        FormalStudies: [
          {
            label: "OSINT Notes",
            url: "/Notes/OSINT-Methods",
            external: false,
          },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          { label: "Home", url: "/", external: false },
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
        ],
      },
    },
  ],

  "Featured / Spotlight Projects": [
    {
      volume: "PORTFOLIO — SPOTLIGHT",
      title: "NAOMI — Micro-Expression & Intent Analysis",
      slug: "naomi",
      author: "Tobin M. Albanese",
      date: "2025-01-15",
      excerpt: "Spotlight on NAOMI's temporal engine and overlays.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>A deep look at temporal windows, calibration, and UI choices that keep analysts in control.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — SPOTLIGHT",
      title: "STELLARIS — OSINT NLP Engine",
      slug: "stellaris-spotlight",
      author: "Tobin M. Albanese",
      date: "2024-10-01",
      excerpt: "Spotlight on STELLARIS graphs & entity resolution.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Design decisions behind relation scoring, graph UX, and provenance-first ingestion.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "OSINT Overview", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
    {
      volume: "PORTFOLIO — SPOTLIGHT",
      title: "COSMOS — Cyber Threat Dashboard",
      slug: "cosmos-spotlight",
      author: "Tobin M. Albanese",
      date: "2025-03-01",
      excerpt: "Spotlight on COSMOS workflows & analytics.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>From ingestion to incident response: how COSMOS stitches context with audit-ready trails.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Security Notes", url: "/Notes/Sec", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
  ],

  "Skills & Technologies": [
    "Python",
    "JavaScript (React, Node.js)",
    "Docker & Kubernetes",
    "AWS Cloud Services",
    "TensorFlow & PyTorch",
    "Natural Language Processing (NLP)",
    "Computer Vision & OpenCV",
    "Cybersecurity & Ethical Hacking",
    "SQL & NoSQL Databases",
    "Git & CI/CD Pipelines",
  ],

  "Speaking & Media": [
    {
      volume: "PORTFOLIO — MEDIA",
      title: "Webinar: Ethics in AI Surveillance",
      slug: "ethics-ai-webinar",
      author: "Tobin M. Albanese",
      date: "2025-03-10",
      excerpt: "Live webinar on surveillance ethics.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Key themes and Q&A on oversight, measurement, and risk in applied surveillance AI.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          { label: "Home", url: "/", external: false },
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
        ],
      },
    },
    {
      volume: "PORTFOLIO — MEDIA",
      title: "Podcast: Open-Source Intelligence",
      slug: "osint-podcast",
      author: "Tobin M. Albanese",
      date: "2024-12-10",
      excerpt: "Conversation on scaling OSINT tooling.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Highlights around verification at speed, graph reasoning, and human-centered analyst tools.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "OSINT Overview", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          { label: "Home", url: "/", external: false },
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
        ],
      },
    },
  ],

  Collaborations: [
    {
      volume: "PORTFOLIO — COLLAB",
      title: "C-R-US — Dental Clinic Management System (CSC 131, Spring 2025)",
      slug: "c-r-us-dcms",
      author: "Tobin M. Albanese",
      date: "2025-05-01",
      excerpt:
        "Team DCMS: records, appointments, histories, performance analytics.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: "<p>Full-stack clinic system supporting patient records, appointment scheduling, treatment histories, and staff analytics.</p>",
        },
        {
          text: "<p>Role-based UI for patients, employees, and admins with straightforward, learnable navigation.</p>",
        },
        {
          text: "<p>Team: Imran Ahmad, Tobin Graham, Alyssa Jimenez, Glory King, Ryland Porter, Harkeerat Uppal.</p>",
        },
      ],
      images: [
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
        "/assets/images/space.jpg",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Midnight Bureau", url: "/MidnightBureau", external: false },
        ],
        FormalStudies: [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        PopularCulture: [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "Home", url: "/", external: false },
        ],
      },
    },
  ],
};

export default PortfolioData;
