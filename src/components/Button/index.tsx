import Button, { ButtonProps } from '@mui/material/Button';
import React from 'react';

interface MyButtonProps extends Omit<ButtonProps, 'variant' | 'color'> {
  /** The text to display on the button */
  children: React.ReactNode;
  /** The variant of the button */
  variant?: 'text' | 'outlined' | 'contained';
  /** The color of the button */
  color?: 'inherit' | 'primary' | 'secondary';
  /** The background color of the button */
  backgroundColor?: string;
  /** Additional styles for the button */
  style?: React.CSSProperties;
}

function MyButton({
  children,
  variant,
  color,
  size,
  disabled,
  onClick,
  backgroundColor,
  style,
}: MyButtonProps) {
  const buttonStyle: React.CSSProperties = {
    backgroundColor: backgroundColor || 'transparent',
    ...style, // Merge additional styles with the default button styles
  };

  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      disabled={disabled}
      onClick={onClick}
      style={buttonStyle}
    >
      {children}
    </Button>
  );
}

MyButton.defaultProps = {
  variant: 'contained',
  color: 'inherit',
  backgroundColor: 'transparent',
  style: {},
};

export default MyButton;
