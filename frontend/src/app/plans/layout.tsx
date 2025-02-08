import type React from "react";

import { PlansTopbar } from "./_components/plans-topbar";

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen min-h-screen flex-col items-center overflow-x-hidden">
      <PlansTopbar />

      {children}

      <div className="flex w-full flex-col items-center justify-center bg-mainbutton7 p-2 py-6 dark:bg-white/5">
        <p className="text-center text-white">
          Made with ❤️ by{" "}
          <a
            href="https://solvro.pwr.edu.pl/"
            className="font-bold text-mainbutton hover:underline"
          >
            SOLVRO
          </a>
        </p>
        <p className="text-xs text-muted-foreground">
          Źródłem danych o zajęciach jest USOS i ich prawnym właścicielem jest
          Politechnika Wrocławska
        </p>
      </div>
    </div>
  );
}
