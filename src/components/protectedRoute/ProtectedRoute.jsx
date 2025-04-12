"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // Redirect if not authenticated
    }
  }, [user, router]);

  if (!user) return null; // Prevent page rendering before redirect

  return children; // Render protected content if authenticated
}
