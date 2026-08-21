export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  year: string;
  tech: string[];
  features: string[];
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    slug: "roomrental",
    title: "RoomRental",
    description:
      "A modern property rental platform where users can explore rooms, properties and rental listings.",
    longDescription:
      "RoomRental is a full-stack property rental platform designed to make finding and exploring rental properties easier. The application focuses on a clean user experience, responsive design, authentication and reliable data management.",
    category: "Full-Stack",
    year: "2026",
    tech: ["Next.js", "TypeScript", "Firebase", "Tailwind"],
    features: [
      "Responsive property browsing",
      "User authentication",
      "Property listings",
      "Modern responsive interface",
      "Firebase integration",
    ],
    github: "https://github.com/roshanmandal45/RoomRental",
    demo: "#",
  },

  {
    slug: "esewa-payment",
    title: "eSewa Payment",
    description:
      "A payment integration system connecting a web application with Nepal's eSewa payment gateway.",
    longDescription:
      "This project integrates a web application with the eSewa payment gateway. It handles the payment flow between the application and eSewa and provides a success state after a completed transaction.",
    category: "Backend / Payments",
    year: "2026",
    tech: ["Next.js", "Node.js", "eSewa"],
    features: [
      "eSewa payment integration",
      "Payment request handling",
      "Payment success callback",
      "Protected payment flow",
      "Responsive UI",
    ],
    github: "#",
    demo: "#",
  },

  {
    slug: "spotify-clone",
    title: "Spotify Clone",
    description:
      "A responsive music streaming interface inspired by Spotify with modern UI interactions.",
    longDescription:
      "A frontend-focused music streaming experience created to practice responsive layouts, reusable components and interactive UI development.",
    category: "Frontend",
    year: "2025",
    tech: ["React", "Firebase", "Tailwind"],
    features: [
      "Responsive music interface",
      "Reusable components",
      "Interactive navigation",
      "Firebase integration",
      "Mobile-friendly layout",
    ],
    github: "#",
    demo: "#",
  },
];