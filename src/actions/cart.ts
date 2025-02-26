'use server';

import { cartApiClient } from "@/lib/apis";

export async function getListCart() {
  const response = await cartApiClient.apiCartGet()

  if (response.data) {
    return response.data
  }
  return []
}