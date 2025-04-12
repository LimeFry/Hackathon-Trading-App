
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

// Type definitions
type TradeType = 'buy' | 'sell';

interface TradeHistoryItem {
  id: string;
  type: TradeType;
  quantity: number;
  price: number;
  timestamp: Date;
  total: number;
}

interface StockData {
  symbol: string;
  price: number;
  previousPrice: number;
  priceHistory: number[];
}

interface SimulatorState {
  balance: number;
  shares: number;
  initialInvestment: number;
  tradeHistory: TradeHistoryItem[];
}

// Price fluctuation constants
const VOLATILITY = 0.01; // 1% volatility
const MAX_HISTORY = 20; // Max number of price points to keep
const INITIAL_PRICE = 100; // Starting price
const UPDATE_INTERVAL = 3000; // Update every 3 seconds

export function useStockSimulator(initialBalance = 10000) {
  // Stock data state
  const [stock, setStock] = useState<StockData>({
    symbol: 'HACK',
    price: INITIAL_PRICE,
    previousPrice: INITIAL_PRICE,
    priceHistory: Array(MAX_HISTORY).fill(INITIAL_PRICE),
  });

  // Account state
  const [account, setAccount] = useState<SimulatorState>({
    balance: initialBalance,
    shares: 0,
    initialInvestment: initialBalance,
    tradeHistory: [],
  });
  
  // Calculated values
  const portfolioValue = stock.price * account.shares;
  const totalValue = account.balance + portfolioValue;
  const profitLoss = totalValue - account.initialInvestment;
  const profitLossPercentage = (profitLoss / account.initialInvestment) * 100;

  // Generate a new random price
  const generateNewPrice = useCallback(() => {
    const change = (Math.random() - 0.5) * 2 * VOLATILITY;
    const newPrice = Math.max(1, stock.price * (1 + change));
    return parseFloat(newPrice.toFixed(2));
  }, [stock.price]);

  // Update the stock price
  useEffect(() => {
    const updatePrice = () => {
      const newPrice = generateNewPrice();
      
      setStock(prev => {
        // Create a new price history array with the new price added
        const newHistory = [...prev.priceHistory.slice(1), newPrice];
        
        return {
          ...prev,
          previousPrice: prev.price,
          price: newPrice,
          priceHistory: newHistory,
        };
      });
    };

    // Set up interval for price updates
    const interval = setInterval(updatePrice, UPDATE_INTERVAL);
    
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [generateNewPrice]);

  // Execute a trade
  const executeTrade = useCallback((type: TradeType, quantity: number) => {
    if (quantity <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Quantity must be greater than zero",
        variant: "destructive"
      });
      return false;
    }

    const tradeAmount = stock.price * quantity;

    if (type === 'buy') {
      // Check if user has enough balance
      if (account.balance < tradeAmount) {
        toast({
          title: "Insufficient funds",
          description: "You don't have enough balance for this trade",
          variant: "destructive"
        });
        return false;
      }

      // Execute buy trade
      setAccount(prev => {
        const newTradeHistory: TradeHistoryItem = {
          id: crypto.randomUUID(),
          type,
          quantity,
          price: stock.price,
          timestamp: new Date(),
          total: tradeAmount,
        };

        return {
          ...prev,
          balance: prev.balance - tradeAmount,
          shares: prev.shares + quantity,
          tradeHistory: [newTradeHistory, ...prev.tradeHistory]
        };
      });

      toast({
        title: "Trade executed",
        description: `Bought ${quantity} shares of HACK at $${stock.price.toFixed(2)}`,
      });
      
      return true;
    } else if (type === 'sell') {
      // Check if user has enough shares
      if (account.shares < quantity) {
        toast({
          title: "Insufficient shares",
          description: "You don't have enough shares to sell",
          variant: "destructive"
        });
        return false;
      }

      // Execute sell trade
      setAccount(prev => {
        const newTradeHistory: TradeHistoryItem = {
          id: crypto.randomUUID(),
          type,
          quantity,
          price: stock.price,
          timestamp: new Date(),
          total: tradeAmount,
        };

        return {
          ...prev,
          balance: prev.balance + tradeAmount,
          shares: prev.shares - quantity,
          tradeHistory: [newTradeHistory, ...prev.tradeHistory]
        };
      });

      toast({
        title: "Trade executed",
        description: `Sold ${quantity} shares of HACK at $${stock.price.toFixed(2)}`,
      });
      
      return true;
    }

    return false;
  }, [stock.price, account]);

  // Reset the simulator
  const resetSimulator = useCallback(() => {
    setStock({
      symbol: 'HACK',
      price: INITIAL_PRICE,
      previousPrice: INITIAL_PRICE,
      priceHistory: Array(MAX_HISTORY).fill(INITIAL_PRICE),
    });

    setAccount({
      balance: initialBalance,
      shares: 0,
      initialInvestment: initialBalance,
      tradeHistory: [],
    });

    toast({
      title: "Simulator reset",
      description: "Your trading account has been reset to initial state",
    });
  }, [initialBalance]);

  return {
    stock,
    account,
    portfolioValue,
    totalValue,
    profitLoss,
    profitLossPercentage,
    executeTrade,
    resetSimulator,
  };
}
