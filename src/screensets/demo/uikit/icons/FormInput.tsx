import React from 'react';
import { Input } from '@hai3/uikit';

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * FormInput Component
 * Wrapper around UIKit Input with link-specific styling support
 */
export const FormInput: React.FC<FormInputProps> = ({ 
  className = '',
  id,
  ...props 
}) => {
  // Link input styling
  const isLink = id === 'link';
  const linkClassName = isLink ? "font-mono text-sm" : "";

  return (
    <Input
      id={id}
      className={`max-w-sm ${linkClassName} ${className}`.trim()}
      {...props}
    />
  );
};

