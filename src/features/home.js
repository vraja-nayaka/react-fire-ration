import React from 'react';
import { useUser } from 'reactfire';
import { LoginPage } from './login';

export function HomePage(props) {
  // no need to use useFirebaseApp - useUser calls it under the hood


  return <h1>Welcome Back!</h1>
}
