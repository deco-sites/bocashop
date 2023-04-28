import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Filters from "deco-sites/fashion/components/search/Filters.tsx";
import Sort from "deco-sites/fashion/components/search/Sort.tsx";
import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import Breadcrumb from "deco-sites/fashion/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "deco-sites/std/commerce/types.ts";

type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <div class="flex flex-col justify-between mb-4 p-4 pl-0 sm:mb-0 sm:gap-4 sm:flex-row items-start z-10 relative">
      <div class="hidden lg:block">
        <Filters filters={filters} />
      </div>
      <div class="flex flex-row items-center justify-between border-b border-base-200 sm:gap-4 sm:border-none">
        <Button
          class={displayFilter ? "" : "sm:hidden"}
          variant="ghost"
          onClick={() => {
            open.value = true;
          }}
        >
          ordenar / Filtrar
          <Icon id="ChevronDown" width={12} height={12} strokeWidth={1} />
        </Button>
        <div class="hidden lg:block">
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>

      <Modal
        loading="lazy"
        title="Filtrar"
        mode="sidebar-right"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <Sort sortOptions={sortOptions} />
        <Filters filters={filters} />
      </Modal>
    </div>
  );
}

export default SearchControls;
