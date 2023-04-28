import { useUI } from "../../sdk/useUI.ts";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Button from "../ui/Button.tsx";
import Icon from "../ui/Icon.tsx";

export default function AddToCartPopup() {
  const { displayAddToCartPopup } = useUI();
  const { name: skuName, image, isVariantOf } =
    displayAddToCartPopup.value.product ?? {};
  const [front] = image ?? [];
  const { name } = isVariantOf ?? {};

  return (
    <div class="flex flex-col items-center py-[40px] px-[30px] w-[750px]">
      <Text class="mb-[30px]" variant="body-bold">
        Agragaste un producto a tu carrito de compras
      </Text>
      <div class="max-w-[137px] ">
        <Image
          src={front.url!}
          alt={front.alternateName}
          width={137}
          height={137}
          class="rounded w-full group-hover:hidden"
          preload={false}
          loading={"lazy"}
          sizes="(max-width: 640px) 50vw, 20vw"
        />
      </div>
      <div>
        <Text>{name} - {skuName}</Text>
      </div>
      <div class="flex flex-col items-center">
        <Button class="bg-primary my-[26px] p-[7px] box-content">
          <Icon id="ShoppingCart" width={24} height={24} /> Iniciar Pago
        </Button>
        <button
          type="button"
          onClick={() => {
            displayAddToCartPopup.value = { open: false, product: undefined };
          }}
          class="underline"
        >
          seguir comprando
        </button>
      </div>
    </div>
  );
}
