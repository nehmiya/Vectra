import CandleStickChartClient from '@/components/CandleStickChartClient';
import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

const CoinsCandleStick = async({id}: {id: string}) => {
    let coin: CoinDetailsData | undefined;
    let coinOHLCData: OHLCData[] | undefined;

    try {
      coin = await fetcher<CoinDetailsData>(`/coins/${id}`, {
        dex_pair_format: "symbol",
      });

      coinOHLCData = await fetcher<OHLCData[]>(`/coins/${id}/ohlc`, {
        vs_currency: "usd",
        days: 1,
      });
    } catch (error) {
      console.error("Error fetching coin details:", error);
    }

  return (
    <div id="coin-overview">
      <CandleStickChartClient
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
      </CandleStickChartClient>
    </div>
  );
}

export default CoinsCandleStick
