# Class Management Server API Documentation

The Class Management Server exposes the following endpoints:

## Classes

### Get all classes

- **Endpoint**: `GET /api/classes`
- **Description**: Retrieves all classes from the server.
- **Response**: An array of class objects containing the class details.

### Create a class

- **Endpoint**: `POST /api/classes`
- **Description**: Creates a new class with the provided data.
- **Request Body**: JSON object containing the class details (name, room, location, gradeLevel).
- **Response**: The created class object with a generated ID.

### Update a class

- **Endpoint**: `PUT /api/classes/:id`
- **Description**: Updates the class with the specified ID using the provided data.
- **Request Parameters**: 
  - `id`: The ID of the class to be updated.
- **Request Body**: JSON object containing the updated class details (name, room, location, gradeLevel).
- **Response**: The updated class object.

### Delete a class

- **Endpoint**: `DELETE /api/classes/:id`
- **Description**: Deletes the class with the specified ID.
- **Request Parameters**: 
  - `id`: The ID of the class to be deleted.
- **Response**: A success message indicating the deletion was successful.

## Students

### Get all students

- **Endpoint**: `GET /api/students`
- **Description**: Retrieves all students from the server.
- **Response**: An array of student objects containing the student details.

### Create a student

- **Endpoint**: `POST /api/students`
- **Description**: Creates a new student with the provided data.
- **Request Body**: JSON object containing the student details (name, subName, birthdate, address, homeAddress, nationality, legalGuardian, classId).
- **Response**: The created student object with a generated ID.

### Update a student

- **Endpoint**: `PUT /api/students/:id`
- **Description**: Updates the student with the specified ID using the provided data.
- **Request Parameters**: 
  - `id`: The ID of the student to be updated.
- **Request Body**: JSON object containing the updated student details (name, subName, birthdate, address, homeAddress, nationality, legalGuardian, classId).
- **Response**: The updated student object.

### Delete a student

- **Endpoint**: `DELETE /api/students/:id`
- **Description**: Deletes the student with the specified ID.
- **Request Parameters**: 
  - `id`: The ID of the student to be deleted.
- **Response**: A success message indicating the deletion was successful.

Please refer to the individual controller files for more details on the implementation of each API endpoint.

