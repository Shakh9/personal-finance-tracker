import './App.css';
import { useState } from 'react';
import type { Transaction } from './types/transaction';
import Balance from './components/Balance';
import Header from './components/Header';
import TransactionList from './components/TransactionList';
import TransactionModal from './components/TransactionModal';
import Statistics from './components/Statistics/Statistics';

function App() {
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);

  function handleAddTransaction() {
    setEditingTransaction(null);
    setIsTransactionModalOpen(true);
  }

  function handleEditTransaction(transaction: Transaction) {
    setEditingTransaction(transaction);
    setIsTransactionModalOpen(true);
  }

  function handleCloseTransactionModal() {
    setEditingTransaction(null);
    setIsTransactionModalOpen(false);
  }

  return (
    <>
      <Header />

      <main>
        <Balance />

        <TransactionList
          onAdd={handleAddTransaction}
          onEdit={handleEditTransaction}
        />

        <Statistics />
      </main>

      {isTransactionModalOpen && (
        <TransactionModal
          editingTransaction={editingTransaction}
          onClose={handleCloseTransactionModal}
          onFinishEditing={() => setEditingTransaction(null)}
        />
      )}
    </>
  );
}

export default App;
