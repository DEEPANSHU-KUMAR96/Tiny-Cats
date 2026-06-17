import React from "react";
import { Clock, CheckCircle2, XCircle } from "lucide-react";
import type { AdoptionStatus } from "../types/adoption.types";

interface AdoptionStatusBadgeProps {
  status: AdoptionStatus;
  className?: string;
}

export const AdoptionStatusBadge: React.FC<AdoptionStatusBadgeProps> = ({
  status,
  className = "",
}) => {
  const baseStyle =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 shadow-sm";

  const variants = {
    pending: "bg-amber-50 text-amber-700 border-amber-200/60 hover:bg-amber-100/80",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200/60 hover:bg-emerald-100/80",
    rejected: "bg-rose-50 text-rose-700 border-rose-200/60 hover:bg-rose-100/80",
  };

  const icons = {
    pending: <Clock className="w-3.5 h-3.5 text-amber-500 animate-pulse" />,
    approved: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
    rejected: <XCircle className="w-3.5 h-3.5 text-rose-600" />,
  };

  const labels = {
    pending: "Pending Approval",
    approved: "Approved",
    rejected: "Rejected",
  };

  return (
    <span className={`${baseStyle} ${variants[status]} ${className}`}>
      {icons[status]}
      <span>{labels[status]}</span>
    </span>
  );
};
export default AdoptionStatusBadge;
