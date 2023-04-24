import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import {
  Slider,
  SliderDots,
} from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Picture, Source } from "deco-sites/std/components/Picture.tsx";
import { useId } from "preact/hooks";
import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

export interface Banner {
  /** @description desktop otimized image */
  desktop: LiveImage;
  /** @description mobile otimized image */
  mobile: LiveImage;
  /** @description Image's alt text */
  alt: string;
  action: {
    href: string;
    label: string;
  };
}

export interface Props {
  images?: Banner[];
  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function BannerItem({ image, lcp }: { image: Banner; lcp?: boolean }) {
  const {
    alt,
    mobile,
    desktop,
    action,
  } = image;

  return (
    <div class="relative min-h-[350px] max-w-[100vw] w-full overflow-y-hidden">
      <a href={action?.href ?? "#"} aria-label={action?.label}>
        <Picture class="w-full" preload={lcp}>
          <Source
            media="(max-width: 767px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={mobile}
            width={360}
            height={600}
          />
          <Source
            media="(min-width: 768px)"
            fetchPriority={lcp ? "high" : "auto"}
            src={desktop}
            width={2669}
            height={590}
          />
          <img
            class="object-cover w-full sm:h-full"
            loading={lcp ? "eager" : "lazy"}
            src={desktop}
            alt={alt}
          />
        </Picture>
      </a>
    </div>
  );
}

function ProgressiveDots({ images, interval = 0 }: Props) {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @property --dot-progress {
            syntax: '<percentage>';
            inherits: false;
            initial-value: 0%;
          }
          `,
        }}
      >
      </style>
      <SliderDots class="col-span-full gap-4 z-10 row-start-4">
        {images?.map((_) => (
          <div class="py-6">
            <div
              class="w-16 sm:w-20 h-0.5 rounded group-disabled:animate-progress bg-gradient-to-r from-base-100 from-[length:var(--dot-progress)] to-[rgba(255,255,255,0.4)] to-[length:var(--dot-progress)]"
              style={{ animationDuration: `${interval}s` }}
            />
          </div>
        ))}
      </SliderDots>
    </>
  );
}

function Dots({ images }: Props) {
  return (
    <>
      <SliderDots class="w-full gap-4 z-10 ">
        {images?.map((_) => (
          <div class="py-6">
            <div class="w-[7px] h-[7px] rounded-full bg-primary opacity-10 group-disabled:opacity-100 group-disabled:w-[10px] group-disabled:h-[10px]" />
          </div>
        ))}
      </SliderDots>
    </>
  );
}

function Controls() {
  return (
    <>
      <div class="absolute flex items-center justify-center z-10 top-1/2 translate-y-[-50%]">
        <Button
          variant="icon"
          data-slide="prev"
          aria-label="Previous item"
        >
          <Icon
            class="text-base-100"
            size={20}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Button>
      </div>
      <div class="absolute flex items-center justify-center z-10 top-1/2 right-0 translate-y-[-50%]">
        <Button
          variant="icon"
          data-slide="next"
          aria-label="Next item"
        >
          <Icon
            class="text-base-100"
            size={20}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Button>
      </div>
    </>
  );
}

function BannerCarousel({ images, preload, interval }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex flex-col bg-[#f3f3f3]"
    >
      <div class="relative">
        <Slider class="scrollbar-none gap-6" snap="min-w-full">
          {images?.map((image, index) => (
            <BannerItem image={image} lcp={index === 0 && preload} />
          ))}
        </Slider>
        <Controls />
      </div>

      <Dots images={images} />

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default BannerCarousel;
