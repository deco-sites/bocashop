import Image from "deco-sites/std/components/Image.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Avatar from "deco-sites/fashion/components/ui/Avatar.tsx";
import { useOffer } from "deco-sites/fashion/sdk/useOffer.ts";
import { formatPrice } from "deco-sites/fashion/sdk/format.ts";
import { useVariantPossibilities } from "deco-sites/fashion/sdk/useVariantPossiblities.ts";
import type { Product } from "deco-sites/std/commerce/types.ts";
import ButtonSendEvent from "deco-sites/fashion/components/ButtonSendEvent.tsx";
import { mapProductToAnalyticsItem } from "deco-sites/std/commerce/utils/productToAnalyticsItem.ts";
import SkuAddToCart from "../../islands/SkuAddToCart.tsx";

/**
 * A simple, inplace sku selector to be displayed once the user hovers the product card
 * It takes the user to the pdp once the user clicks on a given sku. This is interesting to
 * remove JS from the frontend
 */
function Sizes(product: Product) {
  const possibilities = useVariantPossibilities(product);

  const options = Object.entries(
    possibilities["TAMANHO"] ?? possibilities["Tamanho"] ??
      possibilities["Talle"] ?? {},
  );

  return (
    <ul class="flex justify-center items-center gap-2">
      {options.map(([value, { url, available, id }]) => {
        // const url = urls.find((url) => url === product.url) || urls[0];

        return (
          <a href={url}>
            <Avatar
              variant="abbreviation"
              content={value}
              disabled={!available}
            />
          </a>
        );
      })}
    </ul>
  );
}

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;
}

function ProductCard({ product, preload, itemListName }: Props) {
  const {
    url,
    productID,
    image: images,
    offers,
    isVariantOf,
    additionalProperty,
  } = product;
  const [front, back] = images ?? [];
  const { listPrice, price, seller } = useOffer(offers);
  const { name } = isVariantOf ?? {};

  const genre = additionalProperty?.find((property) =>
    property.name == "Género"
  );

  console.log(additionalProperty);

  return (
    <div
      data-deco="view-product"
      id={`product-card-${productID}`}
      class="w-full group"
    >
      <a href={url} aria-label="product link">
        <div class="relative w-full overflow-hidden border-[1px] pb-[32px]">
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={274}
            height={274}
            class="rounded w-full group-hover:hidden"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          <Image
            src={back?.url ?? front.url!}
            alt={back?.alternateName ?? front.alternateName}
            width={274}
            height={274}
            class="rounded w-full hidden group-hover:block"
            sizes="(max-width: 640px) 50vw, 20vw"
          />
          {seller && (
            <div class="absolute bottom-[-40px] flex flex-col items-center gap-2 w-full p-2 bg-opacity-100 group-hover:bottom-0 transition-all bg-white border-default border-t-[1px]">
              <Text>AÑADIR TALLE</Text>
              {/* <Sizes {...product} /> */}
              <SkuAddToCart {...product} />
            </div>
          )}
        </div>

        <div class="flex flex-col gap-1 py-2">
          {genre && genre.value && (
            <div>
              <Text>{genre.value}</Text>
            </div>
          )}
          <Text
            class="overflow-hidden text-ellipsis line-clamp-2"
            variant="caption"
          >
            {name}
          </Text>
          <div class="flex items-center gap-2">
            <Text
              variant="heading-3"
              tone="primary"
              class="override:text-[20px] text-primary font-bold"
            >
              {formatPrice(price, offers!.priceCurrency!, "en-AR")}
            </Text>
          </div>
          {/* FIXME: Understand why fresh breaks rendering this component */}
          <ButtonSendEvent
            as="a"
            href={product.url}
            class="rounded-full bg-primary uppercase"
            event={{
              name: "select_item",
              params: {
                item_list_name: itemListName,
                items: [
                  mapProductToAnalyticsItem({
                    product,
                    price,
                    listPrice,
                  }),
                ],
              },
            }}
          >
            Comprar
          </ButtonSendEvent>
        </div>
      </a>
    </div>
  );
}

export default ProductCard;
