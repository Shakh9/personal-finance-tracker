import type { Transaction } from '../types/transaction';
import TransactionItem from './TransactionItem';

type TransactionListProps = {
  transactions: Transaction[];
};

function TransactionList({ transactions }: TransactionListProps) {
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
