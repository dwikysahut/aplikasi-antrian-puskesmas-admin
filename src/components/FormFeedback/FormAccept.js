import React from 'react';
import { FormFeedback } from 'reactstrap';

function FormAccept(text) {
  return (
    <FormFeedback valid>
      {text}
    </FormFeedback>
  );
}

export default FormAccept;
