# Online Courses Platform

A modern, full-stack online learning management system (LMS) built with Next.js 16, TypeScript, Prisma, and Stripe. This platform allows instructors to create and manage courses, multimedia lessons, and quizzes, while students can enroll, track progress, and obtain memberships.

## 🚀 Key Features

-   **User Roles & Authentication**: Secure authentication via NextAuth.js with support for Students and Instructors.
-   **Course Management**: Instructors can easily create, update, and organize courses with modules and lessons.
-   **Video Integration**: Seamless video lesson playback and tracking.
-   **Progress Tracking**: Real-time tracking of student progress through courses and individual lessons.
-   **Subscription & Payments**: Integrated Stripe checkout for Free and Pro membership plans.
-   **Interactive Dashboard**: Dedicated dashboards for both students (to view progress) and instructors (to manage content).
-   **Responsive Design**: Fully responsive UI built with Tailwind CSS.

## 🛠 Tech Stack

### Frontend
-   **Framework**: [Next.js 16](https://nextjs.org/) (App Directory)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Media**: `media-chrome`, `react-player`

### Backend & Database
-   **API**: Next.js Server Components & Server Actions
-   **Database**: PostgreSQL
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Auth**: [NextAuth.js](https://next-auth.js.org/)
-   **Payments**: [Stripe](https://stripe.com/)

### DevOps & Testing
-   **Containerization**: Docker & Docker Compose
-   **Unit Testing**: [Vitest](https://vitest.dev/)
-   **E2E Testing**: [Playwright](https://playwright.dev/)

## 📂 Project Structure

```bash
.
├── app
│   ├── (auth)          # Authentication routes (login, register)
│   ├── (dashboard)     # Protected dashboard routes (student & instructor)
│   ├── (public)        # Public facing pages (landing page, course details)
│   └── api             # API routes and webhooks
├── components          # Reusable UI components
├── lib                 # Utility functions and shared logic
├── prisma              # Database schema and migrations
├── actions             # Server actions for mutations
├── public              # Static assets
└── e2e_tests           # End-to-end tests
```

## 🔄 Workflow

```mermaid
graph TD
    User([User]) -->|Visit| Landing[Landing Page]
    Landing -->|Sign Up / Login| Auth{Authenticated?}
    Auth -- No --> Login[Login Page]
    Auth -- Yes --> Dashboard[Dashboard]
    
    subgraph Student Flow
        Dashboard --> Browse[Browse Courses]
        Browse -->|Select Course| CourseDetails[Course Details]
        CourseDetails -->|Free Course| Enroll[Enroll]
        CourseDetails -->|Pro Course| Subscription{Has Pro Membership?}
        Subscription -- No --> Checkout[Stripe Checkout]
        Checkout -->|Success| Enroll
        Subscription -- Yes --> Enroll
        Enroll --> Watch[Watch Lessons]
        Watch --> Progress[Track Progress]
    end

    subgraph Instructor Flow
        Dashboard --> Manage[Manage Courses]
        Manage --> Create[Create/Edit Course]
        Create --> AddContent[Add Modules & Lessons]
        AddContent --> Publish[Publish Course]
    end
```

## ⚙️ Environment Variables

Create a `.env` or `.env.local` file in the root directory with the following variables:

```bash
# Database Connect URL
DATABASE_URL="postgresql://user:password@localhost:5432/online_courses"

# Authentication (NextAuth)
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Application URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

*See `STRIPE_SETUP.md` for detailed Stripe configuration.*

## 🏁 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/online-courses.git
    cd online-courses
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    Ensure you have PostgreSQL running (or use Docker).
    ```bash
    npx prisma generate
    npx prisma db push
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐳 Docker Support

To run the application using Docker Compose:

```bash
# Start development environment
npm run docker:dev

# Start production build
npm run docker:start
```

## 🧪 Testing

-   **Unit Tests**: `npm run test`
-   **E2E Tests**: `npm run test:e2e`

## 🚀 Deployment

Ready to deploy to production? See the comprehensive deployment guides:

- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete step-by-step guide for deploying to Vercel with Neon Database
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Common commands, API routes, and troubleshooting tips

### Quick Deployment Overview

1. **Database**: Sign up for [Neon](https://neon.tech) (serverless PostgreSQL)
2. **Hosting**: Deploy to [Vercel](https://vercel.com) (optimized for Next.js)
3. **Payments**: Configure [Stripe](https://stripe.com) webhooks
4. **Seed**: Use production-safe seeding with secure credentials

```bash
# Helper script for production seeding
./scripts/seed-production.sh
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on:
- Creating Neon database account
- Configuring Vercel environment variables
- Running production migrations
- Secure database seeding
- Stripe webhook setup
- Production verification checklist

## 📄 License

This project is licensed under the MIT License.
