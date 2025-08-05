import React, { useState } from 'react';
import { TrendingUp, Sparkles, BarChart3, Wallet, X, PieChart, FileText, Activity } from 'lucide-react';

const Header = ({ transactions = [] }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Calculate real analytics from transaction data
  const calculateAnalytics = () => {
    if (transactions.length === 0) {
      return {
        totalTransactions: 0,
        expenseTransactions: [],
        categoryBreakdown: [],
        activeCategories: 0,
        averagePerDay: 0,
        highestExpense: 0,
        mostFrequentCategory: 'None'
      };
    }

    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Calculate category breakdown
    const categoryTotals = expenseTransactions.reduce((acc, transaction) => {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + transaction.amount;
      return acc;
    }, {});

    const categoryBreakdown = Object.entries(categoryTotals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0
      }))
      .sort((a, b) => b.amount - a.amount);

    // Calculate other metrics
    const activeCategories = Object.keys(categoryTotals).length;
    const highestExpense = Math.max(...expenseTransactions.map(t => t.amount), 0);
    const mostFrequentCategory = categoryBreakdown.length > 0 ? categoryBreakdown[0].category : 'None';
    
    // Calculate average per day (assuming current month)
    const currentDate = new Date();
    const daysInMonth = currentDate.getDate();
    const averagePerDay = daysInMonth > 0 ? totalExpenses / daysInMonth : 0;

    return {
      totalTransactions: transactions.length,
      expenseTransactions,
      categoryBreakdown,
      activeCategories,
      averagePerDay,
      highestExpense,
      mostFrequentCategory
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getColorForIndex = (index) => {
    const colors = ['error-400', 'warning-400', 'brand-400', 'success-400', 'accent-400', 'gray-400'];
    return colors[index % colors.length];
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const analytics = calculateAnalytics();
    
    if (tab === 'analytics') {
      const trackingPercentage = analytics.totalTransactions > 0 ? 
        Math.min(100, Math.round((analytics.totalTransactions / 50) * 100)) : 0;
      
      setModalContent({
        title: 'Analytics Dashboard',
        icon: BarChart3,
        content: (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="stat-card-brand">
                <PieChart className="w-8 h-8 text-brand-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{trackingPercentage}%</div>
                <div className="text-brand-200 text-sm">Expense Tracking</div>
              </div>
              <div className="stat-card-success">
                <Activity className="w-8 h-8 text-success-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white mb-1">{analytics.activeCategories}</div>
                <div className="text-success-200 text-sm">Active Categories</div>
              </div>
            </div>
            <div className="text-gray-300">
              <h4 className="font-semibold mb-2">Spending Insights</h4>
              {analytics.categoryBreakdown.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {analytics.categoryBreakdown.slice(0, 5).map((item, index) => (
                    <li key={item.category} className="flex justify-between">
                      <span>{item.category}</span>
                      <span className={`text-${getColorForIndex(index)}`}>{item.percentage}%</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No expense data available yet. Add some transactions to see insights!</p>
              )}
            </div>
          </div>
        )
      });
      setShowModal(true);
    } else if (tab === 'reports') {
      setModalContent({
        title: 'Financial Reports',
        icon: FileText,
        content: (
          <div className="space-y-6">
            <div className="glass-card p-4">
              <h4 className="font-semibold text-white mb-3 flex items-center">
                <FileText className="w-4 h-4 mr-2" />
                Monthly Summary
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Total Transactions</span>
                  <span>{analytics.totalTransactions}</span>
                </div>
                <div className="flex justify-between">
                  <span>Average per day</span>
                  <span>{formatCurrency(analytics.averagePerDay)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Highest expense</span>
                  <span>{formatCurrency(analytics.highestExpense)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Most frequent category</span>
                  <span>{analytics.mostFrequentCategory}</span>
                </div>
              </div>
            </div>
          </div>
        )
      });
      setShowModal(true);
    }
  };
  return (
    <header className="relative mb-12">
      {/* Professional Header with Glassmorphism */}
      <div className="glass-card p-8 mb-8 animate-fade-in-up">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Professional Logo */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow group-hover:shadow-glow-accent transition-all duration-300">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-success-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
            
            {/* Brand Text */}
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">
                ExpenseFlow
              </h1>
              <p className="text-gray-400 text-lg font-medium">
                Professional Financial Management
              </p>
            </div>
          </div>
          
          {/* Professional Stats Badge */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-brand-500/20 rounded-xl mb-2">
                <TrendingUp className="w-6 h-6 text-brand-400" />
              </div>
              <div className="text-xs text-gray-400 font-medium">Analytics</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-12 h-12 bg-success-500/20 rounded-xl mb-2">
                <BarChart3 className="w-6 h-6 text-success-400" />
              </div>
              <div className="text-xs text-gray-400 font-medium">Insights</div>
            </div>
          </div>
        </div>
        
        {/* Professional Subtitle */}
        <div className="mt-6 pt-6 border-t border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">Real-time Financial Tracking</span>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Secure</span>
              <span>•</span>
              <span>Private</span>
              <span>•</span>
              <span>Professional</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Professional Navigation Tabs */}
      <div className="flex items-center justify-center mb-8">
        <div className="glass-card px-2 py-2 animate-slide-down">
          <div className="flex items-center space-x-1">
            <button 
              onClick={() => handleTabClick('dashboard')}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'dashboard' 
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-glow' 
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => handleTabClick('analytics')}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'analytics' 
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-glow' 
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              Analytics
            </button>
            <button 
              onClick={() => handleTabClick('reports')}
              className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === 'reports' 
                  ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30 shadow-glow' 
                  : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
              }`}
            >
              Reports
            </button>
          </div>
        </div>
      </div>

      {/* Professional Modal */}
      {showModal && modalContent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center">
                    <modalContent.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold gradient-text-brand">{modalContent.title}</h3>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="btn-ghost p-2 w-10 h-10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Modal Content */}
              <div>{modalContent.content}</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;