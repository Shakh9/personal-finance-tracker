import { create } from 'zustand';
import type { Transaction } from '../types/transaction';

type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

const initialTransactions: Transaction[] = [
  {
    id: '1',
    type: 'expense',
    amount: 2500,
    category: 'Еда',
    description: 'Продукты',
    date: '2026-09-20',
    isPlanned: false,
  },
  {
    id: '2',
    type: 'income',
    amount: 150000,
    category: 'Зарплата',
    description: 'Зарплата за сентябрь',
    date: '2026-09-20',
    isPlanned: true,
  },
  {
    id: '3',
    type: 'expense',
    amount: 1200,
    category: 'Развлечения',
    description: 'Кино',
    date: '2026-09-19',
    isPlanned: false,
  },
];

function getInitialTransactions(): Transaction[] {
  const savedTransactions = localStorage.getItem('transactions');

  if (!savedTransactions) {
    return initialTransactions;
  }

  try {
    const parsedTransactions = JSON.parse(savedTransactions);

    if (!Array.isArray(parsedTransactions)) {
      return initialTransactions;
    }
    return parsedTransactions as Transaction[];
  } catch {
    return initialTransactions;
  }
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: getInitialTransactions(),

  addTransaction: (transaction) => {
    set((state) => {
      const transactions = [...state.transactions, transaction];

      localStorage.setItem('transactions', JSON.stringify(transactions));

      return {
        transactions,
      };
    });
  },
}));
