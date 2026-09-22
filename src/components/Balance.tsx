import { useTransactionStore } from '../store/transactionStore';

function Balance() {
  const transactions = useTransactionStore((state) => state.transactions);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalIncomes = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = totalIncomes - totalExpenses;

  return (
    <section>
      <h2>Баланс: {balance}</h2>
      <p>Доходы: {totalIncomes}</p>
      <p>Расходы: {totalExpenses}</p>
    </section>
  );
}

export default Balance;
