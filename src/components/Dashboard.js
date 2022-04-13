import React, { useState, useEffect } from 'react';
import { useAuth, logout } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Auth/firebase';
import { ref, onValue } from "firebase/database";

import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

import Navbar from './Navbar';

const Dashboard = () => {
  const [error, setError] = useState('');
  const [userName, setUsername] = useState('');
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      const starCountRef = ref(db, "users/" + currentUser.uid);
      onValue(starCountRef, (snapshot) => {
        if (snapshot.exists()) {
          var data = snapshot.val();
          setUsername(data.firstName + " " + data.lastName);
        }
      });
    }
  }, [currentUser]);

  async function handleLogout() {
    setError('');

    try {
      await logout().then(result => {
      console.log(result);
      navigate('/login');
      }).catch(error => {
        setError(error.code);
      });
    } catch {
      console.log('failed');
      setError('Failed to logout');
    }
  }

  return (
    <div>
      <Navbar
        userName ={userName}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
    </div>
  );
};

export default Dashboard;
