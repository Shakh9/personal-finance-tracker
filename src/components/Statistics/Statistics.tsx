import ExpenseByCategory from './ExpenseByCategory';
import IncomeVsExpenses from './IncomeVsExpense';
import ExpenseDynamics from './ExpenseDynamics';

function Statistics() {
  return (
    <section>
      <h2>Статистика</h2>

      <ExpenseByCategory />

      <IncomeVsExpenses />

      <ExpenseDynamics />
    </section>
  );
}

export default Statistics;
