import { faker } from "@faker-js/faker";
import { MembershipPlan, PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

// A pool of real YouTube video IDs to make the data look authentic
const VIDEO_IDS = [
  "dQw4w9WgXcQ", // Rick Roll (Classic)
  "P6FORpg0KVo", // Tech talk
  "qz0aGYrrlhU", // Node.js tutorial
  "fBNz5xF-Kx4", // Next.js tutorial
  "pTFZFxd4hOI", // TypeScript tip
  "8aGhZQkoFbQ", // JS Event Loop
];

const getRandomVideoUrl = () => {
  const randomId = VIDEO_IDS[Math.floor(Math.random() * VIDEO_IDS.length)];
  return `https://www.youtube.com/watch?v=${randomId}`;
};

// Helper to turn "Introduction to React" into "introduction-to-react"
const generateSlug = (title: string) => {
  return (
    title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") + `-${faker.string.alphanumeric(4)}`
  ); // Append random string to ensure uniqueness
};

async function main() {
  console.log("🌱 Starting randomized database seed...");

  // 1. Clean up
  await prisma.lessonProgress.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.instructor.deleteMany({});
  await prisma.user.deleteMany({});

  console.log("🧹 Database cleaned.");

  // 2. Create Instructor
  const instructorUser = await prisma.user.create({
    data: {
      email: "instructor@example.com",
      name: faker.person.fullName(),
      password: "password123",
      instructorProfile: {
        create: {
          title: "Senior Systems Architect",
          role: "ADMIN",
        },
      },
    },
    include: { instructorProfile: true },
  });

  // 3. Create Student
  const studentUser = await prisma.user.create({
    data: {
      email: "student@example.com",
      name: faker.person.fullName(),
      password: "password123",
      student: {
        create: {
          title: "Junior Developer",
          membership: MembershipPlan.FREE,
        },
      },
    },
    include: { student: true },
  });

  if (!instructorUser.instructorProfile || !studentUser.student) {
    throw new Error("Failed to create users");
  }

  // 4. Generate 10 Courses
  const totalCourses = 10;
  const freeCoursesCount = 7;
  const freeCourseIds: string[] = [];

  for (let i = 0; i < totalCourses; i++) {
    const isFreeCourse = i < freeCoursesCount;

    // Generate a catchy tech course title
    const courseTitle = isFreeCourse
      ? `[Free] ${faker.company.catchPhrase()}`
      : `[Pro] ${faker.company.catchPhrase()}`;

    const course = await prisma.course.create({
      data: {
        instructorId: instructorUser.instructorProfile.id,
        title: courseTitle,
        slug: generateSlug(courseTitle),
        description: faker.lorem.paragraphs(2),
        // Random tech/coding image from Unsplash
        imageUrl: faker.image.urlLoremFlickr({ category: "technology" }),
        isPublished: true,
      },
    });

    if (isFreeCourse) freeCourseIds.push(course.id);

    // Random Modules (3-4)
    const numModules = faker.number.int({ min: 3, max: 4 });

    for (let m = 0; m < numModules; m++) {
      const modulee = await prisma.module.create({
        data: {
          courseId: course.id,
          title: `Module ${
            m + 1
          }: ${faker.hacker.verb()} ${faker.hacker.noun()}`,
          description: faker.lorem.sentence(),
          no: m + 1,
        },
      });

      // Random Lessons (3-4)
      const numLessons = faker.number.int({ min: 3, max: 4 });

      for (let l = 0; l < numLessons; l++) {
        await prisma.lesson.create({
          data: {
            moduleId: modulee.id,
            title: faker.lorem.sentence({ min: 3, max: 6 }), // Short title
            description: faker.lorem.paragraph(),
            duration: faker.number.int({ min: 120, max: 2400 }), // 2 mins to 40 mins
            videoUrl: getRandomVideoUrl(),

            // Pro courses usually have the very first lesson free as a preview
            isFree: isFreeCourse ? true : m === 0 && l === 0,
          },
        });
      }
    }
  }

  console.log(`📚 ${totalCourses} Courses created with random data.`);

  // 5. Enroll Student in Free Courses
  for (const courseId of freeCourseIds) {
    await prisma.enrollment.create({
      data: {
        studentId: studentUser.student.id,
        courseId: courseId,
      },
    });
  }

  console.log(`🎓 Student enrolled in ${freeCourseIds.length} free courses.`);
  console.log("✅ Seeding finished.");
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
