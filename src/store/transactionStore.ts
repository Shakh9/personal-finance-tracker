import { create } from 'zustand';
import type { Transaction } from '../types/transaction';

type TransactionStore = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [
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
  ],

  addTransaction: (transaction) => {
    set((state) => ({
      transactions: [...state.transactions, transaction],
    }));
  },
}));
