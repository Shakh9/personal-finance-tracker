import type { Transaction } from '../types/transaction';

export type CategoryExpense = {
  category: string;
  amount: number;
};

export type IncomeExpense = {
  type: 'Доходы' | 'Расходы';
  amount: number;
};

export type ExpenseByDate = {
  date: string;
  amount: number;
};

export function calculateExpensesByCategory(
  transactions: Transaction[],
): CategoryExpense[] {
  const expenses = transactions.filter(
    (transaction) => transaction.type === 'expense',
  );

  const expensesByCategory = expenses.reduce<Record<string, number>>(
    (result, transaction) => {
      const category = transaction.category;

      if (!result[category]) {
        result[category] = 0;
      }

      result[category] += transaction.amount;

      return result;
    },
    {},
  );

  return Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
  }));
}

export function calculateIncomeAndExpenses(
  transactions: Transaction[],
): IncomeExpense[] {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  return [
    {
      type: 'Доходы',
      amount: totalIncome,
    },
    {
      type: 'Расходы',
      amount: totalExpenses,
    },
  ];
}

export function calculateExpensesByDate(
  transactions: Transaction[],
): ExpenseByDate[] {
  const expenses = transactions.filter(
    (transaction) => transaction.type === 'expense',
  );

  const expensesByDate = expenses.reduce<Record<string, number>>(
    (result, transaction) => {
      const date = transaction.date;

      if (!result[date]) {
        result[date] = 0;
      }

      result[date] += transaction.amount;

      return result;
    },
    {},
  );

  return Object.entries(expensesByDate)
    .map(([date, amount]) => ({
      date,
      amount,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}
