/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";
import type { Product } from "deco-sites/std/commerce/types.ts";

const displayCart = signal(false);
const displayDesktopCart = signal(false);
const displayMenu = signal(false);
const displaySearchbar = signal(false);
const displayAddToCartPopup = signal<{ open: boolean; product?: Product }>({
  open: false,
});

const state = {
  displayCart,
  displayMenu,
  displaySearchbar,
  displayDesktopCart,
  displayAddToCartPopup,
};

export const useUI = () => state;
