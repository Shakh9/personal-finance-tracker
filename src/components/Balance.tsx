type BalanceProps = {
  income: number;
  expenses: number;
  balance: number;
};

function Balance(props: BalanceProps) {
  return (
    <section>
      <h2>Баланс: {props.balance}</h2>
      <p>Доходы: {props.income}</p>
      <p>Расходы: {props.expenses}</p>
    </section>
  );
}

export default Balance;
