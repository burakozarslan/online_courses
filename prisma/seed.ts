import { faker } from "@faker-js/faker";
import { MembershipPlan, PrismaClient, Difficulty } from "@/app/generated/prisma/client";
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

const CATEGORIES = [
  "Web Development",
  "Data Science",
  "Mobile Development",
  "DevOps",
  "Cybersecurity",
  "Artificial Intelligence",
  "Cloud Computing",
  "Game Development",
];

const COURSE_DATA = [
  {
    title: "The Complete React Developer Course",
    description: "Learn React from scratch with this comprehensive course. Master hooks, context, and Redux.",
    category: "Web Development",
    difficulty: Difficulty.INTERMEDIATE,
    modules: [
      {
        title: "Introduction to React",
        description: "Getting started with React, JSX, and components.",
        lessons: [
          { title: "What is React?", description: "Overview of React and its ecosystem." },
          { title: "Setting up the Environment", description: "Installing Node.js and creating a React app." },
          { title: "JSX Basics", description: "Understanding JSX syntax and rules." },
          { title: "Your First Component", description: "Creating a functional component." },
        ],
      },
      {
        title: "React Hooks",
        description: "Deep dive into useState, useEffect, and custom hooks.",
        lessons: [
          { title: "useState Hook", description: "Managing state in functional components." },
          { title: "useEffect Hook", description: "Handling side effects in React." },
          { title: "Custom Hooks", description: "Creating reusable logic with custom hooks." },
        ],
      },
      {
        title: "State Management",
        description: "Managing complex state with Redux and Context API.",
        lessons: [
            { title: "Context API", description: "Avoiding prop drilling." },
            { title: "Redux Toolkit", description: "Modern state management." },
            { title: "Async Thunks", description: "Handling async operations." },
        ]
      }
    ],
  },
  {
    title: "Python for Data Science and Machine Learning",
    description: "Master Python and its libraries (Pandas, NumPy, Matplotlib) for data analysis and ML.",
    category: "Data Science",
    difficulty: Difficulty.BEGINNER,
    modules: [
      {
        title: "Python Basics",
        description: "Introduction to Python syntax and data structures.",
        lessons: [
          { title: "Variables and Types", description: "Understanding basic data types in Python." },
          { title: "Lists and Dictionaries", description: "Working with collections." },
          { title: "Functions", description: "Writing reusable code." },
        ],
      },
      {
        title: "Data Analysis with Pandas",
        description: "Analyzing data using the Pandas library.",
        lessons: [
          { title: "DataFrames", description: "Creating and manipulating DataFrames." },
          { title: "Data Cleaning", description: "Handling missing data and duplicates." },
          { title: "Data Visualization", description: "Plotting data with Matplotlib." },
        ],
      },
      {
        title: "NumPy Essentials",
        description: "Numerical computing with Python.",
        lessons: [
            { title: "Arrays", description: "Working with N-dimensional arrays." },
            { title: "Broadcasting", description: "Vectorized operations." },
            { title: "Linear Algebra", description: "Matrix multiplication and more." },
        ]
      }
    ],
  },
  {
    title: "Flutter & Dart - The Complete Guide",
    description: "Build native iOS and Android apps with a single codebase using Flutter and Dart.",
    category: "Mobile Development",
    difficulty: Difficulty.INTERMEDIATE,
    modules: [
      {
        title: "Dart Fundamentals",
        description: "Learning the Dart programming language.",
        lessons: [
          { title: "Dart Syntax", description: "Basic syntax and control flow." },
          { title: "Object-Oriented Dart", description: "Classes and objects in Dart." },
          { title: "Async Programming", description: "Futures and Streams." },
        ],
      },
      {
        title: "Flutter Widgets",
        description: "Building UIs with Flutter widgets.",
        lessons: [
          { title: "Stateless vs Stateful", description: "Understanding widget state." },
          { title: "Layout Widgets", description: "Rows, Columns, and Containers." },
          { title: "Material Design", description: "Using pre-built components." },
        ],
      },
       {
        title: "Navigation",
        description: "Moving between screens.",
        lessons: [
            { title: "Stack Navigation", description: "Pushing and popping routes." },
            { title: "Named Routes", description: "Organizing navigation." },
            { title: "Passing Data", description: "Sending arguments to screens." },
        ]
      }
    ],
  },
  {
    title: "Docker and Kubernetes: The Complete Guide",
    description: "Build, test, and deploy Docker applications with Kubernetes.",
    category: "DevOps",
    difficulty: Difficulty.ADVANCED,
    modules: [
      {
        title: "Docker Basics",
        description: "Introduction to containerization with Docker.",
        lessons: [
          { title: "What is Docker?", description: "Understanding containers vs VMs." },
          { title: "Docker Commands", description: "Essential Docker CLI commands." },
          { title: "Dockerfiles", description: "Building custom images." },
        ],
      },
      {
        title: "Kubernetes Fundamentals",
        description: "Orchestrating containers with Kubernetes.",
        lessons: [
          { title: "Pods and Services", description: "Core Kubernetes concepts." },
          { title: "Deployments", description: "Managing application deployments." },
          { title: "Ingress", description: "Exposing services to the internet." },
        ],
      },
      {
        title: "CI/CD Pipelines",
        description: "Automating deployment.",
        lessons: [
            { title: "GitHub Actions", description: "Building pipelines." },
            { title: "Docker Hub", description: "Pushing images." },
            { title: "Automated Testing", description: "Running tests in containers." },
        ]
      }
    ],
  },
  {
    title: "Ethical Hacking for Beginners",
    description: "Learn the basics of ethical hacking and penetration testing.",
    category: "Cybersecurity",
    difficulty: Difficulty.BEGINNER,
    modules: [
      {
        title: "Introduction to Hacking",
        description: "Concepts and ethics of hacking.",
        lessons: [
          { title: "Setting up a Lab", description: "Creating a safe environment for testing." },
          { title: "Reconnaissance", description: "Gathering information about targets." },
          { title: "Scanning", description: "Identifying open ports and services." },
        ],
      },
      {
        title: "Web Application Hacking",
        description: "Exploiting web vulnerabilities.",
        lessons: [
          { title: "SQL Injection", description: "Understanding and preventing SQLi." },
          { title: "XSS", description: "Cross-Site Scripting attacks." },
          { title: "CSRF", description: "Cross-Site Request Forgery." },
        ]
      },
       {
        title: "Network Hacking",
        description: "Attacking network infrastructure.",
        lessons: [
            { title: "Sniffing", description: "Capturing traffic." },
            { title: "Man-in-the-Middle", description: "Intercepting communications." },
            { title: "WiFi Hacking", description: "Cracking WPA2 passwords." },
        ]
      }
    ],
  },
    {
    title: "Machine Learning A-Z",
    description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts.",
    category: "Artificial Intelligence",
    difficulty: Difficulty.ADVANCED,
    modules: [
      {
        title: "Data Preprocessing",
        description: "Preparing data for ML models.",
        lessons: [
          { title: "Importing Libraries", description: "Setup for ML projects." },
          { title: "Handling Missing Data", description: "Strategies for incomplete datasets." },
          { title: "Feature Scaling", description: "Normalizing data." },
        ],
      },
      {
        title: "Regression",
        description: "Predicting continuous values.",
        lessons: [
          { title: "Simple Linear Regression", description: "The basics of regression." },
          { title: "Multiple Linear Regression", description: "Handling multiple variables." },
          { title: "Polynomial Regression", description: "Non-linear relationships." },
        ],
      },
      {
        title: "Classification",
        description: "Predicting categories.",
        lessons: [
            { title: "Logistic Regression", description: "Binary classification." },
            { title: "K-Nearest Neighbors", description: "Distance-based classification." },
            { title: "SVM", description: "Support Vector Machines." },
        ]
      }
    ],
  },
  {
    title: "AWS Certified Solutions Architect",
    description: "Master Amazon Web Services (AWS) and pass the Solutions Architect exam.",
    category: "Cloud Computing",
    difficulty: Difficulty.ADVANCED,
    modules: [
      {
        title: "IAM and EC2",
        description: "Identity management and compute services.",
        lessons: [
          { title: "IAM Roles", description: "Managing permissions." },
          { title: "Launching an EC2 Instance", description: "Virtual servers in the cloud." },
          { title: "Security Groups", description: "Firewall rules." },
        ],
      },
      {
        title: "S3 and Storage",
        description: "Storing data in the cloud.",
        lessons: [
          { title: "S3 Buckets", description: "Creating and configuring buckets." },
          { title: "Versioning", description: "Protecting data." },
          { title: "Lifecycle Policies", description: "Automating data management." },
        ]
      },
      {
        title: "VPC and Networking",
        description: "Building secure networks.",
        lessons: [
            { title: "Subnets", description: "Segmenting networks." },
            { title: "Route Tables", description: "Directing traffic." },
            { title: "NAT Gateways", description: "Internet access for private instances." },
        ]
      }
    ],
  },
  {
    title: "Unity Game Development Academy",
    description: "Learn to build 2D and 3D games with Unity and C#.",
    category: "Game Development",
    difficulty: Difficulty.INTERMEDIATE,
    modules: [
      {
        title: "Unity Interface",
        description: "Navigating the Unity Editor.",
        lessons: [
          { title: "Scene View", description: "Manipulating objects in 3D space." },
          { title: "Game View", description: "Previewing your game." },
          { title: "Inspector", description: "Modifying component properties." },
        ],
      },
      {
        title: "C# Scripting",
        description: "Programming logic for games.",
        lessons: [
          { title: "Variables in C#", description: "Storing data." },
          { title: "Functions", description: "Reusable code blocks." },
          { title: "Monobehaviour", description: "Unity's base class." },
        ],
      },
      {
        title: "Physics and Collisions",
        description: "Adding realism.",
        lessons: [
            { title: "Rigidbodies", description: "Simulating gravity." },
            { title: "Colliders", description: "Detecting impacts." },
            { title: "Triggers", description: "Scripting events." },
        ]
      }
    ],
  },
    {
    title: "Advanced JavaScript Concepts",
    description: "Level up your JS skills: Closures, Prototypal Inheritance, Asynchronous JS, and more.",
    category: "Web Development",
    difficulty: Difficulty.ADVANCED,
    modules: [
      {
        title: "Foundations",
        description: "Reviewing core concepts.",
        lessons: [
          { title: "Execution Context", description: "How JS code is executed." },
          { title: "Call Stack", description: "Understanding the stack." },
          { title: "Memory Heap", description: "Where data is stored." },
        ],
      },
       {
        title: "Closures and Prototypal Inheritance",
        description: "Deep dive into objects.",
        lessons: [
          { title: "Closures", description: "Function scope." },
          { title: "This Keyword", description: "Understanding context." },
          { title: "Prototypal Chain", description: "Inheritance in JS." },
        ]
      },
      {
        title: "Asynchronous JavaScript",
        description: "Handling concurrency.",
        lessons: [
            { title: "Promises", description: "Handling future values." },
            { title: "Async/Await", description: "Syntactic sugar." },
            { title: "Event Loop", description: "How JS handles async tasks." },
        ]
      }
    ],
  },
   {
    title: "Go: The Complete Developer's Guide",
    description: "Master the Go programming language from Google.",
    category: "Web Development", // Or Backend
    difficulty: Difficulty.INTERMEDIATE,
    modules: [
      {
        title: "Go Basics",
        description: "Syntax and features of Go.",
        lessons: [
          { title: "Packages", description: "Organizing Go code." },
          { title: "Variables", description: "Declaring variables in Go." },
          { title: "Functions", description: "Returning multiple values." },
        ],
      },
      {
        title: "Structs and Interfaces",
        description: "Object-oriented patterns in Go.",
        lessons: [
          { title: "Defining Structs", description: "Custom data types." },
          { title: "Receiver Functions", description: "Methods on types." },
          { title: "Interfaces", description: "Defining behavior." },
        ]
      },
      {
        title: "Concurrency",
        description: "Go's killer feature.",
        lessons: [
            { title: "Goroutines", description: "Lightweight threads." },
            { title: "Channels", description: "Communicating between goroutines." },
            { title: "Select Statement", description: "Multiplexing channels." },
        ]
      }
    ],
  },
];


async function main() {
  console.log("🌱 Starting sensible database seed...");

  // 1. Clean up
  // Order matters for relational databases
  await prisma.lessonProgress.deleteMany({});
  await prisma.enrollment.deleteMany({});
  await prisma.lesson.deleteMany({});
  await prisma.module.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.instructor.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.category.deleteMany({});

  console.log("🧹 Database cleaned.");

  // 2. Create Categories
  const categoryMap = new Map<string, string>();
  for (const name of CATEGORIES) {
    const category = await prisma.category.create({
      data: { name },
    });
    categoryMap.set(name, category.id);
  }
  console.log(`📂 Created ${CATEGORIES.length} categories.`);

  // 3. Create Instructor
  const instructorUser = await prisma.user.create({
    data: {
      email: "instructor@example.com",
      name: "Alice Instructor",
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

  // 4. Create Student
  const studentUser = await prisma.user.create({
    data: {
      email: "student@example.com",
      name: "Bob Student",
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

  // 5. Generate Courses from predefined data
  const freeCourseIds: string[] = [];

  for (let i = 0; i < COURSE_DATA.length; i++) {
    const data = COURSE_DATA[i];
    const isFreeCourse = i < 3; // First 3 courses are free

    const categoryId = categoryMap.get(data.category);

    const course = await prisma.course.create({
      data: {
        instructorId: instructorUser.instructorProfile.id,
        title: isFreeCourse ? `[Free] ${data.title}` : `[Pro] ${data.title}`,
        slug: generateSlug(data.title),
        description: data.description,
        imageUrl: faker.image.urlLoremFlickr({ category: "technology" }),
        isPublished: true,
        difficulty: data.difficulty,
        categories: categoryId ? { connect: [{ id: categoryId }] } : undefined,
      },
    });

    if (isFreeCourse) freeCourseIds.push(course.id);

    // Create Modules and Lessons
    let moduleNo = 1;
    for (const modData of data.modules) {
      const modulee = await prisma.module.create({
        data: {
          courseId: course.id,
          title: `Module ${moduleNo}: ${modData.title}`,
          description: modData.description,
          no: moduleNo,
        },
      });

      for (const lessonData of modData.lessons) {
        await prisma.lesson.create({
          data: {
            moduleId: modulee.id,
            title: lessonData.title,
            description: lessonData.description,
            duration: faker.number.int({ min: 120, max: 2400 }),
            videoUrl: getRandomVideoUrl(),
            // Pro courses usually have the very first lesson free as a preview
            isFree: isFreeCourse ? true : moduleNo === 1 && data.modules.indexOf(modData) === 0 && modData.lessons.indexOf(lessonData) === 0, 
          },
        });
      }
      moduleNo++;
    }
  }

  console.log(`📚 ${COURSE_DATA.length} Courses created with sensible data.`);

  // 6. Enroll Student in Free Courses
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