"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoreyItemProps {
  label: string;
  value: string;
  icon?: IconType;
}

const CategoreyItem = ({ label, value, icon: Icon }: CategoreyItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const curruntCategoreyId = searchParams.get("categoryId");
  const curruntTitle = searchParams.get("title");

  const isSelected = curruntCategoreyId == value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: { title: curruntTitle, categoryId: isSelected ? null : value },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "py-2 px-3 mx-auto text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelected && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
    >
      {Icon && <Icon size={20} />}
      <div className="truncate">{label}</div>
    </button>
  );
};

export default CategoreyItem;
