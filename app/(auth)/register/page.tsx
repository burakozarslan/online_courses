"use client";

import { registerUser } from "@/actions/register";
import { Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

export default function RegisterPage() {
  const [state, action, isPending] = useActionState(registerUser, null);
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (formData: FormData) => {
    setName(formData.get("name") as string);
    setEmail(formData.get("email") as string);
    setPassword(formData.get("password") as string);
    action(formData);
  };

  useEffect(() => {
    if (state?.success) {
      // Auto login after successful registration
      signIn("credentials", {
        email,
        password,
        redirect: false,
      }).then((callback) => {
        if (callback?.ok) {
          router.push("/overview");
        } else {
          // Fallback to login page if auto-login fails
          router.push("/login"); // Or handle error
        }
      });
    }
  }, [state?.success, email, password, router]);

  return (
    <>
      <div className="w-full max-w-md bg-neutral-0 border border-neutral-200 shadow-lg relative">
        {/* <!-- Top decorative bar --> */}
        <div className="h-1 w-full bg-brand-600"></div>

        <div className="p-8">
          {/* <!-- Header --> */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-brand-50 text-brand-700 mb-4 border border-brand-100">
              <Lock />
            </div>
            <h1 className="text-heading-2 text-neutral-900 mb-2">Sign Up</h1>
            <p className="text-body text-neutral-500">Create an account</p>
          </div>

          {/* <!-- Form --> */}
          <form action={handleSubmit} className="space-y-6">
            {/* <!-- Name Field --> */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-caption text-neutral-700 font-medium"
              >
                FULL NAME
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              {state?.error?.name && (
                <p className="text-caption text-red-600">
                  {state.error.name[0]}
                </p>
              )}
            </div>

            {/* <!-- Email Field --> */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-caption text-neutral-700 font-medium"
              >
                EMAIL_ADDRESS
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  placeholder="user@example.com"
                />
              </div>
              {state?.error?.email && (
                <p className="text-caption text-red-600">
                  {state.error.email[0]}
                </p>
              )}
            </div>

            {/* <!-- Password Field --> */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-caption text-neutral-700 font-medium"
                >
                  PASSWORD
                </label>
              </div>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="w-full bg-neutral-50 border border-neutral-300 px-4 py-2.5 text-body text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {state?.error?.password && (
                <p className="text-caption text-red-600">
                  {state.error.password[0]}
                </p>
              )}
            </div>

            {state?.message && !state.success && (
              <div className="p-3 bg-red-50 text-red-600 text-caption rounded-md border border-red-100">
                {state.message}
              </div>
            )}

            {/* <!-- Actions --> */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-brand-600 text-neutral-0 py-2.5 px-4 text-body font-medium hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? "CREATING ACCOUNT..." : "SIGN UP"}
              {!isPending && (
                <i
                  data-lucide="arrow-right"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                ></i>
              )}
            </button>
          </form>

          {/* <!-- Footer --> */}
          <div className="mt-8 pt-6 border-t border-neutral-100 text-center">
            <p className="text-caption text-neutral-500">
              Already have an account?
              <a
                href="/login"
                className="text-brand-600 font-medium hover:text-brand-700 hover:underline"
              >
                {" "}
                Login
              </a>
            </p>
          </div>
        </div>

        {/* <!-- Status Indicator (Design Element) --> */}
        <div className="bg-neutral-50 border-t border-neutral-200 px-4 py-2 flex justify-between items-center text-caption text-neutral-400">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-none"></span>
            SECURE_CONNECTION
          </span>
          {/* <span>v2.4.0</span> */}
        </div>
      </div>
    </>
  );
}
