import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyForm from './MyForm';
import MyTable from './myTable';
import UpdateForm from './UpdateForm';
import LoginPage from './LoginPage';
import TESTMyTable from './TESTMyTable';
import Register from './Register';
import { AuthProvider } from './Auth';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/MyForm" element={<MyForm />} />
          <Route path="/myTable" element={<MyTable />} />
          <Route path="/TESTMyTable" element={<TESTMyTable />} />
          <Route path="/update/:id" element={<UpdateForm />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
