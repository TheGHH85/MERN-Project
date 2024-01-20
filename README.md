# MERN Project - c0870952 Zac Bondy

A simple mock employee directory CRUD application that uses the MERN stack using  RESTful API calls and user authentication and verification (please see 'Instructions' below for details).

## Features

- Login as a user
- Register new users
- View all employees
- Add a new employee
- Update employee details
- Delete an employee

## Usage

- Register a new user to access the application
- Login by authenticating the login data
- View all the employees from the '/' or "Employees Table" from the nav
- Click 'Add Employee' to navigate to the /form page to add a new employee
- Click the "Update" button (from the "Employees Table") to navigate to the /update page to update employee details
- Click the "Delete" button (from the update page) to delete the employees record. 
-  *NEW* User authentication added, please see INSTRUCTIONS below

## Depedencies

- React
- Node.js
- Express.js
- bodyParser
- MongoDB | Mongoose
- Passport.js | passport-local - Authentication
- bcrypt - Authentication
- cors
- axios
- Bootstrap

# Instructions

The instruction on how to use the site are almost the same as the assignemnt. However, this project has user authentication, it took me 13 days to get it working but I'm proud to say I got it working 100%.

## How to test using Authentication

To see the authentication in full action follow these steps
1. Start the project and try to navigate to another page using the URL, (add /myTable or /MyForm)
2. You should see that you are always redirected back to the login page
3. Register a user account
4. Login using the email and password you registered with
5. Next, add a new employee using the Navbar or /MyForm in the URL search bar, using /MyForm  will test that you are logged in with valid user credentials 
6. After adding a new employee you can click the edit button in the row of an employee, you can edit yours or any that are already present
7. Update any fields and press the update button
8. Click edit again on any employee
9. Click the delete button, you will be redirected back to the table and will notice they are no longer present
10. Click sign out on the Nav and you will be redirected back to the login page
11. Finally, try to navigate to another by adding /Myform or /myTable in the URL search bar again and you will notice you get redirected back to the login page as before
12. BONUS PART 1 - Restart the project and try to login again with the email and password you registered last time, you will see it will worked because the user logins are saved in a now collection in MongoDB
13. BONUS PART 2 - If you restart the project, or at anytime signout, try to register using the same email as before, you will see it doesn't let you to prevent a user missmatch

## More about Authentication

After you review MongoDB, you will notice that in the users collection, the password does not match what you entered when you registered. This is because it uses bcrypt to encypt the passwords when the are created and passed to Mongo, then decrypts it when its passed back during the login verification. 
