# Online Courses Platform (LMS) - Pro Portfolio Showcase

A state-of-the-art, full-stack Learning Management System (LMS) built for the modern web. This project showcases senior-level proficiency in Next.js 16, complex database modeling, resilient payment processing, and high-quality UI/UX design.

## 🌟 Elite Features & Functionality

### 1. Robust Learning Experience
-   **Intelligent Progress Tracking**: Seamlessly tracks lesson completion and video progress. Students can leave a lesson and return exactly where they left off.
-   **Dynamic Course Discovery**: Advanced search functionality with category filtering, difficulty indicators, and pagination.
-   **Interactive Video Player**: Custom-built media player using `media-chrome` and `react-player` with throttled persistence logic.
-   **Responsive Dashboards**: Specialized views for students to track their learning journey and for instructors to manage high-quality educational content.

### 2. Enterprise-Grade Payment System
-   **Resilient Stripe Integration**: Uses Stripe Webhooks and a polling-based "Processing" strategy to ensure data consistency even if network interruptions occur during checkout.
-   **Tiered Membership**: Support for Free and Pro tiers with automated access control (RBAC) across the entire platform.
-   **Subscription Lifecycle**: Full management of subscription updates, renewals, and cancellations directly synchronized with the local database.

### 3. Technical Excellence
-   **Full-Stack Type Safety**: End-to-end types with TypeScript and Zod validation for all Server Actions and API routes.
-   **Modern Architecture**: Leverages Next.js 16 App Router, Server Components, and Server Actions for optimal performance and SEO.
-   **Comprehensive Testing Suite**: Unit and integration tests with Vitest + Playwright for industrial-grade reliability.

---

## 🔄 Application Workflow

```mermaid
graph TD
    User([User]) -->|Visit| Landing[Landing Page]
    Landing -->|Sign Up / Login| Auth{Authenticated?}
    Auth -- No --> Login[Login Page]
    Auth -- Yes --> Dashboard[Dashboard]

    subgraph "Purchase & Enrollment Flow"
        Dashboard --> Browse[Browse Courses]
        Browse -->|Select Course| Details[Course Details]
        Details -->|Free| Enroll[Auto Enroll]
        Details -->|Pro| CheckSub{Has Pro?}
        CheckSub -- No --> Stripe[Stripe Checkout]
        Stripe -->|Success Redirect| Polling[Payment Processing Page]
        Polling -->|Poll API| CheckDB{Webhook Done?}
        CheckDB -- No --> Polling
        CheckDB -- Yes --> Success[Success & Auto-Enroll]
        Success --> Learning
    end

    subgraph "Learning & Persistence Flow"
        Learning[Learning Page] --> Play[Play Video]
        Play -->|Local Progress| UI[Update Progress Bar]
        Play -->|Throttled 5s| DB[(Save to PostgreSQL)]
        DB -->|Resume| Play
    end

    subgraph "Instructor Flow"
        Dashboard --> Manage[Manage Content]
        Manage --> Create[Create Course/Module/Lesson]
        Create --> Publish[Publish to Catalog]
    end
```

---

## 🛠 Tech Stack & Strategies

### Core Technologies
-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: PostgreSQL via [Prisma ORM](https://www.prisma.io/)
-   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using `@theme` design tokens)
-   **Authentication**: [NextAuth.js](https://next-auth.js.org/) (Custom RBAC)
-   **Payments**: [Stripe API](https://stripe.com/) (Checkout & Webhooks)

### Client-Side Tools
-   **Video**: `media-chrome`, `react-player`
-   **Icons**: `lucide-react`
-   **State Management**: React Context (Course Provider) + Server Actions
-   **Validation**: `zod`

### Strategies & Best Practices
-   **Path Aliases**: Clean imports using `@/` for better maintainability.
-   **Throttled Updates**: Persistence of video progress is throttled (every 5 seconds) to minimize database load while maintaining high UX.
-   **Polling Strategy**: Implementation of a `PaymentBeingProcessed` page that polls the backend to verify webhook completion before allowing user access.
-   **Dockerization**: Multi-stage Docker builds for both development and production environments.

---

## 🏗 Deep Dive: Technical Implementation

### 💳 Resilient Payment Flow
Handling Stripe payments in a modern web app requires more than just a redirect. This project implements a **High-Availability Checkout Strategy**:

1.  **Checkout Initiation**: User is redirected to Stripe Checkout with metadata (studentId, courseSlug).
2.  **Webhook Processing**: Stripe sends a `checkout.session.completed` event to our API. Our server updates the Student record and **auto-enrolls** the student in the target course.
3.  **Client-Side Polling (`payment-being-processed.tsx`)**: 
    -   While the webhook processes in the background, the user is redirected to a custom processing page.
    -   This page polls `/api/check-subscription` and `/api/enrollment` every 2 seconds.
    -   Once the database reflects the changes from the webhook, the UI transitions to a "Success" state and redirects the user to the course.
    -   **Resiliency**: Includes a 60-second timeout and manual dashboard redirect options if the process takes longer than expected.

### 🎥 Progress Tracking & Persistence
The LMS features a sophisticated persistence layer for student learning:

-   **Client-Side**: The `VideoPlayer` component listens to `onProgress` events. It updates the global `CourseProvider` context immediately to reflect progress in the sidebar and UI.
-   **Server-Side**: To avoid overwhelming the database with every second of video playback, the `updateLessonProgress` Server Action is **throttled**. It only commits to PostgreSQL when:
    1.  The user has watched 5 new seconds of content.
    2.  The user manually seeks to a different part of the video.
-   **Resume Logic**: When a student opens a lesson, the system fetches their `LessonProgress` and automatically seeks the video to their last saved timestamp.

---

## 📂 Project Structure

The project follows a modular and intuitive structure designed for scalability and maintainability:

```text
.
├── actions/                # Server Actions (Business logic & Database mutations)
│   ├── checkEnrollment.ts  # Logic to verify student course access
│   ├── createEnrollment.ts # Enrollment creation logic
│   ├── getAllCategories.ts # Fetching course categories for filtering
│   ├── getAllCourses.ts    # Main course retrieval with search/pagination
│   ├── progress.ts         # Video progress & lesson completion tracking
│   ├── subscription.ts     # Stripe subscription state management
│   └── register.ts         # User registration & profile initialization
├── app/                    # Next.js App Router (Routing & Pages)
│   ├── (auth)/             # Authentication routes (Login, Register)
│   ├── (dashboard)/        # Protected student & billing routes
│   │   ├── billing/        # Subscription & payment management
│   │   ├── learning/       # Course learning environment
│   │   ├── overview/       # Student progress summary
│   │   └── settings/       # Account & profile management
│   ├── (public)/           # Unprotected routes (Landing, Course Catalog)
│   │   ├── courses/        # Catalog with search & filtering
│   │   └── pricing/        # Membership plan comparison
│   └── api/                # API Route Handlers
│       ├── auth/           # NextAuth configuration
│       ├── checkout/       # Stripe Checkout Session creation
│       └── webhooks/       # Stripe Webhook event handlers
├── components/             # Reusable UI Components
│   ├── layout/             # Shared structural components (Sidebar, Navbar)
│   ├── provider/           # React Context Providers (Course, Session)
│   └── ui/                 # Core UI building blocks (VideoPlayer, Cards)
├── lib/                    # Shared Utilities & Configurations
│   ├── auth.ts             # NextAuth strategies & callbacks
│   ├── prisma.ts           # Database client singleton
│   ├── stripe.ts           # Stripe client initialization
│   └── courseUtils.ts      # Formatting & course-specific helpers
├── prisma/                 # Database Layer
│   ├── schema.prisma       # Database model definitions
│   └── seed.ts             # Production & development seeding logic
└── e2e_tests/              # Playwright End-to-End test suites
```

---

## 🏁 Getting Started

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/yourusername/online-courses.git
    npm install
    ```
2.  **Database Setup**:
    ```bash
    npx prisma generate
    npx prisma db push
    ```
3.  **Environment Variables**:
    Configure `.env` with `DATABASE_URL`, `NEXTAUTH_SECRET`, and `STRIPE_SECRET_KEY`.
4.  **Run**:
    ```bash
    npm run dev
    ```

## 🧪 Quality Assurance

-   **Unit Tests**: `npm run test` (Vitest + React Testing Library)
-   **E2E Tests**: `npm run test:e2e` (Playwright)
-   **Linting**: `npm run lint` (ESLint 9)

## 🐳 Deployment

Optimized for **Vercel** + **Neon PostgreSQL**. See [DEPLOYMENT.md](DEPLOYMENT.md) for the full production checklist.

---
*Created with ❤️ as a professional portfolio showcase.*
