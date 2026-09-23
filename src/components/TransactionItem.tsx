import type { Transaction } from '../types/transaction';
import { useTransactionStore } from '../store/transactionStore';

type TransactionItemProps = {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
};

function TransactionItem({ transaction, onEdit }: TransactionItemProps) {
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  );

  return (
    <article>
      <h3>{transaction.category}</h3>
      <p>{transaction.description}</p>
      <p>{transaction.date}</p>
      <p>{transaction.amount}</p>

      <button onClick={() => onEdit(transaction)}>Редактировать</button>
      <button onClick={() => deleteTransaction(transaction.id)}>Удалить</button>
    </article>
  );
}

export default TransactionItem;
