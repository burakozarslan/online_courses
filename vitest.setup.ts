import { expect, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Extend expect with jest-dom matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock environment variables to satisfy Zod validation
process.env.DATABASE_URL = "postgresql://user:password@localhost:5432/mydb";
process.env.NEXTAUTH_SECRET = "supersecret";
process.env.STRIPE_SECRET_KEY = "sk_test_123";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_123";
process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";

// Mock console.error to suppress logs during tests if desired
console.error = vi.fn();
