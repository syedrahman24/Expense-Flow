import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Wallet, PiggyBank, CreditCard } from 'lucide-react';

const BalanceSummary = ({ totalIncome, totalExpenses, netBalance }) => {
  const formatCurrency = (amount) => {
    // For very large numbers, use compact notation
    if (Math.abs(amount) >= 1000000) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(amount);
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getBalanceStatus = () => {
    if (netBalance > 1000) return { color: 'success', status: 'Excellent', icon: PiggyBank };
    if (netBalance > 0) return { color: 'brand', status: 'Good', icon: Wallet };
    return { color: 'error', status: 'Attention', icon: CreditCard };
  };

  const balanceStatus = getBalanceStatus();
  const BalanceIcon = balanceStatus.icon;

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Professional Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold gradient-text-brand">
            Financial Overview
          </h2>
          <div className={`badge badge-${balanceStatus.color}`}>
            {balanceStatus.status}
          </div>
        </div>
        
        {/* Net Balance - Hero Card */}
        <div className={`stat-card-${balanceStatus.color} mb-6 hover:scale-[1.02] transition-all duration-300`}>
          <div className="flex items-center justify-center mb-4">
            <div className={`w-16 h-16 bg-${balanceStatus.color}-500/20 rounded-2xl flex items-center justify-center mr-4`}>
              <BalanceIcon className={`w-8 h-8 text-${balanceStatus.color}-400`} />
            </div>
            <div className="text-center min-w-0 flex-1">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 break-words">
                {formatCurrency(netBalance)}
              </div>
              <div className={`text-${balanceStatus.color}-200 font-medium`}>
                Net Balance
              </div>
            </div>
          </div>
          
          {/* Balance Trend Indicator */}
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className={`w-2 h-2 bg-${balanceStatus.color}-400 rounded-full animate-pulse`}></div>
            <span className={`text-${balanceStatus.color}-200`}>Updated in real-time</span>
          </div>
        </div>

        {/* Income & Expenses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Total Income */}
          <div className="stat-card-success hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-success-500/20 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-success-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-success-200 text-sm font-medium">Total Income</div>
                <div className="text-xl sm:text-2xl font-bold text-white break-words">
                  {formatCurrency(totalIncome)}
                </div>
              </div>
            </div>
          </div>

          {/* Total Expenses */}
          <div className="stat-card-error hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-error-500/20 rounded-xl flex items-center justify-center mr-3 flex-shrink-0">
                <TrendingDown className="w-6 h-6 text-error-400" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-error-200 text-sm font-medium">Total Expenses</div>
                <div className="text-xl sm:text-2xl font-bold text-white break-words">
                  {formatCurrency(totalExpenses)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSummary; 