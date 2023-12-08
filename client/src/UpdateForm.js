import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/navbar';
import Footer from './components/footer';
import './css/styles.css'
import { useSignOut } from './useSignOut';
const UpdateForm = () => {
  const signOut = useSignOut();
    const { id } = useParams();
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
    useEffect(() => {
        // Fetch data using the ID from the URL
        axios.get(`http://localhost:8080/update/${id}`)
            .then(response => {
                setFormData(response.data.person); // Assuming response.data.person contains the person's data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.post(`http://localhost:8080/delete/${id}`);
            navigate('/myTable');
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/update/${id}`, formData);
        navigate('/myTable');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

return (
  <>
  <Navbar onSignOut={signOut}/>
  <div className="add-form">
 <div className="form-box">
  <form class="row g-3" onSubmit={handleSubmit}>
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
      <button className="btn btn-success" type="submit">Update</button>
      <button className ="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </form>
  </div>
    </div>
    <Footer />
    </>
);

};

export default UpdateForm;