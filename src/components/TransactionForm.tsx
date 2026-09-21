import type { Transaction } from '../types/transaction';
import { useState } from 'react';

type TransactionFormProps = {
  onAddTransaction: (transaction: Transaction) => void;
};

function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [isPlanned, setIsPlanned] = useState(false);
  const [type, setType] = useState<'income' | 'expense'>('expense');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const newTransaction: Transaction = {
          id: crypto.randomUUID(),
          type,
          amount: Number(amount),
          category,
          description,
          date,
          isPlanned,
        };

        onAddTransaction(newTransaction);
      }}
    >
      <h2>Добавить операцию</h2>

      <div>
        <button type="button" onClick={() => setType('income')}>
          Доход
        </button>
        <button type="button" onClick={() => setType('expense')}>
          Расход
        </button>
      </div>

      <label>
        Сумма
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />
      </label>

      <label>
        Категория
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
      </label>

      <label>
        Описание
        <input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label>
        Дата
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>

      <label>
        <input
          type="checkbox"
          checked={isPlanned}
          onChange={(event) => setIsPlanned(event.target.checked)}
        />
        Запланированная операция
      </label>

      <button type="submit">Добавить</button>
    </form>
  );
}

export default TransactionForm;
