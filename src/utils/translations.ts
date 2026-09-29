import type { Language } from '../store/languageStore';

const translations = {
  ru: {
    app: {
      title: 'Personal Finance Tracker',
    },

    language: {
      russian: 'Русский',
      english: 'English',
    },

    balance: {
      label: 'ТЕКУЩИЙ БАЛАНС',
      income: 'Доходы',
      expenses: 'Расходы',
    },

    transactions: {
      eyebrow: 'ОПЕРАЦИИ',
      title: 'Транзакции',
      all: 'Все',
      income: 'Доходы',
      expenses: 'Расходы',

      category: 'Категория',
      allCategories: 'Все категории',

      planning: 'Планирование',
      allOperations: 'Все операции',
      planned: 'Запланированные',
      unplanned: 'Незапланированные',

      sorting: 'Сортировка',
      newestFirst: 'Новые сначала',
      oldestFirst: 'Старые сначала',
      largestFirst: 'Сначала большие суммы',
      smallestFirst: 'Сначала маленькие суммы',

      edit: 'Редактировать',
      delete: 'Удалить',
      plannedLabel: 'Запланировано',

      emptyTitle: 'Пока нет операций',
      emptyDescription:
        'Добавь первую доходную или расходную операцию, чтобы начать отслеживать свои финансы.',

      noResultsTitle: 'Ничего не найдено',
      noResultsDescription:
        'По выбранным фильтрам нет подходящих операций. Попробуй изменить условия поиска.',
    },

    form: {
      editingEyebrow: 'РЕДАКТИРОВАНИЕ',
      newEyebrow: 'НОВАЯ ОПЕРАЦИЯ',

      editingTitle: 'Редактировать операцию',
      newTitle: 'Добавить операцию',

      editingDescription: 'Измените необходимые данные и сохраните операцию.',
      newDescription: 'Добавьте доход или расход, чтобы следить за финансами.',

      operationType: 'Тип операции',

      income: 'Доход',
      incomeDescription: 'Деньги поступили',

      expense: 'Расход',
      expenseDescription: 'Деньги потрачены',

      amount: 'Сумма',
      category: 'Категория',
      categoryPlaceholder: 'Например, Еда',

      description: 'Описание',
      descriptionPlaceholder: 'Например, продукты на неделю',

      date: 'Дата',

      planned: 'Запланированная операция',
      plannedDescription: 'Отметьте, если операция была запланирована заранее.',

      cancel: 'Отмена',
      save: 'Сохранить изменения',
      add: 'Добавить операцию',

      errors: {
        amountRequired: 'Введите сумму',
        amountPositive: 'Сумма должна быть больше 0',
        categoryRequired: 'Введите категорию',
        descriptionRequired: 'Введите описание',
        dateRequired: 'Выберите дату',
      },
    },

    statistics: {
      eyebrow: 'АНАЛИТИКА',
      title: 'Статистика',
      description: 'Основные показатели по твоим финансовым операциям.',

      expensesByCategory: 'Расходы по категориям',
      expensesByCategoryDescription: 'Куда уходят деньги',

      incomeAndExpenses: 'Доходы и расходы',
      incomeAndExpensesDescription: 'Сравнение денежных потоков',

      expenseDynamics: 'Динамика расходов',
      expenseDynamicsDescription: 'Изменение расходов по дням',

      expenses: 'Расходы',
      amount: 'Сумма',

      noExpenses: 'Пока нет расходов для анализа',
      noDynamics: 'Пока нет расходов для построения динамики',
    },
  },

  en: {
    app: {
      title: 'Personal Finance Tracker',
    },

    language: {
      russian: 'Русский',
      english: 'English',
    },

    balance: {
      label: 'CURRENT BALANCE',
      income: 'Income',
      expenses: 'Expenses',
    },

    transactions: {
      eyebrow: 'TRANSACTIONS',
      title: 'Transactions',
      all: 'All',
      income: 'Income',
      expenses: 'Expenses',

      category: 'Category',
      allCategories: 'All categories',

      planning: 'Planning',
      allOperations: 'All operations',
      planned: 'Planned',
      unplanned: 'Unplanned',

      sorting: 'Sorting',
      newestFirst: 'Newest first',
      oldestFirst: 'Oldest first',
      largestFirst: 'Largest amounts first',
      smallestFirst: 'Smallest amounts first',

      edit: 'Edit',
      delete: 'Delete',
      plannedLabel: 'Planned',

      emptyTitle: 'No transactions yet',
      emptyDescription:
        'Add your first income or expense to start tracking your finances.',

      noResultsTitle: 'Nothing found',
      noResultsDescription:
        'There are no transactions matching the selected filters. Try changing the filters.',
    },

    form: {
      editingEyebrow: 'EDITING',
      newEyebrow: 'NEW TRANSACTION',

      editingTitle: 'Edit transaction',
      newTitle: 'Add transaction',

      editingDescription:
        'Change the required information and save the transaction.',
      newDescription: 'Add income or expense to keep track of your finances.',

      operationType: 'Transaction type',

      income: 'Income',
      incomeDescription: 'Money received',

      expense: 'Expense',
      expenseDescription: 'Money spent',

      amount: 'Amount',
      category: 'Category',
      categoryPlaceholder: 'For example, Food',

      description: 'Description',
      descriptionPlaceholder: 'For example, groceries for the week',

      date: 'Date',

      planned: 'Planned transaction',
      plannedDescription:
        'Mark this if the transaction was planned in advance.',

      cancel: 'Cancel',
      save: 'Save changes',
      add: 'Add transaction',

      errors: {
        amountRequired: 'Enter an amount',
        amountPositive: 'Amount must be greater than 0',
        categoryRequired: 'Enter a category',
        descriptionRequired: 'Enter a description',
        dateRequired: 'Select a date',
      },
    },

    statistics: {
      eyebrow: 'ANALYTICS',
      title: 'Statistics',
      description: 'Key insights from your financial transactions.',

      expensesByCategory: 'Expenses by category',
      expensesByCategoryDescription: 'Where your money goes',

      incomeAndExpenses: 'Income and expenses',
      incomeAndExpensesDescription: 'Cash flow comparison',

      expenseDynamics: 'Expense dynamics',
      expenseDynamicsDescription: 'Expenses over time',

      expenses: 'Expenses',
      amount: 'Amount',

      noExpenses: 'No expenses to analyze yet',
      noDynamics: 'No expenses to build a trend yet',
    },
  },
} as const;

export function getTranslations(language: Language) {
  return translations[language];
}
