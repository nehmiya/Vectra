'use server'

import qs from 'query-string'

const BASE_URL = process.env.COINGECKO_BASE_URL; 
const API_KEY = process.env.COINGECKO_API_KEY; 

if (!BASE_URL) throw new Error('Couldnot get base url.')
if (!API_KEY) throw new Error('Couldnot get api key.')


export async function fetcher<T>(
    endpoint: string,
    params?: QueryParams,
    revalidate = 60,

) : Promise<T> {
    const url = qs.stringifyUrl({
        url: `${BASE_URL}/${endpoint}`,
        query: params
    } , {skipEmptyString: true, skipNull: true})

    const response = await fetch(url, {
      headers: {
        "x-cg-demo-api-key": API_KEY,
        "Content-Type": "application/json",
      } as Record<string, string>,
      next: { revalidate },
    });

    if (!response.ok) {
        const errorBody : CoinGeckoErrorBody = await response.json().catch(() => ({}))
        
        throw new Error(`API Error: ${response.status} : ${errorBody.error || response.statusText} `)
    } else {
        return response.json()
    }
}

interface SearchCoin {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  data: {
    price_change_percentage_24h: number;
  };
}

export async function searchCoins(query: string): Promise<SearchCoin[]> {
  if (!query || query.trim().length === 0) {
    return [];
  }

  try {
    // 1. Search for the coin ID based on the query
    const searchUrl = `https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(
      query,
    )}`;

    const searchRes = await fetch(searchUrl);

    if (!searchRes.ok) {
      throw new Error("Failed to fetch search results");
    }

    const searchData = await searchRes.json();

    // Limit to top 10 results to avoid rate limits on the next call
    const coins = searchData.coins.slice(0, 10);

    if (coins.length === 0) return [];

    // 2. Extract IDs to fetch specific market data (needed for price_change_percentage)
    const coinIds = coins.map((c: any) => c.id).join(",");

    const marketUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

    const marketRes = await fetch(marketUrl);

    if (!marketRes.ok) {
      // If market fetch fails (e.g., rate limit), return basic search data with 0 change
      return coins.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        thumb: coin.thumb,
        data: {
          price_change_percentage_24h: 0,
        },
      }));
    }

    const marketData = await marketRes.json();

    // 3. Map the data to match the component's expected structure
    // We iterate over the initial search results to maintain the relevance order
    const mappedResults: SearchCoin[] = coins.map((coin: any) => {
      const marketInfo = marketData.find((m: any) => m.id === coin.id);

      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        thumb: coin.thumb,
        data: {
          // The component expects this specific nested path
          price_change_percentage_24h:
            marketInfo?.price_change_percentage_24h ?? 0,
        },
      };
    });

    return mappedResults;
  } catch (error) {
    console.error("Error searching coins:", error);
    return [];
  }
}

