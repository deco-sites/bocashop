import { useMemo } from "preact/hooks";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { ProductListingPage } from "deco-sites/std/commerce/types.ts";
import type { JSX } from "preact";

const SORT_QUERY_PARAM = "sort";

const useSort = () =>
  useMemo(() => {
    const urlSearchParams = new URLSearchParams(window.location?.search);
    return urlSearchParams.get(SORT_QUERY_PARAM) ?? "";
  }, []);

// TODO: Replace with "search utils"
const applySort = (e: JSX.TargetedEvent<HTMLSelectElement, Event>) => {
  const urlSearchParams = new URLSearchParams(window.location.search);

  console.log(e.currentTarget.value);

  urlSearchParams.set(SORT_QUERY_PARAM, e.currentTarget.value);
  window.location.search = urlSearchParams.toString();
};

export type Props = Pick<ProductListingPage, "sortOptions">;

function Sort({ sortOptions }: Props) {
  const sort = useSort();

  return (
    <select
      id="sort"
      name="sort"
      onInput={applySort}
      class="lg:w-min h-[36px] w-full border-base-300 lg:border-[1px] px-1 m-2 text-button font-button text-base-content cursor-pointer outline-none"
    >
      {sortOptions.map(({ value, label }) => (
        <option key={value} value={value} selected={value === sort}>
          <Text variant="caption">{label}</Text>
        </option>
      ))}
    </select>
  );
}

export default Sort;
