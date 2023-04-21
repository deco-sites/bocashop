import HeaderButton from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import Searchbar from "deco-sites/fashion/components/search/Searchbar.tsx";
import Image from "deco-sites/std/components/Image.tsx";

function Navbar({ items, searchbar, logo }: {
  items: INavItem[];
  searchbar: SearchbarProps;
  logo: string;
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class="md:hidden flex flex-row justify-between items-center border-b border-base-200 w-full px-2 gap-2"
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class="flex-grow inline-flex items-center"
          style={{ minHeight: navbarHeight }}
          aria-label="Store logo"
        >
          <Image
            src={logo}
            width={98}
            height={54}
            alt="Logo"
          />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div class="hidden  md:flex flex-col w-full">
        <div class="flex bg-primary  flex-row justify-between items-center w-full pl-2 pr-3">
          <div class="flex-none w-44">
            <a
              href="/"
              aria-label="Store logo"
              class="block px-4 py-3 w-[160px]"
            >
              <Image
                src={logo}
                width={98}
                height={54}
                alt="Logo"
              />
            </a>
          </div>
          <Searchbar {...searchbar} variant="mobile" />

          <div class="flex-none w-44 flex items-center justify-end gap-2">
            <HeaderButton variant="search" />

            <Button
              as="a"
              variant="icon"
              href="/login"
              aria-label="Log in"
              class="text-white"
            >
              <Icon id="User" width={20} height={20} strokeWidth={0.4} />
            </Button>
            <Button
              as="a"
              variant="icon"
              href="/wishlist"
              aria-label="Wishlist"
              class="text-white"
            >
              <Icon
                id="Heart"
                width={20}
                height={20}
                strokeWidth={2}
                fill="none"
              />
            </Button>
            <HeaderButton variant="cart" />
          </div>
        </div>
        <div class="">
          <div class="flex-auto flex justify-center bg-primary-focus">
            {items.map((item) => <NavItem item={item} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
