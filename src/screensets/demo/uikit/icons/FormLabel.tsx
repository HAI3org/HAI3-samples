import React from 'react';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

/**
 * FormLabel Component
 * Reusable form label component with predefined styles
 */
export const FormLabel: React.FC<FormLabelProps> = ({ 
  className = '',
  children,
  ...props 
}) => {
  const baseClassName = "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70";

  return (
    <label
      className={`${baseClassName} ${className}`.trim()}
      {...props}
    >
      {children}
    </label>
  );
};

