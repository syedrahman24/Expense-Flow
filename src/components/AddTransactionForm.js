import React, { useState } from 'react';
import { Plus, AlertCircle, DollarSign, Calendar, Tag, Zap } from 'lucide-react';

const AddTransactionForm = ({ onAddTransaction, categories, incomeCategories }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate a small delay for better UX
    setTimeout(() => {
      onAddTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      
      // Reset form
      setFormData({
        title: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});
      setIsSubmitting(false);
    }, 300);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setFormData(prev => ({
      ...prev,
      type: newType,
      category: '' // Reset category when type changes
    }));
    setErrors(prev => ({
      ...prev,
      category: ''
    }));
  };

  const currentCategories = formData.type === 'income' ? incomeCategories : categories;

  return (
    <div className="glass-card p-6 animate-fade-in-up">
      {/* Professional Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold gradient-text-brand">
              Add Transaction
            </h2>
            <p className="text-gray-400 text-sm">Track your income and expenses</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-400">Quick Entry</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Transaction Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type
          </label>
          <div className="flex space-x-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={handleTypeChange}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Expense</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="income"
                checked={formData.type === 'income'}
                onChange={handleTypeChange}
                className="mr-2"
              />
              <span className="text-gray-700 dark:text-gray-300">Income</span>
            </label>
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`input ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="Enter transaction title"
          />
          {errors.title && (
            <div className="flex items-center mt-1 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.title}
            </div>
          )}
        </div>

        {/* Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            className={`input ${errors.amount ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="0.00"
          />
          {errors.amount && (
            <div className="flex items-center mt-1 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.amount}
            </div>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`input ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
          >
            <option value="">Select a category</option>
            {currentCategories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category && (
            <div className="flex items-center mt-1 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.category}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`input ${errors.date ? 'border-red-500 focus:ring-red-500' : ''}`}
          />
          {errors.date && (
            <div className="flex items-center mt-1 text-red-600 dark:text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.date}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </div>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Add Transaction
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTransactionForm; 