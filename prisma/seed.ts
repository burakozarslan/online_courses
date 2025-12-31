import {
  PrismaClient,
  MembershipPlan,
  Difficulty,
} from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

// Reuse the provided video data for realism, mixed with some others
const VIDEO_POOL = [
  { src: "https://youtu.be/98BzS5Oz5E4", duration: 425 },
  { src: "https://youtu.be/8DploTqLstE", duration: 931 },
  { src: "https://youtu.be/Ll6knx7sFis", duration: 818 },
  { src: "https://youtu.be/s0anSjEeua8", duration: 529 },
  { src: "https://youtu.be/pTFZFxd4hOI", duration: 600 }, // TypeScript
  { src: "https://youtu.be/P6FORpg0KVo", duration: 1200 }, // Tech Talk
];

const MERN_COURSE_MODULES = [
  {
    title: "Introduction",
    lessons: [
      {
        title: "What is the MERN Stack?",
        description:
          "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API.",
        src: "https://youtu.be/98BzS5Oz5E4",
        duration: 425,
      },
      {
        title: "Express App Setup",
        description: "Setting up the backend foundation.",
        src: "https://youtu.be/8DploTqLstE",
        duration: 931,
      },
    ],
  },
  {
    title: "MongoDB",
    lessons: [
      {
        title: "Express Router & API Routes",
        description: "Creating API endpoints.",
        src: "https://youtu.be/Ll6knx7sFis",
        duration: 818,
      },
      {
        title: "MongoDB Atlas & Mongoose",
        description: "Connecting to the database.",
        src: "https://youtu.be/s0anSjEeua8",
        duration: 529,
      },
    ],
  },
];

const CATEGORIES = [
  "Web Development",
  "DevOps",
  "Mobile Development",
  "Data Science",
  "Cloud Computing",
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

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Clean Database
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
  // Instructor
  const instructorUser = await prisma.user.create({
    data: {
      email: "instructor@example.com",
      name: "Alice Instructor",
      password: "password123", // In a real app, hash this
      instructorProfile: {
        create: {
          title: "Senior Lead Instructor",
        },
      },
    },
    include: { instructorProfile: true },
  });

  // Free Student
  const freeUser = await prisma.user.create({
    data: {
      email: "free@example.com",
      name: "Frank Free",
      password: "password123",
      studentProfile: {
        create: {
          membership: MembershipPlan.FREE,
        },
      },
    },
    include: { studentProfile: true },
  });

  // Pro Student
  // const proUser = await prisma.user.create({
  //   data: {
  //     email: "pro@example.com",
  //     name: "Pat Pro",
  //     password: "password123",
  //     studentProfile: {
  //       create: {
  //         membership: MembershipPlan.PRO,
  //       },
  //     },
  //   },
  //   include: { studentProfile: true },
  // });

  if (
    !instructorUser.instructorProfile ||
    !freeUser.studentProfile ||
    // !proUser.studentProfile
  ) {
    throw new Error("Failed to create users");
  }

  console.log("👥 Users created.");

  // 4. Create Courses
  // We need 5 courses: 3 Paid, 2 Free.
  // We'll define them simply.
  // Course 1: MERN (Paid) - reusing provided data
  // Course 2: Paid
  // Course 3: Paid
  // Course 4: Free
  // Course 5: Free

  const coursesCreated = [];

  for (let i = 0; i < 5; i++) {
    const isMern = i === 0;
    const isFree = i >= 3; // 0,1,2 = Paid; 3,4 = Free

    let title, desc, modulesData, categoryName;

    if (isMern) {
      title = "MERN Stack Tutorial";
      desc =
        "Master the art of building headless e-commerce. Learn to connect Next.js App Router with Shopifys Storefront API and handle webhooks securely with Prisma and NextAuth.";
      modulesData = MERN_COURSE_MODULES;
      categoryName = "Web Development";
    } else {
      title = `${faker.company.buzzAdjective()} ${faker.company.buzzNoun()} Masterclass`;
      desc = faker.lorem.paragraph();
      categoryName = CATEGORIES[i % CATEGORIES.length];

      // Generate modules for non-MERN courses
      modulesData = [];
      const numModules = faker.number.int({ min: 2, max: 4 });
      for (let m = 0; m < numModules; m++) {
        const lessons = [];
        const numLessons = faker.number.int({ min: 2, max: 4 });
        for (let l = 0; l < numLessons; l++) {
          const vid =
            VIDEO_POOL[
              faker.number.int({ min: 0, max: VIDEO_POOL.length - 1 })
            ];
          lessons.push({
            title: faker.company.catchPhrase(),
            description: faker.lorem.sentence(),
            src: vid.src,
            duration: vid.duration,
          });
        }
        modulesData.push({
          title: `Module ${m + 1}: ${faker.science.unit()}`,
          lessons,
        });
      }
    }

    // Create the Course
    const course = await prisma.course.create({
      data: {
        instructorId: instructorUser.instructorProfile.id,
        title: isFree ? `[Free] ${title}` : `[Pro] ${title}`,
        slug: generateSlug(title),
        description: desc,
        imageUrl: faker.image.urlLoremFlickr({ category: "tech" }),
        difficulty: isMern ? Difficulty.INTERMEDIATE : Difficulty.BEGINNER,
        isPublished: true,
        isFree: isFree,
        categories: { connect: { id: categoryMap.get(categoryName) } },
      },
    });

    // Create Modules & Lessons
    const createdLessons = [];
    let modNo = 1;
    for (const modData of modulesData) {
      const courseModule = await prisma.module.create({
        data: {
          courseId: course.id,
          title: modData.title,
          no: modNo++,
        },
      });

      for (const les of modData.lessons) {
        const lesson = await prisma.lesson.create({
          data: {
            moduleId: courseModule.id,
            title: les.title,
            description: les.description,
            videoUrl: les.src,
            duration: les.duration,
          },
        });
        createdLessons.push(lesson);
      }
    }

    coursesCreated.push({
      id: course.id,
      isFree,
      lessons: createdLessons,
    });
  }

  console.log(`📚 ${coursesCreated.length} Courses created.`);

  // 5. Enrollments & Progress
  // Helper to enroll
  const enroll = async (studentId: string, courseIdx: number) => {
    const courseData = coursesCreated[courseIdx];
    // Select 1 random lesson
    const randomLesson =
      courseData.lessons[Math.floor(Math.random() * courseData.lessons.length)];
    // Random time played < duration
    const timePlayed = Math.floor(Math.random() * (randomLesson.duration - 10));

    // Create Progress
    await prisma.lessonProgress.create({
      data: {
        studentId,
        lessonId: randomLesson.id,
        timePlayed,
      },
    });

    // Create Enrollment
    await prisma.enrollment.create({
      data: {
        studentId,
        courseId: courseData.id,
        currentLessonId: randomLesson.id,
      },
    });
  };

  // Enroll Free Student (Courses 3 and 4 -> indices 3 and 4)
  await enroll(freeUser.studentProfile.id, 3);
  await enroll(freeUser.studentProfile.id, 4);

  // // Enroll Pro Student (All 5 courses -> indices 0 to 4)
  // for (let i = 0; i < 5; i++) {
  //   await enroll(proUser.studentProfile.id, i);
  // }

  console.log("🎓 Enrollments and Progress created.");
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
