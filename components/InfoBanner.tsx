import { getTarjetaRate, taxRules } from "@/constants/taxRules";

interface InfoBannerProps {
  message?: string;
}

export function InfoBanner({ message }: InfoBannerProps) {
  const tarjetaRate = getTarjetaRate();
  const defaultMessage = `Cotizaciones al ${taxRules.updatedAt}: oficial $${taxRules.officialRate}, MEP $${taxRules.mepRate}, tarjeta $${tarjetaRate.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (PAIS 0%).`;

  return (
    <div
      role="status"
      className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
    >
      {message ?? defaultMessage}
    </div>
  );
}
