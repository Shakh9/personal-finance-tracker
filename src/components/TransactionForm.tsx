import type { Transaction } from '../types/transaction';
import { useTransactionStore } from '../store/transactionStore';
import { useForm } from 'react-hook-form';
import { readonly, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type TransactionFormValues = {
  amount: string;
  category: string;
  description: string;
  date: string;
  isPlanned: boolean;
  type: 'income' | 'expense';
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

function TransactionForm() {
  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: 'expense',
      isPlanned: false,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
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
        reset();
      })}
    >
      <h2>Добавить операцию</h2>

      <div>
        <label htmlFor="">
          <input type="radio" value="income" {...register('type')} /> Доход
        </label>

        <label htmlFor="">
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

      <button type="submit">Добавить</button>
    </form>
  );
}

export default TransactionForm;
