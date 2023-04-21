import Text from "deco-sites/fashion/components/ui/Text.tsx";
import SliderControllerJS from "deco-sites/fashion/islands/SliderJS.tsx";
import { Slider } from "deco-sites/fashion/components/ui/Slider.tsx";
import { useId } from "preact/hooks";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div id={id}>
      <Slider class="bg-[#003169] gap-6 scrollbar-none">
        {alerts.map((alert) => (
          <Text
            class="flex m-auto relative w-fit justify-center items-center h-[38px] font-bold 
            after:w-[15px] after:h-[15px] after:border-white after:border-b-[1px] after:border-r-[1px] after:absolute after:bottom-[6px] after:right-[-8px]
            before:w-[15px] before:h-[15px] before:border-white before:border-t-[1px] before:border-l-[1px] before:absolute before:top-[6px] before:left-[-8px]"
            variant="caption"
            tone="secondary"
          >
            {alert}
          </Text>
        ))}
      </Slider>

      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
