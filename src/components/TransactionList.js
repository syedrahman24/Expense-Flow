import React, { useState } from 'react';
import { Edit, Trash2, Calendar, Tag, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const TransactionList = ({ 
  transactions, 
  onDeleteTransaction, 
  onEditTransaction, 
  categories, 
  incomeCategories 
}) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      title: transaction.title,
      amount: transaction.amount.toString(),
      type: transaction.type,
      category: transaction.category,
      date: transaction.date
    });
  };

  const handleSave = () => {
    if (editForm.title && editForm.amount && editForm.category && editForm.date) {
      onEditTransaction(editingId, {
        ...editForm,
        amount: parseFloat(editForm.amount)
      });
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const currentCategories = editForm.type === 'income' ? incomeCategories : categories;

  if (transactions.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          Transactions
        </h2>
        <div className="flex items-center justify-center h-32 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="text-4xl mb-2">📝</div>
            <p>No transactions found</p>
            <p className="text-sm">Add some transactions to get started</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Transactions ({transactions.length})
      </h2>
      
      <div className="space-y-3">
        {transactions.map(transaction => (
          <div 
            key={transaction.id} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
          >
            {editingId === transaction.id ? (
              // Edit Form
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="Title"
                  />
                  <input
                    type="number"
                    name="amount"
                    value={editForm.amount}
                    onChange={handleInputChange}
                    step="0.01"
                    min="0"
                    className="input"
                    placeholder="Amount"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Type
                    </label>
                    <div className="flex space-x-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value="expense"
                          checked={editForm.type === 'expense'}
                          onChange={handleInputChange}
                          className="mr-1"
                        />
                        <span className="text-sm">Expense</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="type"
                          value="income"
                          checked={editForm.type === 'income'}
                          onChange={handleInputChange}
                          className="mr-1"
                        />
                        <span className="text-sm">Income</span>
                      </label>
                    </div>
                  </div>
                  
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleInputChange}
                    className="input"
                  >
                    <option value="">Select category</option>
                    {currentCategories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  
                  <input
                    type="date"
                    name="date"
                    value={editForm.date}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    className="btn-primary flex-1"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // Display Transaction
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-green-100 dark:bg-green-900/20' 
                      : 'bg-red-100 dark:bg-red-900/20'
                  }`}>
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {transaction.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Tag className="w-3 h-3 mr-1" />
                        {transaction.category}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(transaction.date)}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`font-semibold ${
                    transaction.type === 'income' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </span>
                  
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList; 