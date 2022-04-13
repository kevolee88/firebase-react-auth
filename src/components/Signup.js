import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../Auth/firebase';
import { ref, set } from "firebase/database";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';

const Signup = () => {
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value)
      .then(userCredentials => {
        set(ref(db, "users/" + userCredentials.user.uid), {
            firstName: firstNameRef.current.value,
            lastName: lastNameRef.current.value,
            email: emailRef.current.value,
          });
        navigate('/');
      })
      .catch(error => {
        console.log(error);
        setError(error.code);
      });
    } catch {
      setError('Failed to creat an account');
    }

    setLoading(false);
  };

  return (
    <div>
      <Grid id="signup" textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>Create an account</Header>
          <Form size='large' onSubmit={handleSubmit} className={error ? 'error' : ''}>
            <Message error header='Whoops' content={error}/>
            <Segment stacked>
              <Grid columns={2} divided='vertically' stackable>
                <Grid.Row>
                  <Grid.Column>
                    <Form.Field>
                      <div id="first-name" className="ui fluid left icon input">
                        <input placeholder="First Name" type="text" ref={firstNameRef} required />
                        <i aria-hidden="true" className="user icon"></i>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Field>
                      <div id="last-name" className="ui fluid left icon input">
                        <input placeholder="Last Name" type="text" ref={lastNameRef} required />
                        <i aria-hidden="true" className="user icon"></i>
                      </div>
                    </Form.Field>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
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
              <Form.Field>
                <div id="confirm-password" className="ui fluid left icon input">
                  <input placeholder="Confirm Password" type="password" ref={passwordConfirmRef} />
                  <i aria-hidden="true" className="lock icon"></i>
                </div>
              </Form.Field>
              <Button disabled={loading} className="ui teal large fluid button">Sign Up</Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Signup;
