import type { JSX } from "preact";

/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

interface Abbreviation {
  variant: "abbreviation";
  content: string;
}

interface Color {
  variant: "color";
  content: keyof typeof colors;
}

interface Idempotent {
  variant: "idempotent";
  content: string;
}

const colors = {
  "azul-clara": "#87CEFA",
  "azul-marinho": "#000080",
  "branca": "#FFFFFF",
  "cinza": "#808080",
  "cinza-escura": "#A9A9A9",
  "laranja": "#FFA500",
  "marrom": "#A52A2A",
  "preta": "#161616",
  "verde-clara": "#90EE90",
  "vermelha": "#FF0000",
};

type Props =
  & Omit<JSX.IntrinsicElements["button"], "content">
  & (Abbreviation | Color | Idempotent)
  & { loading?: boolean };

function Avatar(
  { variant, content, class: _class = "", loading, ...btnProps }: Props,
) {
  if (variant === "color") {
    return (
      <button
        {...btnProps}
        class={`rounded-full border border-base-200 w-8 h-8 hover:opacity-75 ${_class}`}
        style={{ backgroundColor: colors[content] ?? "#FFF" }}
      />
    );
  }

  if (variant === "abbreviation") {
    return (
      <button
        {...btnProps}
        disabled={loading || btnProps.disabled}
        class={`text-caption text-[12px] border border-base-200 bg-base-100 w-fit min-w-[2rem] px-[5px] h-8 flex justify-center items-center [&:not(:disabled)]:hover:bg-base-300 [&:not(:disabled)]:hover:text-base-100 [&:not(:disabled)]:hover:border-base-300 disabled:opacity-50 ${_class}`}
      >
        {/* {content.substring(0, 2)} */}
        {content}
      </button>
    );
  }

  return <button {...btnProps} class={_class}>{content}</button>;
}

export default Avatar;
