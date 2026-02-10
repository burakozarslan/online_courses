import {
  PrismaClient,
  MembershipPlan,
  Difficulty,
} from "../app/generated/prisma/client";
import { faker } from "@faker-js/faker";
import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "../lib/prisma";

const prisma = db;

// 1. Video Pool (Realistic durations & YouTube links)
const VIDEO_POOL = [
  { src: "https://youtu.be/98BzS5Oz5E4", duration: 425 },
  { src: "https://youtu.be/8DploTqLstE", duration: 931 },
  { src: "https://youtu.be/Ll6knx7sFis", duration: 818 },
  { src: "https://youtu.be/s0anSjEeua8", duration: 529 },
  { src: "https://youtu.be/pTFZFxd4hOI", duration: 3372 },
  { src: "https://youtu.be/P6FORpg0KVo", duration: 1200 },
  { src: "https://www.youtube.com/watch?v=p8Za5MtyVdg", duration: 1620 },
  { src: "https://www.youtube.com/watch?v=voLJ3CmaM1s", duration: 4500 },
  { src: "https://www.youtube.com/watch?v=gFqER1FC5Ig", duration: 1080 },
  { src: "https://www.youtube.com/watch?v=LDB4uaJ87e0", duration: 11040 },
  { src: "https://www.youtube.com/watch?v=7SKVQyA4TjU", duration: 1320 },
  { src: "https://www.youtube.com/watch?v=kUMe1FH4CHE", duration: 14820 },
  { src: "https://www.youtube.com/watch?v=rfscVS0vtbw", duration: 15960 },
  { src: "https://www.youtube.com/watch?v=PkZNo7MFNFg", duration: 12360 },
  { src: "https://www.youtube.com/watch?v=vLnPwxZdW4Y", duration: 14460 },
  { src: "https://www.youtube.com/watch?v=8hly31xKli0", duration: 7320 },
];

const CATEGORIES = [
  "Web Development",
  "DevOps",
  "Mobile Development",
  "Data Science",
  "Cloud Computing",
  "Cybersecurity",
];

// 2. Realistic Course Data
// 10 Free Courses
const FREE_COURSES = [
  {
    title: "Introduction to Python Programming",
    category: "Data Science",
    difficulty: Difficulty.BEGINNER,
    description: "Learn the fundamentals of Python, the most popular programming language for data science and web development. No prior experience required."
  },
  {
    title: "HTML5 & CSS3 Fundamentals",
    category: "Web Development",
    difficulty: Difficulty.BEGINNER,
    description: "Build your first website with semantic HTML and style it with modern CSS. Understand the core building blocks of the web."
  },
  {
    title: "JavaScript for Beginners",
    category: "Web Development",
    difficulty: Difficulty.BEGINNER,
    description: "Step into the world of interactive web pages. Learn variables, loops, functions, and DOM manipulation in JavaScript."
  },
  {
    title: "Git & GitHub Essentials",
    category: "DevOps",
    difficulty: Difficulty.BEGINNER,
    description: "Master version control. Learn how to track changes, collaborate with teams, and manage your code repositories efficiently."
  },
  {
    title: "Command Line Interface Mastery",
    category: "DevOps",
    difficulty: Difficulty.BEGINNER,
    description: "Stop fearing the terminal. Learn essential shell commands, file manipulation, and scripting to boost your productivity."
  },
  {
    title: "SQL Database Basics",
    category: "Data Science",
    difficulty: Difficulty.BEGINNER,
    description: "Learn to communicate with databases. Understand SELECT, INSERT, UPDATE, DELETE and how to structure relational data."
  },
  {
    title: "VS Code Power User",
    category: "Web Development",
    difficulty: Difficulty.BEGINNER,
    description: "Unlock the full potential of Visual Studio Code. Master shortcuts, extensions, and debugging tools to write code faster."
  },
  {
    title: "Web Accessibility (A11y)",
    category: "Web Development",
    difficulty: Difficulty.INTERMEDIATE,
    description: "Make the web usable for everyone. Learn ARIA roles, semantic HTML, and best practices for building inclusive applications."
  },
  {
    title: "Introduction to Linux",
    category: "DevOps",
    difficulty: Difficulty.BEGINNER,
    description: "Get started with the Linux operating system. specific focus on server environment, permissions, and package management."
  },
  {
    title: "Responsive Web Design",
    category: "Web Development",
    difficulty: Difficulty.BEGINNER,
    description: "Learn to build websites that look great on any device, from mobile phones to large desktop screens, using Flexbox and Grid."
  },
];

// 10 Paid Courses
const PAID_COURSES = [
  {
    title: "Advanced React & Next.js Patterns",
    category: "Web Development",
    difficulty: Difficulty.ADVANCED,
    description: "Take your React skills to the next level. Master Server Components, Suspense, Custom Hooks, and advanced state management."
  },
  {
    title: "Node.js Microservices Architecture",
    category: "Web Development",
    difficulty: Difficulty.ADVANCED,
    description: "Architect scalable backend systems. Learn to decompose monoliths, handle inter-service communication, and deploy microservices."
  },
  {
    title: "Kubernetes for Developers",
    category: "DevOps",
    difficulty: Difficulty.ADVANCED,
    description: "Orchestrate your containers like a pro. Deep dive into Pods, Services, Deployments, and Helm charts for production clusters."
  },
  {
    title: "AWS Certified Solutions Architect",
    category: "Cloud Computing",
    difficulty: Difficulty.ADVANCED,
    description: "Comprehensive preparation for the AWS exam. Cover EC2, S3, RDS, VPC, and best practices for cloud architecture."
  },
  {
    title: "Machine Learning with TensorFlow",
    category: "Data Science",
    difficulty: Difficulty.ADVANCED,
    description: "Build and train neural networks. Learn computer vision, natural language processing, and predictive modeling with Python."
  },
  {
    title: "Rust Systems Programming",
    category: "Web Development",
    difficulty: Difficulty.INTERMEDIATE,
    description: "Write memory-safe and high-performance code. Understand ownership, borrowing, lifetimes, and concurrency in Rust."
  },
  {
    title: "Go Language Concurrency Guide",
    category: "Web Development",
    difficulty: Difficulty.INTERMEDIATE,
    description: "Master Goroutines and Channels. Build highly concurrent and efficient backend services using the Go programming language."
  },
  {
    title: "Docker Deep Dive",
    category: "DevOps",
    difficulty: Difficulty.INTERMEDIATE,
    description: "Containerize everything. Learn how to build optimized Docker images, manage multi-container apps with Compose, and networking."
  },
  {
    title: "System Design Interview Guide",
    category: "Web Development",
    difficulty: Difficulty.ADVANCED,
    description: "Ace your tech interviews. Learn to design scalable systems like Twitter, Uber, and Netflix from the ground up."
  },
  {
    title: "Ethical Hacking & Cybersecurity",
    category: "Cybersecurity",
    difficulty: Difficulty.INTERMEDIATE,
    description: "Understand common vulnerabilities. Learn penetration testing, SQL injection, XSS, and how to secure your applications."
  },
];

const MODULE_TITLES = [
  "Getting Started",
  "Core Concepts",
  "Advanced Techniques",
  "Real World Project",
  "Testing & Deployment"
];

const LESSON_TITLES = [
  "Environment Setup",
  "Understanding the Basics",
  "Deep Dive into Logic",
  "State Management",
  "API Integration",
  "Error Handling Strategies",
  "Performance Optimization",
  "Security Best Practices",
  "Final Build & Launch",
  "Course Summary",
];

function generateSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") +
    "-" +
    faker.string.alphanumeric(4)
  );
}

// Check if running in production mode
const isProduction = process.env.NODE_ENV === "production";

// Get credentials based on environment
function getCredentials() {
  if (isProduction) {
    const instructorEmail = process.env.SEED_INSTRUCTOR_EMAIL;
    const instructorPassword = process.env.SEED_INSTRUCTOR_PASSWORD;

    if (!instructorEmail || !instructorPassword) {
      console.error("❌ Production mode requires SEED_INSTRUCTOR_EMAIL and SEED_INSTRUCTOR_PASSWORD environment variables");
      console.error("Example:");
      console.error('  export SEED_INSTRUCTOR_EMAIL="admin@yourdomain.com"');
      console.error('  export SEED_INSTRUCTOR_PASSWORD="your-secure-password"');
      process.exit(1);
    }

    console.log("🔒 Running in PRODUCTION mode with secure credentials");
    return {
      instructor: {
        email: instructorEmail,
        password: instructorPassword,
        name: "Admin User",
      },
      student: null, // Don't create test student in production
    };
  }

  // Development mode - use convenience credentials
  console.log("🔓 Running in DEVELOPMENT mode with test credentials");
  return {
    instructor: {
      email: "instructor@example.com",
      password: "password123",
      name: "Alice Instructor",
    },
    student: {
      email: "free@example.com",
      password: "password123",
      name: "Frank Free",
    },
  };
}

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Clean Database
  console.log("🧹 Cleaning database...");
  await prisma.lessonProgress.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.instructor.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.category.deleteMany({});
  console.log("🧹 DB Cleaned.");

  // 2. Create Categories
  const categoryMap = new Map<string, string>();
  for (const name of CATEGORIES) {
    const cat = await prisma.category.create({ data: { name } });
    categoryMap.set(name, cat.id);
  }

  // 3. Create Users
  const credentials = getCredentials();
  const hashedPassword = await bcrypt.hash(credentials.instructor.password, 10);

  // Instructor
  const instructorUser = await prisma.user.create({
    data: {
      email: credentials.instructor.email,
      name: credentials.instructor.name,
      password: hashedPassword,
      instructorProfile: {
        create: {
          title: "Senior Lead Instructor",
        },
      },
    },
    include: { instructorProfile: true },
  });

  console.log(`✅ Instructor created: ${credentials.instructor.email}`);

  // Free Student (only in development)
  if (credentials.student) {
    const studentHashedPassword = await bcrypt.hash(credentials.student.password, 10);
    await prisma.user.create({
      data: {
        email: credentials.student.email,
        name: credentials.student.name,
        password: studentHashedPassword,
        studentProfile: {
          create: {
            membership: MembershipPlan.FREE,
          },
        },
      },
    });
    console.log(`✅ Test student created: ${credentials.student.email}`);
  } else {
    console.log("⏭️  Skipping test student creation in production");
  }

  if (!instructorUser.instructorProfile) {
    throw new Error("Failed to create instructor");
  }

  // 4. Create Courses
  const allCourseDefinitions = [
    ...FREE_COURSES.map(c => ({ ...c, isFree: true })),
    ...PAID_COURSES.map(c => ({ ...c, isFree: false }))
  ].sort(() => Math.random() - 0.5);

  for (const def of allCourseDefinitions) {
    // Create Course
    const categoryId = categoryMap.get(def.category) || categoryMap.get("Web Development"); // fallback
    
    const course = await prisma.course.create({
      data: {
        instructorId: instructorUser.instructorProfile.id,
        title: def.title,
        slug: generateSlug(def.title),
        description: def.description,
        imageUrl: faker.image.urlLoremFlickr({ category: "tech" }), // or specific keywords
        difficulty: def.difficulty,
        isPublished: true,
        isFree: def.isFree,
        categories: { connect: { id: categoryId } },
      },
    });

    // Create Modules
    const numModules = faker.number.int({ min: 3, max: 5 });
    for (let i = 0; i < numModules; i++) {
        const moduleTitle = MODULE_TITLES[i] || `Advanced Topic ${i}`;
        
        const mod = await prisma.module.create({
            data: {
                courseId: course.id,
                title: moduleTitle,
                no: i + 1,
            }
        });

        // Create Lessons
        const numLessons = faker.number.int({ min: 2, max: 5 });
        for (let j = 0; j < numLessons; j++) {
            const vid = VIDEO_POOL[faker.number.int({ min: 0, max: VIDEO_POOL.length - 1 })];
            const titleIndex = (i * 2 + j) % LESSON_TITLES.length;
            
            await prisma.lesson.create({
                data: {
                    moduleId: mod.id,
                    title: LESSON_TITLES[titleIndex],
                    description: `In this lesson, we will cover ${LESSON_TITLES[titleIndex].toLowerCase()} and its related concepts.`,
                    videoUrl: vid.src,
                    duration: vid.duration,
                }
            });
        }
    }
  }

  console.log(`📚 ${allCourseDefinitions.length} Courses created.`);
  console.log("✅ Seed complete.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
