import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import Icon from "../ui/Icon.tsx";
import { headerHeight } from "./constants.ts";

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children } = item;

  return (
    <li class="group flex items-center justify-center relative min-w-[155px] mx-[15px]">
      <a
        href={href}
        class="px-4 py-3 flex text-primary-content items-center gap-[10px]"
      >
        <Text
          class="group-hover:underline uppercase"
          variant="menu"
          tone="primary-content"
        >
          {label}
        </Text>
        {children && children.length && (
          <Icon id="ChevronDown" width={14} height={14} strokeWidth={1} />
        )}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="absolute hidden translate-x-[-50%] hover:flex group-hover:flex bg-[#f2f2f2] z-50 items-start gap-6 border-t border-b-2 border-base-200 after:h-3 after:w-3 after:absolute after:rotate-45 after:transform after:bg-[#f2f2f2] after:top-[-5px] after:left-1/2 p-6"
            style={{ top: "50px", left: "50%" }}
          >
            <ul class="flex flex-col items-start justify-center">
              {children.map((node) => (
                <li class="">
                  <a class="hover:underline" href={node.href}>
                    <Text variant="menu">{node.label}</Text>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.href}>
                          <Text variant="caption">{leaf.label}</Text>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
