import React from "react";
import DataTable from "@/components/DataTable";
import Image from "next/image";
import Link from "next/link";
import { cn, formatCurrency } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import { fetcher } from "@/lib/coingecko.actions";

const CoinOverview = async () => {
  const coin = await fetcher<CoinDetailsData>("/coins/bitcoin", {
    dex_pair_format: "symbol",
  });

  return (
    
      <div id="coin-overview">
        <div className="header pt-2">
          <Image src={coin.image.large} alt="BitCoin" width={56} height={56} />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1 className="">
              {formatCurrency(coin.market_data.current_price.usd)}
            </h1>
          </div>
        </div>
      </div>
  );
};

export default CoinOverview;
