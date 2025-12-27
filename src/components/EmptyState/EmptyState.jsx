import './EmptyState.css';

const EmptyState = ({ message = 'شما هنوز تراکنشی وارد نکرده‌اید.' }) => {
  return (
    <div className='empty-state'>
      <img src="public/icons/danger-circle.svg" width="24" height="24" />
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
