import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAudio } from '../../../helpers/hooks';
import './styles.scss';

const Button = ({
  id = 'button',
  startIcon,
  endIcon,
  icon, // Deprecated: use startIcon instead
  size = 'medium',
  text,
  children,
  borderRadius,
  onClick = () => null,
  className = '',
  sound = false,
  disabled = false,
  variant = 'primary', // "primary", "secondary", "error", "neutral"
  type = 'button',
  fullWidth = false,
}) => {
  const { playSound, registerAudio } = useAudio();

  useEffect(() => {
    registerAudio(id);
  }, [registerAudio, id]);

  const onPress = () => {
    if (disabled) return;
    if (sound) playSound(id);
    onClick();
  };

  const isPrimary = variant === 'primary';
  const isError = variant === 'error';
  const isNeutral = variant === 'neutral';
  const isSecondary = variant === 'secondary';

  // Handle backward compatibility
  const displayStartIcon = startIcon || icon;
  const buttonText = children || text;

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          padding: '4px 10px',
          fontSize: '0.8125rem',
          minHeight: '30px',
          minWidth: '64px',
        };
      case 'large':
        return {
          padding: '8px 22px',
          fontSize: '0.9375rem',
          minHeight: '42px',
          minWidth: '64px',
        };
      case 'medium':
      default:
        return {
          padding: '6px 16px',
          fontSize: '0.875rem',
          minHeight: '36px',
          minWidth: '64px',
        };
    }
  };

  const getBackgroundColor = () => {
    if (disabled) return 'var(--color-neutral-400)';
    if (isPrimary) return 'var(--color-primary)';
    if (isError) return 'var(--color-error)';
    if (isNeutral) return 'var(--color-neutral-500)';
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return 'var(--color-neutral-100)';
    if (isPrimary || isError || isNeutral) return 'white';
    if (isSecondary) return 'var(--color-primary)';
    return 'var(--color-primary)';
  };

  const getBorderColor = () => {
    if (isPrimary || isError || isNeutral) return 'none';
    if (isSecondary) return '1px solid rgba(25, 118, 210, 0.5)';
    return '1px solid var(--color-primary)';
  };

  const sizeStyles = getSizeStyles();

  const baseStyles = {
    backgroundColor: getBackgroundColor(),
    color: getTextColor(),
    border: getBorderColor(),
    borderRadius: borderRadius || '4px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontWeight: '500',
    textTransform: 'none',
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    outline: 'none',
    fontSize: sizeStyles.fontSize,
    fontFamily: 'inherit',
    lineHeight: '1.75',
    letterSpacing: '0.02857em',
    boxSizing: 'border-box',
    textDecoration: 'none',
    width: fullWidth ? '100%' : 'auto',
    ...sizeStyles,
  };

  return (
    <button
      id={id}
      type={type}
      onClick={onPress}
      disabled={disabled}
      style={baseStyles}
      className={`custom-button custom-button--${variant} custom-button--size-${size} ${
        disabled ? 'custom-button--disabled' : ''
      } ${fullWidth ? 'custom-button--full-width' : ''} ${className}`}
      onMouseEnter={e => {
        if (!disabled) {
          e.target.style.boxShadow =
            variant === 'primary' || variant === 'error' || variant === 'neutral'
              ? '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
              : 'none';

          if (variant === 'secondary') {
            e.target.style.backgroundColor = 'rgba(25, 118, 210, 0.04)';
          } else if (variant === 'primary') {
            e.target.style.backgroundColor = 'rgba(25, 118, 210, 0.8)';
          } else if (variant === 'error') {
            e.target.style.backgroundColor = '#d32f2f';
          } else if (variant === 'neutral') {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
          }
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          e.target.style.boxShadow = 'none';
          e.target.style.backgroundColor = getBackgroundColor();
        }
      }}
      onFocus={e => {
        if (!disabled) {
          e.target.style.boxShadow =
            variant === 'primary' || variant === 'error' || variant === 'neutral'
              ? '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)'
              : '0px 0px 0px 3px rgba(25, 118, 210, 0.2)';
        }
      }}
      onBlur={e => {
        if (!disabled) {
          e.target.style.boxShadow = 'none';
        }
      }}
    >
      <span className='custom-button__content'>
        {displayStartIcon && <span className='custom-button__start-icon'>{displayStartIcon}</span>}
        {buttonText && <span className='custom-button__text'>{buttonText}</span>}
        {endIcon && <span className='custom-button__end-icon'>{endIcon}</span>}
      </span>
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  icon: PropTypes.node, // Deprecated: use startIcon
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  text: PropTypes.string,
  children: PropTypes.node,
  borderRadius: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  sound: PropTypes.bool,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'error', 'neutral']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  id: 'button',
  startIcon: null,
  endIcon: null,
  icon: null,
  size: 'medium',
  text: '',
  children: null,
  borderRadius: null,
  onClick: () => null,
  className: '',
  sound: false,
  disabled: false,
  variant: 'primary',
  type: 'button',
  fullWidth: false,
};

export default Button;
