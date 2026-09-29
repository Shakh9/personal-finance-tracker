import { useTransactionStore } from '../../store/transactionStore';
import { useLanguageStore } from '../../store/languageStore';
import { getTranslations } from '../../utils/translations';
import { calculateExpensesByCategory } from '../../utils/statisticsCalculations';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

function ExpenseByCategory() {
  const transactions = useTransactionStore((state) => state.transactions);

  const language = useLanguageStore((state) => state.language);
  const t = getTranslations(language);

  const expensesByCategory = calculateExpensesByCategory(transactions);

  const locale = language === 'ru' ? 'ru-RU' : 'en-US';

  return (
    <article className="statistics-card statistics-card--pie">
      <div className="statistics-card__header">
        <div>
          <h3>{t.statistics.expensesByCategory}</h3>
          <p>{t.statistics.expensesByCategoryDescription}</p>
        </div>

        <span className="statistics-card__icon" aria-hidden="true">
          ◔
        </span>
      </div>

      {expensesByCategory.length === 0 ? (
        <div className="statistics-empty">
          <span aria-hidden="true">◔</span>
          <p>{t.statistics.noExpenses}</p>
        </div>
      ) : (
        <div className="statistics-chart statistics-chart--pie">
          <ResponsiveContainer width={500} height={300}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius="72%"
                innerRadius="42%"
                paddingAngle={2}
              >
                {expensesByCategory.map((entry, index) => (
                  <Cell
                    key={entry.category}
                    fill={`hsl(${index * 67 + 220}, 75%, 62%)`}
                  />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  Number(value).toLocaleString(locale),
                  t.statistics.expenses,
                ]}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}

export default ExpenseByCategory;
