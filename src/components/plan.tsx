import Link from "next/link";
import React from "react";

export const Plan = ({ id, name }: { id: number; name: string }) => {
  return (
    <Link
      href={{
        pathname: `/createplan/${id}`,
      }}
      className="h-[200px] w-[200px] rounded-lg bg-white p-4 text-left shadow-lg"
    >
      <div className="text-xl font-semibold">{name}</div>
      <div className="mt-2 text-gray-600">
        Kliknij w plan, aby wyświetlić szczegóły
      </div>
    </Link>
  );
};
