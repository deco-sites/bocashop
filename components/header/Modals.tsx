import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import { lazy, Suspense } from "preact/compat";
import { useUI } from "deco-sites/fashion/sdk/useUI.ts";

import type { Props as MenuProps } from "deco-sites/fashion/components/header/Menu.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import Loading from "deco-sites/fashion/components/ui/Loading.tsx";

const Menu = lazy(() =>
  import("deco-sites/fashion/components/header/Menu.tsx")
);
const Cart = lazy(() =>
  import("deco-sites/fashion/components/minicart/Cart.tsx")
);
const Searchbar = lazy(() =>
  import("deco-sites/fashion/components/search/Searchbar.tsx")
);

const AddToCartPopup = lazy(() =>
  import("deco-sites/bocashop/components/header/AddToCartPopup.tsx")
);

interface Props {
  menu: MenuProps;
  searchbar?: SearchbarProps;
}

function Modals({ menu, searchbar }: Props) {
  const {
    displayCart,
    displayMenu,
    displaySearchbar,
    displayAddToCartPopup,
    displayDesktopCart,
  } = useUI();

  return (
    <>
      <Modal
        title="Menu"
        mode="sidebar-left"
        loading="lazy"
        open={displayMenu.value}
        onClose={() => {
          displayMenu.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Menu {...menu} />
        </Suspense>
      </Modal>

      <Modal
        title="Buscar"
        mode="sidebar-right"
        loading="lazy"
        open={displaySearchbar.value &&
          window?.matchMedia("(max-width: 767px)")?.matches}
        onClose={() => {
          displaySearchbar.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Searchbar {...searchbar} />
        </Suspense>
      </Modal>

      <Modal
        mode="center"
        loading="lazy"
        open={displayAddToCartPopup.value.open}
        onClose={() => {
          displayAddToCartPopup.value = {
            ...displayAddToCartPopup.value,
            open: false,
          };
        }}
      >
        <Suspense fallback={<Loading />}>
          <AddToCartPopup />
        </Suspense>
      </Modal>

      <Modal
        mode="in-place"
        noCloseButton={true}
        loading="lazy"
        open={displayDesktopCart.value}
        onClose={() => {
          displayDesktopCart.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Cart />
        </Suspense>
      </Modal>

      <Modal
        mode="sidebar-right"
        loading="lazy"
        title="mi compra"
        open={displayCart.value}
        onClose={() => {
          displayCart.value = false;
        }}
      >
        <Suspense fallback={<Loading />}>
          <Cart />
        </Suspense>
      </Modal>
    </>
  );
}

export default Modals;
