import './App.css';
import Balance from './components/Balance';
import Header from './components/Header';
import type { Transaction } from './types/transaction';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import { useState } from 'react';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([
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
  ]);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalIncomes = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  function addTransaction(transaction: Transaction): void {
    setTransactions([...transactions, transaction]);
  }

  return (
    <>
      <Header />

      <main>
        <Balance
          income={totalIncomes}
          expenses={totalExpenses}
          balance={totalIncomes - totalExpenses}
        />

        <TransactionList transactions={transactions} />

        <TransactionForm onAddTransaction={addTransaction} />
      </main>
    </>
  );
}

export default App;
