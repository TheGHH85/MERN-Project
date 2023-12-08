import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Footer from './components/footer'; 
import Navbar from './components/navbar'; 

import {Table, Button} from 'evergreen-ui';



const TESTMyTable = () => {
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
    <>
      <Navbar />
        <h1 className="display-3">Employees</h1>
       
        <Table>
            <Table.Head>
              <Table.Body>
                <Table.Row>
                    <Table.TextHeaderCell>First Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Last Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Date of Birth</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Address1</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Address2</Table.TextHeaderCell>
                    <Table.TextHeaderCell>City</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Postal Code</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Country</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Phone</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Email</Table.TextHeaderCell>
                    <Table.TextHeaderCell>User Notes</Table.TextHeaderCell>
                  
                </Table.Row>
                </Table.Body>
            </Table.Head>
            <Table.Body height={300}>
                {persons.map(person=>(
                    <Table.Row key={person._id}>
                        <Table.TextCell>{person.firstName}</Table.TextCell>
                        <Table.TextCell>{person.lastName}</Table.TextCell>
                        <Table.TextCell>{person.dateOfBirth}</Table.TextCell>
                        <Table.TextCell>{person.address1}</Table.TextCell>
                        <Table.TextCell>{person.address2}</Table.TextCell>
                        <Table.TextCell>{person.city}</Table.TextCell>
                        <Table.TextCell>{person.postalCode}</Table.TextCell>
                        <Table.TextCell>{person.country}</Table.TextCell>
                        <Table.TextCell>{person.phone}</Table.TextCell>
                        <Table.TextCell>{person.email}</Table.TextCell>
                        <Table.TextCell>{person.notes}</Table.TextCell>
                        <Table.TextCell>
                        <Link to={{ pathname: `/update/${person._id}`, state: { data: person } }}>
                        <Button>Edit</Button>
                        </Link>
                        </Table.TextCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
       
        <Footer />
      </>
   

);

};
export default TESTMyTable;