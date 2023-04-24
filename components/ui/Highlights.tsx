import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";

export interface Highlight {
  href: string;
  label: string;
}

export interface Props {
  highlights?: Highlight[];
}

function Highlights({ highlights = [] }: Props) {
  return (
    <div class="bg-[#f3f3f3]">
      <Container class="py-10 ">
        <div class="flex justify-center  gap-6 sm:divide-y-0 sm:divide-x ">
          {highlights.map(({ href, label }) => (
            <a
              href={href}
              class="flex flex-col gap-4 items-center min-w-[190px] text-primary text-[13px] font-medium py-[20px] px-[15px] hover:opacity-50 transition-all"
            >
              {label}
            </a>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Highlights;
