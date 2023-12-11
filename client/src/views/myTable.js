/**
 * Name: MyTable.js
 * Type: Client side (View)
 * Description: This is a page that displays all the employees in the database in a table.
 * Programmer: Zac Bondy - c0870952
 
 */

/************************ IMPORTS *****************************/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from '../components/footer'; 
import Navbar from '../components/navbar'; 
import '../css/styles.css';
import { useSignOut } from '../authentication/useSignOut';

/************************ COMPONENT *****************************/


/**
 * Name: MyTable
 * Description: This will display all the employees in the database in a table by 
 *              fetching the data from the backend.
 */
const MyTable = () => {
  const signOut = useSignOut();
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/persons')
      .then(response => {
        setPersons(response.data.persons);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

 

return (
    <div className="table-page">
      <Navbar onSignOut={signOut}/>
        <h1 className="display-3">Employees</h1>
        <div className="table-box">
        <table className="table table-striped table-borderless">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Date of Birth</th>
                    <th>Address1</th>
                    <th>Address2</th>
                    <th>City</th>
                    <th>Postal Code</th>
                    <th>Country</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>User Notes:</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {persons.map(person=>(
                    <tr key={person._id}>
                        <td>{person.firstName}</td>
                        <td>{person.lastName}</td>
                        <td>{person.dateOfBirth}</td>
                        <td>{person.address1}</td>
                        <td>{person.address2}</td>
                        <td>{person.city}</td>
                        <td>{person.postalCode}</td>
                        <td>{person.country}</td>
                        <td>{person.phone}</td>
                        <td>{person.email}</td>
                        <td>{person.notes}</td>
                        <td>
                        <Link to={{ pathname: `/update/${person._id}`, state: { data: person } }}>
  <button>Edit</button>
</Link>
                            </td>
                    </tr>
                ))}
            </tbody>
        </table>
       
        <Footer />
        </div>
    </div>

);

};
export default MyTable;