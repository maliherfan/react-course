import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img
        src="/icons/not-found.svg"
        alt="صفحه پیدا نشد"
        className="not-found-image"
      />
      <p className="not-found-text">صفحه مورد نظر پیدا نشد!</p>
    </div>
  );
};

export default NotFound;
