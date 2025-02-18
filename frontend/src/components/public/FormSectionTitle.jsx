import React from 'react';

function FormSectionTitle({ icon: Icon, title }) {
  return (
    <h3 className="form-section-title">
      <Icon className="w-6 h-6 text-primary" />
      <span>{title}</span>
    </h3>
  );
}

export default FormSectionTitle;