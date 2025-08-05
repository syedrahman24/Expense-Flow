import React, { useState, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import Header from './components/Header';
import BalanceSummary from './components/BalanceSummary';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionList from './components/TransactionList';
import Filters from './components/Filters';
import ExpenseChart from './components/ExpenseChart';
import Footer from './components/Footer';

const CATEGORIES = [
  'Food', 'Transport', 'Entertainment', 'Shopping', 
  'Healthcare', 'Education', 'Bills', 'Travel', 'Other'
];

const INCOME_CATEGORIES = [
  'Salary', 'Freelance', 'Investment', 'Gift', 'Other'
];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem('expenseTrackerTransactions');
    
    // Simulate loading for better UX
    setTimeout(() => {
      if (savedTransactions) {
        setTransactions(JSON.parse(savedTransactions));
      }
      setIsLoading(false);
    }, 800);

    // Ensure dark mode is always applied
    document.documentElement.classList.add('dark');
  }, []);

  // Save data to localStorage whenever transactions change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('expenseTrackerTransactions', JSON.stringify(transactions));
    }
  }, [transactions, isLoading]);

  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString().split('T')[0]
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  const editTransaction = (id, updatedTransaction) => {
    setTransactions(transactions.map(transaction => 
      transaction.id === id ? { ...transaction, ...updatedTransaction } : transaction
    ));
  };

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    const categoryMatch = selectedCategory === 'all' || transaction.category === selectedCategory;
    const monthMatch = selectedMonth === 'all' || 
      new Date(transaction.date).getMonth() === parseInt(selectedMonth);
    return categoryMatch && monthMatch;
  });

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 mx-auto mb-4"></div>
          <div className="gradient-text-brand text-lg font-medium">Loading your financial data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl animate-pulse-soft"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-success-500/5 rounded-full blur-3xl animate-pulse-soft" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Header transactions={transactions} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Left Column - Forms and Summary */}
          <div className="lg:col-span-1 space-y-6">
            <BalanceSummary 
              totalIncome={totalIncome} 
              totalExpenses={totalExpenses} 
              netBalance={netBalance} 
            />
            
            <AddTransactionForm 
              onAddTransaction={addTransaction}
              categories={CATEGORIES}
              incomeCategories={INCOME_CATEGORIES}
            />
            
            <Filters 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              categories={CATEGORIES}
            />
          </div>

          {/* Right Column - Transactions and Charts */}
          <div className="lg:col-span-2">
            {/* Professional Container with Boundary */}
            <div className="glass-card p-6 space-y-6">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-brand-500 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold gradient-text-brand">
                      Analytics & Transactions
                    </h2>
                    <p className="text-gray-400 text-sm">Visual insights and transaction history</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Live Data</span>
                </div>
              </div>
              
              <ExpenseChart transactions={transactions} />
              
              <TransactionList 
                transactions={filteredTransactions}
                onDeleteTransaction={deleteTransaction}
                onEditTransaction={editTransaction}
                categories={CATEGORIES}
                incomeCategories={INCOME_CATEGORIES}
              />
            </div>
          </div>
        </div>
        
        {/* Professional Footer */}
        <Footer />
        </div>
      </div>
    </div>
  );
}

export default App; 