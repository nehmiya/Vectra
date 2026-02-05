import React from "react";
import DataTable from "@/components/DataTable";

const dummyRows = Array.from({ length: 7 }).map((_, i) => ({
  item: { id: `skeleton-${i}` },
})) as any;

const skeletonColumns = [
  {
    header: "Name",
    cellClassName: "name-cell",
    cell: () => (
      <div className="name-link">
        <div className="name-image skeleton" />
        <div className="name-line skeleton" />
      </div>
    ),
  },
  {
    header: "24h Change",
    cellClassName: "change-cell",
    cell: () => <div className="change-line skeleton" />,
  },
  {
    header: "Price",
    cellClassName: "price-cell",
    cell: () => <div className="price-line skeleton" />,
  },
];

export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback">
      <div className="header">
        <div className="header-image skeleton" />
        <div className="info">
          <div className="header-line-lg skeleton" />
          <div className="header-line-sm skeleton" />
        </div>
      </div>

      <div className="chart">
        <div className="chart-skeleton skeleton" />
      </div>
    </div>
  );
}

export function TrendingCoinsFallback() {
  return (
    <div id="trending-coins-fallback">
      <h4>
        <div className="header-line-lg skeleton" />
      </h4>

      <div className="trending-coins-table">
        <DataTable
          data={dummyRows}
          columns={skeletonColumns}
          rowKey={(_, i) => `s-${i}`}
        />
      </div>
    </div>
  );
}

export default null as unknown as never;
