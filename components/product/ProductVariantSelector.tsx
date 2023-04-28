import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";

interface Props {
  product: Product;
}

function VariantSelector({ product }: Props) {
  const possibilities = useVariantPossibilities(product);
  const options = Object.entries(
    possibilities["Talle"] ?? {},
  );
  // const { url: currentUrl } = product;

  return (
    <ul class="flex flex-col gap-4">
      <li class="flex flex-col gap-2">
        <div class="flex justify-between">
          <Text variant="body-bold" class="uppercase">Talle</Text>
          <div>
            Conocé tu talle
          </div>
        </div>
        <ul class="flex flex-row gap-2 border-t lg:border-y-0 py-[15px]">
          {options.map(
            ([value, { url, available, id }]) => {
              return (
                <li>
                  <a href={url as string}>
                    <Avatar
                      // deno-lint-ignore no-explicit-any
                      content={value as any}
                      disabled={!available}
                      variant={"abbreviation"}
                      class="w-[45px] h-[45px] rounded-[5px]"
                    />
                  </a>
                </li>
              );
            },
          )}
        </ul>
      </li>
    </ul>
  );
}

export default VariantSelector;
