import './App.css';
import Balance from './components/Balance';
import Header from './components/Header';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';

function App() {
  return (
    <>
      <Header />

      <main>
        <Balance />

        <TransactionList />

        <TransactionForm />
      </main>
    </>
  );
}

export default App;
