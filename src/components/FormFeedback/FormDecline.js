import React from 'react';
import { FormFeedback } from 'reactstrap';
import './FormDecline.css';

function FormDecline({ text }) {
  return (
    <div className="form-decline">
      <p style={{ margin: 0, padding: 0, fontSize: '10px' }}>{text}</p>
    </div>
  );
}

export default FormDecline;
