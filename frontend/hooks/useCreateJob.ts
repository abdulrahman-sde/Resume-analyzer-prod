"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createJobAction } from "@/lib/actions";

export function useCreateJob() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValid = title.trim().length > 0 && description.trim().length > 0;

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    setError(null);

    const result = await createJobAction({
      title: title.trim(),
      description: description.trim(),
    });

    if (result?.error) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard/jobs");
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    isValid,
    isSubmitting,
    error,
    handleSubmit,
  };
}
