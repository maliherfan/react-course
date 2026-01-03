import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const MonthlyBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container">
        <h3>وضعیت ماهانه درآمد و هزینه</h3>
        <div className="chart-placeholder">
          <p>داده‌ای برای نمایش موجود نیست</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3>وضعیت ماه های اخیر درآمد و هزینه</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={40} barGap={5}>
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="start"
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} textAnchor="start" />
          <Tooltip
            formatter={(value) => value.toLocaleString('fa-IR') + ' تومان'}
            labelFormatter={(label) => `ماه: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="income"
            name="درآمد"
            fill="#3ebda0"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="expense"
            name="هزینه"
            fill="#ef4e4e"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
