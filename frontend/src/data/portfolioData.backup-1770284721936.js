// src/data/PortfolioData.js

const PortfolioData = {
  "Featured / Spotlight Projects": [
    {
      volume: "PORTFOLIO — SPOTLIGHT 1",
      title: "NAOMI - Facial Expression Software",
      slug: "naomi", // links to actual project page
      author: "Tobin M. Albanese",
      date: "2025-01-15",
      excerpt:
        "An advanced AI platform designed to detect and analyze micro-expressions — tiny, fleeting facial movements that often reveal hidden emotions like stress, deception, or confidence. Neural Analysis Of Micro-Intent in real-time micro-expressions → inferred intent.",
      archiveImage: "/assets/images/naomiPortfolio.jpg",
      banner: "/assets/images/naomiBanner.jpg",

      content: [
        {
          text: `
      <p><strong>Overview.</strong> NAOMI (Neural Analysis of Micro-Intent) is an advanced behavioral analytics system designed to detect and interpret micro-expressions — subtle, fleeting facial movements that occur in fractions of a second. 
      These signals, often invisible to casual human observation, can provide important cues about a person’s underlying state such as stress, confidence, or possible deception. 
      NAOMI processes both live and recorded video, tracking facial landmarks at high frequency, and computing temporal deltas across micro-windows of tens of milliseconds. 
      The platform translates this into structured, calibrated outputs that can be reviewed by human analysts, making it a powerful augmentation tool in interviews, intelligence gathering, psychology, user research, and training environments.</p>
    `,
        },
        {
          text: `
      <p><strong>Why this matters.</strong> Human evaluators are skilled at interpreting broad body language, but the reality is that rapid micro-expressions often occur too quickly for the eye to register, especially under time pressure or distraction. 
      A subtle twitch of an eyebrow, a half-suppressed smile, or a fleeting tightening around the eyes can carry critical meaning — yet they vanish in less than a quarter of a second. 
      NAOMI offers analysts a second layer of observation: a consistent, explainable, high-frequency sensor that runs in parallel with human judgment. 
      Rather than replacing intuition, it strengthens it, ensuring that critical signals are not lost and that evaluators can pause, review, and assess cues in context rather than relying solely on memory or impression.</p>
    `,
        },
        {
          text: `
      <p><strong>Objectives.</strong> The design of NAOMI is shaped around four central objectives. 
      First, it must deliver true real-time performance, with latencies under 40ms per frame so that overlays remain usable in live scenarios. 
      Second, it must provide explainable outputs — not just black-box classifications, but visible action units, heatmaps, and frame-to-frame deltas that users can understand. 
      Third, it must demonstrate robustness against environmental factors such as poor lighting, angled faces, or partial occlusions like glasses and masks. 
      And fourth, it must maintain full auditability and privacy-conscious design, producing exportable traces for later review while never storing or transmitting sensitive footage unnecessarily. 
      Together, these objectives ensure that NAOMI is not just a research demo, but a deployable and responsible system.</p>
    `,
        },
        {
          text: `
      <p><strong>Architecture.</strong> NAOMI uses a modular architecture with both edge and server deployment options. 
      At the edge — in-browser or on-device — lightweight models run directly on user hardware, ensuring video never leaves the system. 
      In server deployments, GPU-backed services process streams at scale, enabling batch analytics and long-term archival of inference traces. 
      The end-to-end flow follows a structured pipeline: capture, preprocessing, landmark detection, temporal feature modeling, intent classification, calibration, and finally reporting. 
      Each stage is decoupled, meaning models can be swapped or upgraded independently, giving the system long-term adaptability as methods and hardware evolve.</p>
    `,
        },
        {
          text: `
      <p><strong>Signal pipeline.</strong> At the heart of NAOMI is its signal-processing chain. 
      Each incoming frame undergoes face detection and landmark tracking. 
      These landmarks are compared across micro-windows of 30–80ms, capturing tiny deltas in x/y coordinates that correspond to micro-movements. 
      Temporal models such as BiLSTMs and Temporal CNNs ingest these sequences, smoothing noise, interpolating across small gaps, and handling jitter or occlusion. 
      The model outputs intent predictions, which are then calibrated before being surfaced to the analyst. 
      This pipeline is engineered to balance sensitivity with stability, flagging meaningful signals while suppressing irrelevant motion.</p>
    `,
        },
        {
          text: `
      <p><strong>Features.</strong> NAOMI’s outputs go far beyond a single probability score. 
      Analysts can access normalized 68- or 106-point landmark maps, per-landmark micro-deltas over short windows, localized action unit activations derived from the Facial Action Coding System, and stabilized overlays produced via optical-flow tracking. 
      Heatmaps highlight regions of the face most associated with detected intent, while frame-level charts show how probabilities rise and fall over time. 
      These multi-layered features ensure that signals remain interpretable and actionable, rather than being hidden inside an opaque classifier.</p>
    `,
        },
        {
          text: `
      <p><strong>Modeling & training.</strong> The NAOMI models are trained through transfer learning on expression recognition corpora, then fine-tuned with domain-specific adaptations. 
      Datasets are curated with an emphasis on annotation quality: multiple human raters label the same footage, disagreements are adjudicated, and only consensus examples make it into training sets. 
      Probability calibration methods like Platt scaling and temperature scaling ensure outputs reflect real likelihoods rather than overconfident guesses. 
      The training process is not just about maximizing accuracy — it is about producing models whose outputs can be trusted in sensitive human-facing contexts.</p>
    `,
        },
        {
          text: `
      <p><strong>Data & labeling.</strong> High-quality data underpins NAOMI’s reliability. 
      The system draws from a combination of public corpora, in-house datasets, and synthetic augmentations that simulate different poses, lighting conditions, and occlusions. 
      Each dataset is version-controlled with tools like DVC, enabling traceability of labels and models across iterations. 
      Double-labeling with adjudication ensures inter-rater reliability, reducing noise and bias in the data. 
      By maintaining meticulous provenance of all training material, NAOMI ensures both reproducibility and accountability in its evolution.</p>
    `,
        },
        {
          text: `
      <p><strong>Evaluation.</strong> NAOMI’s performance is validated through comprehensive benchmarks. 
      On RTX-class GPUs, it achieves frame latencies of 25–38ms, enabling real-time overlays. 
      On modern laptops running edge deployments, it sustains 12–18fps with acceptable accuracy. 
      Robustness testing demonstrates reliable performance up to ±15° yaw/pitch rotation before significant drift. 
      Calibration results show Expected Calibration Error under 0.06 after scaling, meaning probabilities align closely with true likelihoods. 
      These metrics confirm that NAOMI is not only fast, but also trustworthy across varied conditions.</p>
    `,
        },
        {
          text: `
      <p><strong>Interface.</strong> The analyst interface is designed to make complex signals usable in real-world workflows. 
      In live mode, overlays highlight landmarks, heatmaps, and intent scores directly on the video feed. 
      Analysts can scrub back through footage, adjust playback speed, and inspect frame-level probability charts. 
      Batch mode supports uploads of large video sets with automated summary reports. 
      Adjustable sampling rates let users tune the balance between performance and fidelity. 
      The goal is not just to present data, but to present it in a way that supports fast comprehension and confident decision-making.</p>
    `,
        },
        {
          text: `
      <p><strong>API.</strong> NAOMI exposes its functionality through a developer-friendly API that delivers structured, machine-readable outputs. 
      Responses include frame indices, raw landmark coordinates, action unit activations, micro-delta RMS values, calibrated intent scores, and precise timestamps. 
      This allows integration into larger systems — from training simulators to research dashboards — without requiring analysts to parse visualizations. 
      By being transparent and consistent, the API ensures NAOMI can plug into diverse ecosystems smoothly.</p>
    `,
        },
        {
          text: `
      <p><strong>Deployment.</strong> Flexibility in deployment is a core design feature. 
      NAOMI can run entirely on-device for privacy-sensitive use cases, leveraging WebAssembly and WebGL for inference in browsers or desktop applications. 
      In server mode, GPU workers scale elastically via container orchestration, with gRPC/REST endpoints serving multiple clients. 
      Traces and outputs are stored securely in object storage, while CI/CD pipelines automate build and deployment across environments. 
      This versatility allows NAOMI to be deployed in secure labs, enterprise servers, or distributed field environments with equal ease.</p>
    `,
        },
        {
          text: `
      <p><strong>Security & privacy.</strong> NAOMI was designed with security and privacy as first-class priorities. 
      Role-based access controls determine who can access data and outputs. 
      Encryption protects information at rest and in transit, while retention policies allow organizations to automatically expire sensitive records. 
      Analysts can export anonymized inference traces without exposing raw video. 
      An on-device-only mode is available for the highest-security environments, ensuring no data ever leaves the analyst’s machine. 
      This safeguards trust and compliance in contexts where data protection is essential.</p>
    `,
        },
        {
          text: `
      <p><strong>Limitations.</strong> Like any AI system, NAOMI has known boundaries. 
      Extreme occlusions such as masks, scarves, or sunglasses reduce accuracy. 
      Cultural and individual differences in expression mean thresholds must be tuned carefully for context. 
      The system is best viewed as an indicator, not a verdict: it surfaces additional cues for human evaluators but is never intended to provide definitive judgments about truth or intent. 
      Being transparent about these limitations is central to NAOMI’s design and ethical positioning.</p>
    `,
        },
        {
          text: `
      <p><strong>Ethics.</strong> Ethical safeguards are embedded into NAOMI’s deployment philosophy. 
      The system is always human-in-the-loop, requiring explicit consent and documented limits of use. 
      Error rates are disclosed openly rather than hidden, preventing overconfidence. 
      Red-team reviews simulate misuse cases — such as coercive interrogation or surveillance overreach — to identify risks and build mitigations. 
      By prioritizing transparency, consent, and accountability, NAOMI ensures that powerful technology is applied responsibly.</p>
    `,
        },
        {
          text: `
      <p><strong>Roadmap.</strong> NAOMI’s future development roadmap extends beyond facial micro-expression analysis. 
      Planned milestones include multimodal fusion with audio prosody and keystroke dynamics, enabling richer behavioral insights. 
      Advances in self-supervised pretraining will improve robustness in low-light conditions, while distilled transformer models will bring higher accuracy to lightweight edge deployments. 
      Collaborative analyst note-taking will generate weak labels that feed back into continual learning pipelines. 
      These roadmap items point toward NAOMI evolving into a comprehensive, multimodal human-behavior analytics platform.</p>
    `,
        },
        {
          text: `
      <p><strong>Stack.</strong> NAOMI is built on a stack of proven technologies and modern ML frameworks. 
      PyTorch provides the foundation for model training and inference, with ONNX enabling optimized, portable runtime execution. 
      OpenCV and MediaPipe power real-time video analysis and landmark tracking. 
      FastAPI and gRPC provide efficient APIs, while React and D3.js render intuitive analyst interfaces. 
      Deployment pipelines use Docker for containerization and Terraform for infrastructure as code, with CI/CD automating continuous delivery. 
      This combination makes NAOMI adaptable, developer-friendly, and production-ready.</p>
    `,
        },
      ],

      images: [
        "/assets/images/naomiWhy.jpg",
        "/assets/images/naomiPillars.jpg",
        "/assets/images/naomiArchitecture.jpg",
        "/assets/images/naomiPipeline.jpg",
        "/assets/images/naomiFeatures.jpg",
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
      volume: "PORTFOLIO — SPOTLIGHT",
      title: "STELLARIS — OSINT NLP Engine",
      slug: "stellaris",
      author: "Tobin M. Albanese",
      date: "2024-10-01",
      excerpt:
        "From noisy text to interactive knowledge graphs with provenance-first extraction.",
      archiveImage: "/assets/images/stellarisPortfolio.jpg",
      banner: "/assets/images/stellarisBanner.jpg",
      content: [
        {
          text: `
      <p><strong>Mission.</strong> STELLARIS (Structured Textual Extraction & Linking for Live Analysis of Real-time Intelligence Sources) exists to transform the unstructured noise of the open web into structured, defensible, and actionable intelligence. 
      The platform continuously ingests massive volumes of text streams — ranging from news articles and government filings to online forums, RSS feeds, and PDF reports — and converts this raw, unstructured material into a living web of linked data. 
      Analysts are no longer forced to manually sift through documents, guess at connections, or rely on brittle keyword searches; instead, they can follow a clear thread from a single individual to their associated addresses, companies, financial transactions, and cross-border shipments. 
      Every connection remains anchored in its original source, so context and evidentiary lineage are never lost. The mission is simple but ambitious: empower investigators, researchers, and intelligence professionals to understand complex realities faster, more reliably, and with complete transparency.</p>
    `,
        },
        {
          text: `
      <p><strong>What it does.</strong> At its core, STELLARIS is a pipeline for turning words into structured networks of knowledge. 
      The system applies advanced natural language processing (NLP) techniques — including named entity recognition, cross-document entity resolution, relation extraction, event detection, and temporal normalization — to every incoming document. 
      This means the platform doesn’t just identify “who” is mentioned in a text, but also “how” those people or organizations are connected, “what” events they participated in, and “when” those events occurred. 
      The extracted information is assembled into an interactive knowledge graph where analysts can explore relationships, filter by attributes, overlay geospatial or temporal views, and pivot across different types of entities seamlessly. 
      Instead of static search results, users receive a living map of connections that evolves as new information flows in, making the invisible visible in real time.</p>
    `,
        },
        {
          text: `
      <p><strong>Analyst workflow.</strong> STELLARIS is designed around the way human analysts actually work. 
      A typical workflow might begin with a single seed — a company, a username, a shipping record, or even a fragment of leaked data. 
      From this starting point, the analyst can explore first- and second-degree relationships, visualizing how seemingly unrelated entities begin to cluster into meaningful patterns. 
      They can pin subgraphs of interest, annotate edges with hypotheses or questions, and save customized views that preserve filters, time windows, and notes for future sessions or team sharing. 
      Every node and edge is annotated with citations, model confidence, and version history, so nothing is ever taken on faith. 
      This design makes it possible for teams to review, challenge, and reproduce each other’s findings, turning the platform into not just a discovery tool but also a collaborative research environment where insights are defensible and transparent.</p>
    `,
        },
        {
          text: `
      <p><strong>Stack.</strong> The technology stack behind STELLARIS combines distributed data engineering with cutting-edge machine learning. 
      On the ingestion side, distributed workers handle incoming streams with robust backpressure controls, ensuring no single source overwhelms the system. 
      Message queues balance loads, while FastAPI services orchestrate requests across the pipeline. 
      Transformer-based NLP models (built on Hugging Face and spaCy) handle tasks like entity recognition, relation extraction, and event detection, producing structured records from messy text. 
      ElasticSearch powers fast keyword and semantic search, while a graph database (Neo4j or JanusGraph) stores and queries the resulting networks. 
      On the frontend, a React/Vite application renders graphs at scale with GPU-accelerated layouts, type-ahead entity search, and keyboard-driven pivoting, giving analysts a responsive, interactive workspace even with millions of nodes and edges. 
      The result is a stack that is both modern and battle-tested, capable of handling real-world data at real-world scale.</p>
    `,
        },
        {
          text: `
      <p><strong>Data quality & provenance.</strong> In intelligence analysis, trust is everything. 
      That is why STELLARIS treats provenance as a first-class concern. 
      Every edge in the graph is linked back to the exact source from which it was derived — including the document URI, the paragraph offset, the model version that produced it, and the scoring features used in extraction. 
      Ingestion processes are idempotent, relying on hashing to detect duplicates, while assertions can be re-scored as models improve over time. 
      Analysts can invoke an “explain-this-edge” action to see the raw snippet, the extraction process, and even model confidence. 
      Rollbacks are supported at every level, making it possible to test new models, audit old ones, or red-team sensitive cases without corrupting the graph. 
      This rigorous approach ensures that every claim in the system can be verified, challenged, or disproven — the opposite of a black box.</p>
    `,
        },
        {
          text: `
      <p><strong>Scale & reliability.</strong> Real-world OSINT environments are messy and bursty — some days the system must absorb thousands of routine filings, while other days it is hit with floods of breaking news or viral posts. 
      STELLARIS is engineered to handle both extremes gracefully. 
      Message queues smooth out ingestion spikes, while batch and streaming modes run in parallel to balance throughput with latency. 
      Retry policies and dead-letter queues ensure that problematic documents don’t clog the pipeline, while monitoring dashboards track queue depths, error rates, and model latencies in real time. 
      Nightly compaction tasks merge duplicate entities and refresh indexes to keep queries fast. 
      Schema migration scripts evolve the graph database without downtime, so analysts never lose access even during upgrades. 
      The overall design principle is simple: reliability at scale, because analysts can’t afford gaps or outages in the middle of an investigation.</p>
    `,
        },
        {
          text: `
      <p><strong>Security & governance.</strong> Because STELLARIS often deals with sensitive or personally identifiable information, governance is embedded into the platform itself. 
      Fine-grained role-based access controls (RBAC) allow administrators to control who can view, edit, or export specific segments of the graph. 
      Sensitive attributes can be masked or hidden entirely depending on clearance level, while export bundles are signed with checksums to prevent tampering. 
      Secrets and credentials are rotated automatically, and all data — both at rest and in transit — is encrypted with modern standards. 
      Audit logs capture every action, making it possible to review not just what the data says, but who accessed it, when, and how. 
      This makes STELLARIS suitable not only for open-source research, but also for regulated environments where compliance and accountability are non-negotiable.</p>
    `,
        },
        {
          text: `
      <p><strong>Impact.</strong> The practical outcome of all this engineering is measurable acceleration in the way analysts work. 
      Tasks that once took hours — verifying an alias across multiple reports, surfacing intermediaries in a financial network, or mapping supply chain hops across borders — now take minutes. 
      Instead of emailing screenshots or exporting static reports, teams can share reproducible graph views that carry all the filters, time windows, and citations baked in. 
      This reduces duplication of effort, makes peer review far easier, and ensures that insights scale across an organization rather than living in individual silos. 
      For organizations facing information overload, STELLARIS doesn’t just speed up analysis; it changes the very culture of how intelligence is produced, reviewed, and disseminated.</p>
    `,
        },
        {
          text: `
      <p><strong>Roadmap.</strong> STELLARIS is already powerful, but its future is even more ambitious. 
      Upcoming milestones include cross-lingual models that can normalize entities across languages and scripts, enabling global investigations without linguistic blind spots. 
      Stance and claim clustering will allow analysts to group related narratives, distinguish between factual reporting and opinion, and identify coordinated campaigns. 
      Natural-language graph queries will let users type questions like “Show all shell companies linked to X in 2022” and receive structured subgraphs as answers. 
      Event-sequence anomaly detection will flag unusual chains of activity — like logistics routes that don’t match normal patterns. 
      Finally, collaborative playbooks will allow teams to codify repeatable workflows as templates, so that common investigative patterns can be reused, audited, and improved over time. 
      Together, these roadmap items point to a system that doesn’t just document the world, but actively helps analysts stay ahead of it.</p>
    `,
        },
      ],

      images: [
        "/assets/images/stellarisOverview.jpg",
        "/assets/images/stellarisWorkflow.jpg",
        "/assets/images/stellarisStack.jpg",
        "/assets/images/stellarisQuality.jpg",
        "/assets/images/stellarisScale.jpg",
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
      volume: "PORTFOLIO — SPOTLIGHT",
      title: "COSMOS — Cyber Threat Dashboard",
      slug: "cosmos",
      author: "Tobin M. Albanese",
      date: "2025-03-01",
      excerpt:
        "Behavioral baselines, TTP clustering, and audit-ready incident workflows in one pane.",
      archiveImage: "/assets/images/cosmosPortfolio.jpg",
      banner: "/assets/images/cosmosEarth.jpg",
      content: [
        {
          text: `
      <p><strong>Purpose.</strong> COSMOS consolidates heterogeneous cyber threat data—commercial/open feeds, dark-web chatter, vulnerability disclosures, malware sandboxes, and internal telemetry—into a single operational pane. 
      By eliminating swivel-chair analysis across tabs and tools, analysts can triage faster, correlate indicators of compromise (IOCs) with real assets, and move from signal to decision with full context. 
      COSMOS is designed for 24/7 situational awareness: it ingests continuously, normalizes formats, enriches artifacts, and preserves provenance so every alert can be traced back to its source.</p>
    `,
        },
        {
          text: `
      <p><strong>Features.</strong> The platform performs multi-feed ingestion with per-source parsing and enrichment, unifies IOCs (hashes, IPs, domains, URLs) into entity-centric views, and monitors the dark web for leaks, targeting chatter, and sale of stolen data. 
      Vulnerability tracking ties CVEs to your asset inventory and patch posture, prioritizing exploit-in-the-wild and KEV (Known Exploited Vulnerabilities). 
      Analyst playbooks provide step-by-step checklists, notes, and evidence capture, turning tribal knowledge into repeatable, auditable response workflows.</p>
    `,
        },
        {
          text: `
      <p><strong>Analytics.</strong> COSMOS builds behavioral baselines from historical telemetry, then scores anomalies across users, hosts, and network segments. 
      TTP clustering groups related events by ATT&CK techniques, surfacing campaigns rather than isolated alerts. 
      Every analytic view is drillable: pivot from a cluster to raw artifacts, sandbox detonation reports, PCAP slices, and original feed entries. 
      Confidence and severity are explained with contributing features so analysts understand <em>why</em> something is prioritized—not just that it is.</p>
    `,
        },
        {
          text: `
      <p><strong>Integrations.</strong> COSMOS connects to SIEM/SOAR platforms via webhooks and REST, opens tickets in incident systems with pre-filled context, and notifies channels (email/ChatOps) with deduplicated alerts. 
      Role-based access control (RBAC) and workspace isolation support multi-team and multi-tenant operations, while API keys and signed export bundles enable safe sharing with partners. 
      A plugin model allows new feed connectors, enrichment services, and automations to be added without redeploying the core.</p>
    `,
        },
        {
          text: `
      <p><strong>Outcome.</strong> Teams move from feeds to findings quickly, with end-to-end traceability. 
      COSMOS cuts time-to-triage by centralizing evidence, reduces false positives through correlation and context, and captures institutional knowledge in reusable playbooks. 
      Every action—ingest, enrich, score, escalate—is logged for audit, enabling after-action reviews that actually improve posture over time.</p>
    `,
        },
      ],
      images: [
        "/assets/images/cosmosBanner.jpg",
        "/assets/images/cosmosHeatmap.jpg",
        "/assets/images/cosmosFeatures.jpg",
      ],

      resources: {
        "Platform Links": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          {
            label: "COSMOS Security Notes",
            url: "/Notes/Sec",
            external: false,
          },
        ],
        "Research & Methodology": [
          {
            label: "Threat Modeling Write-up",
            url: "/Notes/Threat-Modeling",
            external: false,
          },
          {
            label: "ResearchGate Profile",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        "Code & Integrations": [
          {
            label: "COSMOS GitHub Repo",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          {
            label: "API Documentation (Coming Soon)",
            url: "#",
            external: false,
          },
        ],
        "Reports & Case Studies": [
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
      volume: "PORTFOLIO — SPOTLIGHT",
      title: "VAULT — End-to-End Encrypted Storage",
      slug: "vault-project",
      author: "Tobin M. Albanese",
      date: "2024-12-15",
      excerpt:
        "Client-side keys, ciphertext-only sync, and tamper-evident sharing with recovery that stays private.",
      archiveImage: "/assets/images/vaultPortfolio.jpg",
      banner: "/assets/images/vaultBanner.jpg",
      content: [
        {
          text: `
      <p><strong>Project Overview.</strong> VAULT-PROJECT is a zero-knowledge, end-to-end encrypted file and folder manager designed to keep plaintext on the client at all times. Users encrypt locally and synchronize only ciphertext and minimal metadata to the cloud, preserving privacy without sacrificing collaboration. Modern cryptography protects documents at rest and in transit, while straightforward sharing and access controls make it practical for everyday work. The guiding promise is convenience that never compromises user sovereignty over data.</p>
    `,
        },
        {
          text: `
      <p><strong>Vision &amp; Goals.</strong> The aim is to make strong security feel ordinary: encryption happens automatically on-device, sync is seamless across desktops and mobiles, and permissions are understandable at a glance. VAULT-PROJECT favors clarity over complexity—clear indicators show what is encrypted and who can decrypt it—while backups and recovery remain encrypted end-to-end so resilience never dilutes privacy. The cross-platform experience is intentionally consistent, so moving between devices does not change the security model.</p>
    `,
        },
        {
          text: `
      <p><strong>What it Provides.</strong> In practical terms, VAULT-PROJECT encrypts files and folders before any upload, syncs ciphertext to cloud object storage, and lets owners share access by exchanging keys instead of exposing content. Version history is preserved without revealing prior plaintext, and every significant action—shares, revocations, and device changes—leaves a signed, tamper-evident trace for audit. The interface keeps the workflow familiar—drag and drop, previews where possible, and clear status badges—so teams can adopt stronger practices without relearning file management from scratch.</p>
    `,
        },
        {
          text: `
      <p><strong>Architecture &amp; Tech Stack.</strong> VAULT-PROJECT separates cryptography from coordination. Clients built with Electron (desktop) and React Native (mobile) handle key generation, wrapping, and AES-GCM encryption locally, deriving keys with PBKDF2 or scrypt and never releasing plaintext to servers. Lightweight Node.js services coordinate identities, device enrollment, and sharing graphs, while cloud object storage retains encrypted blobs and version chunks. Key management—generation, rotation, and revocation—remains client-side by design, preserving the zero-knowledge model even when syncing or collaborating.</p>
    `,
        },
        {
          text: `
      <p><strong>Typical Use.</strong> Individuals and teams use VAULT-PROJECT to safeguard legal, medical, and financial documents; collaborate privately across locations; and maintain compliant, tamper-evident archives. It suits personal backups as much as shared workspaces, because encryption is the default and sharing simply extends decryption rights to the intended recipients—nothing more.</p>
    `,
        },
        {
          text: `
      <p><strong>Getting Started.</strong> Setup involves installing the desktop or mobile client, creating a workspace, and enrolling devices. From there, files dropped into VAULT-PROJECT are encrypted on the spot and synchronized as ciphertext; inviting collaborators issues keys rather than exposing content. Recovery can be configured with encrypted backups and a user-held recovery key so that resilience does not depend on the server knowing anything about the data itself.</p>
    `,
        },
      ],
      images: [
        "/assets/images/vaultOverview.jpg",
        "/assets/images/vaultProvider.jpg",
        "/assets/images/vaultArchitecture.jpg",
        "/assets/images/vaultUse.jpg",
        "/assets/images/vault5.jpg",
      ],
      resources: {
        "Platform Links": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          {
            label: "Security Notes (VAULT)",
            url: "/Notes/Sec",
            external: false,
          },
        ],
        "Crypto & Methodology": [
          { label: "Crypto Basics", url: "/Notes/Crypto", external: false },
          {
            label: "Threat Modeling Notes",
            url: "/Notes/Threat-Modeling",
            external: false,
          },
          {
            label: "ResearchGate Profile",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        "Code & SDKs": [
          {
            label: "GitHub (VAULT / clients / tooling)",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "API Schemas (Coming Soon)", url: "#", external: false },
        ],
        "Threat Models & Audits": [
          {
            label: "Transparency / Audit Log Overview (Coming Soon)",
            url: "#",
            external: false,
          },
        ],
      },
    },

    {
      volume: "PORTFOLIO — SPOTLIGHT",
      title: "NOTES — Zero-Knowledge Notes",
      slug: "notes-project",
      author: "Tobin M. Albanese",
      date: "2024-11-20",
      excerpt:
        "Offline-first writing with CRDT/OT sync and on-device encryption by default.",
      archiveImage: "/assets/images/notesPortfolio.jpg",
      banner: "/assets/images/notesBanner.jpg",
      content: [
        {
          text: `
      <p><strong>Project Overview.</strong> NOTES-PROJECT is a privacy-first notes application that treats encryption as a default, not an add-on. Every note, attachment, and index entry is encrypted locally before it ever touches a server, and only the minimum metadata required for sync is transmitted. The experience is intentionally simple—open, type, search, tag—while strong cryptography and careful key handling keep content private to the owner. The result is a familiar note-taking workflow with end-to-end security and zero-knowledge guarantees.</p>
    `,
        },
        {
          text: `
      <p><strong>Why.</strong> Capturing ideas should be fast and portable, but it shouldn’t compromise privacy. NOTES-PROJECT aims to make strong security feel invisible: it works offline on a flight or in a dead zone, then safely syncs when a connection returns. Whether the content is a personal journal or sensitive meeting minutes, the system assumes untrusted networks and honest-but-curious servers, so plaintext never leaves the device and decryption keys never reside on the backend.</p>
    `,
        },
        {
          text: `
      <p><strong>How it Works.</strong> Notes live in encrypted notebooks that synchronize across devices using conflict-tolerant data structures (CRDT/OT) so edits from multiple places merge predictably. Client apps handle key generation, wrapping, and encryption on the device; servers store ciphertext blobs and lightweight sync state. When two edits collide, the app preserves intent and offers a clear, local resolution view rather than dropping content or exposing it server-side for reconciliation.</p>
    `,
        },
        {
          text: `
      <p><strong>Editing & Organization.</strong> The editor supports rich text, markdown-style shortcuts, attachments, and inline media, with tagging and fast, local-first search. Notes can be grouped into notebooks or filtered across tags and dates. Previews render client-side so no plaintext or thumbnails are generated on the server. Export flows produce encrypted backups by default, with optional client-side decrypt when a readable archive is required.</p>
    `,
        },
        {
          text: `
      <p><strong>Privacy & Sharing.</strong> The architecture is zero-knowledge: servers see ciphertext only. When collaboration is needed, owners grant access by sharing keys—either out-of-band or via time-boxed link keys—so recipients decrypt locally and the service never gains read capability. All significant actions—new share, revoked key, device enrollment—are recorded as signed events, creating a tamper-evident activity history that can be reviewed offline.</p>
    `,
        },
        {
          text: `
      <p><strong>Extensibility.</strong> NOTES-PROJECT exposes guarded plugin hooks for templates, task extraction, and integrations while maintaining the same trust boundaries: plugins operate on decrypted content within the client sandbox and never transmit plaintext externally without explicit user intent. Over time, the plugin surface will grow to include importers, exporters, and automations that keep the security model intact.</p>
    `,
        },
        {
          text: `
      <p><strong>Getting Started.</strong> Install the desktop or mobile client, create a notebook, and enroll your devices. From that moment, keystrokes are encrypted on-device, synchronized as ciphertext, and instantly searchable locally. If you choose to share, the app guides you through key delivery so collaborators can decrypt on their own devices without changing the zero-knowledge posture of the service.</p>
    `,
        },
      ],
      images: [
        "/assets/images/notesWhy.jpg",
        "/assets/images/notesHow.jpg",
        "/assets/images/notesEdit.jpg",
        "/assets/images/notesEnigma.jpg",
        "/assets/images/notesLibrary.jpg",
      ],
      resources: {
        "Platform Links": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "App UX Notes", url: "/Notes/UX", external: false },
        ],
        "Sync & Data Structures": [
          { label: "CRDT Primer", url: "/Notes/CRDT", external: false },
        ],
        "Privacy & Methods": [
          {
            label: "Zero-Knowledge Design Notes",
            url: "/Notes/ZeroKnowledge",
            external: false,
          },
          {
            label: "ResearchGate Profile",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        "Code & Integrations": [
          {
            label: "GitHub (NOTES-PROJECT)",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          {
            label: "API / Plugin Hooks (Coming Soon)",
            url: "#",
            external: false,
          },
        ],
        Home: [{ label: "Home", url: "/", external: false }],
      },
    },
  ],

  "Computer Science Projects": [
    {
      volume: "Computer Science Project 1",
      title: "NAOMI PROJECT",
      slug: "naomi",
      author: "Tobin M. Albanese",
      date: "2024-03-05",
      excerpt:
        "An advanced AI platform designed to detect and analyze micro-expressions — tiny, fleeting facial movements that often reveal hidden emotions like stress, deception, or confidence. Neural Analysis Of Micro-Intent in real-time micro-expressions → inferred intent.",
      archiveImage: "/assets/images/naomiPortfolio.jpg",
      banner: "/assets/images/naomiBanner.jpg",

      content: [
        {
          text: `
      <p><strong>Overview.</strong> NAOMI (Neural Analysis of Micro-Intent) is an advanced behavioral analytics system designed to detect and interpret micro-expressions — subtle, fleeting facial movements that occur in fractions of a second. 
      These signals, often invisible to casual human observation, can provide important cues about a person’s underlying state such as stress, confidence, or possible deception. 
      NAOMI processes both live and recorded video, tracking facial landmarks at high frequency, and computing temporal deltas across micro-windows of tens of milliseconds. 
      The platform translates this into structured, calibrated outputs that can be reviewed by human analysts, making it a powerful augmentation tool in interviews, intelligence gathering, psychology, user research, and training environments.</p>
    `,
        },
        {
          text: `
      <p><strong>Why this matters.</strong> Human evaluators are skilled at interpreting broad body language, but the reality is that rapid micro-expressions often occur too quickly for the eye to register, especially under time pressure or distraction. 
      A subtle twitch of an eyebrow, a half-suppressed smile, or a fleeting tightening around the eyes can carry critical meaning — yet they vanish in less than a quarter of a second. 
      NAOMI offers analysts a second layer of observation: a consistent, explainable, high-frequency sensor that runs in parallel with human judgment. 
      Rather than replacing intuition, it strengthens it, ensuring that critical signals are not lost and that evaluators can pause, review, and assess cues in context rather than relying solely on memory or impression.</p>
    `,
        },
        {
          text: `
      <p><strong>Objectives.</strong> The design of NAOMI is shaped around four central objectives. 
      First, it must deliver true real-time performance, with latencies under 40ms per frame so that overlays remain usable in live scenarios. 
      Second, it must provide explainable outputs — not just black-box classifications, but visible action units, heatmaps, and frame-to-frame deltas that users can understand. 
      Third, it must demonstrate robustness against environmental factors such as poor lighting, angled faces, or partial occlusions like glasses and masks. 
      And fourth, it must maintain full auditability and privacy-conscious design, producing exportable traces for later review while never storing or transmitting sensitive footage unnecessarily. 
      Together, these objectives ensure that NAOMI is not just a research demo, but a deployable and responsible system.</p>
    `,
        },
        {
          text: `
      <p><strong>Architecture.</strong> NAOMI uses a modular architecture with both edge and server deployment options. 
      At the edge — in-browser or on-device — lightweight models run directly on user hardware, ensuring video never leaves the system. 
      In server deployments, GPU-backed services process streams at scale, enabling batch analytics and long-term archival of inference traces. 
      The end-to-end flow follows a structured pipeline: capture, preprocessing, landmark detection, temporal feature modeling, intent classification, calibration, and finally reporting. 
      Each stage is decoupled, meaning models can be swapped or upgraded independently, giving the system long-term adaptability as methods and hardware evolve.</p>
    `,
        },
        {
          text: `
      <p><strong>Signal pipeline.</strong> At the heart of NAOMI is its signal-processing chain. 
      Each incoming frame undergoes face detection and landmark tracking. 
      These landmarks are compared across micro-windows of 30–80ms, capturing tiny deltas in x/y coordinates that correspond to micro-movements. 
      Temporal models such as BiLSTMs and Temporal CNNs ingest these sequences, smoothing noise, interpolating across small gaps, and handling jitter or occlusion. 
      The model outputs intent predictions, which are then calibrated before being surfaced to the analyst. 
      This pipeline is engineered to balance sensitivity with stability, flagging meaningful signals while suppressing irrelevant motion.</p>
    `,
        },
        {
          text: `
      <p><strong>Features.</strong> NAOMI’s outputs go far beyond a single probability score. 
      Analysts can access normalized 68- or 106-point landmark maps, per-landmark micro-deltas over short windows, localized action unit activations derived from the Facial Action Coding System, and stabilized overlays produced via optical-flow tracking. 
      Heatmaps highlight regions of the face most associated with detected intent, while frame-level charts show how probabilities rise and fall over time. 
      These multi-layered features ensure that signals remain interpretable and actionable, rather than being hidden inside an opaque classifier.</p>
    `,
        },
        {
          text: `
      <p><strong>Modeling & training.</strong> The NAOMI models are trained through transfer learning on expression recognition corpora, then fine-tuned with domain-specific adaptations. 
      Datasets are curated with an emphasis on annotation quality: multiple human raters label the same footage, disagreements are adjudicated, and only consensus examples make it into training sets. 
      Probability calibration methods like Platt scaling and temperature scaling ensure outputs reflect real likelihoods rather than overconfident guesses. 
      The training process is not just about maximizing accuracy — it is about producing models whose outputs can be trusted in sensitive human-facing contexts.</p>
    `,
        },
        {
          text: `
      <p><strong>Data & labeling.</strong> High-quality data underpins NAOMI’s reliability. 
      The system draws from a combination of public corpora, in-house datasets, and synthetic augmentations that simulate different poses, lighting conditions, and occlusions. 
      Each dataset is version-controlled with tools like DVC, enabling traceability of labels and models across iterations. 
      Double-labeling with adjudication ensures inter-rater reliability, reducing noise and bias in the data. 
      By maintaining meticulous provenance of all training material, NAOMI ensures both reproducibility and accountability in its evolution.</p>
    `,
        },
        {
          text: `
      <p><strong>Evaluation.</strong> NAOMI’s performance is validated through comprehensive benchmarks. 
      On RTX-class GPUs, it achieves frame latencies of 25–38ms, enabling real-time overlays. 
      On modern laptops running edge deployments, it sustains 12–18fps with acceptable accuracy. 
      Robustness testing demonstrates reliable performance up to ±15° yaw/pitch rotation before significant drift. 
      Calibration results show Expected Calibration Error under 0.06 after scaling, meaning probabilities align closely with true likelihoods. 
      These metrics confirm that NAOMI is not only fast, but also trustworthy across varied conditions.</p>
    `,
        },
        {
          text: `
      <p><strong>Interface.</strong> The analyst interface is designed to make complex signals usable in real-world workflows. 
      In live mode, overlays highlight landmarks, heatmaps, and intent scores directly on the video feed. 
      Analysts can scrub back through footage, adjust playback speed, and inspect frame-level probability charts. 
      Batch mode supports uploads of large video sets with automated summary reports. 
      Adjustable sampling rates let users tune the balance between performance and fidelity. 
      The goal is not just to present data, but to present it in a way that supports fast comprehension and confident decision-making.</p>
    `,
        },
        {
          text: `
      <p><strong>API.</strong> NAOMI exposes its functionality through a developer-friendly API that delivers structured, machine-readable outputs. 
      Responses include frame indices, raw landmark coordinates, action unit activations, micro-delta RMS values, calibrated intent scores, and precise timestamps. 
      This allows integration into larger systems — from training simulators to research dashboards — without requiring analysts to parse visualizations. 
      By being transparent and consistent, the API ensures NAOMI can plug into diverse ecosystems smoothly.</p>
    `,
        },
        {
          text: `
      <p><strong>Deployment.</strong> Flexibility in deployment is a core design feature. 
      NAOMI can run entirely on-device for privacy-sensitive use cases, leveraging WebAssembly and WebGL for inference in browsers or desktop applications. 
      In server mode, GPU workers scale elastically via container orchestration, with gRPC/REST endpoints serving multiple clients. 
      Traces and outputs are stored securely in object storage, while CI/CD pipelines automate build and deployment across environments. 
      This versatility allows NAOMI to be deployed in secure labs, enterprise servers, or distributed field environments with equal ease.</p>
    `,
        },
        {
          text: `
      <p><strong>Security & privacy.</strong> NAOMI was designed with security and privacy as first-class priorities. 
      Role-based access controls determine who can access data and outputs. 
      Encryption protects information at rest and in transit, while retention policies allow organizations to automatically expire sensitive records. 
      Analysts can export anonymized inference traces without exposing raw video. 
      An on-device-only mode is available for the highest-security environments, ensuring no data ever leaves the analyst’s machine. 
      This safeguards trust and compliance in contexts where data protection is essential.</p>
    `,
        },
        {
          text: `
      <p><strong>Limitations.</strong> Like any AI system, NAOMI has known boundaries. 
      Extreme occlusions such as masks, scarves, or sunglasses reduce accuracy. 
      Cultural and individual differences in expression mean thresholds must be tuned carefully for context. 
      The system is best viewed as an indicator, not a verdict: it surfaces additional cues for human evaluators but is never intended to provide definitive judgments about truth or intent. 
      Being transparent about these limitations is central to NAOMI’s design and ethical positioning.</p>
    `,
        },
        {
          text: `
      <p><strong>Ethics.</strong> Ethical safeguards are embedded into NAOMI’s deployment philosophy. 
      The system is always human-in-the-loop, requiring explicit consent and documented limits of use. 
      Error rates are disclosed openly rather than hidden, preventing overconfidence. 
      Red-team reviews simulate misuse cases — such as coercive interrogation or surveillance overreach — to identify risks and build mitigations. 
      By prioritizing transparency, consent, and accountability, NAOMI ensures that powerful technology is applied responsibly.</p>
    `,
        },
        {
          text: `
      <p><strong>Roadmap.</strong> NAOMI’s future development roadmap extends beyond facial micro-expression analysis. 
      Planned milestones include multimodal fusion with audio prosody and keystroke dynamics, enabling richer behavioral insights. 
      Advances in self-supervised pretraining will improve robustness in low-light conditions, while distilled transformer models will bring higher accuracy to lightweight edge deployments. 
      Collaborative analyst note-taking will generate weak labels that feed back into continual learning pipelines. 
      These roadmap items point toward NAOMI evolving into a comprehensive, multimodal human-behavior analytics platform.</p>
    `,
        },
        {
          text: `
      <p><strong>Stack.</strong> NAOMI is built on a stack of proven technologies and modern ML frameworks. 
      PyTorch provides the foundation for model training and inference, with ONNX enabling optimized, portable runtime execution. 
      OpenCV and MediaPipe power real-time video analysis and landmark tracking. 
      FastAPI and gRPC provide efficient APIs, while React and D3.js render intuitive analyst interfaces. 
      Deployment pipelines use Docker for containerization and Terraform for infrastructure as code, with CI/CD automating continuous delivery. 
      This combination makes NAOMI adaptable, developer-friendly, and production-ready.</p>
    `,
        },
      ],

      images: [
        "/assets/images/naomiWhy.jpg",
        "/assets/images/naomiPillars.jpg",
        "/assets/images/naomiArchitecture.jpg",
        "/assets/images/naomiPipeline.jpg",
        "/assets/images/naomiFeatures.jpg",
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
      volume: "Computer Science Project 2",
      title: "STELLARIS Project",
      slug: "stellaris",
      author: "Tobin M. Albanese",
      date: "2024-01-20",
      excerpt:
        "An AI-driven platform that ingests, processes, and analyzes large volumes of unstructured text and relational data from open sources such as news, social media, government releases, and intercepted communications. ",
      archiveImage: "/assets/images/stellarisPortfolio.jpg",
      banner: "/assets/images/stellarisBanner.jpg",
      content: [
        {
          text: `
      <p><strong>Mission.</strong> STELLARIS (Structured Textual Extraction & Linking for Live Analysis of Real-time Intelligence Sources) exists to transform the unstructured noise of the open web into structured, defensible, and actionable intelligence. 
      The platform continuously ingests massive volumes of text streams — ranging from news articles and government filings to online forums, RSS feeds, and PDF reports — and converts this raw, unstructured material into a living web of linked data. 
      Analysts are no longer forced to manually sift through documents, guess at connections, or rely on brittle keyword searches; instead, they can follow a clear thread from a single individual to their associated addresses, companies, financial transactions, and cross-border shipments. 
      Every connection remains anchored in its original source, so context and evidentiary lineage are never lost. The mission is simple but ambitious: empower investigators, researchers, and intelligence professionals to understand complex realities faster, more reliably, and with complete transparency.</p>
    `,
        },
        {
          text: `
      <p><strong>What it does.</strong> At its core, STELLARIS is a pipeline for turning words into structured networks of knowledge. 
      The system applies advanced natural language processing (NLP) techniques — including named entity recognition, cross-document entity resolution, relation extraction, event detection, and temporal normalization — to every incoming document. 
      This means the platform doesn’t just identify “who” is mentioned in a text, but also “how” those people or organizations are connected, “what” events they participated in, and “when” those events occurred. 
      The extracted information is assembled into an interactive knowledge graph where analysts can explore relationships, filter by attributes, overlay geospatial or temporal views, and pivot across different types of entities seamlessly. 
      Instead of static search results, users receive a living map of connections that evolves as new information flows in, making the invisible visible in real time.</p>
    `,
        },
        {
          text: `
      <p><strong>Analyst workflow.</strong> STELLARIS is designed around the way human analysts actually work. 
      A typical workflow might begin with a single seed — a company, a username, a shipping record, or even a fragment of leaked data. 
      From this starting point, the analyst can explore first- and second-degree relationships, visualizing how seemingly unrelated entities begin to cluster into meaningful patterns. 
      They can pin subgraphs of interest, annotate edges with hypotheses or questions, and save customized views that preserve filters, time windows, and notes for future sessions or team sharing. 
      Every node and edge is annotated with citations, model confidence, and version history, so nothing is ever taken on faith. 
      This design makes it possible for teams to review, challenge, and reproduce each other’s findings, turning the platform into not just a discovery tool but also a collaborative research environment where insights are defensible and transparent.</p>
    `,
        },
        {
          text: `
      <p><strong>Stack.</strong> The technology stack behind STELLARIS combines distributed data engineering with cutting-edge machine learning. 
      On the ingestion side, distributed workers handle incoming streams with robust backpressure controls, ensuring no single source overwhelms the system. 
      Message queues balance loads, while FastAPI services orchestrate requests across the pipeline. 
      Transformer-based NLP models (built on Hugging Face and spaCy) handle tasks like entity recognition, relation extraction, and event detection, producing structured records from messy text. 
      ElasticSearch powers fast keyword and semantic search, while a graph database (Neo4j or JanusGraph) stores and queries the resulting networks. 
      On the frontend, a React/Vite application renders graphs at scale with GPU-accelerated layouts, type-ahead entity search, and keyboard-driven pivoting, giving analysts a responsive, interactive workspace even with millions of nodes and edges. 
      The result is a stack that is both modern and battle-tested, capable of handling real-world data at real-world scale.</p>
    `,
        },
        {
          text: `
      <p><strong>Data quality & provenance.</strong> In intelligence analysis, trust is everything. 
      That is why STELLARIS treats provenance as a first-class concern. 
      Every edge in the graph is linked back to the exact source from which it was derived — including the document URI, the paragraph offset, the model version that produced it, and the scoring features used in extraction. 
      Ingestion processes are idempotent, relying on hashing to detect duplicates, while assertions can be re-scored as models improve over time. 
      Analysts can invoke an “explain-this-edge” action to see the raw snippet, the extraction process, and even model confidence. 
      Rollbacks are supported at every level, making it possible to test new models, audit old ones, or red-team sensitive cases without corrupting the graph. 
      This rigorous approach ensures that every claim in the system can be verified, challenged, or disproven — the opposite of a black box.</p>
    `,
        },
        {
          text: `
      <p><strong>Scale & reliability.</strong> Real-world OSINT environments are messy and bursty — some days the system must absorb thousands of routine filings, while other days it is hit with floods of breaking news or viral posts. 
      STELLARIS is engineered to handle both extremes gracefully. 
      Message queues smooth out ingestion spikes, while batch and streaming modes run in parallel to balance throughput with latency. 
      Retry policies and dead-letter queues ensure that problematic documents don’t clog the pipeline, while monitoring dashboards track queue depths, error rates, and model latencies in real time. 
      Nightly compaction tasks merge duplicate entities and refresh indexes to keep queries fast. 
      Schema migration scripts evolve the graph database without downtime, so analysts never lose access even during upgrades. 
      The overall design principle is simple: reliability at scale, because analysts can’t afford gaps or outages in the middle of an investigation.</p>
    `,
        },
        {
          text: `
      <p><strong>Security & governance.</strong> Because STELLARIS often deals with sensitive or personally identifiable information, governance is embedded into the platform itself. 
      Fine-grained role-based access controls (RBAC) allow administrators to control who can view, edit, or export specific segments of the graph. 
      Sensitive attributes can be masked or hidden entirely depending on clearance level, while export bundles are signed with checksums to prevent tampering. 
      Secrets and credentials are rotated automatically, and all data — both at rest and in transit — is encrypted with modern standards. 
      Audit logs capture every action, making it possible to review not just what the data says, but who accessed it, when, and how. 
      This makes STELLARIS suitable not only for open-source research, but also for regulated environments where compliance and accountability are non-negotiable.</p>
    `,
        },
        {
          text: `
      <p><strong>Impact.</strong> The practical outcome of all this engineering is measurable acceleration in the way analysts work. 
      Tasks that once took hours — verifying an alias across multiple reports, surfacing intermediaries in a financial network, or mapping supply chain hops across borders — now take minutes. 
      Instead of emailing screenshots or exporting static reports, teams can share reproducible graph views that carry all the filters, time windows, and citations baked in. 
      This reduces duplication of effort, makes peer review far easier, and ensures that insights scale across an organization rather than living in individual silos. 
      For organizations facing information overload, STELLARIS doesn’t just speed up analysis; it changes the very culture of how intelligence is produced, reviewed, and disseminated.</p>
    `,
        },
        {
          text: `
      <p><strong>Roadmap.</strong> STELLARIS is already powerful, but its future is even more ambitious. 
      Upcoming milestones include cross-lingual models that can normalize entities across languages and scripts, enabling global investigations without linguistic blind spots. 
      Stance and claim clustering will allow analysts to group related narratives, distinguish between factual reporting and opinion, and identify coordinated campaigns. 
      Natural-language graph queries will let users type questions like “Show all shell companies linked to X in 2022” and receive structured subgraphs as answers. 
      Event-sequence anomaly detection will flag unusual chains of activity — like logistics routes that don’t match normal patterns. 
      Finally, collaborative playbooks will allow teams to codify repeatable workflows as templates, so that common investigative patterns can be reused, audited, and improved over time. 
      Together, these roadmap items point to a system that doesn’t just document the world, but actively helps analysts stay ahead of it.</p>
    `,
        },
      ],

      images: [
        "/assets/images/stellarisOverview.jpg",
        "/assets/images/stellarisWorkflow.jpg",
        "/assets/images/stellarisStack.jpg",
        "/assets/images/stellarisQuality.jpg",
        "/assets/images/stellarisScale.jpg",
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
      volume: "Computer Science Project 3 ",
      title: "COSMOS Project",
      slug: "cosmos",
      author: "Tobin M. Albanese",
      date: "2024-05-12",
      excerpt:
        "A centralized cybersecurity platform designed to monitor, analyze, and respond to evolving cyber threats. It focuses on real-time malware detection, dark web intelligence, vulnerability tracking, and cyber attack pattern analysis—comprehensive situational awareness to protect critical information.",
      archiveImage: "/assets/images/cosmosPortfolio.jpg",
      banner: "/assets/images/cosmosEarth.jpg",
      content: [
        {
          text: `
      <p><strong>Purpose.</strong> COSMOS consolidates heterogeneous cyber threat data—commercial/open feeds, dark-web chatter, vulnerability disclosures, malware sandboxes, and internal telemetry—into a single operational pane. 
      By eliminating swivel-chair analysis across tabs and tools, analysts can triage faster, correlate indicators of compromise (IOCs) with real assets, and move from signal to decision with full context. 
      COSMOS is designed for 24/7 situational awareness: it ingests continuously, normalizes formats, enriches artifacts, and preserves provenance so every alert can be traced back to its source.</p>
    `,
        },
        {
          text: `
      <p><strong>Features.</strong> The platform performs multi-feed ingestion with per-source parsing and enrichment, unifies IOCs (hashes, IPs, domains, URLs) into entity-centric views, and monitors the dark web for leaks, targeting chatter, and sale of stolen data. 
      Vulnerability tracking ties CVEs to your asset inventory and patch posture, prioritizing exploit-in-the-wild and KEV (Known Exploited Vulnerabilities). 
      Analyst playbooks provide step-by-step checklists, notes, and evidence capture, turning tribal knowledge into repeatable, auditable response workflows.</p>
    `,
        },
        {
          text: `
      <p><strong>Analytics.</strong> COSMOS builds behavioral baselines from historical telemetry, then scores anomalies across users, hosts, and network segments. 
      TTP clustering groups related events by ATT&CK techniques, surfacing campaigns rather than isolated alerts. 
      Every analytic view is drillable: pivot from a cluster to raw artifacts, sandbox detonation reports, PCAP slices, and original feed entries. 
      Confidence and severity are explained with contributing features so analysts understand <em>why</em> something is prioritized—not just that it is.</p>
    `,
        },
        {
          text: `
      <p><strong>Integrations.</strong> COSMOS connects to SIEM/SOAR platforms via webhooks and REST, opens tickets in incident systems with pre-filled context, and notifies channels (email/ChatOps) with deduplicated alerts. 
      Role-based access control (RBAC) and workspace isolation support multi-team and multi-tenant operations, while API keys and signed export bundles enable safe sharing with partners. 
      A plugin model allows new feed connectors, enrichment services, and automations to be added without redeploying the core.</p>
    `,
        },
        {
          text: `
      <p><strong>Outcome.</strong> Teams move from feeds to findings quickly, with end-to-end traceability. 
      COSMOS cuts time-to-triage by centralizing evidence, reduces false positives through correlation and context, and captures institutional knowledge in reusable playbooks. 
      Every action—ingest, enrich, score, escalate—is logged for audit, enabling after-action reviews that actually improve posture over time.</p>
    `,
        },
      ],
      images: [
        "/assets/images/cosmosBanner.jpg",
        "/assets/images/cosmosHeatmap.jpg",
        "/assets/images/cosmosFeatures.jpg",
      ],

      resources: {
        "Platform Links": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          {
            label: "COSMOS Security Notes",
            url: "/Notes/Sec",
            external: false,
          },
        ],
        "Research & Methodology": [
          {
            label: "Threat Modeling Write-up",
            url: "/Notes/Threat-Modeling",
            external: false,
          },
          {
            label: "ResearchGate Profile",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        "Code & Integrations": [
          {
            label: "COSMOS GitHub Repo",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          {
            label: "API Documentation (Coming Soon)",
            url: "#",
            external: false,
          },
        ],
        "Reports & Case Studies": [
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
      volume: "Computer Science Project 4",
      title: "VAULT PROJECT",
      slug: "vault-project",
      author: "Tobin M. Albanese",
      date: "2023-12-01",
      excerpt:
        "Provides users with a secure platform to encrypt, store, and manage files and folders locally and in the cloud. Utilizing strong encryption algorithms, VAULT ensures that sensitive documents remain private, enabling secure sharing and access control while maintaining user sovereignty over data.",
      archiveImage: "/assets/images/vaultPortfolio.jpg",
      banner: "/assets/images/vaultBanner.jpg",
      content: [
        {
          text: `
      <p><strong>Project Overview.</strong> VAULT-PROJECT is a zero-knowledge, end-to-end encrypted file and folder manager designed to keep plaintext on the client at all times. Users encrypt locally and synchronize only ciphertext and minimal metadata to the cloud, preserving privacy without sacrificing collaboration. Modern cryptography protects documents at rest and in transit, while straightforward sharing and access controls make it practical for everyday work. The guiding promise is convenience that never compromises user sovereignty over data.</p>
    `,
        },
        {
          text: `
      <p><strong>Vision &amp; Goals.</strong> The aim is to make strong security feel ordinary: encryption happens automatically on-device, sync is seamless across desktops and mobiles, and permissions are understandable at a glance. VAULT-PROJECT favors clarity over complexity—clear indicators show what is encrypted and who can decrypt it—while backups and recovery remain encrypted end-to-end so resilience never dilutes privacy. The cross-platform experience is intentionally consistent, so moving between devices does not change the security model.</p>
    `,
        },
        {
          text: `
      <p><strong>What it Provides.</strong> In practical terms, VAULT-PROJECT encrypts files and folders before any upload, syncs ciphertext to cloud object storage, and lets owners share access by exchanging keys instead of exposing content. Version history is preserved without revealing prior plaintext, and every significant action—shares, revocations, and device changes—leaves a signed, tamper-evident trace for audit. The interface keeps the workflow familiar—drag and drop, previews where possible, and clear status badges—so teams can adopt stronger practices without relearning file management from scratch.</p>
    `,
        },
        {
          text: `
      <p><strong>Architecture &amp; Tech Stack.</strong> VAULT-PROJECT separates cryptography from coordination. Clients built with Electron (desktop) and React Native (mobile) handle key generation, wrapping, and AES-GCM encryption locally, deriving keys with PBKDF2 or scrypt and never releasing plaintext to servers. Lightweight Node.js services coordinate identities, device enrollment, and sharing graphs, while cloud object storage retains encrypted blobs and version chunks. Key management—generation, rotation, and revocation—remains client-side by design, preserving the zero-knowledge model even when syncing or collaborating.</p>
    `,
        },
        {
          text: `
      <p><strong>Typical Use.</strong> Individuals and teams use VAULT-PROJECT to safeguard legal, medical, and financial documents; collaborate privately across locations; and maintain compliant, tamper-evident archives. It suits personal backups as much as shared workspaces, because encryption is the default and sharing simply extends decryption rights to the intended recipients—nothing more.</p>
    `,
        },
        {
          text: `
      <p><strong>Getting Started.</strong> Setup involves installing the desktop or mobile client, creating a workspace, and enrolling devices. From there, files dropped into VAULT-PROJECT are encrypted on the spot and synchronized as ciphertext; inviting collaborators issues keys rather than exposing content. Recovery can be configured with encrypted backups and a user-held recovery key so that resilience does not depend on the server knowing anything about the data itself.</p>
    `,
        },
      ],
      images: [
        "/assets/images/vaultOverview.jpg",
        "/assets/images/vaultProvider.jpg",
        "/assets/images/vaultArchitecture.jpg",
        "/assets/images/vaultUse.jpg",
        "/assets/images/vault5.jpg",
      ],
      resources: {
        "Platform Links": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          {
            label: "Security Notes (VAULT)",
            url: "/Notes/Sec",
            external: false,
          },
        ],
        "Crypto & Methodology": [
          { label: "Crypto Basics", url: "/Notes/Crypto", external: false },
          {
            label: "Threat Modeling Notes",
            url: "/Notes/Threat-Modeling",
            external: false,
          },
          {
            label: "ResearchGate Profile",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        "Code & SDKs": [
          {
            label: "GitHub (VAULT / clients / tooling)",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "API Schemas (Coming Soon)", url: "#", external: false },
        ],
        "Threat Models & Audits": [
          {
            label: "Transparency / Audit Log Overview (Coming Soon)",
            url: "#",
            external: false,
          },
        ],
      },
    },

    {
      volume: "Computer Science Project 5",
      title: "NOTES PROJECT",
      slug: "notes-project",
      author: "Tobin M. Albanese",
      date: "2024-02-15",
      excerpt:
        "Zero-knowledge notes with offline-first sync and rich editing. a privacy-first note-taking app that encrypts user data end-to-end, ensuring all notes are stored securely and accessible only by the user. Future linked towards Vault Project as 1:1",
      archiveImage: "/assets/images/notesPortfolio.jpg",
      banner: "/assets/images/notesBanner.jpg",
      content: [
        {
          text: `
      <p><strong>Project Overview.</strong> NOTES-PROJECT is a privacy-first notes application that treats encryption as a default, not an add-on. Every note, attachment, and index entry is encrypted locally before it ever touches a server, and only the minimum metadata required for sync is transmitted. The experience is intentionally simple—open, type, search, tag—while strong cryptography and careful key handling keep content private to the owner. The result is a familiar note-taking workflow with end-to-end security and zero-knowledge guarantees.</p>
    `,
        },
        {
          text: `
      <p><strong>Why.</strong> Capturing ideas should be fast and portable, but it shouldn’t compromise privacy. NOTES-PROJECT aims to make strong security feel invisible: it works offline on a flight or in a dead zone, then safely syncs when a connection returns. Whether the content is a personal journal or sensitive meeting minutes, the system assumes untrusted networks and honest-but-curious servers, so plaintext never leaves the device and decryption keys never reside on the backend.</p>
    `,
        },
        {
          text: `
      <p><strong>How it Works.</strong> Notes live in encrypted notebooks that synchronize across devices using conflict-tolerant data structures (CRDT/OT) so edits from multiple places merge predictably. Client apps handle key generation, wrapping, and encryption on the device; servers store ciphertext blobs and lightweight sync state. When two edits collide, the app preserves intent and offers a clear, local resolution view rather than dropping content or exposing it server-side for reconciliation.</p>
    `,
        },
        {
          text: `
      <p><strong>Editing & Organization.</strong> The editor supports rich text, markdown-style shortcuts, attachments, and inline media, with tagging and fast, local-first search. Notes can be grouped into notebooks or filtered across tags and dates. Previews render client-side so no plaintext or thumbnails are generated on the server. Export flows produce encrypted backups by default, with optional client-side decrypt when a readable archive is required.</p>
    `,
        },
        {
          text: `
      <p><strong>Privacy & Sharing.</strong> The architecture is zero-knowledge: servers see ciphertext only. When collaboration is needed, owners grant access by sharing keys—either out-of-band or via time-boxed link keys—so recipients decrypt locally and the service never gains read capability. All significant actions—new share, revoked key, device enrollment—are recorded as signed events, creating a tamper-evident activity history that can be reviewed offline.</p>
    `,
        },
        {
          text: `
      <p><strong>Extensibility.</strong> NOTES-PROJECT exposes guarded plugin hooks for templates, task extraction, and integrations while maintaining the same trust boundaries: plugins operate on decrypted content within the client sandbox and never transmit plaintext externally without explicit user intent. Over time, the plugin surface will grow to include importers, exporters, and automations that keep the security model intact.</p>
    `,
        },
        {
          text: `
      <p><strong>Getting Started.</strong> Install the desktop or mobile client, create a notebook, and enroll your devices. From that moment, keystrokes are encrypted on-device, synchronized as ciphertext, and instantly searchable locally. If you choose to share, the app guides you through key delivery so collaborators can decrypt on their own devices without changing the zero-knowledge posture of the service.</p>
    `,
        },
      ],
      images: [
        "/assets/images/notesWhy.jpg",
        "/assets/images/notesHow.jpg",
        "/assets/images/notesEdit.jpg",
        "/assets/images/notesEnigma.jpg",
        "/assets/images/notesLibrary.jpg",
      ],
      resources: {
        "Platform Links": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "App UX Notes", url: "/Notes/UX", external: false },
        ],
        "Sync & Data Structures": [
          { label: "CRDT Primer", url: "/Notes/CRDT", external: false },
        ],
        "Privacy & Methods": [
          {
            label: "Zero-Knowledge Design Notes",
            url: "/Notes/ZeroKnowledge",
            external: false,
          },
          {
            label: "ResearchGate Profile",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        "Code & Integrations": [
          {
            label: "GitHub (NOTES-PROJECT)",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          {
            label: "API / Plugin Hooks (Coming Soon)",
            url: "#",
            external: false,
          },
        ],
        Home: [{ label: "Home", url: "/", external: false }],
      },
    },

    {
      volume: "Computer Science Project 6",
      title: "Portfolio & Research Hub",
      slug: "portfolio-hub",
      author: "Tobin M. Albanese",
      date: "2025-01-01",
      excerpt:
        "My personal website for exploring my portfolio, stories about me & my interests, along with the curation of my blog page; Midnight Bureau where I dive into topics I'm most interested in & real time Intelligence analysis!",
      archiveImage: "/assets/images/portfolioHub.jpg",
      banner: "/assets/images/portfolioBanner.jpg",
      content: [
        {
          text: `
      <p><strong>Why this exists.</strong> I wanted one quiet place to gather the things I’m building and learning—projects, essays, and the Midnight Bureau archive—without chasing half-finished drafts across apps. This site is my working notebook in public. It’s tidy on the surface so it’s pleasant to read, but it doesn’t hide the in-progress parts: the small experiments, the detours, the questions I’m still figuring out. I also wanted permanence. Links should stay valid, citations should have a home, and files shouldn’t disappear because a platform changed its mind. Publishing here gives me a stable address to point to, a place I control, and a rhythm that encourages me to refine ideas out in the open instead of waiting for “perfect.”</p>
    `,
        },
        {
          text: `
      <p><strong>How I want it to feel.</strong> Calm and quick. Pages should open fast and stay out of the way—no pop-ups, no newsletter walls, no unexpected motion. The typography aims for a comfortable line length and steady rhythm so reading feels effortless, even on a small phone late at night. Color is used sparingly, mostly to guide attention; whitespace does the heavy lifting. Interactions are gentle: hover hints, clear affordances, predictable focus states. If you only have a few minutes between tasks, you can still drop in, scan a page, and leave with something useful. If you have an hour, the layout scales with you and invites a deeper read without feeling heavy.</p>
    `,
        },
        {
          text: `
      <p><strong>How it’s organized.</strong> The home grid is a map, not a maze. Each card opens to a focused deep-dive page with the same simple structure: title, context, body, images, and a small resource panel for links and references. Projects, essays, and Bureau posts all share this schema so I can cross-link related ideas without custom glue every time. Tags connect threads across formats; series collect longer arcs; dates keep the story honest. You’ll find gentle breadcrumbs, related reads at the end, and clear anchors for headings so it’s easy to reference a specific section. The goal is to make discovery obvious and maintenance boring—in the best way.</p>
    `,
        },
        {
          text: `
      <p><strong>My workflow.</strong> I write in Markdown/MDX because it keeps me close to the text. Drafts often start as short notes or outlines that I push early, then shape over time. When something moves from sketch to substance, I add images, callouts, and citations; when I change my mind, I leave a trace so the reasoning is visible. Small diagrams live alongside paragraphs. Commit messages act like a lab notebook. I try to publish decisions, not just outcomes—what I tried, what broke, what I kept. This pace lets me ship ideas while they’re fresh and come back later to tighten the prose without losing the path I took to get there.</p>
    `,
        },
        {
          text: `
      <p><strong>Craft &amp; accessibility.</strong> I sweat the basics because they matter every day: consistent headings, real landmarks, strong contrast, generous spacing, and meaningful alt text for images. Pages are light and cache well; images are responsive and lazy-load when they’re actually needed. Keyboard navigation is first-class, focus states are obvious, and motion is minimal (and reducible). If JavaScript is limited, the content still reads cleanly. The site should feel welcoming whether you’re skimming with a trackpad, reading with a screen reader, or printing a long case study to mark up with a pen.</p>
    `,
        },
        {
          text: `
    <p><strong>Background.</strong> My center of gravity is intelligence work—collecting, structuring, and turning fragments into something a team can act on. I’m drawn to target development: mapping people and organizations, tracing logistics and finance, and producing briefs that hold up under scrutiny. That bias shows up in how I build and write here. I keep sources, citations, and version history close; I document assumptions and alternatives; and I try to make every page a small training rep in tradecraft—state a hypothesis, gather, analyze, reduce to what matters. The tools and projects across this site—graph analysis, threat dashboards, secure comms, disciplined note-taking—are all aimed at the same goal: becoming the kind of intelligence targeter who can find the signal, defend the reasoning, and deliver something useful when time is tight.</p>
  `,
        },

        {
          text: `
      <p><strong>What’s next.</strong> I’m building a single search that spans the portfolio and the Bureau so you can jump to an idea no matter where it lives. Shared tagging will help surface threads that cut across projects and essays. I want a print-friendly mode for long pieces that respects footnotes and figures, plus RSS for new essays so you don’t have to remember to check back. Analytics will stay minimal—enough to learn what’s working, never enough to profile anyone. Over time I’ll open-source small pieces of the stack and keep tightening the writing tools so publishing here remains fast, durable, and enjoyable.</p>
    `,
        },
      ],
      images: [
        "/assets/images/portfolio1.jpg",
        "/assets/images/portfolioMap.jpg",
        "/assets/images/portfolioUX.jpg",
        "/assets/images/portfolioAccess.jpg",
        "/assets/images/lincoln.jpg",
      ],
      resources: {
        "Live & Navigation": [
          {
            label: "Live Site",
            url: "https://www.tobinalbanese.com",
            external: true,
          },
          { label: "Midnight Bureau", url: "/MidnightBureau", external: false },
        ],
        "About & Research": [
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        "Code & Repos": [
          {
            label: "GitHub",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
        ],
      },
    },
  ],

  "Research & Analysis Projects": [
    {
      volume: "Research Project Volume 1",
      title: "Behavioral AI for Threat Detection",
      slug: "behavioral-ai-threat-detection",
      author: "Tobin M. Albanese",
      date: "2023-11-01",
      excerpt:
        "Probabilistic micro expression cues that support human risk assessment; carefully measured and calibrated, never presented as certainty.",
      archiveImage:
        "https://images.unsplash.com/photo-1571325004705-0f26f602e53f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVoYXZpb3JhbCUyMGFuYWx5c2lzfGVufDB8fDB8fHww",
      banner: "/assets/images/portfolio/behav-ai-banner.jpg",
      content: [
        {
          text: "Measure what helps a human decide, not what flatters a metric.",
        },
        {
          text: `<h3>Abstract</h3>
    <p>This work investigates whether brief facial events—micro-expressions and short Action Unit (AU) sequences—can serve as <em>probabilistic</em> signals that <em>augment</em> existing threat models. The ambition is deliberately narrow: provide calibrated, low-confidence prompts that help human operators decide when to look closer, not machines that claim certainty or intent. We treat model output as a nudge to interrogate context, never as a conclusion. The practical question is whether weak, time-bounded facial dynamics, when measured and calibrated correctly, can improve screening precision without inflating risk, bias, or overreach.</p>
    <p>Success here looks like fewer unnecessary escalations at the same safety level (or better safety at the same workload), plus transparent documentation of where the approach works, where it fails, and how to retire it responsibly if the costs outweigh the benefits.</p>`,
        },
        {
          text: `<h3>Problem &amp; Scope</h3>
    <p>Protective and screening workflows operate under severe constraints: limited time, incomplete information, asymmetric costs for false positives and false negatives, and intense public scrutiny. In that setting, a tiny signal that occasionally highlights the right frame or moment—if it is honest about uncertainty—can be useful. Our scope therefore limits the system to <em>research, evaluation, and corroborative prompting</em>. The tool may flag segments for human review, but it cannot diagnose, attribute identity or intent, or trigger punitive action on its own.</p>
    <p>We draw bright boundaries: <strong>prohibited uses</strong> include identity inference, face recognition, attribution of motive, or any downstream decision that meaningfully affects a person without independent corroboration. All contemplated uses must be documented with task definitions, accountable owners, and cost tables that make trade-offs explicit and reviewable.</p>`,
        },
        {
          text: `<h3>Data &amp; Labeling</h3>
    <p>Data collection is consent-based and contextual. Participants receive a plain-language overview of what is captured, why it is captured, how long it is kept, and how to opt out or request deletion. We avoid covert capture, “gotcha” designs, and any scenario that would surprise a reasonable participant. Every clip is paired with metadata describing lighting, camera, scenario, and timing so we can analyze confounders.</p>
    <p>Labels acknowledge uncertainty. Multiple trained raters annotate AU events and micro-expressive segments with time-bounds and confidence scores. Disagreements are adjudicated using a written rubric; we report inter-rater reliability (e.g., Krippendorff’s α) alongside the dataset so consumers can see label noise rather than having it hidden. Ambiguous segments remain ambiguous: we mark them as such instead of forcing consensus that the data do not support.</p>
    <p>Privacy controls include pre-defined retention windows, role-based access, encrypted storage, audit logs for every access, and documented deletion routes. Identity inference is excluded by design; we do not store or link identifying attributes beyond what is required for consent management.</p>`,
        },
        {
          text: `<h3>Signals &amp; Modeling</h3>
    <p>Features emphasize dynamics over static appearance. We analyze short temporal windows (≈300–800ms), onset/offset velocity, co-occurrence patterns among AUs, and simple temporal motifs (e.g., AU-12→AU-15 within a small lag). Landmarks are stabilized to reduce camera jitter; low-confidence frames are down-weighted or dropped.</p>
    <p>Models produce <em>probabilities</em>, not verdicts. After training, we calibrate scores (isotonic or Platt) so that a predicted 0.30 behaves like “~30% of similar cases were positive” in evaluation. Outputs are grouped into <em>bands</em> intended for operational interpretation (e.g., “no action,” “log and move on,” “consider secondary review if another signal agrees”). We purposely avoid a single magic threshold and instead map bands to actions that reflect context and cost.</p>`,
        },
        {
          text: `<h3>Evaluation Approach</h3>
    <p>We report performance with the prevalence of the event (base rate) front and center. AUROC and AUPRC are included, but we also publish calibration error (ECE), coverage (what fraction of cases the model is willing to score with confidence), and decision-curve analyses tied to the documented cost tables. Thresholds are selected to minimize expected cost, not to maximize a headline metric.</p>
    <p>To test real-world durability, we evaluate across cameras, focal lengths, lighting regimes, and environments, and we use time-based splits so we can see performance drift as conditions change. We also run “selective prediction” baselines (abstain when unsure) to compare “say less, say it better” policies against always-on scoring.</p>`,
        },
        {
          text: `<h3>Bias &amp; Robustness</h3>
    <p>Average metrics can hide harm. We therefore slice results by lighting, camera sensor type, skin-tone ranges, head pose, and occlusions (e.g., glasses, masks). We publish the deltas—not just the averages—so gaps are visible. Where gaps appear, we experiment with data balancing, confidence-weighted training, and abstention rules that refuse to score in known failure zones.</p>
    <p>Robustness is probed with a red-team protocol: exaggerated expressions, partial occlusion, head motion, blur, low bitrate compression, deliberate mimicry, and stress-induced artifacts. Failures are cataloged with reproduction steps and recommended mitigations (often “do not use the model in this condition”). We view a documented “no-go” list as a sign of maturity, not weakness.</p>`,
        },
        {
          text: `<h3>Governance &amp; Policy</h3>
    <p>Permitted use is limited to research and evaluation with explicit corroboration requirements. Any pilot must pass a lightweight privacy and data-protection review, document the second-signal sources it will rely on, define operator training, and designate an accountable owner. Raw video is never shared externally; derived features are minimized and access-logged. We maintain a change log for models, features, and policies so that decisions can be reconstructed.</p>
    <p>De-scoping is built in. If evaluation shows poor calibration, unacceptable subgroup gaps, or net-negative operational value, the model is frozen or retired. Governance artifacts (risk register, DPIA notes, and model cards) are versioned alongside code so policy doesn’t drift away from implementation.</p>`,
        },
        {
          text: `<h3>Operator Guidance</h3>
    <p>Outputs are <em>prompts</em>, not conclusions. A two-signal rule forbids acting on behavioral output alone; operators must cite an independent corroborating signal (contextual observation, independent sensor, or documented rule) before escalation. The UI shows the score, band, and a plain-language reminder of “what this means / does not mean.”</p>
    <p>Runbooks include short checklists: what to record, who to notify, when to de-escalate, and when to stop. Every reviewed case logs inputs, banding, operator notes, and final disposition for audit and after-action review. Training materials emphasize failure modes and “don’t-use” scenarios as much as success cases to counter automation bias.</p>`,
        },
        {
          text: `<h3>Deliverables</h3>
    <p>The project ships more than a model. Deliverables include: (1) an evaluation protocol and rater handbook with labeling rubrics and adjudication steps; (2) calibration cards per model and context with recommended action bands; (3) an operator playbook covering checklists, escalation paths, and explicit “don’t-use” cases; (4) a fairness &amp; robustness report with subgroup deltas and red-team results; and (5) deprecation criteria that define when to retrain, freeze, or retire a model due to drift, gap growth, or negative cost-benefit.</p>
    <p>All artifacts are versioned, with a simple README that explains how to reproduce results from raw data to final figures. If someone smarter and busier than us can’t repeat the evaluation in an afternoon, we consider that a bug to fix.</p>`,
        },
        {
          text: `<h3>Limitations</h3>
    <p>Behavioral signals are noisy, culturally and contextually shaped, and easy to misinterpret—especially under stress. This work does <strong>not</strong> claim lie detection, intent detection, or identity inference, and it should never be used to make unilateral, punitive decisions. The contribution is smaller and more practical: show when weak facial dynamics can help as corroboration, when they should be ignored, and how to document both with honesty.</p>
    <p>If the evidence says the approach isn’t worth the operational complexity, we will say so and publish the negative result. Knowing when to stop is part of responsible research.</p>`,
        },
      ],

      images: [
        "https://images.unsplash.com/photo-1571325004705-0f26f602e53f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVoYXZpb3JhbCUyMGFuYWx5c2lzfGVufDB8fDB8fHww",
      ],
      resources: {
        Sightings: [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
        ],
        "Methods & Notes": [
          {
            label: "Protocol & Eval Plan",
            url: "/Notes/Behavioral-AI/Protocol",
            external: false,
          },
          {
            label: "Calibration Cards",
            url: "/Notes/Behavioral-AI/Calibration-Card",
            external: false,
          },
          {
            label: "Rater Handbook",
            url: "/Notes/Behavioral-AI/Rater-Handbook",
            external: false,
          },
        ],
        "Policy & Ethics": [
          {
            label: "Governance & Use Policy",
            url: "/Notes/Behavioral-AI/Governance",
            external: false,
          },
          {
            label: "Consent & Retention",
            url: "/Notes/Policy/Consent-Retention",
            external: false,
          },
        ],
        "Datasets (allowed)": [
          {
            label: "Dataset Inventory & Constraints",
            url: "/Notes/Behavioral-AI/Datasets",
            external: false,
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
      excerpt:
        "Intake, de-duplication, verification, and fusion with provenance and reproducible workflows—practical OSINT at scale.",
      archiveImage:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      banner:
        "https://images.unsplash.com/photo-1684347417284-1271ef9b078c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHJlc291cmNlJTIwaW50ZWxsaWdlbmNlfGVufDB8fDB8fHww",
      content: [
        {
          text: `
<p><strong>What this covers.</strong> A practical OSINT pipeline from collection to publication: intake, normalization &amp; de-duplication, enrichment, verification, fusion, and reporting—designed for reproducibility and minimal capture of accidental PII.</p>
`,
        },
        {
          text: `
<h3><Strong>Principles</Strong></h3>
<ul>
  <li><strong>Legality &amp; consent first:</strong> respect terms of service, data-use policies, and local law; collect the minimum necessary.</li>
  <li><strong>Reproducible by others:</strong> every figure or claim can be regenerated from preserved inputs, config, and code.</li>
  <li><strong>Provenance preserved:</strong> every artifact carries origin, timestamp, and transformation history.</li>
  <li><strong>Evidence > opinion:</strong> confidence is scored; uncertainty is explicit.</li>
</ul>
`,
        },
        {
          text: `
<h3><Strong>Pipeline Overview</Strong></h3>
<p><em>Collect → Normalize → De-dup → Enrich → Verify → Label → Report</em></p>
<ul>
  <li><strong>Collect:</strong> public web pages, RSS/Atom feeds, official reports, satellite or weather layers, and reputable open datasets.</li>
  <li><strong>Normalize:</strong> store raw &amp; normalized copies (UTF-8 text, canonical URLs, stable filenames).</li>
  <li><strong>De-dup:</strong> detect near-duplicates (shingling + simhash / perceptual hash for images) to reduce noise.</li>
  <li><strong>Enrich:</strong> extract entities, locations, languages; compute media hashes; pull basic EXIF if present.</li>
  <li><strong>Verify:</strong> cross-source corroboration, geo/chrono-location, metadata checks, archive lookups.</li>
  <li><strong>Label &amp; Report:</strong> assign confidence, note contradictions, publish with a methods appendix.</li>
</ul>
`,
        },
        {
          text: `
<h3><Strong>Intake &amp; Normalization</Strong></h3>
<ul>
  <li><strong>Watchlists:</strong> seed with official sources and reputable monitoring feeds; prefer feeds over ad-hoc scraping.</li>
  <li><strong>Archival snapshots:</strong> when citing pages, capture an archive URI alongside the live URL.</li>
  <li><strong>Canonicalization:</strong> strip tracking params, resolve redirects, and store a stable <code>source_id</code>.</li>
</ul>
`,
        },
        {
          text: `
<h3><Strong>De-duplication</Strong></h3>
<ul>
  <li><strong>Text:</strong> tokenize → shingles → simhash/TLSH to cluster near-duplicates; keep the earliest or most complete.</li>
  <li><strong>Images:</strong> compute perceptual hash (pHash/aHash/dHash) to group re-uploads &amp; crops.</li>
  <li><strong>URL-level:</strong> canonical URL + content hash to avoid double counting mirrors.</li>
</ul>
<p><em>Goal:</em> reduce volume without losing unique claims or first-source material.</p>
`,
        },
        {
          text: `
<h3><Strong>Enrichment</Strong></h3>
<ul>
  <li><strong>Entities:</strong> persons, orgs, locations with confidence scores and source spans.</li>
  <li><strong>Geocoding:</strong> resolve place names; store lat/lon with precision and method tags (exact, inferred, admin-centroid).</li>
  <li><strong>Media metadata:</strong> safe EXIF parsing when available; store hashes and dimensions for dedup/verification.</li>
  <li><strong>L10n:</strong> language ID &amp; translation notes; keep original text alongside any translation.</li>
</ul>
`,
        },
        {
          text: `
<h3<Strong>Verification &amp; Chrono/Geolocation</Strong></h3>
<ul>
  <li><strong>Triangulate:</strong> corroborate claims across independent sources; prefer primary over aggregated posts.</li>
  <li><strong>Geo:</strong> match skylines, landmarks, signage, terrain, road geometry; confirm with maps/satellite.</li>
  <li><strong>Chrono:</strong> shadows, weather, tide, traffic, vegetation; look for seasonal cues and construction timelines.</li>
  <li><strong>Metadata sanity:</strong> EXIF can mislead—treat as <em>clues</em>, not truth; check for editing traces.</li>
</ul>
<p>Record the verification <em>method</em> (e.g., “landmark match + satellite layer”) and any counter-evidence considered.</p>
`,
        },
        {
          text: `
<h3><Strong>Provenance &amp; Reproducibility</Strong></h3>
<p>Every artifact gets a manifest entry—hashes, timestamps, and transforms. Example:</p>
<pre><code>{
  "id": "src_2023-11-15_00123",
  "uri_live": "https://example.gov/report.pdf",
  "uri_archive": "https://web.archive.org/web/20231115/https://example.gov/report.pdf",
  "sha256": "…",
  "collected_at": "2023-11-15T13:03:22Z",
  "transforms": ["pdf→text v1.2", "langid en", "ner v0.9"],
  "notes": "Official statement; broken link replaced with archived copy"
}</code></pre>
<p>Keep raw inputs immutable; version configs; pin library versions; export a <em>methods appendix</em> with the report.</p>
`,
        },
        {
          text: `
<h3><Strong>Fusion &amp; Reporting</Strong></h3>
<ul>
  <li><strong>Entity resolution:</strong> merge references that are the same real-world thing; keep a cross-reference table.</li>
  <li><strong>Timelines &amp; maps:</strong> present where/when alongside who/what; show gaps and contradictions.</li>
  <li><strong>Confidence rubric:</strong> e.g., 0–5 with criteria; justify the score in one sentence per key claim.</li>
  <li><strong>Risk review:</strong> scrub inadvertent PII; consider source safety before publishing sensitive details.</li>
</ul>
`,
        },
        {
          text: `
<h3><Strong>Operating Safely</Strong></h3>
<ul>
  <li>Respect platform terms and legal constraints; prefer official export tools and archives to brittle scraping.</li>
  <li>Minimize retention of identifiers that aren’t essential to the analytic question.</li>
  <li>Document ethics choices where they affect what you collected or chose not to publish.</li>
</ul>
`,
        },
      ],
      images: [],
      resources: {
        "Methodology & Tradecraft": [
          {
            label: "Bellingcat — How-Tos & OSINT Guides",
            url: "https://www.bellingcat.com/resources/how-tos/",
            external: true,
          },
          {
            label: "GIJN — OSINT Resource Guide",
            url: "https://gijn.org/resource/gijns-osint-resources/",
            external: true,
          },
        ],
        "Verification & Geolocation": [
          {
            label: "Amnesty — Citizen Evidence Lab (verification methods)",
            url: "https://citizenevidence.org/",
            external: true,
          },
          {
            label: "InVID/WeVerify — Video Verification Plugin",
            url: "https://www.invid-project.eu/tools-and-services/invid-verification-plugin/",
            external: true,
          },
          {
            label: "ExifTool — Read/inspect image metadata",
            url: "https://exiftool.org/",
            external: true,
          },
        ],
        "Archiving & Provenance": [
          {
            label: "Internet Archive — Wayback Machine",
            url: "https://web.archive.org/",
            external: true,
          },
        ],
        "Datasets & Event Feeds": [
          {
            label: "GDELT Project — Global media event database",
            url: "https://www.gdeltproject.org/",
            external: true,
          },
          {
            label: "ACLED — Armed Conflict Location & Event Data",
            url: "https://acleddata.com/",
            external: true,
          },
        ],
        "Project Pages": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          {
            label: "OSINT Notes",
            url: "/Notes/OSINT-Methods",
            external: false,
          },
          { label: "About / CV", url: "/About", external: false },
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
      excerpt:
        "Operational guardrails for high-stakes AI: mission fit, accountability, auditability, and clear lines of responsibility.",
      archiveImage:
        "https://plat.ai/wp-content/uploads/Shutterstock_567338095.jpg.webp",
      banner: "https://plus.unsplash.com/premium_photo-1663126655768-85ec528ba4fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG5hdGlvbmFsJTIwc2VjdXJpdHl8ZW58MHx8MHx8fDA%3D",
      content: [
        {
          text: `
<p><strong>Abstract.</strong> This piece proposes a practical assurance frame for deploying AI in national-security missions. It focuses on mission triage, accountability structures, provenance and audit, red-team practice, and incident response—emphasizing <em>operational priors</em> over lab-only metrics. The throughline is simple: reliability is a system property earned by process, proof, and humility, not a model statistic alone.</p>
`,
        },
        {
          text: `
<h3>Executive Summary</h3>
<ul>
  <li><strong>Mission-first fit:</strong> Only deploy where the <em>cost of error</em> is acceptable and understood.</li>
  <li><strong>Clear ownership:</strong> A RACI-L matrix prevents ethical diffusion and ensures actionability.</li>
  <li><strong>Assurance evidence:</strong> Decisions must be backed by test artifacts, logs, and red-team findings.</li>
  <li><strong>Human authority:</strong> Define HITL/HOTL roles and keep a real kill-switch with pre-rehearsed rollback.</li>
  <li><strong>Ongoing monitoring:</strong> Shift-aware evaluation and subgroup calibration are non-optional.</li>
</ul>
`,
        },
        {
          text: `
<h3>Context & Problem Framing</h3>
<p>“High stakes” is not a vibe; it’s a measurable harm model. We map use cases by <em>consequence</em> (strategic, legal, human) and <em>controllability</em> (time to intervene, reversibility). Systems that front-run human judgment or route kinetic effects demand stronger guarantees than advisory analytics. This framing turns abstract ethics into concrete gates.</p>
`,
        },
        {
          text: `
<h3>MARA: A Working Frame</h3>
<ul>
  <li><strong>Mission:</strong> What decision is supported, who is affected, and what alternative exists without AI?</li>
  <li><strong>Accountability:</strong> Who is responsible, who is accountable, who is consulted, who is informed—and what is <em>logged</em>?</li>
  <li><strong>Risk:</strong> What are FP/FN harms at operational base rates? What are adversarial and abuse risks?</li>
  <li><strong>Assurance:</strong> What evidence shows the system is fit for purpose under shift and stress?</li>
</ul>
`,
        },
        {
          text: `
<h3>Data Governance & Provenance</h3>
<ul>
  <li><strong>Lineage manifests:</strong> dataset IDs, hashes, licenses, collection conditions, and exclusions.</li>
  <li><strong>PII hygiene:</strong> minimization and masking; legal bases documented; retention with TTLs.</li>
  <li><strong>Documentation:</strong> model cards + <em>system cards</em> describing human workflow and limits.</li>
</ul>
<pre><code>{
  "dataset": "imagery_v5",
  "hash": "sha256:…",
  "license": "gov-owned",
  "pii_controls": ["face_blur"],
  "exclusions": ["schools", "hospitals"]
}</code></pre>
`,
        },
        {
          text: `
<h3>Development Lifecycle & Gates</h3>
<ol>
  <li><strong>Sandbox:</strong> offline evals, ablations, threat modeling.</li>
  <li><strong>Shadow mode:</strong> compare against human baseline; no operational impact.</li>
  <li><strong>Limited release:</strong> time-boxed, narrow population, SLOs + rollback rehearsed.</li>
  <li><strong>Operationalization:</strong> 24/7 on-call, dashboards, post-incident protocol, version pinning.</li>
</ol>
`,
        },
        {
          text: `
<h3>Evaluation Under Operational Priors</h3>
<p>Confusion matrices are necessary; <em>confusion costs</em> are decisive. We weight FP/FN by mission harm and pick thresholds accordingly. We report <em>reliability curves</em> (calibration) per subgroup and use drift detectors to flag base-rate shifts. The goal is not a single AUC but a portfolio of stress results that survive contact with reality.</p>
<table>
  <thead><tr><th>Scenario</th><th>Shift</th><th>Mitigation</th><th>Owner</th></tr></thead>
  <tbody>
    <tr><td>Night imagery</td><td>SNR drop</td><td>Threshold raise + HOTL</td><td>Ops lead</td></tr>
    <tr><td>New sensor</td><td>Domain shift</td><td>Recalibrate + gate to shadow</td><td>Model lead</td></tr>
    <tr><td>Adversarial spoof</td><td>Distribution spike</td><td>Rule-based block + IR</td><td>Sec engineer</td></tr>
  </tbody>
</table>
`,
        },
        {
          text: `
<h3>Red-Teaming & Safety Cases</h3>
<ul>
  <li><strong>Threats:</strong> data poisoning, prompt/goal injection, sensor spoofing, targeted subgroup failure.</li>
  <li><strong>Evidence:</strong> attach red-team reports to a <em>safety case</em> dossier with hazard analysis and residual risk acceptance signed by the accountable owner.</li>
</ul>
`,
        },
        {
          text: `
<h3>Runtime Controls & Logging</h3>
<ul>
  <li>Full decision trace (<em>input → features → model/version → policy → human action</em>).</li>
  <li>Override capture with rationale and authority level.</li>
  <li>Immutable, queryable logs supporting external audit.</li>
</ul>
<pre><code>{
  "ts":"2025-02-10T03:12Z",
  "model":"recce-v3.2",
  "ver":"a1b2c3",
  "score":0.91,
  "threshold":0.95,
  "action":"HITL escalate",
  "override":true,
  "by":"ops_412",
  "reason":"low-illumination edge case"
}</code></pre>
`,
        },
        {
          text: `
<h3>Incident Response & Learning</h3>
<ol>
  <li>Declare severity; freeze model version; preserve evidence.</li>
  <li>Root-cause (people, process, tech); assign corrective actions.</li>
  <li>Update safety case; communicate to oversight; schedule follow-up eval.</li>
</ol>
`,
        },
        {
          text: `
<h3>Policy Notes & Open Questions</h3>
<ul>
  <li>Binding the <em>kill-switch</em> to a specific role with audit.</li>
  <li>How to write <em>sunset clauses</em> for models when mission context changes.</li>
  <li>Publishing red-team summaries without operational leakage.</li>
</ul>
<p><em>Forthcoming ResearchGate preprint link will be added here.</em></p>
`,
        },
      ],
      images: [
        "https://images.unsplash.com/photo-1658713981289-435ae3cb648c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGNvbXB1dHRlciUyMHNodXQlMjBvZmZ8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1716637644831-e046c73be197?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEFJfGVufDB8fDB8fHww",
        "https://plus.unsplash.com/premium_photo-1681586533774-1d9d42425712?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGF0YSUyMGdvdmVybmFuY2V8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1687119905661-fa10ab752a02?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29tcHV0ZXIlMjBsb2dzfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1630756539201-f435ba29f1fe?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGRhdGElMjBsaWZlY3ljbGV8ZW58MHx8MHx8fDA%3D",
      ],
      resources: {
        "Government & Defense Guidance": [
          {
            label: "DoD — Ethical Principles for AI",
            url: "https://www.defense.gov/Newsroom/Releases/",
            external: true,
          },
          {
            label: "DoD — Responsible AI (Strategy & Implementation)",
            url: "https://www.ai.mil/",
            external: true,
          },
          {
            label: "White House — AI Bill of Rights (Blueprint)",
            url: "https://www.whitehouse.gov/ostp/ai-bill-of-rights/",
            external: true,
          },
          {
            label: "NATO — AI Strategy (public summary)",
            url: "https://www.nato.int/",
            external: true,
          },
        ],
        "Standards & Assurance": [
          {
            label: "NIST — AI Risk Management Framework",
            url: "https://www.nist.gov/itl/ai-risk-management-framework",
            external: true,
          },
          {
            label: "ISO/IEC 23894 — AI Risk Management (overview)",
            url: "https://www.iso.org/standard/77304.html",
            external: true,
          },
          {
            label: "Model Cards for Model Reporting (paper)",
            url: "https://arxiv.org/abs/1810.03993",
            external: true,
          },
        ],
        "Testing, Red-Team & Safety": [
          {
            label: "NIST — Adversarial ML & Evaluations (overview)",
            url: "https://www.nist.gov/itl/iad/mig/adversarial-ml",
            external: true,
          },
          {
            label: "Google — ML Test Score (practical checks)",
            url: "https://research.google/pubs/ml-test-score/",
            external: true,
          },
        ],
        "Project Pages": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate (profile)",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
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
      excerpt:
        "How behavioral sensing turns signals into power, what can go wrong, and the civil liberties guardrails that keep it honest.",
      archiveImage: "/assets/images/stellarisStack.jpg",
      banner: "https://media.istockphoto.com/id/2097949780/photo/satellite-antenna-array-under-the-milky-way-sky.webp?a=1&b=1&s=612x612&w=0&k=20&c=hIyMxCEd9ANP5Ge1LRIyCJKTeQYCOZrZec9LoHwYHEE=",
      content: [
        {
          text: `
<p><strong>Abstract.</strong> Behavioral surveillance transforms ambient signals—movement, clicks, proximity, purchases—into inferences that shape real outcomes. This essay maps the pipeline from collection to consequence, catalogs failure modes, and proposes governance patterns centered on purpose limitation, minimization, transparency, and contestability.</p>
`,
        },
        {
          text: `
<h3>Executive Summary</h3>
<ul>
  <li><strong>Pipeline clarity:</strong> collection → linkage → enrichment → inference → action.</li>
  <li><strong>Primary risks:</strong> purpose creep, chilling effects, disparate error, re-identification via linkage.</li>
  <li><strong>Guardrails:</strong> tight purpose statements, aggressive minimization, retention TTLs, DP-backed reporting, independent oversight.</li>
</ul>
`,
        },
        {
          text: `
<h3>Taxonomy of Signals & Sources</h3>
<ul>
  <li><strong>Device & network:</strong> location pings, Wi-Fi/Bluetooth telemetry, traffic metadata.</li>
  <li><strong>Platform exhaust:</strong> clickstreams, dwell times, search terms, recommendation traces.</li>
  <li><strong>Physical sensors:</strong> cameras (counts, not faces), badge swipes, environmental sensors.</li>
  <li><strong>Commercial brokers:</strong> purchased segments with uncertain provenance—highest re-ID risk.</li>
</ul>
<p>Each source carries different consent, accuracy, and linkage properties; conflation is where many harms begin.</p>
`,
        },
        {
          text: `
<h3>From Signals to Decisions</h3>
<ol>
  <li><strong>Collection:</strong> define lawful basis; exclude sensitive categories by policy and enforcement.</li>
  <li><strong>Linkage:</strong> join keys, embeddings, or fuzzy matching; quantify re-ID risk explicitly.</li>
  <li><strong>Enrichment:</strong> derive features; document transformations; avoid proxy discrimination.</li>
  <li><strong>Inference:</strong> clustering, anomaly detection, propensity, risk scoring—with calibration checks.</li>
  <li><strong>Action:</strong> interventions, routing, enforcement; ensure due process and human review where rights are implicated.</li>
</ol>
`,
        },
        {
          text: `
<h3>Risk & Civil Liberties</h3>
<ul>
  <li><strong>Purpose creep:</strong> secondary uses without renewed consent/authorization.</li>
  <li><strong>Chilling effects:</strong> measurable behavior changes (assembly, speech) due to perceived surveillance.</li>
  <li><strong>Disparate error:</strong> uneven FPR/FNR across groups; harms compound with feedback loops.</li>
  <li><strong>Singling-out & linkability:</strong> individual traceability through dataset joins.</li>
</ul>
<blockquote>Guardrails should be built where harm materializes: at linkage, inference, and action—not only at collection.</blockquote>
`,
        },
        {
          text: `
<h3>Design Patterns for Guardrails</h3>
<ul>
  <li><strong>Purpose limitation:</strong> a binding, testable purpose clause; new purposes require a fresh DPIA.</li>
  <li><strong>Data minimization:</strong> collect the least precise, lowest granularity signal that still meets mission need.</li>
  <li><strong>Edge processing:</strong> prefer on-device aggregation; transmit only aggregates or alerts.</li>
  <li><strong>Privacy-preserving analytics:</strong> differential privacy for reports; secure enclaves or MPC for joins when needed.</li>
  <li><strong>Separation of duties:</strong> data stewards distinct from policy decision-makers; approvals logged.</li>
  <li><strong>Retention budgets:</strong> default TTLs with auto-deletion; no indefinite “just in case.”</li>
  <li><strong>Transparency & contestability:</strong> affected parties can understand, appeal, and correct outcomes.</li>
</ul>
<pre><code># policy.yaml (excerpt)
purpose: "crowd safety analytics"
forbidden_uses: ["discipline","unrelated_investigations"]
inputs:
  - camera_counts       # no identity capture
  - gate_badges        # hashed, rotated keys
retention_days: 14
aggregation: { grid: "500m", interval: "15m" }
privacy_reporting: { dp_epsilon_monthly: 2.0 }
</code></pre>
`,
        },
        {
          text: `
<h3>Evaluation, Fairness, and Shift</h3>
<ul>
  <li><strong>Operating point rationale:</strong> choose thresholds using <em>harm-weighted</em> error costs.</li>
  <li><strong>Calibration:</strong> reliability diagrams per subgroup; apply post-hoc fixes if necessary.</li>
  <li><strong>Shift tests:</strong> base-rate drift, seasonality, covariate shift; pre-commit adaptation rules.</li>
  <li><strong>Privacy attacks:</strong> test for membership inference and linkage leakage.</li>
</ul>
`,
        },
        {
          text: `
<h3>Oversight & Accountability</h3>
<ol>
  <li><strong>DPIA:</strong> assess necessity, proportionality, safeguards, residual risk, and alternatives.</li>
  <li><strong>Independent review:</strong> periodic external audits; publish summaries.</li>
  <li><strong>Transparency reports:</strong> usage counts, overrides, complaints, policy changes.</li>
  <li><strong>Appeals:</strong> documented path for individuals to challenge outcomes.</li>
</ol>
`,
        },
        {
          text: `
<h3>Case Sketches (Anonymized)</h3>
<ul>
  <li><em>Transit surge sensing:</em> counts improved staffing but required coarse grids and strict TTLs to avoid tracking.</li>
  <li><em>Campus anomaly alerts:</em> initial false positives clustered in under-lit areas; calibration + signage reduced harm.</li>
</ul>
`,
        },
        {
          text: `
<h3>Research Agenda</h3>
<ul>
  <li>Operational measures of <em>chill</em> and practical thresholds for intervention.</li>
  <li>Shift-robust calibration that honors retention limits.</li>
  <li>Public audit formats that preserve privacy while delivering accountability.</li>
</ul>
<p><em>Forthcoming ResearchGate preprint link will be added here.</em></p>
`,
        },
        {
          text: `
<h3>Implementation Checklist</h3>
<ul>
  <li>Purpose statement and forbidden uses approved.</li>
  <li>Minimization & aggregation documented; DPIA completed.</li>
  <li>Subgroup calibration verified; thresholds justified.</li>
  <li>Retention TTLs enforced; transparency report cadence set.</li>
  <li>Appeals workflow staffed; audit log schema deployed.</li>
</ul>
`,
        },
      ],
      images: [
        "https://plus.unsplash.com/premium_photo-1669298094293-98614cd7df12?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVuZGVyd3RlciUyMGNhYmxlc3xlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1665865455078-4f9f8e2259db?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2lnbmFsJTIwc2VydmljZXxlbnwwfHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1664854953181-b12e6dda8b7c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGRhdGFzZXR8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1523274620588-4c03146581a1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHByaXZhY3l8ZW58MHx8MHx8fDA%3D",
        "https://plus.unsplash.com/premium_photo-1670402130476-25aa8c1986c9?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njh8fGN5YmVyc2VjdXJpdHl8ZW58MHx8MHx8fDA%3D",
      ],
      resources: {
        "Civil Liberties & Law": [
          {
            label: "ACLU — Surveillance & Privacy (overview)",
            url: "https://www.aclu.org/issues/privacy-technology/surveillance-technologies",
            external: true,
          },
          {
            label: "EFF — Surveillance (guides & cases)",
            url: "https://www.eff.org/issues/surveillance",
            external: true,
          },
          {
            label: "UK ICO — DPIA Guidance",
            url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-protection-impact-assessments-dpias/",
            external: true,
          },
        ],
        "Technical & Governance References": [
          {
            label: "NIST — Privacy Engineering (overview)",
            url: "https://www.nist.gov/privacy-engineering",
            external: true,
          },
          {
            label: "Differential Privacy — Primer (PDF)",
            url: "https://www.apple.com/privacy/docs/Differential_Privacy_Overview.pdf",
            external: true,
          },
          {
            label: "AI Now — Surveillance Reports",
            url: "https://ainowinstitute.org/reports.html",
            external: true,
          },
        ],
        "Project Pages": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          { label: "Bureau Article", url: "/MidnightBureau", external: false },
          { label: "About / CV", url: "/About", external: false },
          {
            label: "ResearchGate (profile)",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
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
    excerpt:
      "Smarter discovery, faster archives, and cleaner long reads. Adding topic and entity filters, cross search with the portfolio, and a print friendly mode for deep dives.",
    archiveImage: "/assets/images/AFG4.jpg",
    banner: "/assets/images/space.jpg",
    content: [
      {
        text: `<p><strong>Why expand now.</strong> Readers land on a single post from search, bounce, and never discover the rest. The expansion focuses on discovery: topic/entity filters, cross-search with portfolio entries, and clean printing so deep reads don’t feel like wrestling a billboard on letter paper.</p>`
      },
      {
        text: `<p><strong>Unified taxonomy.</strong> I’m merging tags, topics, and entities into one shared schema used by both the blog and the portfolio. One label = one ID = one facet across the whole site. That lets the archive page, post pages, and portfolio listings stay in sync without custom exceptions.</p>`
      },
      {
        text: `<p><strong>Search architecture.</strong> For a hosted index, I’ll consider Typesense/Algolia with per-record weights for title, deck, headings, and resource labels. For a zero-dependency fallback, Lunr.js builds a client-side index at build-time with chunked loading. Either path supports synonym maps (“U.S.” ↔ “United States”) and typo tolerance without smearing relevancy.</p>`
      },
      {
        text: `<p><strong>Archive navigation.</strong> Year-month slices stay, but the UX adds quick-jumps for Topics (World & Diplomacy, Security, Energy, etc.) and Entities (countries, orgs, people). Pagination becomes cursor-based so I can prefetch the next slab while you’re still reading.</p>`
      },
      {
        text: `<p><strong>Long-form readability.</strong> Better typography, hyphenation, and rhythm (narrower measure on mobile, larger first-line height), sticky subhead mini-TOC for long reads, and a “focus” toggle that hides chrome. Pull-quotes and figures get semantic markup so they survive print/export.</p>`
      },
      {
        text: `<p><strong>Print & offline mode.</strong> A real <code>@media print</code> stylesheet (CMYK-safe colors, link URLs inline, no nav, no ads), plus an optional Service Worker to cache the current post, its images, and linked resources for subway reading.</p>`
      },
      {
        text: `<p><strong>Accessibility & performance.</strong> Keyboard-first filters, visible focus states, and color contrast that clears WCAG 2.2 AA. Images lazy-load with correct intrinsic sizes; headings are linearized for screen readers; Lighthouse budgets keep CLS and LCP honest.</p>`
      },
      {
        text: `<p><strong>Analytics you can defend.</strong> Events are boring on purpose: filter use, search queries (with privacy guardrails), time-on-section, and print/export clicks. The goal is editorial feedback, not surveillance: no keystroke logging, no cross-site tracking.</p>`
      },
      {
        text: `<p><strong>Risks & next steps.</strong> Index bloat on the client is the main risk; mitigations include splitting by route and compressing the index. Next steps: migrate legacy tags → unified IDs, ship entity filter, wire cross-search with portfolio, then layer print and offline.</p>`
      }
    ],
    images: [
      "/assets/images/Container.png",
      "/assets/images/space.jpg",
      "/assets/images/space.jpg",
      "/assets/images/space.jpg",
      "/assets/images/space.jpg"
    ],
    resources: {
      LiveAndDemos: [
        { label: "Midnight Bureau", url: "/MidnightBureau", external: false },
        { label: "Live Site", url: "https://www.tobinalbanese.com", external: true }
      ],
      CodeAndRoadmap: [
        { label: "GitHub — @TobinAlbanese", url: "https://github.com/TobinAlbanese", external: true }
      ],
      TechReferences: [
        { label: "Next.js Docs", url: "https://nextjs.org/docs", external: true },
        { label: "Typesense Guide", url: "https://typesense.org/docs/", external: true },
        { label: "Algolia — Relevance", url: "https://www.algolia.com/doc/guides/managing-results/relevance-overview/", external: true },
        { label: "Lunr.js", url: "https://lunrjs.com/", external: true },
        { label: "MDN — @media print", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/print", external: true },
        { label: "WCAG 2.2 Overview", url: "https://www.w3.org/WAI/standards-guidelines/wcag/", external: true }
      ]
    }
  },

  {
    volume: "PORTFOLIO — IN PROGRESS",
    title: "Real-time Facial Recognition Prototype",
    slug: "facial-recognition-prototype",
    author: "Tobin M. Albanese",
    date: "2025-04-01",
    excerpt:
      "Low latency video with explicit policy gates, opt in testing, and hard limits. Focus on evaluation, latency budgets, consent flows, and repeatable audits before any pilot.",
    archiveImage:
      "https://images.unsplash.com/photo-1706025090711-377b00b51332?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhY2UlMjB1cGNsb3NlfGVufDB8fDB8fHww",
    banner: "/assets/images/space.jpg",
    content: [
      {
        text: `<p><strong>Scope & gates.</strong> This is a governance-first prototype: closed dataset, small opt-in group, visible consent, and hard “no” on production deployment until evaluation clears explicit thresholds. The point is to stress the controls, not to chase accuracy at any cost.</p>`
      },
      {
        text: `<p><strong>Pipeline (high level only).</strong> Ingest → detect → embed → match, all with audit hooks. Detection runs at the edge to avoid streaming PII; embeddings are ephemeral for non-matches; retention and export are locked behind policy toggles so the demo can’t silently grow into a system.</p>`
      },
      {
        text: `<p><strong>Latency budget.</strong> Targets are split: camera→embed under 40ms for smooth UX; embed→match under 60ms; end-to-end below 120ms on commodity GPUs. When budgets burst, the system must degrade gracefully (lower FPS, not higher false positives).</p>`
      },
      {
        text: `<p><strong>Evaluation plan.</strong> Report DET/ROC curves, not vibes; measure demographic differentials explicitly; log false-positive costs in scenario context; and publish repeatable test harnesses. If thresholds aren’t met, the answer is “no,” not “almost.”</p>`
      },
      {
        text: `<p><strong>Privacy & security.</strong> Default to on-device processing, minimize retention windows, encrypt at rest/in transit, and document what’s not kept. Access is role-based, with kill-switches that disable matching without taking the camera stack down.</p>`
      },
      {
        text: `<p><strong>Governance & consent.</strong> Clear signage, informed opt-in, operator training, and red-team drills for abuse scenarios (function creep, post-hoc search, selective enforcement). Every action must leave a trace in an immutable log so audits are real, not theater.</p>`
      },
      {
        text: `<p><strong>What the prototype will not do.</strong> No watchlists in public spaces, no covert collection, no scraping, and no deployment beyond lab conditions. The safest prototype is one that refuses to cross its own lines.</p>`
      }
    ],
    images: [
      "/assets/images/naomiPortfolio.jpg",
      "/assets/images/space.jpg",
      "/assets/images/space.jpg",
      "/assets/images/space.jpg"
    ],
    resources: {
      CodeAndRoadmap: [
        { label: "GitHub — @TobinAlbanese", url: "https://github.com/TobinAlbanese", external: true }
      ],
      EvaluationAndStandards: [
        { label: "NIST FRVT (Face Recognition Vendor Test)", url: "https://www.nist.gov/programs-projects/face-recognition-vendor-test-frvt", external: true },
        { label: "ISO/IEC 19795 — Biometric Performance Testing", url: "https://www.iso.org/standard/41447.html", external: true },
        { label: "NIST Privacy Framework", url: "https://www.nist.gov/privacy-framework", external: true },
        { label: "IEEE P7003 — Algorithmic Bias Considerations", url: "https://standards.ieee.org/ieee/7003/6781/", external: true }
      ],
      PolicyAndCompliance: [
        { label: "GDPR — Special Categories (Biometrics)", url: "https://gdpr-info.eu/art-9-gdpr/", external: true },
        { label: "UK ICO — Biometrics Guidance", url: "https://ico.org.uk/for-organisations/biometrics/", external: true },
        { label: "US FTC — Biometric Policy Statement", url: "https://www.ftc.gov/legal-library/browse/policy-statement-biometric-information", external: true }
      ]
    }
  },

  {
    volume: "PORTFOLIO — IN PROGRESS",
    title: "OSINT Data Aggregation Pipeline",
    slug: "osint-data-pipeline",
    author: "Tobin M. Albanese",
    date: "2025-06-01",
    excerpt:
      "High throughput intake with dedupe, provenance tracking, and PII safety. Next steps include source scoring, alert thresholds, and reproducible exports that analysts can defend.",
    archiveImage:
      "https://images.unsplash.com/photo-1679325134596-6cd425a05dc8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFnZ3JlZ2F0aW9uc3xlbnwwfHwwfHx8MA%3D%3D",
    banner: "/assets/images/space.jpg",
    content: [
      {
        text: `<p><strong>Goal.</strong> Build an ingest→normalize→verify→export pipeline that scales with public data but keeps provenance and privacy intact. Analysts should be able to defend every record with a paper trail and reproduce the same view later.</p>`
      },
      {
        text: `<p><strong>Intake & de-duplication.</strong> Multiple feeds (APIs, scrapes, hand-curated tips) collapse into a queue with content hashes, fuzzy URL canonicalization, and near-duplicate detection. The system saves time by not asking humans to re-read the same story with a different UTM tag.</p>`
      },
      {
        text: `<p><strong>Normalization & schema.</strong> Everything lands in a slim common schema—entities, events, places, times, and links—so cross-source joins don’t become regex archaeology. Where fields don’t map, we keep a raw sidecar for full-fidelity retrieval.</p>`
      },
      {
        text: `<p><strong>Provenance & chain of custody.</strong> Each transformation appends to a provenance trail (source URL, access date, transform version, human edits). Exports include this trail so downstream readers can audit without phoning the original collector.</p>`
      },
      {
        text: `<p><strong>PII safety.</strong> Default to minimization: redact or hash sensitive fields, segregate storage, and require higher privileges for re-identification. Automated checks flag accidental PII (faces, license plates) and route for human review before publication.</p>`
      },
      {
        text: `<p><strong>Source scoring.</strong> Reliability scores are evidence-based: outlet track record, author identity confidence, corroboration count, and historical correction rate. Scores decay over time and update when retractions land.</p>`
      },
      {
        text: `<p><strong>Alerts & thresholds.</strong> Instead of “ping for everything,” alerts require a rule that combines source score + topic + location + novelty. Analysts can subscribe to saved queries and receive a digest with diffs, not a firehose.</p>`
      },
      {
        text: `<p><strong>Reproducible exports.</strong> Every chart/table in the reporting layer can be regenerated from a saved query with pinned transform versions. If a result made it into a brief, there’s a button to see the lineage, no hand-waving.</p>`
      },
      {
        text: `<p><strong>Next steps.</strong> Wire scoring to the alert engine, ship the PII scanner on image/video, and publish a red-team guide that tries to break the pipeline on purpose (poisoned sources, mass duplication, metadata tampering).</p>`
      }
    ],
    images: [
      "/assets/images/stellarisScale.jpg",
      "/assets/images/space.jpg",
      "/assets/images/space.jpg",
      "/assets/images/space.jpg",
      "/assets/images/space.jpg"
    ],
    resources: {
      CodeAndRoadmap: [
        { label: "GitHub — @TobinAlbanese", url: "https://github.com/TobinAlbanese", external: true }
      ],
      MethodologyAndTools: [
        { label: "Bellingcat — OSINT Guides", url: "https://www.bellingcat.com/category/resources/how-tos/", external: true },
        { label: "OCCRP Aleph", url: "https://aleph.occrp.org/", external: true },
        { label: "OpenSanctions", url: "https://www.opensanctions.org/", external: true },
        { label: "W3C PROV — Provenance Model", url: "https://www.w3.org/TR/prov-overview/", external: true },
        { label: "MISP — Threat Intelligence Platform", url: "https://www.misp-project.org/", external: true }
      ],
      PrivacyAndEthics: [
        { label: "ICRC — Data Protection in Humanitarian Action", url: "https://www.icrc.org/en/data-protection", external: true },
        { label: "UK ICO — Anonymisation Guidance", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/", external: true }
      ]
    }
  }
],


  "Skills & Technologies (Non-clickable)": [
    {
      title: "Python",
      excerpt:
        "My go-to for prototyping, data tooling, and small services. Comfortable with pandas, FastAPI, asyncio, and testing to keep things repeatable.",
      tags: ["pandas", "FastAPI", "pytest"],
      images: [
        "https://plus.unsplash.com/premium_photo-1661897061191-da22183ea142?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fHB5dGhvbnxlbnwwfHwwfHx8MA%3D%3D",
      ],
      clickable: false,
      slug: null,
    },
    {
      title: "JavaScript (React, Node.js)",
      excerpt:
        "Builds frontends in React/Next.js and lightweight APIs in Node. Focus on clean state, accessible UI, and SSR where it improves UX.",
      tags: ["Next.js", "React", "Node"],
      images: [
        "https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGphdmFzY3JpcHR8ZW58MHx8MHx8fDA%3D",
      ],
      clickable: false,
      slug: null,
    },
    {
      title: "Docker & Kubernetes",
      excerpt:
        "Containerize apps for reliable dev/prod parity. Compose for local; Helm and basic K8s objects for staging/production deploys.",
      tags: ["Dockerfile", "Compose", "Helm"],
      images: [
        "https://images.unsplash.com/photo-1646627927863-19874c27316b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9ja2VyfGVufDB8fDB8fHww",
      ],
      clickable: false,
      slug: null,
    },
    {
      title: "AWS Cloud Services",
      excerpt:
        "Hands-on with EC2, S3, CloudFront, IAM, and CloudWatch. Bias toward simple architectures with clear cost/observability tradeoffs.",
      tags: ["EC2", "S3", "CloudFront"],
      images: [
        "https://images.unsplash.com/photo-1662947368770-7cf87e565cdd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW1hem9uJTIwd2ViJTIwc2VydmljZXN8ZW58MHx8MHx8fDA%3D",
      ],
      clickable: false,
      slug: null,
    },
    {
      title: "TensorFlow & PyTorch",
      excerpt:
        "Train/evaluate small models and fine-tunes; track metrics and calibration, keep data/labels organized, and document failure modes.",
      tags: ["fine-tuning", "evaluation", "calibration"],
      images: [
        "https://plus.unsplash.com/premium_photo-1674827394056-90d4b40c41ab?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fHRlbnNvcmZsb3d8ZW58MHx8MHx8fDA%3D",
      ],
      clickable: false,
      slug: null,
    },
    {
      title: "Natural Language Processing (NLP)",
      excerpt:
        "Text classification, NER, and retrieval pipelines using spaCy/HuggingFace. Emphasis on data quality, baselines, and error analysis.",
      tags: ["spaCy", "HF Transformers", "RAG"],
      images: [
        "https://images.unsplash.com/photo-1711399492272-78099e75ef07?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8amFwYW5lc2UlMjBsZXR0ZXJzfGVufDB8fDB8fHww",
      ],
      clickable: false,
      slug: null,
    },
    {
      title: "Computer Vision & OpenCV",
      excerpt:
        "Real-time preprocessing, detection/tracking, and landmarks. Careful about latency budgets, lighting variance, and dataset bias.",
      tags: ["OpenCV", "onnxruntime", "tracking"],
      images: [
        "https://images.unsplash.com/photo-1691683145273-ab95f46d7c16?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZXllJTIwYmFsbHxlbnwwfHwwfHx8MA%3D%3D",
      ],
      clickable: false,
      slug: null,
    },
    {
      title: "Cybersecurity & Ethical Hacking",
      excerpt:
        "Threat modeling, secure defaults, and hands-on recon/appsec basics. Aim is resilient systems and clear audit trails—not theatrics.",
      tags: ["OWASP", "threat modeling", "SDLC"],
      images: [
        "https://plus.unsplash.com/premium_photo-1663091769346-215f459f964c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHNlY3VyaXR5fGVufDB8fDB8fHww",
      ],
      clickable: false,
      slug: null,
    },
    {
      title: "SQL & NoSQL Databases",
      excerpt:
        "Design schemas, write explainable queries, and index what matters. Postgres for consistency, Mongo when flexible docs win.",
      tags: ["Postgres", "MongoDB", "Indexes"],
      images: [
        "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhdGFiYXNlfGVufDB8fDB8fHww",
      ],
      clickable: false,
      slug: null,
    },
    {
      title: "Git & CI/CD Pipelines",
      excerpt:
        "Branch strategy, code review discipline, and pipelines that run tests/lints before deploy. Shipping small and often.",
      tags: ["GitHub Actions", "Vercel", "lint/tests"],
      images: [
        "https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2l0aHVifGVufDB8fDB8fHww",
      ],
      clickable: false,
      slug: null,
    },
  ],

  "Education & Certifications (Non-clickable)": [
    {
      volume: "PORTFOLIO — EDUCATION",
      title: "B.S. Computer Science (Undergraduate, In Progress)",
      author: "Tobin M. Albanese",
      date: "2026-05-01",
      excerpt:
        "California State University, Sacramento — undergraduate; expected May 2026. Focus: algorithms, systems, security, ML. Clubs: Cyber Security, Data Structures & Algorithms.",
      archiveImage:
        "https://images.unsplash.com/photo-1587847870627-a34356e5ae67?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNhY3JhbWVudG98ZW58MHx8MHx8fDA%3D",
      clickable: false,
    },
    {
      volume: "PORTFOLIO — EDUCATION",
      title: "A.S. Computer Science (Folsom Lake College)",
      author: "Tobin M. Albanese",
      excerpt:
        "Associate’s degree in Computer Science. Clubs: AI & Data Science and FLC++ Programming.",
      archiveImage:
        "https://images.unsplash.com/photo-1649260347712-00db37a401c4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGZvbHNvbSUyMGNhbGlmb3JuaWF8ZW58MHx8MHx8fDA%3D",
      clickable: false,
    },
    {
      volume: "PORTFOLIO — CERTIFICATE",
      title: "Certificate in Information Assurance and Security (CSUS)",
      author: "Tobin M. Albanese",
      excerpt:
        "12-unit certificate focused on cryptography, forensics, and system countermeasures; planning and managing incident response with clear governance.",
      archiveImage:
        "https://images.unsplash.com/photo-1568667256549-094345857637?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D",
      clickable: false,
      slug: null,
    },
    {
      volume: "PORTFOLIO — CERTIFICATE",
      title: "Information Technology Certificate (FLC)",
      author: "Tobin M. Albanese",
      excerpt:
        "Foundations in IT, networking, and cybersecurity—prepares for entry-level roles and further study.",
      archiveImage:
        "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
      clickable: false,
      slug: null,
    },
    {
      volume: "PORTFOLIO — CERTIFICATE",
      title: "Computer Programming Certificate (FLC)",
      author: "Tobin M. Albanese",
      excerpt:
        "Core programming proficiency for junior software roles; strong base for CS transfer and projects.",
      archiveImage:
        "https://images.unsplash.com/photo-1609379788613-74f52b8f6847?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZpcnN0JTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D",
      clickable: false,
      slug: null,
    },
    {
      volume: "PORTFOLIO — CERTIFICATE OF ACHIEVEMENT",
      title: "Algorithmic & Logical Thinking Certificate (FLC)",
      author: "Tobin M. Albanese",
      excerpt:
        "Problem decomposition, algorithmic reasoning, and structured problem-solving fundamentals.",
      archiveImage:
        "https://images.unsplash.com/photo-1617083320253-92b730b58d20?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGNoZXNzfGVufDB8fDB8fHww",
      clickable: false,
      slug: null,
    },
  ],

  "Speaking & Media (Non-clickable)": [],

  "Collaborations (Non-clickable)": [
    {
      volume: "PORTFOLIO — COLLAB",
      title: "C-R-US — Dental Clinic Management System (CSC 131, Spring 2025)",
      slug: "c-r-us-dcms",
      author: "Tobin M. Albanese",
      date: "2025-05-01",
      excerpt:
        "Team DCMS: records, appointments, histories, performance analytics.",
      archiveImage:
        "https://images.unsplash.com/photo-1609918438269-9a4c5f8fe3a4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVudGlzdHJ5fGVufDB8fDB8fHww",
      clickable: false,
      slug: null,
    },
  ],
};

export default PortfolioData;

{
  /* {
      volume: "Computer Science Project 4",
      title: "ECHO PROJECT",
      slug: "echo",
      author: "Tobin M. Albanese",
      date: "2024-06-17",
      excerpt:
        "ASR + keyword heatmaps + stress/tone in noisy or degraded audio.",
      archiveImage: "/assets/images/space.jpg",
      banner: "/assets/images/space.jpg",
      content: [
        {
          text: `
      <p><strong>Scope.</strong> ECHO is a speech and acoustic intelligence pipeline built to pull truth from difficult audio. 
      It ingests live streams or files, detects language and speakers, and extracts transcripts alongside high-resolution acoustic cues. 
      The emphasis is operational robustness: strong performance in noisy rooms, low-bitrate radio, overlapping speech, and accented, multi-lingual conversations. 
      Outputs remain analyst-friendly, with per-segment summaries, confidence, and clear links back to the original waveform for quick verification.</p>
    `,
        },
        {
          text: `
      <p><strong>Pipeline.</strong> Audio is enhanced and normalized, then passed through diarization to separate speakers before transcription. 
      A keyword/phrase spotter runs in parallel with contextual expansion (n-gram windows, synonyms, custom lexicons). 
      Acoustic analysis computes pitch, jitter, shimmer, tempo, SNR, and voice quality features per segment. 
      ECHO fuses these layers into time-aligned highlights and heatmaps so analysts can jump to moments that matter, export clips, or review full conversations with minimal scrubbing.</p>
    `,
        },
        {
          text: `
      <p><strong>UI.</strong> The interface centers on an interactive waveform and transcript timeline. 
      Overlays mark speakers, keywords, silences, and acoustic spikes; a side panel surfaces per-segment metrics and intent cues. 
      Analysts can filter by speaker, term, language, or confidence, then “jump-to-event” for rapid audit. 
      Batch tools assemble quick reports with redaction toggles for PII (names, phone numbers, addresses) before export to PDF/JSON and downstream systems.</p>
    `,
        },
        {
          text: `
      <p><strong>Security.</strong> All storage is encrypted at rest; transport uses modern TLS. 
      Every processing step records parameters (model versions, VAD thresholds, denoising settings) for reproducibility and audit. 
      Role-based access limits who can view raw audio versus redacted transcripts, and retention policies purge sensitive material on schedule. 
      An on-device mode is available for air-gapped or field deployments where data sovereignty is paramount.</p>
    `,
        },
        {
          text: `
      <p><strong>Next.</strong> Roadmap items include low-latency streaming over WebRTC, per-device/channel personalization for accents and microphones, 
      improved far-field models for body-cam and vehicle audio, and adaptive keyword sets that learn from analyst tags. 
      Longer-term, ECHO will add multimodal fusion (e.g., correlating radio traffic with location or video) and semi-supervised updates to keep models sharp without costly relabeling.</p>
    `,
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
        "Platform Links": [
          { label: "Project Hub", url: "/Portfolio", external: false },
          {
            label: "Audio Notes (DSP/ASR)",
            url: "/Notes/Audio",
            external: false,
          },
        ],
        "Research & Methodology": [
          {
            label: "Signal Processing Primer",
            url: "/Notes/DSP",
            external: false,
          },
          {
            label: "ResearchGate Profile",
            url: "https://www.researchgate.net/profile/Tobin-Albanese",
            external: true,
          },
        ],
        "Code & Models": [
          {
            label: "GitHub (ECHO / ASR tooling)",
            url: "https://github.com/TobinAlbanese",
            external: true,
          },
          { label: "API & Schemas (Coming Soon)", url: "#", external: false },
        ],
        "Reports & Briefs": [
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
    
    
    */
}




{/*https://wikileaks.org/+-War-Military-+.html
https://shoppinglist.wikileaks.org/search?embassy_location_facet=Russian+Federation&page=1
https://wikileaks.org//vault8/#Hive
https://wikileaks.org//spyfiles/russia/
https://wikileaks.org/vault7/#Protego
https://wikileaks.org/vault7/#Angelfire
https://wikileaks.org/vault7/#ExpressLane
https://wikileaks.org/vault7/#CouchPotato
https://wikileaks.org/vault7/#Dumbo
https://wikileaks.org/vault7/#Imperial
https://wikileaks.org/vault7/#UCL%20/%20Raytheon
https://wikileaks.org/vault7/#Highrise
https://wikileaks.org/vault7/#BothanSpy
https://wikileaks.org/vault7/#OutlawCountry
https://wikileaks.org/vault7/#Elsa
https://wikileaks.org/vault7/#Brutal%20Kangaroo
https://wikileaks.org/vault7/#Cherry%20Blossom
https://wikileaks.org/vault7/#Pandemic
https://wikileaks.org/vault7/#Athena
https://wikileaks.org/vault7/#AfterMidnight
https://wikileaks.org/vault7/#Archimedes
https://wikileaks.org/vault7/#Scribbles
https://wikileaks.org/vault7/#Weeping%20Angel
https://wikileaks.org/vault7/#Hive
https://wikileaks.org/vault7/#Grasshopper
https://wikileaks.org/vault7/#Marble%20Framework
https://wikileaks.org/vault7/#Dark%20Matter
https://wikileaks.org/ciav7p1/
https://wikileaks.org//nsa-201602/
https://wikileaks.org/spyfiles/
https://wikileaks.org/ciav7p1/
https://wikileaks.org//wiki/United_Nations_confidential_reports
https://wikileaks.org//clinton-emails/ */}