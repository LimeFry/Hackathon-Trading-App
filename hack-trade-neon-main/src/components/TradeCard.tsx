import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TradeCardProps {
  stockPrice: number;
  maxSharesToBuy: number;
  currentShares: number;
  onBuy: (quantity: number) => void;
  onSell: (quantity: number) => void;
}

const TradeCard: React.FC<TradeCardProps> = ({
  stockPrice,
  maxSharesToBuy,
  currentShares,
  onBuy,
  onSell,
}) => {
  const [quantity, setQuantity] = useState(1);
  const tradeAmount = stockPrice * quantity;
  
  // Input change handler
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setQuantity(Math.max(0, value));
  };

  // Quick quantity setter buttons
  const handleQuickSet = (value: number) => {
    setQuantity(value);
  };

  // Round the max shares to buy down to integer
  const maxSharesInt = Math.floor(maxSharesToBuy);

  return (
    <Card className="glass-card w-full animate-pulse-glow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          Trade HACK
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Quantity</p>
            <p className="text-sm font-mono">
              <span className="text-muted-foreground">Current Price: </span>
              <span className="text-cyber-blue font-bold">${stockPrice.toFixed(2)}</span>
            </p>
          </div>
          
          <Input
            type="number"
            min="0"
            step="any"
            value={quantity}
            onChange={handleQuantityChange}
            className="font-mono bg-secondary/50 border-secondary"
          />
          
          <div className="flex justify-between gap-2 pt-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickSet(1)}
              className="flex-1 text-xs h-7 bg-secondary/30"
            >
              1
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickSet(5)}
              className="flex-1 text-xs h-7 bg-secondary/30"
            >
              5
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickSet(10)}
              className="flex-1 text-xs h-7 bg-secondary/30"
            >
              10
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleQuickSet(maxSharesInt > 0 ? maxSharesInt : 1)}
              className="flex-1 text-xs h-7 bg-secondary/30"
            >
              Max
            </Button>
          </div>
          
          <div className="text-sm font-mono py-1 flex justify-between">
            <span className="text-muted-foreground">Total:</span>
            <span className="font-bold">${tradeAmount.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <Button 
            className="btn-neon-green flex items-center justify-center gap-2 py-6"
            onClick={() => onBuy(quantity)}
            disabled={quantity <= 0 || maxSharesToBuy < 1}
          >
            <ArrowUpCircle size={18} />
            <span>Buy</span>
          </Button>
          
          <Button 
            className="btn-neon-pink flex items-center justify-center gap-2 py-6" 
            onClick={() => onSell(quantity)}
            disabled={quantity <= 0 || currentShares < quantity}
          >
            <ArrowDownCircle size={18} />
            <span>Sell</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeCard;
