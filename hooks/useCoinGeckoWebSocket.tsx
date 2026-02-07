// import { useEffect, useRef, useState } from "react";
// const WS_BASE = `${process.env.NEXT_PUBLIC_COINGECKO_WEBSOCKET_URL}?x_cg_pro_ap_key=${process.env.NEXT_PUBLIC_COINGECKO_API_KEY}`;


// export const useCoinGeckoWebSocket = ({coinId, poolId, liveInterval}: UseCoinGeckoWebSocketProps): UseCoinGeckoWebSocketReturn=>{
//     const wsRef = useRef<WebSocket | null>(null);
//     const subscribed = useRef<Set<string>>(new Set());


//     const [price, setPrice] = useState<ExtendedPriceData| null>(null)
//     const [trades, setTrades] = useState<Trade[]>([])
//     const [ohlcv, setOhlcv] = useState<OHLCData | null>(null);

//     const [isWsReady, setIsWsReady] = useState(false);

//     useEffect(() => {
        
    
//       return () => {
        
//       }
//     }, [])
    
// }