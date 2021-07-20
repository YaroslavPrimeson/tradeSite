import "./RadioSwitch.scss";

const RadioSwitch = ({ isOn, handleToggle }) => {
  return (
    <div>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={isOn}
        onChange={handleToggle}
      />
      <label
        className="react-switch-label"
        htmlFor={`react-switch-new`}
        style={{ background: isOn && "#ddaa00" }}
      >
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default RadioSwitch;
