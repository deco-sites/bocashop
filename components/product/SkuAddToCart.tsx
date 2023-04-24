import { Product } from "deco-sites/std/commerce/types.ts";
import { useVariantPossibilities } from "../../sdk/useVariantPossiblities.ts";
import AddToCartButton from "deco-sites/bocashop/islands/AddToCartButton.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useAddToCart } from "../../sdk/useAddToCart.ts";
import Avatar from "../ui/Avatar.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
export default function skuAddToCart(product: Product) {
  const possibilities = useVariantPossibilities(product);
  const { price, listPrice, seller } = useOffer(product.offers);
  const {} = product;

  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ??
      possibilities["Talle"] ?? {},
  );

  if (!seller) return;

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([value, { url, available, id }]) => {
        const props = useAddToCart({
          skuId: id,
          sellerId: seller,
          discount: price && listPrice ? listPrice - price : 0,
          price: price ?? 0,
          productGroupId: product.isVariantOf?.productGroupID ?? "",
          name: product.name ?? "",
        });

        return (
          <Avatar
            variant="abbreviation"
            content={value}
            {...props}
            disabled={!available}
          />
        );
      })}
    </ul>
  );
}
