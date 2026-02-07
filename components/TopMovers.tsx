"use client";

import React, { useMemo, useState } from "react";
import DataTable from "@/components/DataTable";
import Link from "next/link";
import Image from "next/image";
import { formatCurrency, cn } from "@/lib/utils";

export interface CoinMarket {
  id: string;
  symbol: string;
  name: string;
  image?: string | null;
  current_price?: number | null;
  price_change_percentage_24h?: number | null;
}

type Props = {
  markets: CoinMarket[] | undefined | null;
};

const TopMovers: React.FC<Props> = ({ markets }) => {
  const [tab, setTab] = useState<"gainers" | "losers">("gainers");

  const gainers = useMemo(() => {
    return (markets ?? [])
      .slice()
      .filter(
        (m) =>
          m.price_change_percentage_24h !== null &&
          m.price_change_percentage_24h !== undefined,
      )
      .sort(
        (a, b) =>
          (b.price_change_percentage_24h ?? 0) -
          (a.price_change_percentage_24h ?? 0),
      )
      .slice(0, 5);
  }, [markets]);

  const losers = useMemo(() => {
    return (markets ?? [])
      .slice()
      .filter(
        (m) =>
          m.price_change_percentage_24h !== null &&
          m.price_change_percentage_24h !== undefined,
      )
      .sort(
        (a, b) =>
          (a.price_change_percentage_24h ?? 0) -
          (b.price_change_percentage_24h ?? 0),
      )
      .slice(0, 5);
  }, [markets]);

  const rows = tab === "gainers" ? gainers : losers;

  const columns = [
    {
      header: "Coin",
      headClassName: "",
      cellClassName: "",
      cell: (row: CoinMarket) => (
        <Link href={`/coins/${row.id}`} className="flex items-center gap-3">
          <Image
            src={row.image || ""}
            alt={row.name}
            className="w-8 h-8 rounded-full object-cover"
            width={16} height={16}
          />
          <div className="flex flex-col">
            <span className="font-semibold text-purple-100">{row.name}</span>
            <span className="text-xs text-purple-100/60 uppercase">
              {row.symbol}
            </span>
          </div>
        </Link>
      ),
    },
    {
      header: "Price",
      headClassName: "text-right",
      cellClassName: "text-right",
      cell: (row: CoinMarket) => (
        <div>{formatCurrency(row.current_price ?? 0)}</div>
      ),
    },
    {
      header: "24h change",
      headClassName: "text-right",
      cellClassName: "text-right",
      cell: (row: CoinMarket) => {
        const val = row.price_change_percentage_24h ?? 0;
        const isGain = val >= 0;
        return (
          <div
            className={cn(
              "font-semibold",
              isGain ? "text-green-400" : "text-red-400",
            )}
          >
            {val.toFixed(2)}%
          </div>
        );
      },
    },
  ];

  if (!markets || !markets.length) {
    return <div className="text-purple-100/50">No market data available.</div>;
  }

  return (
    <div className="bg-dark-500 rounded-lg p-4">
      <div className="flex items-end justify-between mb-3">
        <div className="flex gap-2">
          <button
            onClick={() => setTab("gainers")}
            className={cn(
              "px-3 pb-2 text-sm font-medium transition-all",
              tab === "gainers"
                ? "text-purple-100 border-b-2 border-purple-600"
                : "text-purple-100/60",
            )}
          >
            Top Gainers
          </button>
          <button
            onClick={() => setTab("losers")}
            className={cn(
              "px-3 pb-2 text-sm font-medium transition-all",
              tab === "losers"
                ? "text-purple-100 border-b-2 border-purple-600"
                : "text-purple-100/60",
            )}
          >
            Top Losers
          </button>
        </div>
      </div>

      <div className="transition-all duration-200">
        <DataTable
          columns={columns as any}
          data={rows}
          rowKey={(row: CoinMarket) => row.id}
          tableClassName="w-full"
        />
      </div>
    </div>
  );
};

export default TopMovers;
