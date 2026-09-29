import type { Transaction } from '../types/transaction';
import { useTransactionStore } from '../store/transactionStore';
import { useLanguageStore } from '../store/languageStore';
import { getTranslations } from '../utils/translations';

type TransactionItemProps = {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
};

function TransactionItem({ transaction, onEdit }: TransactionItemProps) {
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  );

  const language = useLanguageStore((state) => state.language);
  const t = getTranslations(language);

  const isIncome = transaction.type === 'income';

  const formattedAmount = transaction.amount.toLocaleString(
    language === 'ru' ? 'ru-RU' : 'en-US',
  );

  const formattedDate = new Date(
    `${transaction.date}T00:00:00`,
  ).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <article
      className={`transaction-item ${
        isIncome ? 'transaction-item--income' : 'transaction-item--expense'
      }`}
    >
      <div className="transaction-item__main">
        <div className="transaction-item__icon" aria-hidden="true">
          {isIncome ? '↗' : '↘'}
        </div>

        <div className="transaction-item__info">
          <div className="transaction-item__title-row">
            <h3>{transaction.category}</h3>

            {transaction.isPlanned && (
              <span className="transaction-item__planned">
                {t.transactions.plannedLabel}
              </span>
            )}
          </div>

          <p className="transaction-item__description">
            {transaction.description}
          </p>

          <p className="transaction-item__date">{formattedDate}</p>
        </div>
      </div>

      <div className="transaction-item__right">
        <strong className="transaction-item__amount">
          {isIncome ? '+' : '−'}
          {formattedAmount}
        </strong>

        <div className="transaction-item__actions">
          <button
            type="button"
            className="transaction-action transaction-action--edit"
            onClick={() => onEdit(transaction)}
          >
            {t.transactions.edit}
          </button>

          <button
            type="button"
            className="transaction-action transaction-action--delete"
            onClick={() => deleteTransaction(transaction.id)}
          >
            {t.transactions.delete}
          </button>
        </div>
      </div>
    </article>
  );
}

export default TransactionItem;
