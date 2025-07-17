import './Input.scss';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  maxLength,
  error = false,
  helperText = '',
  disabled = false,
  className = '',
}) => {
  return (
    <TextField
      InputProps={{
        sx: { color: 'inherit' },
      }}
      className={`input-field focus:border-primary ${className}`}
      variant='outlined'
      label={label}
      fullWidth
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      inputProps={{ maxLength }}
      error={error}
      helperText={helperText}
      disabled={disabled}
    />
  );
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  type: 'text',
  value: '',
  onChange: () => {},
  placeholder: '',
  maxLength: undefined,
  error: false,
  helperText: '',
  disabled: false,
  className: '',
};

export default Input;
