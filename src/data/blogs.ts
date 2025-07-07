// my-bootstrap-app/src/data/blogs.ts

export interface Comment {
  id: string;
  name: string;
  message: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image?: string;
  date: string;
  readingTime: string;
  author: string;
  authorBio?: string;
  categories?: string[];
  comments?: Comment[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "ai-in-rural-education",
    title: "How We're Using AI in Rural Education",
    date: "July 01, 2025",
    readingTime: "5 min read",
    excerpt: "Discover how MyApp is leveraging AI to make education accessible in rural Ghana.",
    content: `
## Key Benefits of AI

AI is transforming how we teach and learn in under-resourced schools. Our initiatives focus on:

- Intelligent tutoring systems
- Real-time student feedback
- Personalized learning paths

> “Education is the most powerful weapon which you can use to change the world.” – Nelson Mandela

We’re seeing real results already!
    `,
    image: "/images/ai-education.jpg",
    author: "MyApp Team",
    authorBio: "Dedicated to transforming communities through technology and education.",
    categories: ["AI", "Education", "Rural Development", "Ghana"]
  },
  {
    id: "launching-global-light-pulse-project",
    title: "Launching the Global Light Pulse Project",
    date: "July 02, 2025",
    readingTime: "4 min read",
    excerpt: "An inside look at our new civic data platform for birth and death monitoring.",
    content: `
## What is GLP?

Global Light Pulse (GLP) is our real-time civic data platform that digitizes birth and death records across communities.

### Why It Matters

- Eliminates manual paperwork
- Improves public service planning
- Helps track population health trends
    `,
    image: "/images/glp-launch.jpg",
    author: "Isaac A. Osafo",
    authorBio: "Founder of GLP Project. Passionate about tech for development.",
    categories: ["Civic Tech", "Data", "Public Health", "GLP Project"]
  },
  {
    id: "measuring-social-impact-through-data",
    title: "Measuring Social Impact Through Data",
    date: "July 03, 2025",
    readingTime: "6 min read",
    excerpt: "Learn how we use technology to track progress and impact in our communities.",
    content: `
## Why Impact Measurement?

To ensure our efforts drive real change, we:

- Use dashboards to visualize progress
- Analyze community feedback
- Adjust strategies based on data insights

Our goal is continuous improvement through transparent reporting.
    `,
    image: "/images/impact-measurement.jpg",
    author: "MyApp Team",
    authorBio: "Our team's commitment is to measurable change and sustainable impact.",
    categories: ["Impact", "Data Analysis", "Technology for Good"]
  },
  {
    id: "how-technology-empowers-rural-innovation",
    title: "How Technology Empowers Rural Innovation",
    date: "June 24, 2025",
    readingTime: "5 min read",
    excerpt: "Technology is changing lives in the most remote parts of the world. Here’s how...",
    content: `Technology is revolutionizing remote education, healthcare, and communication. With mobile tools and solar energy, even hard-to-reach communities can now participate in the digital economy.`,
    author: "Isaac A. Osafo",
    authorBio: "Founder of GLP Project. Passionate about tech for development.",
    image: "/images/tech-rural.jpg",
    categories: ["Technology", "Innovation", "Rural Development"],
    comments: [
      {
        id: "c11",
        name: "Jane",
        message: "This is amazing!",
        date: "2025-07-06T21:04:51.695029Z"
      },
      {
        id: "c12",
        name: "Kwame",
        message: "Very insightful piece!",
        date: "2025-07-06T21:04:51.695042Z"
      }
    ]
  },
  {
    id: "building-personal-brand-digital-age",
    title: "Building a Personal Brand in the Digital Age",
    date: "June 25, 2025",
    readingTime: "4 min read",
    excerpt: "Personal branding is no longer optional. It’s your digital identity...",
    content: `Whether you're a student, entrepreneur, or professional, personal branding gives you an edge. Your online presence should reflect your values, skills, and purpose.`,
    author: "Isaac A. Osafo",
    authorBio: "Founder of GLP Project. Passionate about tech for development.",
    image: "/images/personal-brand.jpg",
    categories: ["Career", "Digital Skills", "Growth"],
    comments: [
      {
        id: "c21",
        name: "Aisha",
        message: "This encouraged me a lot!",
        date: "2025-07-06T21:04:51.695048Z"
      },
      {
        id: "c22",
        name: "John",
        message: "Well written and helpful.",
        date: "2025-07-06T21:04:51.695053Z"
      }
    ]
  },
  {
    id: "ai-tools-work-smarter",
    title: "AI Tools that Help You Work Smarter",
    date: "June 26, 2025",
    readingTime: "6 min read",
    excerpt: "Forget working harder—AI is here to help you work smarter. Explore the top tools.",
    content: `Apps like ChatGPT, Grammarly, and Notion AI are changing how we write, learn, and plan. Anyone can now increase productivity with less stress using these smart tools.`,
    author: "Isaac A. Osafo",
    authorBio: "Founder of GLP Project. Passionate about tech for development.",
    image: "/images/ai-productivity.jpg",
    categories: ["AI", "Productivity", "Smart Work"],
    comments: [
      {
        id: "c31",
        name: "Esi",
        message: "Love this breakdown!",
        date: "2025-07-06T21:04:51.695058Z"
      },
      {
        id: "c32",
        name: "Daniel",
        message: "AI is really powerful.",
        date: "2025-07-06T21:04:51.695065Z"
      }
    ]
  }
];
