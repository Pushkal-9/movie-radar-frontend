import React from 'react';
import { AuthProvider } from './components/auth/AuthContext';
import MainApp from './MainApp'; // Make sure the path is correct

function App() {
  return (
      <AuthProvider>
        <MainApp />
      </AuthProvider>
  );
}

export default App;
