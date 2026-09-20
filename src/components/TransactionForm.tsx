function TransactionForm() {
  return (
    <form>
      <h2>Добавить операцию</h2>

      <div>
        <button type="button">Доход</button>
        <button type="button">Расход</button>
      </div>

      <label>
        Сумма
        <input type="number" />
      </label>

      <label>
        Категория
        <input type="text" />
      </label>

      <label>
        Описание
        <input type="text" />
      </label>

      <label>
        Дата
        <input type="date" />
      </label>

      <label>
        <input type="checkbox" />
        Запланированная операция
      </label>

      <button type="submit">Добавить</button>
    </form>
  );
}

export default TransactionForm;
