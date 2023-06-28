import { apiClient } from './apiClient';

export const login = async ({ username, password }:any) => {
  const response = await fetch('http://192.168.0.157/clims/public/api/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // if (!response.ok) {
  //   throw new Error('Login failed');
  // }

  // Assuming the server responds with a JSON object containing the user token


  return response;
};
