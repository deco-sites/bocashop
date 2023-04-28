import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

import { useUI } from "deco-sites/fashion/sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";
import Icon from "../ui/Icon.tsx";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

const CHECKOUT_URL = "https://bocashop.vtexcommercestable.com.br/checkout";

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading, mapItemsToAnalyticsItems, updateItems } = useCart();
  const isCartEmpty = cart.value?.items.length === 0;
  const total = cart.value?.totalizers.find((item) => item.id === "Items");
  const discounts = cart.value?.totalizers.find((item) =>
    item.id === "Discounts"
  );
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-start items-center h-full gap-6 lg:border-primary-focus lg:border-t-8">
        <div class="relative w-[70px] h-[70px] flex items-center justify-center">
          <Icon id="ShoppingCart" width={50} height={50} />
          <Icon
            id="XMark"
            width={70}
            height={70}
            class="absolute top-0 left-0"
            strokeWidth={2}
          />
        </div>
        <Text variant="caption">
          No hay productos en el carrito de compras
        </Text>
      </div>
    );
  }

  return (
    <>
      {/* Cart Items */}
      <ul
        role="list"
        class=" px-2 overflow-y-auto flex flex-col lg:px-[30px] lg:pb-[15px] max-h-[330px] divide-y lg:border-primary-focus lg:border-t-8"
      >
        {cart.value.items.map((_, index) => (
          <li>
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer class="border-t border-base-200 shadow-[0_-7px_10px_rgba(0,0,0,0.2)]  lg:shadow-none">
        {/* Subtotal */}
        {
          /* <div class="border-t border-base-200 py-4 flex flex-col gap-4">
          {discounts?.value && (
            <div class="flex justify-between items-center px-4">
              <Text variant="caption">Descontos</Text>
              <Text variant="caption">
                {formatPrice(discounts.value / 100, currencyCode!, locale)}
              </Text>
            </div>
          )}
        </div> */
        }
        {/* Total */}
        {
          /* {total?.value && (
          <div class="border-t border-base-200 pt-4 flex flex-col justify-end items-end gap-2 mx-4">
            <div class="flex justify-between items-center w-full">
              <Text variant="body">Total</Text>
              <Text variant="heading-3">
                {formatPrice(total.value / 100, currencyCode!, locale)}
              </Text>
            </div>
            <Text tone="base-300" variant="caption">
              Taxas e fretes serão calculados no checkout
            </Text>
          </div>
        )} */
        }
        <div class="p-4 gap-4 flex flex-col">
          <a
            class="inline-flex w-full lg:justify-center"
            target="_blank"
            href={`${CHECKOUT_URL}?orderFormId=${cart.value!.orderFormId}`}
          >
            <Button
              data-deco="buy-button"
              class="w-full uppercase lg:normal-case lg:max-w-[185px] rounded-none text-white font-normal"
              disabled={loading.value || cart.value.items.length === 0}
              onClick={() => {
                window.DECO_SITES_STD.sendAnalyticsEvent({
                  name: "begin_checkout",
                  params: {
                    currency: cart.value ? currencyCode! : "",
                    value: total?.value
                      ? (total?.value - (discounts?.value ?? 0)) / 100
                      : 0,
                    coupon: cart.value?.marketingData?.coupon ?? undefined,

                    items: cart.value
                      ? mapItemsToAnalyticsItems(cart.value)
                      : [],
                  },
                });
              }}
            >
              <Icon
                id="ShoppingCart"
                width={24}
                height={24}
                class="hidden lg:inline"
              />
              Iniciar Compra
            </Button>
          </a>
          <Button
            class="w-full uppercase lg:normal-case bg-transparent text-gray-500 rounded-none"
            disabled={cart.value.items.length === 0}
            onClick={() => {
              updateItems({ orderItems: [] });
              if (!cart.value) return;
              window.DECO_SITES_STD.sendAnalyticsEvent({
                name: "remove_from_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: cart.value.items,
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
          >
            <Icon id="Trash" width={20} height={20} />
            Vaciar Carrinho
          </Button>
        </div>
      </footer>
    </>
  );
}

export default Cart;
