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
export default function skuAddToCart({ product, openCart = false }: {
  product: Product;
  openCart?: boolean;
}) {
  const possibilities = useVariantPossibilities(product);
  const { price, listPrice, seller } = useOffer(product.offers);

  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ??
      possibilities["Talle"] ?? {},
  );

  if (!seller) return null;

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([value, { url, available, id }]) => {
        const props = useAddToCart({
          skuId: id as string,
          sellerId: seller,
          discount: price && listPrice ? listPrice - price : 0,
          price: price ?? 0,
          productGroupId: product.isVariantOf?.productGroupID ?? "",
          name: product.name ?? "",
          product: product,
          openCart: openCart,
        });

        return (
          <li>
            <Avatar
              variant="abbreviation"
              content={value}
              {...props}
              disabled={!available}
            />
          </li>
        );
      })}
    </ul>
  );
}
