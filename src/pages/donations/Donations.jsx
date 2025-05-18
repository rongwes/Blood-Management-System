import React from "react";
import DonationsGrid from "./DonationsGrid";
import DonationsTable from "./DonationsTable";

export default function Donations() {
  return (
    <div className="flex flex-col gap-4">
      <DonationsGrid />
      <DonationsTable />
    </div>
  );
}
