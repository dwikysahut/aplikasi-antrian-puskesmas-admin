/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form, FormGroup, Label, Input, Button,
} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage } from 'formik';
import FormDecline from '../../../../components/FormFeedback/FormDecline';

function LoginForm({
  onChangeHandler, onSubmitHandler, isValid, error, values, touched, isSubmitting,
}) {
  return (

    <Form className="mt-5">
      <FormGroup>
        <Label for="user ID">Masukkan User ID</Label>
        <Input
          id="user_id"
          name="user_id"
          placeholder="User ID"
          type="phone"
          maxLength={16}
          value={values.user_id}
          onChange={onChangeHandler('user_id')}
          invalid={error.user_id !== undefined}
        />
        { error.user_id && (<FormDecline text={error.user_id} />)}
      </FormGroup>

      <FormGroup>
        <Label for="password">Masukkan Password</Label>
        <Input
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          minLength={8}
          onChange={onChangeHandler('password')}
          value={values.password}
          invalid={error.password !== undefined}

        />
        { error.password && <FormDecline text={error.password} />}
      </FormGroup>
      <Button
        outline
        color="success"
        className="w-100 mt-3"
        onClick={onSubmitHandler}

      >
        Login

      </Button>

    </Form>

  );
}

export default LoginForm;
