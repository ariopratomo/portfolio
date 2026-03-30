// ===== Types =====
export interface TechItem {
  name: string;
  version?: string;
  category: string;
  variant?: string;
}

export interface Feature {
  name: string;
  description: string;
  tags: string[];
}

export interface Challenge {
  title: string;
  problem: string;
  solution: string;
}

export interface ProjectMetrics {
  [key: string]: number;
}

export interface ProjectArchitecture {
  [key: string]: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  duration: string;
  teamSize: number;
  status: string;
  color: string; // accent color for project card
  techStack: Record<string, TechItem[]>;
  features: Feature[];
  challenges: Challenge[];
  metrics: ProjectMetrics;
  security: string[];
  architecture: ProjectArchitecture;
  lessons?: string[];
  links?: { label: string; url: string }[];
}

// ===== Resume / Profile Data =====
export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  about: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  skills: Record<string, string[]>;
  certifications: string[];
  experience: Experience[];
  education: Education[];
}

export const profile: Profile = {
  name: "Ario Pratomo",
  title: "Software Engineer | Fullstack (Laravel, Golang, React) | CI/CD & Cloud",
  tagline: "Fullstack Engineer dengan 5+ tahun pengalaman membangun dan mengelola sistem production end-to-end",
  about:
    "Fullstack Engineer dengan 5+ tahun pengalaman dalam membangun dan mengelola sistem production end-to-end, mencakup backend, frontend, dan infrastruktur. Memiliki fokus pada backend development menggunakan Laravel dan Golang, termasuk pengembangan API dengan kebutuhan high concurrency dan scalable architecture. Berpengalaman dalam CI/CD, cloud infrastructure, dan deployment untuk memastikan sistem berjalan stabil, efisien, dan mudah dikembangkan.",
  location: "Jakarta, Indonesia",
  email: "ariopratomo123@gmail.com",
  github: "https://github.com/ariopratomo",
  linkedin: "https://www.linkedin.com/in/arioprtmo",
  skills: {
    Backend: ["Laravel", "Golang", "REST API", "Clean Architecture", "MySQL", "Redis"],
    Frontend: ["React", "TypeScript", "Tailwind CSS", "Zustand", "TanStack Query", "Vite"],
    Infrastructure: ["Docker", "GitHub Actions", "Linux", "DigitalOcean Spaces", "Traefik"],
    Security: ["JWT", "bcrypt", "Rate Limiting", "reCAPTCHA", "ClamAV"],
    Practices: ["CI/CD", "Clean Architecture", "Domain-Driven Design", "Git", "API Documentation"],
  },
  certifications: [
    "Setting Up Server dengan Alibaba Cloud Elastic Compute Service",
    "Studi Kasus Web Geolocation dengan Laravel dan HERE Maps",
    "Full-Stack Website Designer",
  ],
  experience: [
    {
      company: "Ducking ID",
      role: "Fullstack Engineer",
      period: "Agustus 2020 – Present",
      description:
        "Merancang dan mengembangkan platform e-commerce end-to-end mencakup backend, frontend, dan infrastruktur.",
      highlights: [
        "Core System Architecture: Merancang dan mengembangkan platform utama menggunakan Laravel monolith architecture, dengan pendekatan pragmatis untuk memaksimalkan development speed pada sistem berbasis CRUD dan e-commerce",
        "High-Concurrency API (Golang): Mengembangkan service API Member terpisah menggunakan Golang (feature-based monolith) untuk menangani kebutuhan throughput dan concurrency yang lebih tinggi",
        "Internal System & Frontend: Mengembangkan dashboard operasional berbasis ReactJS yang terintegrasi langsung dengan ekosistem data perusahaan",
        "DevOps & Infrastructure: Mendesain dan mengimplementasikan CI/CD pipeline GitHub Actions serta mengelola provisioning cloud infrastructure",
        "Storage Optimization: Mengimplementasikan DigitalOcean Spaces (S3-compatible object storage) untuk pengelolaan aset statis yang scalable dan cost-efficient",
      ],
    },
  ],
  education: [
    {
      institution: "STMIK Nusa Mandiri Jakarta",
      degree: "Gelar Sarjana, Sistem Informasi",
      period: "2016 – 2020",
    },
    {
      institution: "Universitas Bina Sarana Informatika",
      degree: "Diploma, Sistem Informasi",
      period: "2016 – 2019",
    },
  ],
};

// ===== Projects Data =====
export const projects: Project[] = [
  {
    id: "ducking-platform",
    title: "Ducking Platform",
    subtitle: "Full-Stack E-Commerce Platform",
    description:
      "End-to-end e-commerce platform connecting Indonesian buyers with Chinese marketplaces. Built with React 19 frontend and Go backend — covering product search, cart management, order lifecycle, real-time messaging, async email delivery, and multi-layer security.",
    role: "Software Engineer",
    duration: "3 Months (parallel with UI/UX)",
    teamSize: 1,
    status: "Production",
    color: "indigo",
    links: [
      { label: "Member Dashboard", url: "https://member.ducking.id" },
    ],
    techStack: {
      "Frontend Core": [
        { name: "React", version: "19", category: "UI Framework" },
        { name: "TypeScript", category: "Language" },
        { name: "React Router", category: "Routing" },
        { name: "Vite", category: "Build Tool" },
      ],
      "Frontend UI": [
        { name: "Tailwind CSS", category: "CSS Framework" },
        { name: "shadcn/ui", category: "Components" },
        { name: "Radix UI", category: "Headless Primitives" },
        { name: "Framer Motion", category: "Animation" },
      ],
      "Frontend State": [
        { name: "Zustand", category: "Client State" },
        { name: "TanStack Query", category: "Server State" },
        { name: "React Hook Form", category: "Forms" },
        { name: "Zod", category: "Validation" },
      ],
      "Backend Core": [
        { name: "Go", category: "Language" },
        { name: "Gin", category: "HTTP Framework" },
        { name: "GORM", category: "ORM" },
        { name: "MySQL", category: "Database" },
      ],
      "Auth & Security": [
        { name: "JWT", category: "Token Authentication" },
        { name: "bcrypt", category: "Password Hashing" },
        { name: "Google OAuth", category: "Social Login" },
        { name: "reCAPTCHA v3", category: "Bot Protection" },
      ],
      Infrastructure: [
        { name: "Redis", category: "Cache / Session / Queue" },
        { name: "Asynq", category: "Task Queue" },
        { name: "Docker", category: "Containerization" },
        { name: "Traefik", category: "Reverse Proxy" },
      ],
      Storage: [
        { name: "S3-Compatible Storage", category: "Object Storage + CDN" },
        { name: "ClamAV", category: "Virus Scanning" },
      ],
      Tooling: [
        { name: "Zerolog", category: "Structured Logging" },
        { name: "Swagger/OpenAPI", category: "API Documentation" },
        { name: "Transactional Email", category: "Email Service" },
      ],
    },
    features: [
      {
        name: "Multi-Marketplace Product Search",
        description:
          "Unified search across multiple Chinese marketplaces with image search, infinite scroll, and real-time currency conversion.",
        tags: ["full-stack", "search", "api-integration", "e-commerce"],
      },
      {
        name: "Grouped Cart System",
        description:
          "Hierarchical cart grouped by marketplace, seller, and product with cascading selection logic and optimized state management.",
        tags: ["full-stack", "state-management", "data-modeling"],
      },
      {
        name: "Purchase Order Lifecycle",
        description:
          "End-to-end order management with document tracking, Excel import, in-app chat, and photo reviews.",
        tags: ["full-stack", "order-management", "file-upload"],
      },
      {
        name: "In-App Messaging with File Scanning",
        description:
          "Real-time messaging with split-view layout, infinite scroll, and server-side file scanning before delivery.",
        tags: ["full-stack", "messaging", "security"],
      },
      {
        name: "Cascading Address System",
        description:
          "4-level address selector (Province to Village) with Redis caching for fast lookup across 90K+ records.",
        tags: ["full-stack", "geolocation", "caching"],
      },
      {
        name: "JWT Authentication",
        description:
          "Token-based auth with refresh flow, server-side revocation, and cross-tab session sync on the frontend.",
        tags: ["security", "jwt", "redis"],
      },
      {
        name: "Rate Limiting & Account Protection",
        description:
          "Atomic Redis-based rate limiting with progressive account lockout and async notification emails.",
        tags: ["security", "redis", "middleware"],
      },
      {
        name: "Async Email Queue",
        description:
          "Priority-based email queue with retry logic and exponential backoff for transactional emails.",
        tags: ["queue", "async", "email", "reliability"],
      },
      {
        name: "Cloud Storage with File Validation",
        description:
          "S3-compatible object storage with content-based file type validation and automatic temp file cleanup.",
        tags: ["design-pattern", "storage", "security"],
      },
      {
        name: "Dashboard & Analytics",
        description:
          "Operational dashboard with stat cards, transaction charts, live tracking, and onboarding tour.",
        tags: ["analytics", "charts", "onboarding"],
      },
      {
        name: "Membership Tier System",
        description:
          "Multi-tier comparison with feature matrix, progress visualization, and localized currency formatting.",
        tags: ["membership", "i18n", "data-display"],
      },
    ],
    challenges: [
      {
        title: "Concurrent Rate Limiting",
        problem:
          "Non-atomic rate limit checks allowed concurrent requests to bypass limits under high load.",
        solution:
          "Replaced with atomic Redis pipeline for single round-trip counter operations. Added fail-closed pattern to deny requests if the cache layer is unavailable.",
      },
      {
        title: "File Upload Security",
        problem:
          "Header-only file validation was insufficient — file type could be spoofed by modifying the Content-Type header.",
        solution:
          "Implemented content-based file type detection by reading file magic bytes. Validates actual content against declared extension across all upload endpoints.",
      },
      {
        title: "Token Revocation",
        problem:
          "Stateless tokens cannot be invalidated after issuance, but logout and account protection features require revocation.",
        solution:
          "Server-side token blacklist in Redis with TTL matching token expiry. Cross-tab session sync on frontend using BroadcastChannel API.",
      },
      {
        title: "Multi-Marketplace API Normalization",
        problem:
          "Multiple marketplace APIs with different contracts and response structures, but the frontend expects a unified interface.",
        solution:
          "Separate service layer per marketplace behind a unified handler with a transformer layer to normalize responses. Real-time currency conversion from database rates.",
      },
      {
        title: "Hierarchical Cart State",
        problem:
          "Cart items nested multiple levels deep across separate databases. Both backend grouping and frontend selection logic needed to stay performant.",
        solution:
          "Pre-grouped JSON response from backend with ORM preloading. Frontend uses nested object structure for O(1) lookups with cascading selection logic.",
      },
      {
        title: "Email Delivery Reliability",
        problem:
          "Synchronous email sending caused multi-second response delays and silent failures when the email service was slow.",
        solution:
          "Moved to async queue with priority levels, retry with exponential backoff, and dead letter queue for failed deliveries.",
      },
    ],
    metrics: {
      "Backend Modules": 15,
      "API Endpoints": 120,
      "DB Migrations": 90,
      "Frontend Modules": 12,
      "Page Components": 20,
      "Shared Components": 50,
      "Custom Hooks": 25,
    },
    security: [
      "JWT access + refresh token pair with server-side revocation",
      "bcrypt password hashing",
      "Atomic rate limiting with multiple strategies",
      "Progressive account lockout with async notifications",
      "reCAPTCHA v3 bot protection",
      "Secondary PIN authentication",
      "Device tracking with suspicious login alerts",
      "Content-based file type validation",
      "Server-side virus scanning on uploads",
      "Fail-closed security middleware",
      "Non-root Docker containers",
      "Parameterized queries — no raw SQL",
      "CORS whitelist configuration",
      "Frontend input validation with Zod schemas",
    ],
    architecture: {
      frontendPattern: "Feature-Based Module Architecture with Atomic Design",
      backendPattern: "Modular Monolith with Clean Architecture",
      backendLayers: "Handler → Service → Repository (3-layer)",
      frontendState: "Zustand (client) + TanStack Query (server) + React Hook Form (forms)",
      backendState: "Stateless JWT with Redis for caching and session management",
      apiDesign: "RESTful JSON with Swagger/OpenAPI documentation",
      databaseStrategy: "Multi-database with domain-isolated schemas",
    },
    lessons: [
      "Clean Architecture scales well for modular backends with clear domain boundaries",
      "Fail-closed is safer than fail-open for security middleware",
      "Atomic operations prevent race conditions in concurrent environments",
      "Multi-database isolation prevents cross-domain schema conflicts",
      "Lightweight task queues are operationally simpler than full message brokers for most use cases",
      "Content-based file validation is more reliable than header-only checks",
      "Strategy pattern makes local dev to cloud production transitions seamless",
      "Separating client state stores prevents unnecessary re-renders in complex UIs",
    ],
  },
  {
    id: "ducking-company-profile",
    title: "Ducking Company Profile",
    subtitle: "Corporate Website with CMS",
    description:
      "Public-facing company profile and content management system for Ducking ID. Built with Laravel monolith — featuring a full CMS admin panel, blog/article system, dynamic service pages, marketing landing pages, SEO optimization with XML sitemaps, and bilingual support (ID/EN).",
    role: "Fullstack Engineer",
    duration: "Ongoing (since 2020)",
    teamSize: 1,
    status: "Production",
    color: "emerald",
    links: [
      { label: "Live Site", url: "https://ducking.id" },
    ],
    techStack: {
      Backend: [
        { name: "Laravel", category: "PHP Framework" },
        { name: "PHP", category: "Language" },
        { name: "MySQL", category: "Database" },
        { name: "Eloquent ORM", category: "ORM" },
      ],
      Frontend: [
        { name: "Blade Templates", category: "Templating" },
        { name: "Tailwind CSS", category: "CSS Framework" },
        { name: "JavaScript", category: "Interactivity" },
      ],
      "SEO & Tools": [
        { name: "SEOTools", category: "Meta / OpenGraph / TwitterCard / JsonLd" },
        { name: "Laravel Filemanager", category: "Media Management" },
        { name: "Intervention Image", category: "Image Processing / WebP" },
      ],
      Infrastructure: [
        { name: "Linux", category: "Server" },
        { name: "GitHub Actions", category: "CI/CD" },
      ],
    },
    features: [
      {
        name: "CMS Admin Panel",
        description:
          "Full content management system with admin dashboard for managing all website content — articles, pages, services, FAQs, sliders, testimonials, promotions, and site settings.",
        tags: ["cms", "admin", "crud"],
      },
      {
        name: "Blog & Article System",
        description:
          "Article management with categories, tags, published/draft status, slug-based URLs, related articles, and category-filtered listing pages.",
        tags: ["blog", "content", "seo"],
      },
      {
        name: "Dynamic Service Pages",
        description:
          "Configurable service (layanan) pages with custom content, images, meta tags, and display ordering via admin panel.",
        tags: ["cms", "services", "content"],
      },
      {
        name: "Homepage CMS",
        description:
          "Fully configurable homepage — hero banner with customizable colors/CTA/promo code, slider carousel, testimonials, warehouse locations, reviews, and product recommendations.",
        tags: ["cms", "homepage", "dynamic"],
      },
      {
        name: "SEO & Sitemap",
        description:
          "Per-page meta tags (keywords, description), OpenGraph, TwitterCard, JSON-LD structured data, canonical URLs, and auto-generated XML sitemaps for pages and articles.",
        tags: ["seo", "sitemap", "structured-data"],
      },
      {
        name: "FAQ System",
        description:
          "Categorized FAQ with drag-and-drop ordering, managed through CMS admin panel.",
        tags: ["faq", "cms", "content"],
      },
      {
        name: "Media & Content Ordering",
        description:
          "Drag-and-drop position ordering for sliders, testimonials, FAQs, photos, reviews, and warehouses. File manager for media uploads with WebP thumbnail generation.",
        tags: ["media", "ux", "admin"],
      },
      {
        name: "Bilingual Support (ID/EN)",
        description:
          "Language switcher between Indonesian and English with session and cookie persistence.",
        tags: ["i18n", "localization"],
      },
      {
        name: "Dynamic CMS Pages",
        description:
          "Slug-based dynamic pages — about us, cargo info, import guide, transfer service — all editable from CMS admin.",
        tags: ["cms", "pages", "content"],
      },
    ],
    challenges: [
      {
        title: "Content Flexibility vs Structure",
        problem:
          "The website needs to support various content types (articles, services, FAQs, landing pages) each with different layouts, but all manageable from a single admin panel.",
        solution:
          "Dedicated models and admin CRUD for each content type with shared patterns — slug-based routing, position ordering, status toggles, and SEO fields. Reusable Blade components for consistent frontend rendering.",
      },
      {
        title: "Performance with Dynamic Content",
        problem:
          "Homepage loads data from multiple models (sliders, testimonials, warehouses, reviews, services, hero, popup) which could slow down response times.",
        solution:
          "Aggressive caching with Cache::remember() on all frequently accessed content. AJAX-loaded components for testimonials and warehouse data to reduce initial page load.",
      },
    ],
    metrics: {
      "Public Pages": 15,
      "CMS Content Types": 10,
      "Admin CRUD Modules": 12,
      "XML Sitemaps": 2,
    },
    security: [
      "CSRF protection on all forms",
      "Parameterized queries via Eloquent ORM",
      "RBAC admin permissions with roles",
      "Auth-protected admin panel",
      "HTTPS enforced",
    ],
    architecture: {
      pattern: "Laravel MVC with Blade templating",
      rendering: "Server-Side Rendering (SSR)",
      caching: "Cache::remember() for dynamic content",
      contentManagement: "Admin CRUD with drag-and-drop ordering",
      seo: "SEOTools integration (Meta, OpenGraph, TwitterCard, JsonLd)",
    },
  },
  {
    id: "multi-tenant-landing-page",
    title: "Multi-Tenant Landing Page",
    subtitle: "Single WordPress, Multiple Brands",
    description:
      "Centralized landing page platform built on WordPress + Elementor serving 3 different brands (Ducking, Ethcargo, Printidea). Chose WordPress to delegate landing page creation to the SEO specialist — previously new landing pages were bottlenecked on developer availability. Uses Nginx reverse proxy with path-based rewrite rules to route each brand from one installation.",
    role: "Fullstack Engineer",
    duration: "Ongoing",
    teamSize: 1,
    status: "Production",
    color: "amber",
    links: [
      { label: "Ducking Landing", url: "https://ducking.id/landing" },
    ],
    techStack: {
      CMS: [
        { name: "WordPress", category: "Content Management" },
        { name: "Elementor", category: "Page Builder" },
        { name: "PHP", category: "Language" },
        { name: "MySQL", category: "Database" },
      ],
      Infrastructure: [
        { name: "Nginx", category: "Reverse Proxy" },
        { name: "Linux", category: "Server" },
      ],
    },
    features: [
      {
        name: "Multi-Brand from Single Instance",
        description:
          "One WordPress installation serves landing pages for 3 separate brands (Ducking, Ethcargo, Printidea) — each with its own content and branding, managed from a single admin panel.",
        tags: ["multi-tenant", "wordpress", "efficiency"],
      },
      {
        name: "Self-Service for Non-Developers",
        description:
          "SEO specialist can create and publish new landing pages independently using Elementor — no developer involvement needed. Eliminates the bottleneck of waiting for developer availability.",
        tags: ["elementor", "self-service", "workflow"],
      },
      {
        name: "Path-Based Routing via Nginx",
        description:
          "Nginx reverse proxy rewrites incoming paths (e.g. /landing/*) to brand-specific WordPress paths, allowing each company domain to serve its own landing pages from the shared instance.",
        tags: ["nginx", "reverse-proxy", "routing"],
      },
    ],
    challenges: [
      {
        title: "Developer Bottleneck on Landing Pages",
        problem:
          "New landing page requests kept getting delayed because the sole developer was occupied with core platform work. The SEO specialist had to wait for developer availability.",
        solution:
          "Set up WordPress + Elementor so the SEO specialist can create and update landing pages independently. Developer only handles initial infrastructure setup (Nginx routing, WordPress config) — ongoing content is fully self-service.",
      },
      {
        title: "Multi-Brand on Single WordPress",
        problem:
          "3 different companies need their own landing pages with separate branding, but maintaining 3 WordPress installations is wasteful.",
        solution:
          "Single WordPress with brand-specific path prefixes. Nginx reverse proxy rewrites the public URL path to the correct internal WordPress path per domain.",
      },
    ],
    metrics: {
      "Brands Served": 3,
    },
    security: [
      "TLS 1.2/1.3 enforced on proxy",
      "Real IP forwarding via X-Real-IP and X-Forwarded-For headers",
      "Proxy SSL server name verification",
    ],
    architecture: {
      pattern: "WordPress with Nginx reverse proxy",
      routing: "Path-based rewrite per brand domain",
      hosting: "Single instance serving multiple brand domains",
    },
  },
];
