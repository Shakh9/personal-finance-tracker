import TransactionItem from './TransactionItem';
import { useTransactionStore } from '../store/transactionStore';

function TransactionList() {
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <section>
      <h2>Транзакции</h2>

      {transactions.map((transaction) => (
        <TransactionItem key={transaction.id} transaction={transaction} />
      ))}
    </section>
  );
}

export default TransactionList;
