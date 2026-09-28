import type { Transaction } from '../types/transaction';

export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);
}

export function calculateBalance(transactions: Transaction[]): number {
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);

  return totalIncome - totalExpenses;
}
