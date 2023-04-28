import HeaderButton from "deco-sites/fashion/islands/HeaderButton.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import type { Props as SearchbarProps } from "deco-sites/fashion/components/search/Searchbar.tsx";
import Searchbar from "deco-sites/fashion/components/search/Searchbar.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Container from "../ui/Container.tsx";

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
        class="lg:hidden flex flex-row justify-between items-center border-b border-base-200 w-full px-2 gap-2 bg-primary max-w-[100vw]"
      >
        <div class="flex-1">
          <HeaderButton variant="menu" />
        </div>
        <div class="flex-1 flex justify-center">
          <a
            href="/"
            class="inline-flex items-center justify-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              src={logo}
              width={75}
              height={40}
              alt="Logo"
            />
          </a>
        </div>

        <div class="flex gap-1 flex-1 justify-end">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}

      <div class="hidden  lg:flex flex-col w-full">
        <div class="bg-primary w-full">
          <div class="flex   flex-row justify-between items-center max-w-[1336px] mx-auto pl-2 pr-3">
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
              <Button
                as="a"
                variant="icon"
                href="/wishlist"
                aria-label="Wishlist"
                class="text-white"
              >
                <Icon
                  id="Heart"
                  width={26}
                  height={26}
                  strokeWidth={2}
                  fill="none"
                />
              </Button>

              <Button
                as="a"
                variant="icon"
                href="/login"
                aria-label="Log in"
                class="text-white"
              >
                <Icon id="User" width={26} height={26} strokeWidth={0.4} />
              </Button>
              <HeaderButton variant="cartDesktop" />
            </div>
          </div>
        </div>
        <div class="">
          <div class="flex-auto flex justify-center bg-primary-focus h-[50px]">
            {items.map((item) => <NavItem item={item} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
