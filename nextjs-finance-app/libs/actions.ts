"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type ActionState = {
  error?: boolean;
  message?: string;
};

type TransactionInput = z.infer<typeof transactionSchema>;

type TransactionRange = string;

// -----------------------------------------------------------------------------
// Transactions
// -----------------------------------------------------------------------------

export async function createTransaction(formData: TransactionInput): Promise<void> {
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("transactions").insert(validated.data);

  if (error) {
    throw new Error("Failed creating the transaction");
  }

  revalidatePath("/dashboard");
}

export async function updateTransaction(id: string, formData: TransactionInput): Promise<void> {
  const validated = transactionSchema.safeParse(formData);

  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const supabase = await createClient();

  const { error } = await supabase.from("transactions").update(validated.data).eq("id", id);

  if (error) {
    throw new Error("Failed updating the transaction");
  }

  revalidatePath("/dashboard");
}

export async function fetchTransactions(range: TransactionRange, offset = 0, limit = 10) {
  const supabase = await createClient();

  const { data, error } = await supabase.rpc("fetch_transactions", {
    limit_arg: limit,
    offset_arg: offset,
    range_arg: range,
  });

  if (error) {
    throw new Error("We can't fetch transactions");
  }

  return data;
}

export async function deleteTransaction(id: string): Promise<void> {
  const supabase = await createClient();

  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    throw new Error(`Could not delete the transaction ${id}`);
  }

  revalidatePath("/dashboard");
}

// -----------------------------------------------------------------------------
// Authentication
// -----------------------------------------------------------------------------

export async function login(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();

  const email = formData.get("email");

  if (typeof email !== "string" || !email) {
    return {
      error: true,
      message: "Email is required",
    };
  }

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  if (error) {
    return {
      error: true,
      message: "Error authenticating!",
    };
  }

  return {
    message: `Email sent to ${email}`,
  };
}

export async function signOut(): Promise<never> {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error("Failed to sign out");
  }

  redirect("/login");
}

// -----------------------------------------------------------------------------
// Avatar
// -----------------------------------------------------------------------------

export async function uploadAvatar(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return {
      error: true,
      message: "Please select an image",
    };
  }

  const fileExt = file.name.split(".").pop();

  if (!fileExt) {
    return {
      error: true,
      message: "Invalid file",
    };
  }

  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, file);

  if (uploadError) {
    return {
      error: true,
      message: "Error uploading avatar",
    };
  }

  // Get current user
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return {
      error: true,
      message: "Something went wrong, try again",
    };
  }

  // Remove old avatar
  const avatar = userData.user.user_metadata?.avatar;

  if (typeof avatar === "string" && avatar) {
    const { error: removeError } = await supabase.storage.from("avatars").remove([avatar]);

    if (removeError) {
      return {
        error: true,
        message: "Something went wrong, try again",
      };
    }
  }

  // Update user metadata
  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName,
    },
  });

  if (dataUpdateError) {
    return {
      error: true,
      message: "Error associating the avatar with the user",
    };
  }

  return {
    message: "Updated the user avatar",
  };
}

// -----------------------------------------------------------------------------
// Settings
// -----------------------------------------------------------------------------

export async function updateSettings(_prevState: ActionState, formData: FormData): Promise<ActionState> {
  const supabase = await createClient();

  const fullName = formData.get("fullName");
  const defaultView = formData.get("defaultView");

  if (typeof fullName !== "string" || typeof defaultView !== "string") {
    return {
      error: true,
      message: "Invalid settings",
    };
  }

  const { error } = await supabase.auth.updateUser({
    data: {
      fullName,
      defaultView,
    },
  });

  if (error) {
    return {
      error: true,
      message: "Failed updating settings",
    };
  }

  return {
    message: "Updated user settings",
  };
}
