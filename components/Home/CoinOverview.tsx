import React from "react";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { fetcher } from "@/lib/coingecko.actions";
import CandleStickChart from "../CandleStickChart";

const CoinOverview = async () => {
  let coin: CoinDetailsData | undefined;
  let coinOHLCData: OHLCData[] | undefined;

  try {
    coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
      dex_pair_format: "symbol",
    });

    coinOHLCData = await fetcher<OHLCData[]>("/coins/bitcoin/ohlc", {
      vs_currency: "usd",
      days: 1,

    });
  } catch (error) {
    console.error("Error fetching coin details:", error);
  }

  return (
    <div id="coin-overview">
      <CandleStickChart
        data={coinOHLCData ?? []}
        coinId="bitcoin"
        initialPeriod="daily"
        height={360}
      >
        <div className="header pt-2">
          {coin ? (
            <>
              <Image
                src={coin.image.large}
                alt="BitCoin"
                width={56}
                height={56}
              />
              <div className="info">
                <p>
                  {coin.name} / {coin.symbol.toUpperCase()}
                </p>
                <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
              </div>
            </>
          ) : (
            <div className="info">
              <div className="header-line-lg skeleton" />
              <div className="header-line-sm skeleton" />
            </div>
          )}
        </div>
      </CandleStickChart>
    </div>
  );
};

export default CoinOverview;
