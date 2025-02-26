'use server';

import { productApiClient } from "@/lib/apis";

export async function getListProducts() {
  const response = await productApiClient.apiProductGet()

  if (response.data) {
    return response.data
  }
  return []
}