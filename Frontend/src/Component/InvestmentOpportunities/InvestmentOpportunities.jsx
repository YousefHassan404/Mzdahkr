import React from "react";
import SharesUnits from "../SharesUnits/SharesUnits";

export default function InvestmentOpportunities() {
  return (
    <section className="py-10 px-4 md:px-16 bg-white">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        📈 فرص استثمارية
      </h2>

      {/* عرض فقط 3 مشاريع */}
      <SharesUnits limit={3} />
    </section>
  );
}
