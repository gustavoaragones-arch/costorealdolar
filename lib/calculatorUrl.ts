import type { ExchangeType, PurchaseType } from "@/types/calculator";

const PURCHASE_TYPES: PurchaseType[] = [
  "dollar",
  "subscription",
  "card",
  "import",
];

const EXCHANGE_TYPES: ExchangeType[] = [
  "official",
  "blue",
  "mep",
  "tarjeta",
];

export type CalculatorUrlParams = {
  amt?: string;
  pt?: string;
  et?: string;
};

function isPurchaseType(value: string | null): value is PurchaseType {
  return value != null && PURCHASE_TYPES.includes(value as PurchaseType);
}

function isExchangeType(value: string | null): value is ExchangeType {
  return value != null && EXCHANGE_TYPES.includes(value as ExchangeType);
}

export function toUrlSearchParams(params?: CalculatorUrlParams): URLSearchParams {
  const searchParams = new URLSearchParams();
  if (params?.amt) searchParams.set("amt", params.amt);
  if (params?.pt) searchParams.set("pt", params.pt);
  if (params?.et) searchParams.set("et", params.et);
  return searchParams;
}

export function parseCalculatorSearchParams(
  searchParams: URLSearchParams,
  defaults: {
    amount: string;
    purchaseType: PurchaseType;
    exchangeType: ExchangeType;
  },
) {
  const urlAmt = searchParams.get("amt");
  const urlPt = searchParams.get("pt");
  const urlEt = searchParams.get("et");

  return {
    amount:
      urlAmt != null && urlAmt.length > 0 ? urlAmt : defaults.amount,
    purchaseType: isPurchaseType(urlPt) ? urlPt : defaults.purchaseType,
    exchangeType: isExchangeType(urlEt) ? urlEt : defaults.exchangeType,
  };
}

export function parseCalculatorUrlParams(
  urlParams: CalculatorUrlParams | undefined,
  defaults: {
    amount: string;
    purchaseType: PurchaseType;
    exchangeType: ExchangeType;
  },
) {
  return parseCalculatorSearchParams(toUrlSearchParams(urlParams), defaults);
}

export function buildCalculatorQueryString(
  amountInput: string,
  purchaseType: PurchaseType,
  exchangeType: ExchangeType,
): string {
  const params = new URLSearchParams();
  if (amountInput.trim().length > 0) {
    params.set("amt", amountInput.trim());
  }
  params.set("pt", purchaseType);
  params.set("et", exchangeType);
  return params.toString();
}

export function syncCalculatorUrl(
  amountInput: string,
  purchaseType: PurchaseType,
  exchangeType: ExchangeType,
) {
  const query = buildCalculatorQueryString(
    amountInput,
    purchaseType,
    exchangeType,
  );
  const nextUrl = `${window.location.pathname}?${query}`;
  const currentUrl = `${window.location.pathname}${window.location.search}`;

  if (nextUrl !== currentUrl) {
    window.history.replaceState(null, "", nextUrl);
  }
}
