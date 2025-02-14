"use server";

import { verifUserAndCreate } from "@/Models/User/$verif_and_create";

export const verifUser = async (id: string, email: string) => {
  if (!id || !email) {
    console.error("Champ manquant");
  }
  const user = {
    id: id,
    email: email,
  };
  const verifUserAndAdd = await verifUserAndCreate(user);
  return verifUserAndAdd;
};
