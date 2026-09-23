import { useState } from 'react';
import type { Transaction } from '../types/transaction';
import TransactionItem from './TransactionItem';
import { useTransactionStore } from '../store/transactionStore';

type TransactionListProps = {
  onEdit: (transaction: Transaction) => void;
};

type TransactionFilter = 'all' | 'income' | 'expense';

type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

type PlannedFilter = 'all' | 'planned' | 'unplanned';

function TransactionList({ onEdit }: TransactionListProps) {
  const transactions = useTransactionStore((state) => state.transactions);

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
    <section>
      <h2>Транзакции</h2>

      <div>
        <button onClick={() => setFilter('all')}>Все</button>

        <button onClick={() => setFilter('income')}>Доходы</button>

        <button onClick={() => setFilter('expense')}>Расходы</button>
      </div>

      <div>
        <select
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="all">Все категории</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={plannedFilter}
          onChange={(event) =>
            setPlannedFilter(event.target.value as PlannedFilter)
          }
        >
          <option value="all">Все операции</option>
          <option value="planned">Запланированные</option>
          <option value="unplanned">Незапланированные</option>
        </select>

        <select
          value={sortOption}
          onChange={(event) => setSortOption(event.target.value as SortOption)}
        >
          <option value="date-desc">Новые сначала</option>
          <option value="date-asc">Старые сначала</option>
          <option value="amount-desc">Сначала большие суммы</option>
          <option value="amount-asc">Сначала маленькие суммы</option>
        </select>
      </div>

      {sortedTransactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onEdit={onEdit}
        />
      ))}
    </section>
  );
}

export default TransactionList;
