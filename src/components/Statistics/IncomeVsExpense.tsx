import { useTransactionStore } from '../../store/transactionStore';
import { calculateIncomeAndExpenses } from '../../utils/statisticsCalculations';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function IncomeVsExpenses() {
  const transactions = useTransactionStore((state) => state.transactions);

  const incomeAndExpenses = calculateIncomeAndExpenses(transactions);

  return (
    <section>
      <h2>Доходы и расходы</h2>

      <BarChart width={400} height={300} data={incomeAndExpenses}>
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" />
      </BarChart>
    </section>
  );
}

export default IncomeVsExpenses;
