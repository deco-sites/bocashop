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
  const { url: currentUrl } = product;

  return (
    <ul class="flex flex-col gap-4">
      <li class="flex flex-col gap-2">
        <Text variant="caption" class="uppercase">Talle:</Text>
        <ul class="flex flex-row gap-2">
          {options.map(
            ([value, { url, available, id }]) => {
              return (
                <li>
                  <a href={url}>
                    <Avatar
                      // deno-lint-ignore no-explicit-any
                      content={value as any}
                      disabled={!available}
                      variant={"abbreviation"}
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
