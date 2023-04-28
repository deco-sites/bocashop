import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import type {
  Filter,
  FilterToggle,
  ProductListingPage,
} from "deco-sites/std/commerce/types.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function FilterValues({ key, values }: FilterToggle) {
  const flexDirection = key === "tamanho" || key === "cor"
    ? "flex-row"
    : "flex-col";

  return (
    <ul
      class={`flex lg:absolute bg-white w-full border-base-300 lg:border-[1px] border-t-[0px] p-[15px] left-0 flex-wrap gap-2 ${flexDirection}`}
    >
      {values.map(({ label, value, url, selected, quantity }) => {
        if (key === "cor") {
          return (
            <a href={url}>
              <Avatar
                // deno-lint-ignore no-explicit-any
                content={value as any}
                disabled={selected}
                variant="color"
              />
            </a>
          );
        }

        if (key === "tamanho") {
          return (
            <a href={url}>
              <Avatar
                content={label}
                disabled={selected}
                variant="abbreviation"
              />
            </a>
          );
        }

        return (
          <a href={url} class="flex items-center gap-2 py-[5px]">
            <input type="checkbox" checked={selected} />
            <Text variant="caption">{label}</Text>
            <Text tone="base-300" variant="caption">
              ({quantity})
            </Text>
          </a>
        );
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  return (
    <ul class="flex lg:gap-6 lg:p-4 lg:pl-0 flex-col lg:flex-row">
      {filters
        .filter(isToggle)
        .map((filter) => (
          <li class="flex flex-col relative gap-4 border-base-300 lg:border-[1px] divide-y divide-base-300 min-w-[150px] py-[15px] pl-[20px] ">
            <details>
              <summary class="list-none w-full pr-[20px] flex items-center justify-between">
                <Text variant="body-bold" tone="primary">{filter.label}</Text>
                <Icon
                  id="ChevronDown"
                  width={12}
                  height={12}
                  strokeWidth={1}
                  class="hidden lg:block"
                />
                <Icon
                  id="Plus"
                  width={12}
                  height={12}
                  strokeWidth={1}
                  class="lg:hidden"
                />
              </summary>

              <FilterValues {...filter} />
            </details>
          </li>
        ))}
    </ul>
  );
}

export default Filters;
