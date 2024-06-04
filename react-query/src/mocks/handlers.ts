// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

import products from "./products.json";

import { API_ENDPOINTS } from "../constants/api";
import { CartItem } from "../types";

export const handlers = [
  http.get(API_ENDPOINTS.PRODUCTS, () => {
    return HttpResponse.json(products);
  }),

  http.post(
    `${API_ENDPOINTS.CART}`,
    async ({ request }: { request: { json: () => Promise<CartItem> } }) => {
      const newCartItem = await request.json();

      return HttpResponse.json(newCartItem, { status: 201 });
    }
  ),

  http.delete(`${API_ENDPOINTS.CART}/:id`, async ({ request }) => {
    const urlParts = request.url.split("/");
    const targetId = parseInt(urlParts[urlParts.length - 1], 10);

    return HttpResponse.json(
      {
        deletedId: targetId,
      },
      { status: 200 }
    );
  }),
];