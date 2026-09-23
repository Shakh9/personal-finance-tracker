import type { Transaction } from '../types/transaction';
import { useTransactionStore } from '../store/transactionStore';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

type TransactionFormValues = {
  amount: string;
  category: string;
  description: string;
  date: string;
  isPlanned: boolean;
  type: 'income' | 'expense';
};

type TransactionFormProps = {
  editingTransaction: Transaction | null;
  onFinishEditing: () => void;
};

const transactionSchema = z.object({
  amount: z
    .string()
    .min(1, 'Введите сумму')
    .refine((value) => Number(value) > 0, 'Сумма должна быть больше 0'),
  category: z.string().min(1, 'Введите категорию'),
  description: z.string().min(1, 'Введите описание'),
  date: z.string().min(1, 'Выберите дату'),
  isPlanned: z.boolean(),
  type: z.enum(['income', 'expense']),
});

function TransactionForm({
  editingTransaction,
  onFinishEditing,
}: TransactionFormProps) {
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      isPlanned: false,
    },
  });

  useEffect(() => {
    if (!editingTransaction) {
      return;
    }

    setValue('amount', String(editingTransaction.amount));
    setValue('category', editingTransaction.category);
    setValue('description', editingTransaction.description);
    setValue('date', editingTransaction.date);
    setValue('isPlanned', editingTransaction.isPlanned);
    setValue('type', editingTransaction.type);
  }, [editingTransaction, setValue]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        if (editingTransaction) {
          const updatedTransaction: Transaction = {
            id: editingTransaction.id,
            type: data.type,
            amount: Number(data.amount),
            category: data.category,
            description: data.description,
            date: data.date,
            isPlanned: data.isPlanned,
          };

          updateTransaction(updatedTransaction);
          onFinishEditing();
        } else {
          const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            type: data.type,
            amount: Number(data.amount),
            category: data.category,
            description: data.description,
            date: data.date,
            isPlanned: data.isPlanned,
          };

          addTransaction(newTransaction);
        }

        reset();
      })}
    >
      <h2>
        {editingTransaction ? 'Редактировать операцию' : 'Добавить операцию'}
      </h2>

      <div>
        <label>
          <input type="radio" value="income" {...register('type')} /> Доход
        </label>

        <label>
          <input type="radio" value="expense" {...register('type')} /> Расход
        </label>
      </div>

      <label>
        Сумма
        <input type="number" {...register('amount')} />
        {errors.amount && <p>{errors.amount.message}</p>}
      </label>

      <label>
        Категория
        <input type="text" {...register('category')} />
        {errors.category && <p>{errors.category.message}</p>}
      </label>

      <label>
        Описание
        <input type="text" {...register('description')} />
        {errors.description && <p>{errors.description.message}</p>}
      </label>

      <label>
        Дата
        <input type="date" {...register('date')} />
        {errors.date && <p>{errors.date.message}</p>}
      </label>

      <label>
        <input type="checkbox" {...register('isPlanned')} />
        Запланированная операция
      </label>

      <button type="submit">
        {editingTransaction ? 'Сохранить изменения' : 'Добавить'}
      </button>

      {editingTransaction && (
        <button
          type="button"
          onClick={() => {
            onFinishEditing();
            reset();
          }}
        >
          Отмена
        </button>
      )}
    </form>
  );
}

export default TransactionForm;
