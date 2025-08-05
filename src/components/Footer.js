import React, { useState } from 'react';
import { Heart, Github, Linkedin, Mail, Code, Coffee, HelpCircle, X, CheckCircle, Plus, Eye, Filter, Sparkles, TrendingUp, BarChart3, DollarSign } from 'lucide-react';

const Footer = () => {
  const [showGuideModal, setShowGuideModal] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-16">
      {/* Professional Footer with Glassmorphism */}
      <div className="glass-card p-8 animate-fade-in-up">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-500 to-accent-500 rounded-xl flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold gradient-text-brand">ExpenseFlow</h3>
                  <p className="text-gray-400 text-sm">Professional Financial Management</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                A modern, professional expense tracking application built with React and designed 
                with FAANG-level UI/UX standards.
              </p>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Features</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-brand-500 rounded-full"></div>
                  <span>Real-time Financial Tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-success-500 rounded-full"></div>
                  <span>Interactive Analytics Dashboard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-accent-500 rounded-full"></div>
                  <span>Professional Reporting</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-warning-500 rounded-full"></div>
                  <span>Secure Local Storage</span>
                </li>
              </ul>
            </div>

            {/* Developer Section */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Designed and Developed</h4>
              <div className="glass-card p-4 border border-brand-500/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-accent-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">SR</span>
                  </div>
                  <div>
                    <h5 className="text-white font-semibold">Syed Abdur Rahman Uddin</h5>
                    <p className="text-gray-400 text-sm">Front End Developer</p>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center space-x-3">
                  <button className="w-8 h-8 bg-gray-800 hover:bg-brand-500/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                    <a href="https://github.com/syedrahman24" target="_blank"><Github className="w-4 h-4 text-gray-400 hover:text-brand-400" /></a>
                    
                    
                  </button>
                  <button className="w-8 h-8 bg-gray-800 hover:bg-brand-500/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                     <a href="https://www.linkedin.com/in/syedabdurrahmanuddin/" target="_blank"><Linkedin className="w-4 h-4 text-gray-400 hover:text-brand-400" /></a>
                  </button>
                  <button className="w-8 h-8 bg-gray-800 hover:bg-brand-500/20 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110">
                    <a href="mailto:rahmansyed862@gmail.com" target="_blank"><Mail className="w-4 h-4 text-gray-400 hover:text-brand-400" /></a>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="pt-6 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-6">
              <button 
                onClick={() => setShowGuideModal(true)}
                className="text-gray-400 hover:text-brand-400 transition-colors flex items-center gap-2 font-medium"
              >
                <HelpCircle className="w-4 h-4" />
                How to Use
              </button>
              
            </div>
            
            {/* Bottom Row */}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>© {currentYear} ExpenseFlow.</span>
                <span>Crafted with</span>
                <Heart className="w-4 h-4 text-error-500 animate-pulse" />
                
              </div>
              
              <div className="flex items-center space-x-6 text-xs text-gray-500">
                <span>React 18.2.0</span>
                <span>•</span>
                <span>TailwindCSS 3.3.0</span>
                <span>•</span>
                <span>Recharts 2.8.0</span>
              </div>
            </div>
          </div>

          {/* Professional Badge */}
          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-brand-500/10 to-accent-500/10 rounded-full border border-brand-500/20">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300 font-medium">FAANG-Level Professional Design</span>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use Guide Modal */}
      {showGuideModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900/90 backdrop-blur-sm p-6 border-b border-gray-700/50 flex items-center justify-between">
              <h2 className="text-2xl font-bold gradient-text-brand flex items-center">
                <HelpCircle className="w-6 h-6 mr-2" />
                How to Use ExpenseFlow
              </h2>
              <button
                onClick={() => setShowGuideModal(false)}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Getting Started */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-brand-400" />
                  Getting Started
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-white">Welcome to ExpenseFlow!</strong> Your personal finance tracker with FAANG-level design and real-time analytics.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-success-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      All your data is stored locally in your browser - completely private and secure.
                    </div>
                  </div>
                </div>
              </section>

              {/* Adding Transactions */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-success-400" />
                  Adding Transactions
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start">
                    <span className="bg-brand-500/20 text-brand-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</span>
                    <div>
                      <strong className="text-white">Fill in the form:</strong> Enter description, amount, category, and transaction type (Income/Expense).
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-500/20 text-brand-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</span>
                    <div>
                      <strong className="text-white">Choose categories:</strong> Food, Transportation, Entertainment, Healthcare, Shopping, Bills, and more.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-brand-500/20 text-brand-400 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</span>
                    <div>
                      <strong className="text-white">Click "Add Transaction":</strong> Your transaction will appear instantly in the list and update all analytics.
                    </div>
                  </div>
                </div>
              </section>

              {/* Dashboard Features */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-accent-400" />
                  Dashboard Features
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-success-400" />
                      Financial Overview
                    </h4>
                    <p className="text-gray-300 text-sm">
                      View your total income, expenses, and net balance with intelligent status indicators (Excellent, Good, Attention).
                    </p>
                  </div>
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-brand-400" />
                      Expense Chart
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Interactive pie chart showing expense breakdown by category with hover details and percentages.
                    </p>
                  </div>
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Filter className="w-4 h-4 mr-2 text-warning-400" />
                      Smart Filters
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Filter transactions by category or month to focus on specific spending patterns.
                    </p>
                  </div>
                  <div className="glass-card p-4">
                    <h4 className="font-semibold text-white mb-2 flex items-center">
                      <Eye className="w-4 h-4 mr-2 text-error-400" />
                      Transaction List
                    </h4>
                    <p className="text-gray-300 text-sm">
                      View, edit, and delete transactions with professional formatting and category badges.
                    </p>
                  </div>
                </div>
              </section>

              {/* Analytics & Reports */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-success-400" />
                  Analytics & Reports
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start">
                    <span className="bg-brand-500/20 text-brand-400 px-2 py-1 rounded text-xs font-bold mr-3 mt-0.5 flex-shrink-0">Analytics</span>
                    <div>
                      <strong className="text-white">Real-time insights:</strong> View expense tracking progress, active categories, and spending breakdown by category with live percentages.
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="bg-accent-500/20 text-accent-400 px-2 py-1 rounded text-xs font-bold mr-3 mt-0.5 flex-shrink-0">Reports</span>
                    <div>
                      <strong className="text-white">Monthly summary:</strong> Total transactions, daily averages, highest expenses, and most frequent spending categories.
                    </div>
                  </div>
                </div>
              </section>

              {/* Pro Tips */}
              <section>
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-warning-400" />
                  Pro Tips
                </h3>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-warning-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>Use descriptive transaction names to easily identify expenses later.</div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-warning-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>Regularly check the Analytics tab to understand your spending patterns.</div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-warning-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>Use filters to analyze specific time periods or categories.</div>
                  </div>
                  <div className="flex items-start">
                    <span className="w-2 h-2 bg-warning-400 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                    <div>Your data is automatically saved - no need to worry about losing information!</div>
                  </div>
                </div>
              </section>

              {/* Support */}
              <section className="border-t border-gray-700/50 pt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
                <p className="text-gray-300 text-sm">
                  This expense tracker is designed to be intuitive and user-friendly. If you have any questions or suggestions, 
                  feel free to reach out through the contact links in the footer.
                </p>
              </section>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
