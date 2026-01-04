import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';

import { toEnglishNumbers } from '../../utils/numberUtils';

import './CompactFilterBar.css';

const CompactFilterBar = ({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
}) => {
  const handleDateChange = (date, field) => {
    const dateString = date?.format?.('YYYY/MM/DD') || '';
    const englishDate = toEnglishNumbers(dateString);

    const newFilters = {
      ...filters,
      [field]: englishDate,
    };
    onFilterChange(newFilters);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  return (
    <div className="compact-filter-bar">
      <div className="filter-controls">
        <div className="filter-group">
          <label>از تاریخ</label>
          <div className="date-picker-wrapper">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={filters.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
              format="YYYY/MM/DD"
              placeholder="انتخاب کنید"
              inputClass="date-picker-input"
              containerClassName="date-picker-container"
            />
            <img
              className="calendar-icon"
              src="/icons/calender.svg"
              alt="تقویم"
              width="24"
              height="24"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>تا تاریخ</label>
          <div className="date-picker-wrapper">
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={filters.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
              format="YYYY/MM/DD"
              placeholder="انتخاب کنید"
              inputClass="date-picker-input"
              containerClassName="date-picker-container"
            />
            <img
              className="calendar-icon"
              src="/icons/calender.svg"
              alt="تقویم"
              width="24"
              height="24"
            />
          </div>
        </div>

        <div className="filter-group">
          <label>ترتیب نمایش</label>
          <div className="sort-select-wrapper">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="date-desc">جدیدترین</option>
              <option value="date-asc">قدیمی‌ترین</option>
              <option value="income-desc">بالاترین درآمد</option>
              <option value="income-asc">کمترین درآمد</option>
              <option value="outcome-desc">بالاترین هزینه</option>
              <option value="outcome-asc">کمترین هزینه</option>
            </select>
            <img
              className="dropdown-icon"
              src="/icons/chevron-down.svg"
              alt="انتخاب"
              width="24"
              height="24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompactFilterBar;
