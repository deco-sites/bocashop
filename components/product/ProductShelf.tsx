import ProductCard from "deco-sites/fashion/components/product/ProductCard.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Icon from "deco-sites/fashion/components/ui/Icon.tsx";
import { useId } from "preact/hooks";
import type { LoaderReturnType } from "$live/types.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ViewSendEvent from "deco-sites/fashion/components/ViewSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { HTML } from "deco-sites/std/components/types.ts";

export interface Props {
  title: HTML;
  products: LoaderReturnType<Product[] | null>;
  itemsPerPage?: number;
}

function ProductShelf({
  title,
  products,
}: Props) {
  const id = useId();

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Container
      id={id}
      class="flex flex-col py-10 px-0 sm:px-5"
    >
      <div
        dangerouslySetInnerHTML={{ __html: title }}
        class="relative [&>h3]:text-[20px] font-bold text-primary leading-none pt-[20px] mb-[20px]  lg:[&>h3>strong]:text-[36px] [&>h3>strong]:block px-[15px]
          after:h-[40px] after:w-[35px] after:border-primary after:border-t after:border-l after:absolute after:top-0 after:left-0 after:hidden lg:after:block
          before:h-[1px] before:w-[45px] before:border-primary before:border-b-[6px] before:absolute before:bottom-0 before:left-[10px] before:hidden lg:before:block
          lg:bg-[url(/background-carousel.png)]
          bg-no-repeat
          bg-[98%_center]
        "
      >
      </div>

      <div class="relative">
        <Slider
          class="gap-6 scrollbar-none items-stretch"
          snap="snap-center sm:snap-start block first:ml-6 sm:first:ml-0 last:mr-6 sm:last:mr-0 items-stretch flex"
        >
          {products?.map((product) => (
            <div class="min-w-[270px] max-w-[270px] sm:min-w-[292px] sm:max-w-[292px] flex flex-col items-stretch">
              <ProductCard product={product} itemListName={title} />
            </div>
          ))}
        </Slider>

        <div class="hidden absolute sm:block z-10  top-1/2 translate-y-[-50] left-[-50px]">
          <div class="bg-base-100 rounded-full ">
            <Button variant="icon" data-slide="prev" aria-label="Previous item">
              <Icon size={20} id="ChevronLeft" strokeWidth={3} />
            </Button>
          </div>
        </div>
        <div class="hidden absolute sm:block z-10 top-1/2 translate-y-[-50] right-[-50px]">
          <div class="bg-base-100 rounded-full">
            <Button variant="icon" data-slide="next" aria-label="Next item">
              <Icon size={20} id="ChevronRight" strokeWidth={3} />
            </Button>
          </div>
        </div>
      </div>

      <SliderControllerJS rootId={id} />

      <ViewSendEvent
        event={{
          name: "view_item_list",
          params: {
            item_list_name: title,
            items: products.map((product) =>
              mapProductToAnalyticsItem({
                product,
                ...(useOffer(product.offers)),
              })
            ),
          },
        }}
      />
    </Container>
  );
}

export default ProductShelf;
