export const formatPrice = (
  price: number | undefined,
  currency: string,
  locale = "pt-BR",
) => {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  if (!price) {
    return null;
  }

  return formatter.format(price);
};
