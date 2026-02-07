"use client";

import React from "react";
import DataTable from "@/components/DataTable";
import { formatCurrency, cn } from "@/lib/utils";

export interface CoinTicker {
  base: string;
  target: string;
  market: {
    name: string;
    identifier?: string;
  };
  last: number | null;
  volume: number | null;
  converted_last?: Record<string, number> | null;
  converted_volume?: Record<string, number> | null;
  bid_ask_spread_percentage?: number | null;
  trust_score?: "green" | "yellow" | "red" | string | null;
  last_traded_at?: string | null;
}

type Props = {
  tickers: CoinTicker[] | undefined | null;
};

const compactNumber = (value?: number | null) => {
  if (value === null || value === undefined || isNaN(value)) return "0";
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
};

const TrustBadge = ({ score }: { score?: string | null }) => {
  const s = (score || "unknown").toLowerCase();
  const map = {
    green: "bg-green-500/10 text-green-400",
    yellow: "bg-yellow-500/10 text-yellow-400",
    red: "bg-red-500/10 text-red-400",
    unknown: "bg-dark-400 text-purple-100/70",
  } as Record<string, string>;

  return (
    <span
      className={cn(
        "px-2 py-0.5 text-xs rounded-full font-medium",
        map[s] ?? map.unknown,
      )}
    >
      {s}
    </span>
  );
};

const MarketActivityTable: React.FC<Props> = ({ tickers }) => {
  const rows: CoinTicker[] = (tickers ?? [])
    .filter((t) => t && t.trust_score === "green")
    .sort((a, b) => {
      const ta = a.last_traded_at ? new Date(a.last_traded_at).getTime() : 0;
      const tb = b.last_traded_at ? new Date(b.last_traded_at).getTime() : 0;
      return tb - ta;
    })
    .slice(0, 8);

  const columns = [
    {
      header: "Exchange",
      headClassName: "",
      cellClassName: "",
      cell: (row: CoinTicker) => (
        <div className="font-semibold text-purple-100">
          {row.market?.name || "-"}
        </div>
      ),
    },
    {
      header: "Pair",
      headClassName: "",
      cellClassName: "",
      cell: (row: CoinTicker) => (
        <div className="text-purple-100/60">{`${row.base}/${row.target}`}</div>
      ),
    },
    {
      header: "Last Price",
      headClassName: "text-right",
      cellClassName: "text-right",
      cell: (row: CoinTicker) => <div>{formatCurrency(row.last ?? 0)}</div>,
    },
    {
      header: "24h Volume",
      headClassName: "text-right",
      cellClassName: "text-right",
      cell: (row: CoinTicker) => <div>{compactNumber(row.volume)}</div>,
    },
    {
      header: "Spread",
      headClassName: "text-right",
      cellClassName: "text-right",
      cell: (row: CoinTicker) =>
        row.bid_ask_spread_percentage == null ? null : (
          <div>{`${row.bid_ask_spread_percentage.toFixed(2)}%`}</div>
        ),
    },
    {
      header: "Trust",
      headClassName: "text-right",
      cellClassName: "text-right",
      cell: (row: CoinTicker) => <TrustBadge score={row.trust_score} />,
    },
  ];

  if (!rows.length) {
    return (
      <div className="text-purple-100/50">No market activity available.</div>
    );
  }

  return (
    <div className="trades">
      <h4 className="mb-3 text-lg font-semibold">Market Activity</h4>
      <DataTable
        columns={columns as any}
        data={rows}
        rowKey={(row) => `${row.market?.name}-${row.base}-${row.target}`}
        tableClassName="w-full"
        headerCellClassName=""
        bodyCellClassName=""
      />

      <p className="text-sm text-purple-100/60 mt-2">
        Market data aggregated from supported exchanges. Not live trades.
      </p>
    </div>
  );
};

export default MarketActivityTable;
