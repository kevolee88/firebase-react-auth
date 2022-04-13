import React, { useState } from 'react';

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
  Button,
} from 'semantic-ui-react'

const Navbar = ({handleLogout, currentUser, userName}) => {

  return (
    <div>
    <Menu
      inverted
      size='large'
    >
    <Container>
      <Menu.Item as='a' header>
        {userName}
      </Menu.Item>
      <Menu.Item as='a'>Home</Menu.Item>
      <Dropdown item simple text='Dropdown'>
        <Dropdown.Menu>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Header Item</Dropdown.Header>
          <Dropdown.Item>
            <i className='dropdown icon' />
            <span className='text'>Submenu</span>
            <Dropdown.Menu>
              <Dropdown.Item>List Item</Dropdown.Item>
              <Dropdown.Item>List Item</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Item>
          <Dropdown.Item>List Item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item position='right'>
        <Button as='a' onClick={handleLogout} inverted style={{ marginLeft: '0.5em' }}>
          Logout
        </Button>
      </Menu.Item>
    </Container>
  </Menu>
    </div>
  )
};

export default Navbar;
