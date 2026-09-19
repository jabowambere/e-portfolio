export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "software" | "cybersecurity" | "fullstack" | "devops";
  tags: string[];
  techStack: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  highlights: string[];
  startDate: string;
  endDate?: string;
}

export const projects: Project[] = [
  {
    id: "secured-api-gateway",
    title: "Secure API Gateway Platform",
    description:
      "Enterprise-grade API gateway with built-in authentication, rate limiting, and threat detection.",
    longDescription:
      "Designed and implemented a high-performance API gateway handling 10M+ requests/day. Features JWT/OAuth2 authentication, adaptive rate limiting, request/response validation, and integrated WAF rules for OWASP Top 10 protection. Built with Go and deployed on Kubernetes with Istio service mesh.",
    category: "cybersecurity",
    tags: ["API Security", "Go", "Kubernetes", "Istio", "OAuth2"],
    techStack: ["Go", "Kubernetes", "Istio", "Redis", "PostgreSQL", "Prometheus", "Grafana"],
    githubUrl: "https://github.com/yourusername/api-gateway",
    liveUrl: "https://api-gateway.example.com",
    featured: true,
    highlights: [
      "Reduced attack surface by 85% through automated threat detection",
      "Achieved 99.99% uptime with zero-downtime deployments",
      "Implemented mutual TLS for service-to-service communication",
    ],
    startDate: "2023-06",
    endDate: "2024-03",
  },
  {
    id: "vulnerability-scanner",
    title: "Automated Vulnerability Scanner",
    description:
      "Custom SAST/DAST tool for continuous security scanning in CI/CD pipelines.",
    longDescription:
      "Built a comprehensive vulnerability scanner that integrates with GitLab CI, GitHub Actions, and Jenkins. Supports custom rule packs for OWASP Top 10, CWE Top 25, and organization-specific policies. Features incremental scanning, false positive suppression, and detailed remediation guidance.",
    category: "cybersecurity",
    tags: ["SAST", "DAST", "CI/CD", "Security Automation", "TypeScript"],
    techStack: ["TypeScript", "Node.js", "Docker", "GraphQL", "PostgreSQL", "Redis"],
    githubUrl: "https://github.com/yourusername/vuln-scanner",
    featured: true,
    highlights: [
      "Scans 500K+ lines of code in under 3 minutes",
      "Custom rule engine with 200+ built-in security rules",
      "Integrates with 5+ CI/CD platforms",
    ],
    startDate: "2022-09",
    endDate: "2023-05",
  },
  {
    id: "ecommerce-platform",
    title: "Scalable E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with microservices architecture and real-time inventory.",
    longDescription:
      "Led development of a cloud-native e-commerce platform serving 100K+ daily active users. Microservices architecture with event-driven communication via Kafka. Implemented distributed tracing, circuit breakers, and saga pattern for distributed transactions. PCI-DSS compliant payment processing.",
    category: "fullstack",
    tags: ["Microservices", "React", "Node.js", "Kafka", "PostgreSQL"],
    techStack: ["React", "Next.js", "Node.js", "TypeScript", "Kafka", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://shop.example.com",
    featured: true,
    highlights: [
      "Processes 10K+ orders/hour during peak traffic",
      "Sub-200ms API response times at p99",
      "Zero-downtime deployments with blue-green strategy",
    ],
    startDate: "2021-03",
    endDate: "2022-08",
  },
  {
    id: "secure-file-sharing",
    title: "End-to-End Encrypted File Sharing",
    description:
      "Zero-knowledge file sharing platform with client-side encryption and access controls.",
    longDescription:
      "Developed a secure file sharing application with end-to-end encryption using Web Crypto API. Features granular access controls, expiration policies, audit logging, and compliance reporting. Client-side encryption ensures zero-knowledge architecture—server never sees plaintext.",
    category: "software",
    tags: ["Encryption", "Zero-Knowledge", "React", "WebCrypto", "Node.js"],
    techStack: ["React", "TypeScript", "Node.js", "Web Crypto API", "PostgreSQL", "S3", "Docker"],
    githubUrl: "https://github.com/yourusername/secure-share",
    liveUrl: "https://share.example.com",
    featured: false,
    highlights: [
      "AES-256-GCM encryption with PBKDF2 key derivation",
      "Granular permissions: view, download, edit, share",
      "SOC 2 Type II compliant audit trails",
    ],
    startDate: "2023-01",
    endDate: "2023-12",
  },
  {
    id: "kubernetes-security-operator",
    title: "Kubernetes Security Operator",
    description:
      "Custom Kubernetes operator for automated security policy enforcement and compliance.",
    longDescription:
      "Built a Kubernetes operator using Operator SDK that continuously validates cluster security posture. Enforces Pod Security Standards, Network Policies, and custom admission policies. Integrates with Falco for runtime threat detection and Kyverno for policy management.",
    category: "cybersecurity",
    tags: ["Kubernetes", "Operator", "Go", "Security Policy", "Falco"],
    techStack: ["Go", "Kubernetes", "Operator SDK", "Falco", "Kyverno", "Prometheus"],
    githubUrl: "https://github.com/yourusername/k8s-security-operator",
    featured: false,
    highlights: [
      "Automated remediation of 95% of policy violations",
      "Real-time runtime threat detection with Falco integration",
      "Custom CRDs for organization-specific security policies",
    ],
    startDate: "2023-08",
    endDate: "2024-01",
  },
  {
    id: "realtime-analytics-dashboard",
    title: "Real-Time Analytics Dashboard",
    description:
      "High-performance dashboard for visualizing security events and application metrics.",
    longDescription:
      "Built a real-time analytics platform processing 1M+ events/second using ClickHouse and WebSocket connections. Features customizable dashboards, alerting engine, anomaly detection, and export capabilities. Used by security teams for threat hunting and incident response.",
    category: "software",
    tags: ["Real-time", "ClickHouse", "WebSocket", "React", "Golang"],
    techStack: ["React", "TypeScript", "Go", "ClickHouse", "Redis", "WebSocket", "Docker"],
    githubUrl: "https://github.com/yourusername/analytics-dashboard",
    liveUrl: "https://analytics.example.com",
    featured: false,
    highlights: [
      "Sub-second query latency on 10TB+ datasets",
      "Supports 500+ concurrent dashboard users",
      "ML-based anomaly detection with configurable thresholds",
    ],
    startDate: "2022-01",
    endDate: "2022-12",
  },
];

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "software", label: "Software Development" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "fullstack", label: "Full Stack" },
  { id: "devops", label: "DevOps & Cloud" },
] as const;