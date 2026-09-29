import { useLanguageStore } from '../../store/languageStore';
import { getTranslations } from '../../utils/translations';
import ExpenseByCategory from './ExpenseByCategory';
import IncomeVsExpenses from './IncomeVsExpense';
import ExpenseDynamics from './ExpenseDynamics';

function Statistics() {
  const language = useLanguageStore((state) => state.language);
  const t = getTranslations(language);

  return (
    <section className="statistics-section">
      <div className="statistics-section__header">
        <div>
          <p className="section-eyebrow">{t.statistics.eyebrow}</p>

          <h2>{t.statistics.title}</h2>

          <p className="statistics-section__description">
            {t.statistics.description}
          </p>
        </div>
      </div>

      <div className="statistics-grid">
        <ExpenseByCategory />

        <IncomeVsExpenses />

        <ExpenseDynamics />
      </div>
    </section>
  );
}

export default Statistics;
