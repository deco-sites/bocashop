import Text from "deco-sites/fashion/components/ui/Text.tsx";

function Newsletter() {
  return (
    <div class="flex flex-col items-center gap-6  bg-[url('/background-newsletter.png')] py-[40px] bg-no-repeat bg-cover">
      <div class="flex flex-col gap-2 text-center">
        <Text variant="heading-3" class="text-white uppercase">
          Suscribite al newsletter
        </Text>
        <Text
          variant="caption"
          class="text-white uppercase text-[15px]"
        >
          Para recibir oferta y novedades en tu mail
        </Text>
      </div>
      <form class="flex flex-row items-center font-body text-body w-full sm:w-[400px] h-[45px] px-2 lg:px-0">
        <input
          class="py-2 px-3 flex-grow bg-white rounded rounded-e-[0px] text-primary-content h-full"
          placeholder="Ingresá tu email"
        />
        <button
          class="py-2 px-3 bg-secondary text-base-content rounded rounded-s-[0px] font-bold uppercase h-full"
          type="bgutton" // prevent form's default behavior
        >
          Ok
        </button>
      </form>
    </div>
  );
}

export default Newsletter;
