export interface Project {
  title: string;
  slug: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  cover: string;
  gallery: string[];
  year: string;
  stack: string[];
  github: string;
  demo?: string;
  featured: boolean;
  tags: string[];
  architecture?: string;
  result?: string;
}

export const PROJECTS: Project[] = [
  {
    title: "Aether Engine",
    slug: "aether-engine",
    description: "High-performance distributed edge key-value cache built with Rust & Tokio, serving sub-millisecond lookups.",
    overview: "Aether Engine is an ultra-low-latency in-memory data store designed to handle over 500k QPS per node with minimal RAM footprint and strict linearizability guarantees.",
    problem: "Existing cloud cache clusters introduced variable 15-45ms latency spikes under heavy concurrent reads and high memory overhead during rapid invalidations.",
    solution: "Implemented zero-copy deserialization using FlatBuffers, custom ring-buffer arena memory allocators, and lock-free concurrency via atomic pointer swaps.",
    cover: "/projects/aether-engine.svg",
    gallery: [
      "/projects/aether-engine.svg",
      "/projects/aether-engine-arch.svg"
    ],
    year: "2026",
    stack: ["Rust", "Tokio", "Docker", "Linux", "TypeScript"],
    github: "https://github.com/example/aether-engine",
    demo: "https://aether-demo.example.com",
    featured: true,
    tags: ["Systems", "Infrastructure", "Rust"],
    architecture: "Multi-threaded async reactor pattern with lock-free ring-buffer message bus and LSM-tree persistence storage engine.",
    result: "Achieved 99.9th percentile latency of 0.8ms under 600,000 requests/sec with a 40% memory reduction compared to Redis."
  },
  {
    title: "Vortex Analytics",
    slug: "vortex-analytics",
    description: "Privacy-focused real-time web telemetry platform analyzing billions of data points using ClickHouse.",
    overview: "Vortex provides real-time traffic intelligence and custom funnel insights without cookies, invasive fingerprinting, or heavy script overhead.",
    problem: "Traditional analytics tools bloat client bundle sizes with 45KB+ JavaScript tags and process analytics in delayed batch queues.",
    solution: "Engineered a 1.2KB edge SDK deployed on Cloudflare Workers that ingests events into ClickHouse via Kafka streaming in <50ms.",
    cover: "/projects/vortex-analytics.svg",
    gallery: [
      "/projects/vortex-analytics.svg"
    ],
    year: "2025",
    stack: ["Next.js", "TypeScript", "ClickHouse", "Cloudflare", "Tailwind"],
    github: "https://github.com/example/vortex-analytics",
    demo: "https://vortex.example.com",
    featured: true,
    tags: ["Web", "Analytics", "Database"],
    architecture: "Edge ingestion worker -> Apache Kafka buffer -> ClickHouse columnar engine -> Next.js dashboard UI.",
    result: "Sub-second query response time for multi-terabyte datasets across 120M monthly active sessions."
  },
  {
    title: "KubeCraft Operator",
    slug: "kubecraft-operator",
    description: "Automated Kubernetes operator for dynamic microservice provisioning, traffic routing, and auto-healing.",
    overview: "KubeCraft automates complex multi-cluster deployments with intelligent canary rollouts, automatic TLS certificates, and eBPF network monitoring.",
    problem: "Manual helm chart management and multi-cluster synchronization introduced human configuration errors during production releases.",
    solution: "Created a custom Go CRD operator leveraging Controller Runtime with real-time health checks and automated fallback rollbacks.",
    cover: "/projects/kubecraft.svg",
    gallery: [
      "/projects/kubecraft.svg"
    ],
    year: "2025",
    stack: ["Go", "Kubernetes", "Docker", "Linux", "Cloudflare"],
    github: "https://github.com/example/kubecraft-operator",
    featured: false,
    tags: ["DevOps", "Kubernetes", "Go"],
    architecture: "Go controller-runtime operator pattern watching custom resources (CRDs) with eBPF Cilium integration.",
    result: "Reduced infrastructure deployment incidents by 85% and automated 100% of SSL/TLS certificate renewals."
  },
  {
    title: "HyperScale API Gateway",
    slug: "hyperscale-gateway",
    description: "Sub-millisecond API proxy with dynamic rate-limiting, JWT validation, and GraphQL federation.",
    overview: "HyperScale sits at the edge of backend microservices to handle auth, load-balancing, rate-limiting, and request transformation with zero downtime.",
    problem: "Monolithic API gateways created bottleneck single points of failure and introduced heavy latency penalties during auth checks.",
    solution: "Built a modular proxy using Rust + Axum with shared memory Redis token buckets for global rate-limiting.",
    cover: "/projects/hyperscale.svg",
    gallery: [
      "/projects/hyperscale.svg"
    ],
    year: "2024",
    stack: ["Rust", "Supabase", "Redis", "Docker", "Linux"],
    github: "https://github.com/example/hyperscale-gateway",
    demo: "https://hyperscale.example.com",
    featured: false,
    tags: ["Backend", "Security", "Rust"],
    architecture: "Axum Web Layer -> Redis Cluster Rate-Limiter -> Upstream Reverse Proxy with Keep-Alive pools.",
    result: "Processed 2 Billion requests with 99.999% uptime and <2ms proxy overhead."
  },
  {
    title: "Pulse Monitoring Dashboard",
    slug: "pulse-monitoring",
    description: "Real-time infrastructure health monitor with WebSockets, interactive charts, and instant alert routing.",
    overview: "Pulse provides real-time visibility into server metrics, CPU spikes, network throughput, and container states with sub-second WebSocket updates.",
    problem: "Engineering teams lacked unified metric visualization and suffered from noisy alert fatigue during incident responses.",
    solution: "Designed a dark-mode shadcn UI paired with a lightweight Go WebSocket collector and Prometheus exporter integration.",
    cover: "/projects/pulse-monitoring.svg",
    gallery: [
      "/projects/pulse-monitoring.svg"
    ],
    year: "2024",
    stack: ["Next.js", "React", "TypeScript", "Postgres", "Tailwind"],
    github: "https://github.com/example/pulse-monitoring",
    demo: "https://pulse.example.com",
    featured: false,
    tags: ["Frontend", "UI/UX", "Monitoring"],
    architecture: "Go Prometheus exporter -> WebSocket broadcast node -> React Canvas/SVG charting frontend.",
    result: "Adopted by 30+ internal engineering squads, reducing Mean Time to Resolution (MTTR) by 40%."
  }
];

export function getProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
