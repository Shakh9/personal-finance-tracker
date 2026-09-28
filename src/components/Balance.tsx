import { useTransactionStore } from '../store/transactionStore';
import {
  calculateBalance,
  calculateTotalExpenses,
  calculateTotalIncome,
} from '../utils/transactionCalculations';

function Balance() {
  const transactions = useTransactionStore((state) => state.transactions);

  const totalExpenses = calculateTotalExpenses(transactions);
  const totalIncomes = calculateTotalIncome(transactions);
  const balance = calculateBalance(transactions);

  return (
    <section>
      <h2>Баланс: {balance}</h2>
      <p>Доходы: {totalIncomes}</p>
      <p>Расходы: {totalExpenses}</p>
    </section>
  );
}

export default Balance;
