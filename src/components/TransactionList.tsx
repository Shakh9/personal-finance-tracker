import { useState } from 'react';
import type { Transaction } from '../types/transaction';
import TransactionItem from './TransactionItem';
import { useTransactionStore } from '../store/transactionStore';
import { useLanguageStore } from '../store/languageStore';
import { getTranslations } from '../utils/translations';

type TransactionListProps = {
  onAdd: () => void;
  onEdit: (transaction: Transaction) => void;
};

type TransactionFilter = 'all' | 'income' | 'expense';

type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

type PlannedFilter = 'all' | 'planned' | 'unplanned';

function TransactionList({ onAdd, onEdit }: TransactionListProps) {
  const transactions = useTransactionStore((state) => state.transactions);

  const language = useLanguageStore((state) => state.language);
  const t = getTranslations(language);

  const [filter, setFilter] = useState<TransactionFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [plannedFilter, setPlannedFilter] = useState<PlannedFilter>('all');

  const categories = Array.from(
    new Set(transactions.map((transaction) => transaction.category)),
  );

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType = filter === 'all' || transaction.type === filter;

    const matchesCategory =
      categoryFilter === 'all' || transaction.category === categoryFilter;

    const matchesPlanned =
      plannedFilter === 'all' ||
      (plannedFilter === 'planned' && transaction.isPlanned) ||
      (plannedFilter === 'unplanned' && !transaction.isPlanned);

    return matchesType && matchesCategory && matchesPlanned;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortOption) {
      case 'date-desc':
        return b.date.localeCompare(a.date);

      case 'date-asc':
        return a.date.localeCompare(b.date);

      case 'amount-desc':
        return b.amount - a.amount;

      case 'amount-asc':
        return a.amount - b.amount;
    }
  });

  return (
    <section className="transactions-section">
      <div className="transactions-section__header">
        <div>
          <p className="section-eyebrow">{t.transactions.eyebrow}</p>
          <h2>{t.transactions.title}</h2>
        </div>

        <button
          type="button"
          className="transactions-section__add"
          onClick={onAdd}
        >
          <span aria-hidden="true">+ </span>
          {t.form.add}
        </button>
      </div>

      <div className="transaction-filters">
        <div className="transaction-filter-tabs">
          <button
            type="button"
            className={filter === 'all' ? 'is-active' : ''}
            onClick={() => setFilter('all')}
          >
            {t.transactions.all}
          </button>

          <button
            type="button"
            className={filter === 'income' ? 'is-active' : ''}
            onClick={() => setFilter('income')}
          >
            {t.transactions.income}
          </button>

          <button
            type="button"
            className={filter === 'expense' ? 'is-active' : ''}
            onClick={() => setFilter('expense')}
          >
            {t.transactions.expenses}
          </button>
        </div>

        <div className="transaction-filter-selects">
          <label>
            <span>{t.transactions.category}</span>

            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
            >
              <option value="all">{t.transactions.allCategories}</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>{t.transactions.planning}</span>

            <select
              value={plannedFilter}
              onChange={(event) =>
                setPlannedFilter(event.target.value as PlannedFilter)
              }
            >
              <option value="all">{t.transactions.allOperations}</option>

              <option value="planned">{t.transactions.planned}</option>

              <option value="unplanned">{t.transactions.unplanned}</option>
            </select>
          </label>

          <label>
            <span>{t.transactions.sorting}</span>

            <select
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value as SortOption)
              }
            >
              <option value="date-desc">{t.transactions.newestFirst}</option>

              <option value="date-asc">{t.transactions.oldestFirst}</option>

              <option value="amount-desc">{t.transactions.largestFirst}</option>

              <option value="amount-asc">{t.transactions.smallestFirst}</option>
            </select>
          </label>
        </div>
      </div>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="transactions-empty">
            <div className="transactions-empty__icon" aria-hidden="true">
              ◈
            </div>

            <h3>{t.transactions.emptyTitle}</h3>

            <p>{t.transactions.emptyDescription}</p>
          </div>
        ) : sortedTransactions.length === 0 ? (
          <div className="transactions-empty">
            <div className="transactions-empty__icon" aria-hidden="true">
              ⌕
            </div>

            <h3>{t.transactions.noResultsTitle}</h3>

            <p>{t.transactions.noResultsDescription}</p>
          </div>
        ) : (
          sortedTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default TransactionList;
