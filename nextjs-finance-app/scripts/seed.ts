import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const categories = ["Housing", "Transport", "Health", "Food", "Education", "Other"] as const;

type TransactionType = "Income" | "Expense" | "Saving" | "Investment";

interface TransactionInsert {
  created_at: string;
  amount: number;
  type: TransactionType;
  description: string;
  category: string | null;
  user_id: string;
}

async function seedUsers() {
  for (let i = 0; i < 5; i++) {
    const { error } = await supabase.auth.admin.createUser({
      email: faker.internet.email(),
      password: "password",
      email_confirm: true,
    });

    if (error) {
      console.error("Error creating user:", error.message);
      continue;
    }

    console.log("User added");
  }
}

async function seed() {
  await seedUsers();

  const {
    data: { users },
    error: listUsersError,
  } = await supabase.auth.admin.listUsers();

  if (listUsersError) {
    console.error("Cannot list users:", listUsersError.message);
    return;
  }

  const userIds = users.map((user) => user.id);

  if (userIds.length === 0) {
    console.error("No users found");
    return;
  }

  const transactions: TransactionInsert[] = [];

  for (let i = 0; i < 100; i++) {
    const created_at = faker.date.past().toISOString();

    const user_id = faker.helpers.arrayElement(userIds);

    let type: TransactionType;
    let category: string | null = null;

    const typeBias = Math.random();

    if (typeBias < 0.8) {
      type = "Expense";
      category = faker.helpers.arrayElement(categories);
    } else if (typeBias < 0.9) {
      type = "Income";
    } else {
      type = faker.helpers.arrayElement(["Saving", "Investment"]);
    }

    let amount = 0;

    switch (type) {
      case "Income":
        amount = faker.number.int({
          min: 2000,
          max: 9000,
        });
        break;

      case "Expense":
        amount = faker.number.int({
          min: 10,
          max: 1000,
        });
        break;

      case "Investment":
      case "Saving":
        amount = faker.number.int({
          min: 3000,
          max: 10000,
        });
        break;
    }

    transactions.push({
      created_at,
      amount,
      type,
      description: faker.lorem.sentence(),
      category,
      user_id,
    });
  }

  const { error } = await supabase.from("transactions").insert(transactions);

  if (error) {
    console.error("Error inserting data:", error.message);
  } else {
    console.log(`${transactions.length} transactions stored`);
  }
}

seed().catch(console.error);
