import React, { useState } from 'react';
import T from 'prop-types';

import Button from '../shared/Button';
import FormField from '../shared/FormField';
import { Checkbox } from 'antd';
import { login } from '../../api/auth';
import useForm from '../../hooks/useForm';

import './LoginPage.css';

function LoginPage({ onLogin, history }) {
  const [form, onChange] = useForm({email: '', password: '', remember: false})
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { email, password, remember } = form;

  const handleSubmit = async event => {
    //const credentials = form;
    event.preventDefault();
    setSubmitting(true);
    try {
      const loggedUserId = await login(form);
      setError(null);
      onLogin(loggedUserId).then(() => history.push('/adverts'));
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = () => {
    return !submitting && email && password;
  };

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Nodepop</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="phone, email or username"
          className="loginPage-field"
          value={email}
          onChange={onChange}
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginPage-field"
          value={password}
          onChange={onChange}
        />
        <Checkbox
          name="remember"
          label="Remember me"
          className="loginPage-field"
          checked={remember}
          value={remember}
          onChange={onChange}
        >
          Remember me
        </Checkbox>
        <Button
          type="submit"
          className="loginPage-submit"
          variant="primary"
          disabled={!canSubmit()}
        >
          Log in
        </Button>
      </form>
      {error && <div className="loginPage-error">{error.message}</div>}
    </div>
  );
}

LoginPage.propTypes = {
  onLogin: T.func.isRequired,
};

export default LoginPage;
