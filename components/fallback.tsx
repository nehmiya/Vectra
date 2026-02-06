import React from "react";
import DataTable from "@/components/DataTable";

const makeRows = (n = 7) =>
  Array.from({ length: n }).map((_, i) => ({
    id: `s-${i}`,
    name: `Category ${i + 1}`,
    top_3_coins: [`c-${i}-1`, `c-${i}-2`, `c-${i}-3`],
    market_cap_change_24h: 0,
    market_cap: 0,
    volume_24h: 0,
  }));

const trendingSkeletonCols = [
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

export function TrendingCoinsFallback() {
  const rows = makeRows(7);
  return (
    <div id="trending-coins-fallback">
      <h4>
        <div className="header-line-lg skeleton" />
      </h4>
      <div className="trending-coins-table">
        <DataTable
          data={rows as any}
          columns={trendingSkeletonCols as any}
          rowKey={(r: any, i: number) => r.id ?? i}
        />
      </div>
    </div>
  );
}

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

const categoriesColumns = [
  {
    header: "Category",
    cellClassName: "category-cell",
    cell: () => <div className="category-skeleton skeleton" />,
  },
  {
    header: "Top Gainers",
    cellClassName: "top-gainers-cell",
    cell: () => (
      <div className="top-gainers-cell">
        <div className="coin-skeleton skeleton" />
        <div className="coin-skeleton skeleton" />
        <div className="coin-skeleton skeleton" />
      </div>
    ),
  },
  {
    header: "24h Change",
    cellClassName: "change-cell",
    cell: () => (
      <div className="change-cell">
        <div className="change-icon skeleton" />
        <div className="value-skeleton-sm skeleton" />
      </div>
    ),
  },
  {
    header: "Market Cap",
    cellClassName: "market-cap-cell",
    cell: () => <div className="value-skeleton-lg skeleton" />,
  },
  {
    header: "24h Volume",
    cellClassName: "volume-cell",
    cell: () => <div className="value-skeleton-md skeleton" />,
  },
];

export function CategoriesFallback() {
  const rows = makeRows(5);
  return (
    <div id="categories-fallback">
      <h4>
        <div className="header-line-lg skeleton" />
      </h4>
      <div className="trending-coins-table">
        <DataTable
          data={rows as any}
          columns={categoriesColumns as any}
          rowKey={(r: any, i: number) => r.id ?? i}
        />
      </div>
    </div>
  );
}
