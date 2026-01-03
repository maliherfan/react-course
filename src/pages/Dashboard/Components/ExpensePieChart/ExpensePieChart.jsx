import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import './ExpensePieChart.css';

const ExpensePieChart = ({ totalIncome, totalExpense }) => {
  const data = [
    { name: 'درآمد', value: totalIncome, color: '#3ebda0' },
    { name: 'هزینه', value: totalExpense, color: '#ef4e4e' },
  ];

  if (totalIncome === 0 && totalExpense === 0) {
    return (
      <div className="chart-container">
        <h3>توزیع درآمد و هزینه</h3>
        <div className="chart-placeholder">
          <p>داده‌ای برای نمایش موجود نیست</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3>توزیع درآمد و هزینه ی کل</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            innerRadius={60}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [
              `${value.toLocaleString('fa-IR')} تومان (${(value / (totalIncome + totalExpense) * 100).toFixed(2)}%)`,
              'مقدار',
            ]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
