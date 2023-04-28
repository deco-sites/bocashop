import type { Product } from "deco-sites/std/commerce/types.ts";
import Modal from "deco-sites/fashion/components/ui/Modal.tsx";
import Image from "deco-sites/std/components/Image.tsx";

import { useSignal } from "@preact/signals";

interface Props {
  product: Product;
}

function TalleTable({ product }: Props) {
  const open = useSignal(false);
  const { isVariantOf } = product;
  const { additionalProperty } = isVariantOf ?? {};
  const guia = additionalProperty?.find((prop) => prop.name == "guiadetalles");

  return (
    <div>
      <div
        onClick={() => {
          open.value = true;
        }}
      >
        Conocé tu talle
      </div>
      <Modal
        mode="center"
        loading="lazy"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        {guia?.value && (
          <Image
            src={`https://bocashop.vteximg.com.br/arquivos/guiadetalles-${guia?.value}.png`}
            alt="guiadetalles"
            width={700}
            height={700}
            loading="lazy"
          />
        )}
      </Modal>
    </div>
  );
}

export default TalleTable;
