"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/lib/supabaseClient";



// Validate input
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must include at least 1 uppercase letter")
  .regex(/[0-9]/, "Password must include at least 1 number")
  .regex(/[^A-Za-z0-9]/, "Password must include at least 1 special character");

const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
    // Simulate having the user's email (in real flows, you'd get it from session/query).
    email: z.string().email().default("user@example.com"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

// Display password "strength"
function strengthLabel(pw: string): "Weak" | "Medium" | "Strong" {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (pw.length >= 12) score++; // extra weight for length

  if (score <= 2) return "Weak";
  if (score === 3 || score === 4) return "Medium";
  return "Strong";
}

// Password reset
export default function ResetPasswordPage() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "user@example.com",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });
  

  const passwordValue = watch("password");
  const strength = useMemo(() => strengthLabel(passwordValue || ""), [passwordValue]);

  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => router.push("/auth/login"), 2000);
    return () => clearTimeout(t);
  }, [success, router]);

  async function onSubmit(values: FormValues) {
    setSubmitError(null);

    try {
      // 1) Simulate Supabase password reset 
      await new Promise((r) => setTimeout(r, 600));

      // 2) Call the Edge Function
        // await supabase.functions.invoke("log-password-reset", {
        //     body: {
        //         email: values.email,
        //         resetTime: new Date().toISOString(),
        //     },
        // });
        const { data, error } = await supabase.functions.invoke("log-password-reset", {
          body: {
            email: values.email,
            resetTime: new Date().toISOString(),
          },
        });

        if (error) throw error;

      // 3) Success + redirect
      setSuccess(true);
    } catch (e) {
      setSubmitError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border border-white/10 bg-black/20 p-6 shadow">
        <h1 className="text-2xl font-semibold">Reset Password</h1>
        <p className="mt-2 text-sm text-white/70">
          Enter a new password for your account.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* hidden email for the challenge requirement to pass it to the function */}
          <input type="hidden" {...register("email")} />

          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              New Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Enter new password"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
            )}

            {/* Bonus: strength indicator (optional, but easy win) */}
            <p className="mt-2 text-xs text-white/70">
              Strength: <span className="font-semibold">{strength}</span>
            </p>
          </div>

          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Re-enter new password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {submitError && <p className="text-sm text-red-400">{submitError}</p>}

          {success ? (
            <div className="rounded-md border border-green-500/30 bg-green-500/10 p-3 text-sm">
              Password reset successful. Redirecting to login…
            </div>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-white text-black font-semibold py-2 disabled:opacity-60"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
