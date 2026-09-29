import { useTransactionStore } from '../../store/transactionStore';
import { useLanguageStore } from '../../store/languageStore';
import { getTranslations } from '../../utils/translations';
import { calculateExpensesByDate } from '../../utils/statisticsCalculations';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function ExpenseDynamics() {
  const transactions = useTransactionStore((state) => state.transactions);

  const language = useLanguageStore((state) => state.language);
  const t = getTranslations(language);

  const expensesByDate = calculateExpensesByDate(transactions);

  const locale = language === 'ru' ? 'ru-RU' : 'en-US';

  return (
    <article className="statistics-card statistics-card--wide">
      <div className="statistics-card__header">
        <div>
          <h3>{t.statistics.expenseDynamics}</h3>
          <p>{t.statistics.expenseDynamicsDescription}</p>
        </div>

        <span className="statistics-card__icon" aria-hidden="true">
          ⌁
        </span>
      </div>

      {expensesByDate.length === 0 ? (
        <div className="statistics-empty">
          <span aria-hidden="true">⌁</span>
          <p>{t.statistics.noDynamics}</p>
        </div>
      ) : (
        <div className="statistics-chart">
          <ResponsiveContainer width={500} height={300}>
            <LineChart
              data={expensesByDate}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="var(--color-border)"
              />

              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: 'var(--color-text-secondary)',
                  fontSize: 11,
                }}
                tickFormatter={(value) =>
                  new Date(`${value}T00:00:00`).toLocaleDateString(locale, {
                    day: 'numeric',
                    month: 'short',
                  })
                }
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                width={55}
                tick={{
                  fill: 'var(--color-text-muted)',
                  fontSize: 11,
                }}
                tickFormatter={(value) => Number(value).toLocaleString(locale)}
              />

              <Tooltip
                labelFormatter={(value) =>
                  new Date(`${value}T00:00:00`).toLocaleDateString(locale, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                }
                formatter={(value) => [
                  Number(value).toLocaleString(locale),
                  t.statistics.expenses,
                ]}
              />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="var(--color-expense)"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: 'var(--color-expense)',
                  strokeWidth: 2,
                  stroke: 'var(--color-surface)',
                }}
                activeDot={{
                  r: 6,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}

export default ExpenseDynamics;
