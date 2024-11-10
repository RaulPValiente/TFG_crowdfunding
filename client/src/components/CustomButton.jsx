import PropTypes from 'prop-types';

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

CustomButton.propTypes = {
  btnType: PropTypes.string,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  styles: PropTypes.string,
};

export default CustomButton;
