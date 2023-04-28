import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Options as UseAddToCartProps,
  useAddToCart,
} from "deco-sites/fashion/sdk/useAddToCart.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props extends UseAddToCartProps {
  /**
   * @description Product id
   */
  sellerId: string;
  product: Product;
  openCart?: boolean;
}

function AddToCartButton(
  {
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    product,
    openCart = false,
  }: Props,
) {
  const props = useAddToCart({
    skuId,
    sellerId,
    discount,
    price,
    productGroupId,
    name,
    product,
    openCart,
  });

  return (
    <Button
      data-deco="add-to-cart"
      {...props}
      class="w-full rounded-full text-white uppercase"
    >
      Comprar
    </Button>
  );
}

export default AddToCartButton;
