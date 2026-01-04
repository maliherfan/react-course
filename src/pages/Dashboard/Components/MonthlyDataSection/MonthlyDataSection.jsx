
const MonthlyDataSection = ({ monthlyData }) => {
  return (
    <>
      <h3>📊 داده‌های ماهانه(چند ماه اخیر) </h3>
      <div className="monthly-data-grid">
        {monthlyData.map((month) => (
          <div key={month.key} className="month-data-card">
            <h4>{month.name}</h4>
            <div className="month-amounts">
              <div className="amount-row">
                <span>درآمد:</span>
                <span className="income">
                   {month.income.toLocaleString('fa-IR') + ' تومان'}
                </span>
              </div>
              <div className="amount-row">
                <span>هزینه:</span>
                <span className="expense">
                   {month.expense.toLocaleString('fa-IR') + ' تومان'}
                </span>
              </div>
              <div className="amount-row">
                <span>تراز:</span>
                <span className={month.balance >= 0 ? 'income' : 'expense'}>
                  {Math.abs(month.balance).toLocaleString('fa-IR') + ' تومان'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MonthlyDataSection;
