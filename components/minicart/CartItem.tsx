import Image from "deco-sites/std/components/Image.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import QuantitySelector from "deco-sites/fashion/components/ui/QuantitySelector.tsx";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { AnalyticsEvent } from "deco-sites/std/commerce/types.ts";

declare global {
  interface Window {
    DECO_SITES_STD: {
      sendAnalyticsEvent: (args: AnalyticsEvent) => void;
    };
  }
}

interface Props {
  index: number;
}

function CartItem({ index }: Props) {
  const { loading, cart, updateItems, mapItemsToAnalyticsItems } = useCart();
  const item = cart.value!.items[index];
  const locale = cart.value?.clientPreferencesData.locale;
  const currencyCode = cart.value?.storePreferencesData.currencyCode;
  const {
    imageUrl,
    skuName,
    sellingPrice,
    listPrice,
    name,
    quantity,
  } = item;

  const isGift = sellingPrice < 0.01;

  return (
    <div class="flex flex-row justify-between lg:items-center gap-4 lg:max-w-[334px] py-[15px]">
      <Image
        src={imageUrl}
        alt={skuName}
        width={80}
        height={80}
        class="object-cover object-center lg:border max-h-[80px]"
      />
      <div class="flex-grow flex flex-col">
        <Text variant="caption" class="mb-[1rem] uppercase lg:normal-case">
          {name}
        </Text>
        <div class="w-full flex justify-between">
          <div class="flex flex-col lg:flex-row lg:items-end justify-between flex-1 gap-2">
            <div class="max-w-min">
              <QuantitySelector
                disabled={loading.value || isGift}
                quantity={quantity}
                onChange={(quantity) => {
                  updateItems({ orderItems: [{ index, quantity }] });
                  const quantityDiff = quantity - item.quantity;

                  if (!cart.value) return;

                  window.DECO_SITES_STD.sendAnalyticsEvent({
                    name: quantityDiff < 0 ? "remove_from_cart" : "add_to_cart",
                    params: {
                      items: mapItemsToAnalyticsItems({
                        items: [{
                          ...item,
                          quantity: Math.abs(quantityDiff),
                        }],
                        marketingData: cart.value.marketingData,
                      }),
                    },
                  });
                }}
              />
            </div>
            <Text tone="primary" variant="caption">
              {isGift
                ? "Grátis"
                : formatPrice(sellingPrice / 100, currencyCode!, locale)}
            </Text>
          </div>
          <Button
            onClick={() => {
              updateItems({ orderItems: [{ index, quantity: 0 }] });
              if (!cart.value) return;
              window.DECO_SITES_STD.sendAnalyticsEvent({
                name: "remove_from_cart",
                params: {
                  items: mapItemsToAnalyticsItems({
                    items: [item],
                    marketingData: cart.value.marketingData,
                  }),
                },
              });
            }}
            disabled={loading.value || isGift}
            loading={loading.value}
            variant="icon"
            class="text-red-500 lg:hidden block"
          >
            <Icon id="Trash" width={20} height={20} />
          </Button>
        </div>
      </div>
      <Button
        onClick={() => {
          updateItems({ orderItems: [{ index, quantity: 0 }] });
          if (!cart.value) return;
          window.DECO_SITES_STD.sendAnalyticsEvent({
            name: "remove_from_cart",
            params: {
              items: mapItemsToAnalyticsItems({
                items: [item],
                marketingData: cart.value.marketingData,
              }),
            },
          });
        }}
        disabled={loading.value || isGift}
        loading={loading.value}
        variant="icon"
        class="text-red-500 hidden lg:block"
      >
        <Icon id="Trash" width={20} height={20} />
      </Button>
    </div>
  );
}

export default CartItem;
