import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage('');
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value).then(result => {
        setMessage('Check your inbox for further instructions');
      }).catch (error => {
        console.log(error);
        setError(error.code);
      });
    } catch {
      setError('Failed to sign in');
    }

    setLoading(false);
  };

  return (
    <div>
      <Grid id="forgot-password" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>Log-in to your account</Header>
          <Form size='large' onSubmit={handleSubmit} className={error ? 'error' : '' || message ? 'success' : ''}>
            <Message success content={message}/>
            <Message error header='Whoops' content={error}/>
            <Segment stacked>
              <Form.Field>
                <div id="email" className="ui fluid left icon input">
                  <input placeholder="E-mail address" type="text" ref={emailRef} required />
                  <i aria-hidden="true" className="user icon"></i>
                </div>
              </Form.Field>
              <Button disabled={loading} className="ui teal large fluid button">Reset Password</Button>
                <p style={{ marginTop: '1em' }}>
                  <Link to="/login">Login</Link>
                </p>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ForgotPassword;
