import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './MonthlyBarChart.css';

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
      <h3>وضعیت ماهانه درآمد و هزینه</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="start"
            height={80}
            tick={{ fontSize: 12 }}
          />
          <YAxis tick={{ fontSize: 12 }} textAnchor="start" />
          <Tooltip
            formatter={value => value.toLocaleString('fa-IR') + ' ریال'}
            labelFormatter={label => `ماه: ${label}`}
          />
          <Legend />
          <Bar dataKey="income" name="درآمد" fill="#3ebda0" />
          <Bar dataKey="expense" name="هزینه" fill="#ef4e4e" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
