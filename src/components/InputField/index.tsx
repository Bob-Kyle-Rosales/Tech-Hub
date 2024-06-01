import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';

/**
 * A dynamic text field component.
 * @param {object} props - The component props.
 * @param {string} props.label - The label for the text field.
 * @param {function} props.onChange - The event handler function for input change.
 * @param {string} [props.variant='outlined'] - The variant of the text field (outlined, filled, standard).
 * @param {string} [props.value=''] - The value of the text field.
 * @param {string} [props.id='dynamic-input'] - The id of the text field.
 * @param {string} [props.type='text'] - The type of the input field (text, password, etc.).
 * @returns {JSX.Element} - The rendered component.
 */
function InputField({
  label,
  onChange,
  variant = 'outlined',
  value = '',
  id = 'dynamic-input',
  type = 'text',
}: {
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: 'outlined' | 'filled' | 'standard';
  value?: string;
  id?: string;
  type?: string;
}) {
  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      onChange={onChange}
      value={value}
      type={type}
      fullWidth
      margin="normal"
    />
  );
}

export default InputField;

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['outlined', 'filled', 'standard']),
  value: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
};

InputField.defaultProps = {
  variant: 'outlined',
  value: '',
  id: 'dynamic-input',
  type: 'text',
};
