import Text from "deco-sites/fashion/components/ui/Text.tsx";
import Button from "deco-sites/fashion/components/ui/Button.tsx";
import Container from "deco-sites/fashion/components/ui/Container.tsx";
import { useId } from "preact/hooks";
import Icon from "./Icon.tsx";

const script = (id: string) => `
const callback = () => {
  const KEY = 'store-cookie-consent';
  const ACCEPTED = 'accepted';
  const HIDDEN = "translate-y-[200%]";
  
  const consent = localStorage.getItem(KEY);
  const elem = document.getElementById("${id}");
  
  if (consent !== ACCEPTED) {
    elem.querySelector('[data-button-cc-accept]').addEventListener('click', function () {
      localStorage.setItem(KEY, ACCEPTED);
      elem.classList.add(HIDDEN);
    });
    elem.querySelector('[data-button-cc-close]').addEventListener('click', function () {
      elem.classList.add(HIDDEN);
    });
    elem.classList.remove(HIDDEN);
  }
};

window.addEventListener('scroll', callback, { once: true });
`;

function CookieConsent() {
  const id = `cookie-consent-${useId()}`;

  return (
    <>
      <div
        id={id}
        class="transform-gpu translate-y-[200%] transition fixed bottom-0 sm:bottom-4 w-screen z-50"
      >
        <Container class="px-4 py-4 rounded border border-base-200 flex flex-col sm:flex-row gap-4 items-start sm:items-center shadow bg-base-100">
          <Text variant="heading-3" class="uppercase">
            ¡Recibí Promociones En Tu Email!
          </Text>
          <Text class="flex-grow uppercase hidden lg:block" variant="caption">
            Enterate De Lanzamientos Y Ofertas Antes Que Nadie
          </Text>
          <form class="flex flex-row items-center font-body text-body w-full sm:w-[400px] h-[45px] px-2 lg:px-0">
            <input
              class="py-2 px-3 flex-grow bg-white rounded rounded-e-[0px] text-primary-content h-full border-base-300 border"
              placeholder="Ingresá tu email"
            />
            <button
              data-button-cc-accept
              class="py-2 px-3 bg-secondary text-base-content rounded rounded-s-[0px] font-bold uppercase h-full"
              type="bgutton" // prevent form's default behavior
            >
              Ok
            </button>
          </form>

          <div class="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              data-button-cc-close
              variant="icon"
              class="absolute lg:static top-0 right-0"
            >
              <Icon id="XMark" width={20} height={20} strokeWidth={2} />
            </Button>
          </div>
        </Container>
      </div>
      <script type="module" dangerouslySetInnerHTML={{ __html: script(id) }} />
    </>
  );
}

export default CookieConsent;
