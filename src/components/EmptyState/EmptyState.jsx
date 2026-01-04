import './EmptyState.css';

const EmptyState = ({ message = 'شما هنوز تراکنشی وارد نکرده‌اید.' }) => {
  return (
    <div className="empty-state">
      <img src="/icons/danger-circle.svg" width={24} height={24} alt="هشدار" />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
