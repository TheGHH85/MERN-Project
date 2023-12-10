import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyForm from './views/MyForm';
import MyTable from './views/myTable';
import UpdateForm from './views/UpdateForm';
import LoginPage from './views/LoginPage';
import Register from './views/Register';
import { AuthProvider } from './authentication/Auth';
import ProtectedRoute from './authentication/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/MyForm" element={<MyForm />} />
          <Route path="/myTable" element={<MyTable />} />
          <Route path="/update/:id" element={<UpdateForm />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
