"use client";
import React, { useEffect, useRef, useState } from "react";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import Image from "next/image";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export interface CoinsHeaderProps {
  coin: any; // full coin details object from CoinGecko
}

const StatItem: React.FC<{
  label: string;
  value: string;
  positive?: boolean;
}> = ({ label, value, positive }) => {
  const isPos = positive === undefined ? !value.startsWith("-") : positive;
  const cls = isPos ? "text-green-400" : "text-red-400";
  return (
    <div className="flex flex-col items-center gap-1 px-2">
      <span className="text-sm text-purple-100/60">{label}</span>
      <div className={`flex items-center gap-2 ${cls} font-medium`}>
        {isPos ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        <span className="tabular-nums font-mono">{value}</span>
      </div>
    </div>
  );
};

const CoinsHeader: React.FC<CoinsHeaderProps> = ({ coin }) => {
  const price = coin?.market_data?.current_price?.usd ?? null;
  const pct24 = coin?.market_data?.price_change_percentage_24h ?? null;
  const pct30 = coin?.market_data?.price_change_percentage_30d ?? null;
  const change24 = coin?.market_data?.price_change_24h ?? null;

  const isPct24Pos = (pct24 ?? 0) >= 0;

  const prevPriceRef = useRef<number | null>(price);
  const [flash, setFlash] = useState<"up" | "down" | null>(null);

  useEffect(() => {
    const prev = prevPriceRef.current;
    if (prev != null && price != null && prev !== price) {
      setFlash(price > prev ? "up" : "down");
      const t = setTimeout(() => setFlash(null), 700);
      prevPriceRef.current = price;
      return () => clearTimeout(t);
    }
    prevPriceRef.current = price;
  }, [price]);

  return (
    <div>
    <div id="coin-header" className="mb-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {coin?.image?.large ? (
            <Image
              src={coin.image.large}
              alt={coin.name}
              width={56}
              height={56}
              className="rounded-full"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-dark-400" />
          )}

          <div className="flex flex-col">
            <span className="text-2xl font-bold text-purple-100">
              {coin?.name}
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`text-3xl font-semibold tabular-nums font-mono transition-colors duration-300 ${
                  flash === "up"
                    ? "text-green-300"
                    : flash === "down"
                      ? "text-red-300"
                      : "text-purple-100"
                }`}
              >
                {formatCurrency(price ?? 0)}
              </span>
              <Badge
                className={`${isPct24Pos ? "bg-green-500 text-green-900" : "bg-red-500 text-red-900"}`}
              >
                {formatPercentage(pct24 ?? 0)}
              </Badge>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-2">
        <div className="flex items-center justify-start gap-0">
          <StatItem
            label="Today"
            value={formatPercentage(pct24 ?? 0)}
            positive={isPct24Pos}
          />
          <Separator orientation="vertical" className="mx-4 h-8 bg-purple-700/30" />
          <StatItem
            label="30 Days"
            value={formatPercentage(pct30 ?? 0)}
            positive={(pct30 ?? 0) >= 0}
          />
          <Separator orientation="vertical" className="mx-4 h-8 bg-purple-700/30" />
          <StatItem
            label="Price Change (24h)"
            value={formatCurrency(change24 ?? 0)}
            positive={(change24 ?? 0) >= 0}
          />
        </div>
      </div>
      </div>

      <div className="mt-4">
        <Separator />
      </div>
    </div>
  );
};

export default CoinsHeader;
