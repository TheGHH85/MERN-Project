import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { useSignOut } from '../authentication/useSignOut';
const MyForm = () => {
  const signOut = useSignOut();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address1: '',
    address2: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
    email: '',
    notes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:8080/persons', formData);
    alert('Data submitted successfully!');
    setFormData({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      address1: '',
      address2: '',
      city: '',
      postalCode: '',
      country: '',
      phone: '',
      email: '',
      notes: ''
    });

    // Navigate to '/myTable' after form submission
    navigate('/myTable');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  return (
    <> 
    <Navbar  onSignOut={signOut}/>
    <div className="form-box">
   
    <div className="add-form">
    
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-4">
    <label className="form-label">
      First Name:
      </label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        className="form-control"
      />
  </div>
  <div className="col-4">
    <label className="form-label">
      Last Name:
      </label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        className="form-control"
      />
    
    </div>
    <div className="col-4">
    <label className="form-label">
      Date of Birth:
      </label>
      <input
        type="text"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
        className="form-control"
      />
   
    </div>
    <div className="col-6">
    <label className="form-label">
      Address 1:
      </label>
      <input
        type="text"
        name="address1"
        value={formData.address1}
        onChange={handleChange}
        className="form-control"
      />
  
    </div>
   <div className="col-6">
    <label className="form-label">
      Address 2:
      </label>
      <input
        type="text"
        name="address2"
        value={formData.address2}
        onChange={handleChange}
        className="form-control"
      />
 </div>
 <div className="col-4">
    <label className="form-label">
      City:
      </label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="form-control"
      />
   </div>
   <div className="col-4">
    <label className="form-label">
      Postal Code:
      </label>
      <input
        type="text"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
        className="form-control"
      />
      </div>
    <div className="col-3">
    <label className="form-label">
      Country:
      </label>
      <input
        type="text"
        name="country"
        value={formData.country}
        onChange={handleChange}
        className="form-control"
      />
    </div>
    <div className="col-5">
    <label className="form-label">
      Phone:
      </label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="form-control"
      />
   </div>
   <div className="col-5">
    <label className="form-label">
      Email:
      </label>
      <input
        type="text"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="form-control"
      />
   </div>
    <label className="form-label">
      User Notes:
      </label>
      <input
        type="text"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        className="form-control"
      />
    <div className="col-10">
    <button className="btn btn-success" type="submit">Submit</button>
    </div>
  </form>
 
  </div>
  </div>
  <Footer />
  </>
);
}


export default MyForm;
