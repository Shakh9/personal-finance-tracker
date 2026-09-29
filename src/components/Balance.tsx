import { useTransactionStore } from '../store/transactionStore';
import {
  calculateBalance,
  calculateTotalExpenses,
  calculateTotalIncome,
} from '../utils/transactionCalculations';
import { useLanguageStore } from '../store/languageStore';
import { getTranslations } from '../utils/translations';

function Balance() {
  const transactions = useTransactionStore((state) => state.transactions);
  const language = useLanguageStore((state) => state.language);

  const t = getTranslations(language);

  const totalExpenses = calculateTotalExpenses(transactions);
  const totalIncomes = calculateTotalIncome(transactions);
  const balance = calculateBalance(transactions);

  return (
    <section className="balance-card">
      <div className="balance-card__header">
        <div>
          <p className="balance-card__label">{t.balance.label}</p>

          <h2
            className={balance >= 0 ? 'balance-positive' : 'balance-negative'}
          >
            {balance.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-US')}
          </h2>
        </div>

        <div className="balance-card__icon" aria-hidden="true">
          ◈
        </div>
      </div>

      <div className="balance-card__stats">
        <div className="balance-stat balance-stat--income">
          <div className="balance-stat__icon">↗</div>

          <div>
            <p>{t.balance.income}</p>

            <strong>
              {totalIncomes.toLocaleString(
                language === 'ru' ? 'ru-RU' : 'en-US',
              )}
            </strong>
          </div>
        </div>

        <div className="balance-stat balance-stat--expense">
          <div className="balance-stat__icon">↘</div>

          <div>
            <p>{t.balance.expenses}</p>

            <strong>
              {totalExpenses.toLocaleString(
                language === 'ru' ? 'ru-RU' : 'en-US',
              )}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Balance;
