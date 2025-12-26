export interface Lesson {
  title: string;
  description: string;
  duration: string;
  progress: number;
  isCurrent: boolean;
}

export interface Module {
  number: string;
  title: string;
  progress: number;
  isCompleted: boolean;
  isActive: boolean;
  lessons: Lesson[];
}

export interface Course {
  title: string;
  description: string;
  modules: Module[];
}

export const courses: Course[] = [
  {
    title: "MERN Stack Tutorial",
    description:
      "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
    modules: [
      {
        number: "01",
        title: "Introduction",
        progress: 75,
        isCompleted: false,
        isActive: true,
        lessons: [
          {
            title: "What is the MERN Stack?",
            description:
              "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
            duration: "7m 5s",
            progress: 100,
            isCurrent: true,
          },
          {
            title: "Express App Setup",
            description:
              "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
            duration: "15m 31s",
            progress: 50,
            isCurrent: false,
          },
        ],
      },
      {
        number: "02",
        title: "MongoDB",
        progress: 0,
        isCompleted: false,
        isActive: false,
        lessons: [
          {
            title: "Express Router & API Routes",
            description:
              "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
            duration: "13m 38s",
            progress: 0,
            isCurrent: false,
          },
          {
            title: "MongoDB Atlas & Mongoose",
            description:
              "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.",
            duration: "8m 49s",
            progress: 0,
            isCurrent: false,
          },
        ],
      },
    ],
  },
];
