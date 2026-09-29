import { useEffect } from 'react';
import type { Transaction } from '../types/transaction';
import { useTransactionStore } from '../store/transactionStore';
import { useLanguageStore } from '../store/languageStore';
import { getTranslations } from '../utils/translations';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

function TransactionForm({
  editingTransaction,
  onFinishEditing,
}: TransactionFormProps) {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslations(language);

  const addTransaction = useTransactionStore((state) => state.addTransaction);

  const updateTransaction = useTransactionStore(
    (state) => state.updateTransaction,
  );

  const transactionSchema = z.object({
    amount: z
      .string()
      .min(1, t.form.errors.amountRequired)
      .refine((value) => Number(value) > 0, t.form.errors.amountPositive),

    category: z.string().min(1, t.form.errors.categoryRequired),

    description: z.string().min(1, t.form.errors.descriptionRequired),

    date: z.string().min(1, t.form.errors.dateRequired),

    isPlanned: z.boolean(),

    type: z.enum(['income', 'expense']),
  });

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
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    if (!editingTransaction) {
      reset({
        type: 'expense',
        isPlanned: false,
        date: new Date().toISOString().split('T')[0],
        amount: '',
        category: '',
        description: '',
      });

      return;
    }

    setValue('amount', String(editingTransaction.amount));
    setValue('category', editingTransaction.category);
    setValue('description', editingTransaction.description);
    setValue('date', editingTransaction.date);
    setValue('isPlanned', editingTransaction.isPlanned);
    setValue('type', editingTransaction.type);
  }, [editingTransaction, reset, setValue]);

  return (
    <form
      className={`transaction-form ${
        editingTransaction ? 'transaction-form--editing' : ''
      }`}
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

        reset({
          type: 'expense',
          isPlanned: false,
          date: new Date().toISOString().split('T')[0],
          amount: '',
          category: '',
          description: '',
        });
      })}
    >
      <div className="transaction-form__header">
        <div>
          <p className="section-eyebrow">
            {editingTransaction ? t.form.editingEyebrow : t.form.newEyebrow}
          </p>

          <h2>{editingTransaction ? t.form.editingTitle : t.form.newTitle}</h2>

          <p className="transaction-form__description">
            {editingTransaction
              ? t.form.editingDescription
              : t.form.newDescription}
          </p>
        </div>

        <div className="transaction-form__header-icon" aria-hidden="true">
          {editingTransaction ? '✎' : '+'}
        </div>
      </div>

      <div className="transaction-form__body">
        <fieldset className="transaction-form__type">
          <legend>{t.form.operationType}</legend>

          <div className="transaction-type-options">
            <label className="transaction-type-option transaction-type-option--income">
              <input type="radio" value="income" {...register('type')} />

              <span className="transaction-type-option__content">
                <span
                  className="transaction-type-option__icon"
                  aria-hidden="true"
                >
                  ↗
                </span>

                <span>
                  <strong>{t.form.income}</strong>
                  <small>{t.form.incomeDescription}</small>
                </span>
              </span>
            </label>

            <label className="transaction-type-option transaction-type-option--expense">
              <input type="radio" value="expense" {...register('type')} />

              <span className="transaction-type-option__content">
                <span
                  className="transaction-type-option__icon"
                  aria-hidden="true"
                >
                  ↘
                </span>

                <span>
                  <strong>{t.form.expense}</strong>
                  <small>{t.form.expenseDescription}</small>
                </span>
              </span>
            </label>
          </div>
        </fieldset>

        <div className="transaction-form__fields">
          <label className="transaction-form__field transaction-form__field--amount">
            <span>{t.form.amount}</span>

            <div className="transaction-form__input-wrapper">
              <input
                type="number"
                inputMode="decimal"
                placeholder="0"
                {...register('amount')}
              />
            </div>

            {errors.amount && (
              <small className="transaction-form__error">
                {errors.amount.message}
              </small>
            )}
          </label>

          <label className="transaction-form__field">
            <span>{t.form.category}</span>

            <input
              type="text"
              placeholder={t.form.categoryPlaceholder}
              {...register('category')}
            />

            {errors.category && (
              <small className="transaction-form__error">
                {errors.category.message}
              </small>
            )}
          </label>

          <label className="transaction-form__field transaction-form__field--wide">
            <span>{t.form.description}</span>

            <input
              type="text"
              placeholder={t.form.descriptionPlaceholder}
              {...register('description')}
            />

            {errors.description && (
              <small className="transaction-form__error">
                {errors.description.message}
              </small>
            )}
          </label>

          <label className="transaction-form__field">
            <span>{t.form.date}</span>

            <input type="date" {...register('date')} />

            {errors.date && (
              <small className="transaction-form__error">
                {errors.date.message}
              </small>
            )}
          </label>
        </div>

        <label className="transaction-form__planned">
          <input type="checkbox" {...register('isPlanned')} />

          <span className="transaction-form__checkbox">
            <span>✓</span>
          </span>

          <span className="transaction-form__planned-content">
            <strong>{t.form.planned}</strong>
            <small>{t.form.plannedDescription}</small>
          </span>
        </label>
      </div>

      <div className="transaction-form__footer">
        {editingTransaction && (
          <button
            type="button"
            className="transaction-form__cancel"
            onClick={() => {
              onFinishEditing();
              reset({
                type: 'expense',
                isPlanned: false,
                date: new Date().toISOString().split('T')[0],
                amount: '',
                category: '',
                description: '',
              });
            }}
          >
            {t.form.cancel}
          </button>
        )}

        <button type="submit" className="transaction-form__submit">
          {editingTransaction ? t.form.save : t.form.add}
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
