import './App.css';
import Balance from './components/Balance';
import Header from './components/Header';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import { useState } from 'react';
import type { Transaction } from './types/transaction';

function App() {
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  return (
    <>
      <Header />

      <main>
        <Balance />

        <TransactionList onEdit={setEditingTransaction} />

        <TransactionForm
          editingTransaction={editingTransaction}
          onFinishEditing={() => setEditingTransaction(null)}
        />
      </main>
    </>
  );
}

export default App;
