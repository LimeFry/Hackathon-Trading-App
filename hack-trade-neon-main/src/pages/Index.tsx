
import React, { useState } from 'react';
import { useStockSimulator } from '@/hooks/useStockSimulator';
import StockTicker from '@/components/StockTicker';
import AccountCard from '@/components/AccountCard';
import TradeCard from '@/components/TradeCard';
import PriceChart from '@/components/PriceChart';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

const Index = () => {
  const {
    stock,
    account,
    portfolioValue,
    profitLoss,
    profitLossPercentage,
    executeTrade,
    resetSimulator
  } = useStockSimulator();

  // Max shares that can be bought with current balance
  const maxSharesToBuy = account.balance / stock.price;

  // Handle buy trade
  const handleBuy = (quantity: number) => {
    executeTrade('buy', quantity);
  };

  // Handle sell trade
  const handleSell = (quantity: number) => {
    executeTrade('sell', quantity);
  };

  return (
    <div className="min-h-screen bg-cyber-bg text-foreground font-sans overflow-hidden relative">
      {/* Stock Ticker */}
      <StockTicker 
        symbol={stock.symbol}
        price={stock.price}
        previousPrice={stock.previousPrice}
      />
      
      <div className="container px-4 py-16 mx-auto">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 neon-text-blue animate-fade-in">
              HACK Trading Simulator
            </h1>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <AccountCard
              balance={account.balance}
              shares={account.shares}
              portfolioValue={portfolioValue}
              profitLoss={profitLoss}
              profitLossPercentage={profitLossPercentage}
            />
            
            <TradeCard
              stockPrice={stock.price}
              maxSharesToBuy={maxSharesToBuy}
              currentShares={account.shares}
              onBuy={handleBuy}
              onSell={handleSell}
            />
          </div>
          
          <div className="mb-6">
            <PriceChart 
              priceHistory={stock.priceHistory}
              symbol={stock.symbol}
            />
          </div>
          
          <div className="flex justify-center">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
              onClick={resetSimulator}
            >
              <RotateCcw size={16} />
              Reset Simulator
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background element */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(30,174,219,0.1),transparent_80%)]"></div>
    </div>
  );
};

export default Index;
