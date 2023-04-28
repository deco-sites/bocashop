import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

// Lazy load a <dialog> polyfill.
if (IS_BROWSER && typeof window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center" | "in-place";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
  noCloseButton?: boolean;
};

const dialogStyles = {
  "sidebar-right": "animate-slide-left",
  "sidebar-left": "animate-slide-right",
  center: "animate-slide-top",
  "in-place": "animate-slide-top",
};

const sectionStyles = {
  "sidebar-right": "justify-end",
  "sidebar-left": "justify-start",
  center: "justify-center items-center",
  "in-place": "max-w-[1336px] justify-end mx-auto",
};

const containerStyles = {
  "sidebar-right": "h-full w-full max-w-[75%] sm:max-w-lg",
  "sidebar-left": "h-full w-full  max-w-[75%] sm:max-w-lg",
  center: "",
  "in-place": "h-fit mt-[100px]",
};

const Modal = ({
  open,
  title,
  mode = "sidebar-right",
  onClose,
  children,
  loading,
  noCloseButton,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open === false) {
      document.getElementsByTagName("body").item(0)?.classList.remove(
        "no-scroll",
      );
      ref.current?.open === true && ref.current.close();
    } else if (open === true) {
      document.getElementsByTagName("body").item(0)?.classList.add(
        "no-scroll",
      );
      ref.current?.open === false && ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  return (
    <dialog
      {...props}
      ref={ref}
      class={`bg-transparent p-0 m-0 max-w-full w-full max-h-full h-full backdrop-opacity-80 ${
        dialogStyles[mode]
      } ${props.class ?? ""}`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "SECTION" && onClose?.()}
      // @ts-expect-error - This is a bug in types.
      onClose={onClose}
    >
      <section
        class={`w-full h-full flex bg-transparent ${sectionStyles[mode]}`}
      >
        <div
          class={`bg-base-100 flex flex-col max-h-full relative ${
            containerStyles[mode]
          }`}
        >
          {title
            ? (
              <header class="flex px-4 py-[18px] justify-center items-center border-b border-base-200 bg-primary">
                <h1>
                  <span class="text-secondary uppercase text-[16px] leading-none font-bold">
                    {title}
                  </span>
                </h1>
                {!noCloseButton && (
                  <Button
                    variant="icon"
                    onClick={onClose}
                    class={`absolute bg-white rounded-full ${
                      mode == "sidebar-left" ? "right-[-40px]" : "left-[-40px]"
                    } `}
                  >
                    <Icon id="XMark" width={20} height={20} strokeWidth={2} />
                  </Button>
                )}
              </header>
            )
            : !noCloseButton && (
              <Button
                variant="icon"
                onClick={onClose}
                class={`absolute bg-white top-0 right-0 rounded-full`}
              >
                <Icon id="XMark" width={20} height={20} strokeWidth={2} />
              </Button>
            )}
          <div class="overflow-y-auto flex-grow flex flex-col">
            {loading === "lazy" ? lazy.value && children : children}
          </div>
        </div>
      </section>
    </dialog>
  );
};

export default Modal;
