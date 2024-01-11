import css from "./FilterBox.module.css";

let FilterBox = ({ leftIcon, rightIcon, text, onClick }) => {
  return (
    <div className={css.outerDiv} onClick={onClick}>
      {leftIcon ? (
        <div className={css.leftIconBox}>
          <img className={css.leftIcon} src={leftIcon} alt="icon" />
        </div>
      ) : null}
      <div className={css.text}>{text}</div>
      {rightIcon ? (
        <div className={css.rightIconBox}>
          <img className={css.rightIcon} src={rightIcon} alt="icon" />
        </div>
      ) : null}
    </div>
  );
};

export default FilterBox;
