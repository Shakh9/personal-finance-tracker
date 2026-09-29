import { useTransactionStore } from '../../store/transactionStore';
import { useLanguageStore } from '../../store/languageStore';
import { getTranslations } from '../../utils/translations';
import { calculateIncomeAndExpenses } from '../../utils/statisticsCalculations';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

function IncomeVsExpenses() {
  const transactions = useTransactionStore((state) => state.transactions);

  const language = useLanguageStore((state) => state.language);
  const t = getTranslations(language);

  const incomeAndExpenses = calculateIncomeAndExpenses(transactions);

  const locale = language === 'ru' ? 'ru-RU' : 'en-US';

  return (
    <article className="statistics-card">
      <div className="statistics-card__header">
        <div>
          <h3>{t.statistics.incomeAndExpenses}</h3>
          <p>{t.statistics.incomeAndExpensesDescription}</p>
        </div>

        <span className="statistics-card__icon" aria-hidden="true">
          ↕
        </span>
      </div>

      <div className="statistics-chart">
        <ResponsiveContainer width={500} height={300}>
          <BarChart
            data={incomeAndExpenses}
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
              dataKey="type"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: 'var(--color-text-secondary)',
                fontSize: 12,
              }}
              tickFormatter={(value) => {
                if (value === 'Доходы') {
                  return t.balance.income;
                }

                if (value === 'Расходы') {
                  return t.balance.expenses;
                }

                return value;
              }}
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
              labelFormatter={(value) => {
                if (value === 'Доходы') {
                  return t.balance.income;
                }

                if (value === 'Расходы') {
                  return t.balance.expenses;
                }

                return value;
              }}
              formatter={(value) => [
                Number(value).toLocaleString(locale),
                t.statistics.amount,
              ]}
            />

            <Bar dataKey="amount" radius={[8, 8, 0, 0]} maxBarSize={64}>
              {incomeAndExpenses.map((entry) => (
                <Cell
                  key={entry.type}
                  fill={
                    entry.type === 'Доходы'
                      ? 'var(--color-income)'
                      : 'var(--color-expense)'
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}

export default IncomeVsExpenses;
