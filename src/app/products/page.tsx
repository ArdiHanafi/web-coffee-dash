"use client";

import useSWR from "swr";
import React from "react";
import { getListProducts } from "@/actions/product";

const ProductPage = () => {
  // * Hook
  const { data, isLoading } = useSWR(["getListProducts"], () =>
    getListProducts()
  );

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div>
      {data?.map((product, idx) => (
        <p key={idx}>{product.name}</p>
      ))}
    </div>
  );
};

export default ProductPage;
