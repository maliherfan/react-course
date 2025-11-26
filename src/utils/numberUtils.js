export const toEnglishNumbers = (str) => {
  if (!str) return '';
  return str.toString()
    .replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
};

export const normalizeDate = (dateString) => {
  if (!dateString) return '';
  
  const englishDate = toEnglishNumbers(dateString);
  const parts = englishDate.split('/');
  
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${year.padStart(4, '0')}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
  }
  
  return englishDate;
};