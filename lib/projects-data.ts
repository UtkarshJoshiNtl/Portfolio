export interface Project {
  id: string
  title: string
  summary: string
  description: string
  image: string
  techStack: string[]
  links: {
    live?: string
    github?: string
  }
  featured: boolean
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "AI Code Assistant",
    summary:
      "An intelligent coding companion that helps developers write better code faster with AI-powered suggestions.",
    description:
      "A full-stack application that leverages large language models to provide real-time code suggestions, documentation generation, and bug detection. Built with a focus on developer experience and seamless IDE integration.",
    image: "/ai-code-assistant-dark-theme-interface.jpg",
    techStack: ["Next.js", "TypeScript", "OpenAI", "Tailwind"],
    links: {
      live: "https://example.com",
      github: "https://github.com",
    },
    featured: true,
  },
  {
    id: "project-2",
    title: "Real-time Analytics Dashboard",
    summary: "A high-performance dashboard for monitoring and visualizing real-time data streams at scale.",
    description:
      "Built to handle millions of events per minute with sub-second latency. Features customizable widgets, alerting, and collaborative annotations for team-based monitoring.",
    image: "/analytics-dashboard-dark-theme-charts.jpg",
    techStack: ["React", "D3.js", "WebSocket", "Redis"],
    links: {
      live: "https://example.com",
      github: "https://github.com",
    },
    featured: true,
  },
  {
    id: "project-3",
    title: "DevOps Pipeline Builder",
    summary: "Visual CI/CD pipeline builder with drag-and-drop interface for creating complex deployment workflows.",
    description:
      "Simplifies the creation of CI/CD pipelines with an intuitive visual interface. Supports major cloud providers and integrates with popular version control systems.",
    image: "/devops-pipeline-builder-dark-interface.jpg",
    techStack: ["Go", "Docker", "Kubernetes", "Vue.js"],
    links: {
      github: "https://github.com",
    },
    featured: true,
  },
  {
    id: "project-4",
    title: "Collaborative Whiteboard",
    summary: "Real-time collaborative whiteboard for remote teams with infinite canvas and smart shapes.",
    description:
      "A Figma-like collaborative whiteboard supporting real-time cursors, sticky notes, diagrams, and integrations with popular project management tools.",
    image: "/collaborative-whiteboard-app-dark-theme.jpg",
    techStack: ["Next.js", "Socket.io", "Canvas API", "PostgreSQL"],
    links: {
      live: "https://example.com",
      github: "https://github.com",
    },
    featured: true,
  },
  {
    id: "project-5",
    title: "CLI Task Manager",
    summary: "A blazing-fast command-line task manager with cloud sync and team collaboration features.",
    description:
      "Terminal-based productivity tool that syncs across devices and supports team workspaces. Built in Rust for maximum performance.",
    image: "/terminal-cli-interface-dark.jpg",
    techStack: ["Rust", "SQLite", "REST API"],
    links: {
      github: "https://github.com",
    },
    featured: false,
  },
  {
    id: "project-6",
    title: "Smart Home Hub",
    summary: "Unified dashboard for managing IoT devices with automation rules and voice control.",
    description:
      "Open-source home automation platform that works with various IoT protocols. Features a mobile-first design and powerful automation scripting.",
    image: "/smart-home-dashboard-dark-iot.jpg",
    techStack: ["React Native", "Node.js", "MQTT", "InfluxDB"],
    links: {
      live: "https://example.com",
      github: "https://github.com",
    },
    featured: false,
  },
]
