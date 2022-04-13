import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value).then(result => {
        navigate('/');
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
      <Grid id="login" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>Log-in to your account</Header>
          <Form size='large' onSubmit={handleSubmit} className={error ? 'error' : ''}>
            <Message error header='Whoops' content={error}/>
            <Segment stacked>
              <Form.Field>
                <div id="email" className="ui fluid left icon input">
                  <input placeholder="E-mail address" type="text" ref={emailRef} required />
                  <i aria-hidden="true" className="user icon"></i>
                </div>
              </Form.Field>
              <Form.Field>
                <div id="password" className="ui fluid left icon input">
                  <input placeholder="Password" type="password" ref={passwordRef} />
                  <i aria-hidden="true" className="lock icon"></i>
                </div>
              </Form.Field>
              <Button disabled={loading} className="ui teal large fluid button">Login</Button>
                <p style={{ marginTop: '1em' }}>
                  <Link to="/forgot-password">Forgot password?</Link>
                </p>
            </Segment>
          </Form>
          <Message>
            Need an account? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
