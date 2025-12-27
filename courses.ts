// Course

//  - id: string
//  - title: string
//  - description: string
//  - activeLessonId: string (lesson id)
//  - modules: Module[]

// 	Module

// 	 - id: string
// 	 - no: number
// 	 - title: string
// 	 - lessons: Lesson[]
// 	 // Local/Derived states
// 	 - isActive: boolean (is mediaPlaying in module?)
// 	 - isCompleted: boolean (are all lessons completed?)
// 	  - isOpen: boolean (local state)

// 	 Lesson

// 	  - id: string
// 	  - src: string
// 	  - title: string
// 	  - description: string
// 	  - timePlayed: number
// 	  - duration: number
// 	  // Local/Derived states
// 	  - isCurrent: boolean (is activeLesson?)
// 	  - isPlayed: boolean (is timePlayed = 0 ?)
// 	  - progress ((timePlayed / duration) * 100)
// 	  - isCompleted (is progress > 95)

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number;
  timePlayed: number;
}

export interface Module {
  id: string;
  no: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  activeLessonId: string;
  modules: Module[];
}

export const courses: Course[] = [
  {
    id: "course1id",
    title: "MERN Stack Tutorial",
    description:
      "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
    difficulty: 2,
    activeLessonId: "expressrouter1",
    modules: [
      {
        id: "firstmodule1",
        no: 1,
        title: "Introduction",
        lessons: [
          {
            id: "whatismern1",
            title: "What is the MERN Stack?",
            description:
              "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
            duration: 425,
            timePlayed: 410,
          },
          {
            id: "expresssetup1",
            title: "Express App Setup",
            description:
              "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
            duration: 931,
            timePlayed: 920,
          },
        ],
      },
      {
        id: "modulenumber22",
        no: 2,
        title: "MongoDB",
        lessons: [
          {
            id: "expressrouter1",
            title: "Express Router & API Routes",
            description:
              "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
            duration: 818,
            timePlayed: 400,
          },
          {
            id: "mongodbatlas1",
            title: "MongoDB Atlas & Mongoose",
            description:
              "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
            duration: 529,
            timePlayed: 0,
          },
        ],
      },
    ],
  },
];
