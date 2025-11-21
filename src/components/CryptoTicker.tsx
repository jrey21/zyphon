import { useEffect, useState } from 'react';
import './CryptoTicker.css';

interface CryptoData {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    image: string;
    sparkline_in_7d?: {
        price: number[];
    };
}

function CryptoTicker() {
    const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch(
                    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,binancecoin,solana,ripple,cardano,polkadot,dogecoin,avalanche-2,polygon&order=market_cap_desc&sparkline=true'
                );
                const data = await response.json();
                setCryptoData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching crypto data:', error);
                setLoading(false);
            }
        };

        // Fetch immediately
        fetchCryptoData();

        // Update every 30 seconds
        const interval = setInterval(fetchCryptoData, 30000);

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="crypto-ticker">
                <div className="ticker-content loading">
                    <span>Loading crypto prices...</span>
                </div>
            </div>
        );
    }

    // Duplicate the data for seamless scrolling
    const duplicatedData = [...cryptoData, ...cryptoData];

    return (
        <div className="crypto-ticker">
            <div className="ticker-content">
                {duplicatedData.map((crypto, index) => {
                    const isPositive = crypto.price_change_percentage_24h >= 0;
                    const sparklineData = crypto.sparkline_in_7d?.price || [];

                    return (
                        <div
                            key={`${crypto.id}-${index}`}
                            className={`ticker-item ${isPositive ? 'positive' : 'negative'}`}
                        >
                            <img src={crypto.image} alt={crypto.name} className="crypto-icon" />
                            <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
                            <span className="crypto-price">
                                ${crypto.current_price.toLocaleString('en-US', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                            {sparklineData.length > 0 && (
                                <svg className="crypto-sparkline" width="60" height="24" viewBox="0 0 60 24">
                                    <polyline
                                        fill="none"
                                        stroke={isPositive ? '#10b981' : '#ef4444'}
                                        strokeWidth="1.5"
                                        points={sparklineData
                                            .slice(-20)
                                            .map((price, i, arr) => {
                                                const min = Math.min(...arr);
                                                const max = Math.max(...arr);
                                                const x = (i / (arr.length - 1)) * 60;
                                                const y = 24 - ((price - min) / (max - min)) * 24;
                                                return `${x},${y}`;
                                            })
                                            .join(' ')}
                                    />
                                </svg>
                            )}
                            <span className="crypto-change">
                                {isPositive ? '▲' : '▼'} {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default CryptoTicker;
