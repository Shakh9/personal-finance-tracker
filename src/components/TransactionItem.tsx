import type { Transaction } from '../types/transaction';

type TransactionItemProps = {
  transaction: Transaction;
};

function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <article>
      <h3>{transaction.category}</h3>
      <p>{transaction.description}</p>
      <p>{transaction.date}</p>
      <p>{transaction.amount}</p>
    </article>
  );
}

export default TransactionItem;
