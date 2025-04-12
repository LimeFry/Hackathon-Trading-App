import React from 'react';
import { TrendingUp, TrendingDown, Wallet, BarChart2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AccountCardProps {
  balance: number;
  shares: number;
  portfolioValue: number;
  profitLoss: number;
  profitLossPercentage: number;
}

const AccountCard: React.FC<AccountCardProps> = ({
  balance,
  shares,
  portfolioValue,
  profitLoss,
  profitLossPercentage,
}) => {
  const isPositive = profitLoss >= 0;

  return (
    <Card className="glass-card w-full animate-pulse-glow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Wallet className="mr-2" size={18} />
          Account Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Cash Balance</p>
          <p className="text-xl font-mono font-bold">${balance.toFixed(2)}</p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Shares Owned</p>
          <p className="text-xl font-mono font-bold flex items-center">
            <BarChart2 size={16} className="mr-1 text-cyber-blue" />
            {shares} HACK
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Portfolio Value</p>
          <p className="text-xl font-mono font-bold neon-text-blue">
            ${portfolioValue.toFixed(2)}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">Profit/Loss</p>
          <div className={cn(
            "flex items-center text-xl font-mono font-bold",
            isPositive ? "text-cyber-green" : "text-cyber-red"
          )}>
            {isPositive ? (
              <TrendingUp size={16} className="mr-1" />
            ) : (
              <TrendingDown size={16} className="mr-1" />
            )}
            <span>${Math.abs(profitLoss).toFixed(2)}</span>
            <span className="text-sm ml-1">
              ({isPositive ? "+" : "-"}{Math.abs(profitLossPercentage).toFixed(2)}%)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountCard;
