import "./header.css";
import "./ToggleSwitch.css";

function ToggleSwitch({ isToggleSwitchOn, onToggleSwitchChange }) {
  return (
    <div className={`toggle-switch ${isToggleSwitchOn ? 'toggle-switch_on' : ''}`}>
    <label htmlFor="toggle-switch" className="toggle-switch__label">
      <input
        id="toggle-switch"
        type="checkbox"
        className="toggle-switch__checkbox"
        checked={isToggleSwitchOn}
        onChange={onToggleSwitchChange}
      />
        <span className="toggle-switch__circle"></span>
        <span className="toggle-switch__value toggle-switch__value_left">F</span>
        <span className="toggle-switch__value toggle-switch__value_right">C</span>
      </label>
    </div>
  );
}

export default ToggleSwitch;























