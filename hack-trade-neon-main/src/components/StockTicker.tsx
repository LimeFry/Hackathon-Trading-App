
import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StockTickerProps {
  symbol: string;
  price: number;
  previousPrice: number;
}

const StockTicker: React.FC<StockTickerProps> = ({
  symbol,
  price,
  previousPrice,
}) => {
  const [animating, setAnimating] = useState(false);
  const priceChange = price - previousPrice;
  const isPositive = priceChange >= 0;

  // Trigger animation when price changes
  useEffect(() => {
    if (previousPrice !== price) {
      setAnimating(true);
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [price, previousPrice]);

  return (
    <div className="fixed top-4 right-4 flex items-center bg-card/80 backdrop-blur-md p-2 rounded-lg border border-white/10 shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <span className="text-cyber-blue font-mono font-bold">{symbol}</span>
        <span 
          className={cn(
            "font-mono font-bold transition-all duration-300",
            isPositive ? "text-cyber-green" : "text-cyber-red",
            animating && "animate-number-change"
          )}
        >
          ${price.toFixed(2)}
        </span>
        <span 
          className={cn(
            "flex items-center text-xs font-mono",
            isPositive ? "text-cyber-green" : "text-cyber-red"
          )}
        >
          {isPositive ? (
            <TrendingUp size={14} className="mr-1" />
          ) : (
            <TrendingDown size={14} className="mr-1" />
          )}
          {Math.abs(priceChange).toFixed(2)} ({((Math.abs(priceChange) / previousPrice) * 100).toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};

export default StockTicker;
