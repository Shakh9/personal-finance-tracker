import { useTransactionStore } from '../../store/transactionStore';
import { calculateExpensesByDate } from '../../utils/statisticsCalculations';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function ExpenseDynamics() {
  const transactions = useTransactionStore((state) => state.transactions);

  const expensesByDate = calculateExpensesByDate(transactions);

  return (
    <section>
      <h2>Динамика расходов</h2>

      <LineChart width={500} height={300} data={expensesByDate}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" />
      </LineChart>
    </section>
  );
}

export default ExpenseDynamics;
