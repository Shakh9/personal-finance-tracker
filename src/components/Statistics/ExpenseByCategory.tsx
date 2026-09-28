import { useTransactionStore } from '../../store/transactionStore';
import { calculateExpensesByCategory } from '../../utils/statisticsCalculations';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

function ExpenseByCategory() {
  const transactions = useTransactionStore((state) => state.transactions);

  const expensesByCategory = calculateExpensesByCategory(transactions);

  return (
    <section>
      <h2>Расходы по категориям</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={expensesByCategory}
          dataKey="amount"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={100}
        >
          {expensesByCategory.map((entry) => (
            <Cell key={entry.category} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </section>
  );
}

export default ExpenseByCategory;
