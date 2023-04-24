import Icon, {
  AvailableIcons,
} from "deco-sites/fashion/components/ui/Icon.tsx";
import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import { useSignal } from "@preact/signals";
import Modal from "deco-sites/fashion/components/ui/Modal.tsx";

export interface Feature {
  /**
   * @description Image src
   */
  icon: AvailableIcons;
  /**
   * @description Title
   */
  title: string;
  /**
   * @description Description and Image alt text
   */
  description: string;
}

export interface Props {
  features: Feature[];
}

function FeatureItem({ icon: id = "Truck", title, description }: Feature) {
  const open = useSignal(false);

  return (
    <div
      onClick={() => {
        open.value = true;
      }}
      class="even:text-secondary odd:text-primary cursor-pointer"
    >
      <div class="flex items-center gap-4 py-6 sm:p-[32px] hover:translate-y-[-10px] transition-transform">
        <Icon
          id={id}
          width={40}
          height={40}
          strokeWidth={2}
        />
        <div class="flex flex-col gap-2">
          <Text variant="body-bold" class="text-[14px]">{title}</Text>
        </div>
      </div>
      <Modal
        mode="center"
        loading="lazy"
        open={open.value}
        onClose={() => {
          open.value = false;
        }}
      >
        <div class="flex flex-col pt-[20px] pl-[40px] pr-[40px] pb-[40px] gap-[30px]">
          <div class="flex flex-col justify-center items-center gap-[10px]">
            <Icon
              id={id}
              width={40}
              height={40}
              strokeWidth={2}
            />
            <Text variant="heading-3">{title}</Text>
          </div>
          <div class="flex flex-col gap-2">
            <Text variant="caption">
              {description}
            </Text>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function FeatureHighlights(
  { features }: Props,
) {
  return (
    <Container class="py-[30px]">
      <div class="border-primary">
        <div class="flex flex-col justify-evenly divide-y-2 divide-primary mx-6 sm:flex-row sm:divide-y-0 sm:divide-x sm:mx-0   ">
          {features.map((feature) => <FeatureItem {...feature} />)}
        </div>
      </div>
    </Container>
  );
}

export default FeatureHighlights;
