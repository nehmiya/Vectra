import { fetcher } from "@/lib/coingecko.actions";
import { capitalizeFirstLetter, formatCurrency } from "@/lib/utils";
import React from "react";
import CoinsCandleStick from "./CoinsCandleStick";

import MarketActivityTable from "@/components/MarketActivityTable";
import TopMovers from "@/components/TopMovers";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Converter from "@/components/Converter";
import CoinsHeader from "@/components/CoinsHeader";

const page = async ({ params }: NextPageProps) => {
  const { id } = await params;

  const coinsData = await fetcher<CoinDetailsData>(`/coins/${id}`);
  const markets = await fetcher(`/coins/markets`, {
    vs_currency: "usd",
    per_page: 50,
  });
  const coinDetails = [
    {
      label: "Market Cap",
      value: formatCurrency(coinsData.market_data.market_cap.usd),
    },
    {
      label: "Market Cap Rank",
      value: `# ${coinsData.market_cap_rank}`,
    },
    {
      label: "Total Volume",
      value: formatCurrency(coinsData.market_data.total_volume.usd),
    },
    {
      label: "Website",
      value: "-",
      link: coinsData.links.homepage[0],
      linkText: "Homepage",
    },
    {
      label: "Explorer",
      value: "-",
      link: coinsData.links.blockchain_site[0],
      linkText: "Explorer",
    },
    {
      label: "Community",
      value: "-",
      link: coinsData.links.subreddit_url,
      linkText: "Community",
    },
  ];

  const capitalized = capitalizeFirstLetter(id);

  return (
    <main id="coin-details-page">
      <section className="primary">
        {/* <h1 className="text-3xl cont-bold">
          <strong>{capitalized}</strong>
        </h1> */}

        <CoinsHeader coin={coinsData} />

        <div className="trend mb-4">
          <CoinsCandleStick id={id} />
        </div>
        <Separator className="divider" />
        <MarketActivityTable tickers={coinsData.tickers} />
        <Separator className="divider" />
      </section>

      <section className="secondary">
        <Converter
          symbol={coinsData.symbol}
          icon={coinsData.image.small}
          priceList={coinsData.market_data.current_price}
        />
        <Separator className="divider mt-3" />

        <div className="details mb-5">
          {" "}
          <h4>Coin Details</h4>
          <ul className="details-grid">
            {coinDetails.map(({ label, value, link, linkText }, index) => (
              <li key={index}>
                <p className="label">{label}</p>
                {link ? (
                  <div className="link">
                    <Link href={link} target="_blank">
                      {" "}
                      {linkText || label}{" "}
                    </Link>
                    <ArrowUpRight size={16} />
                  </div>
                ) : (
                  <p className="text-base font-medium">{value}</p>
                )}
              </li>
            ))}
          </ul>
          <Separator className="divider" />
        </div>

        <section className="details">
          <h4 className="mb-2">Top Gainers and Losers</h4>
          <TopMovers markets={markets} />
        </section>
      </section>
    </main>
  );
};

export default page;
