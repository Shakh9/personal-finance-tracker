import './App.css';
import Balance from './components/Balance';
import Header from './components/Header';
import type { Transaction } from './types/transaction';
import TransactionItem from './components/TransactionItem';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';

const transactions: Transaction[] = [
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

function App() {
  return (
    <>
      <Header />

      <main>
        <Balance income={150000} expenses={2500} balance={147500} />

        <TransactionList transactions={transactions} />

        <TransactionForm />
      </main>
    </>
  );
}

export default App;
