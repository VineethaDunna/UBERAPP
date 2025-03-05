# User Registration Endpoint

## Endpoint: `/users/register`

### Method: POST

### Description:

This endpoint is used to register a new user. It expects a JSON payload with user details, validates the input, hashes the password, and creates a new user in the database, returning a JWT token along with the user object.

### Status Codes:

- **201 Created**: User successfully registered. Returns a JWT token and the user object.
- **400 Bad Request**: Validation error, missing required fields, or invalid input. The response body will contain an array of error messages.
- **500 Internal Server Error**: Server encountered an error. The response body will contain a generic error message.

### Request Body:

The request body must be a JSON object with the following structure:

- `fullname`: An object containing the user's first and last names.
  - `firstname`: String (minimum 3 characters, required). The user's first name.
  - `lastname`: String (minimum 3 characters, required). The user's last name.
- `email`: String (must be a valid email address, required). The user's email address.
- `password`: String (minimum 6 characters, required). The user's password.

#### Example Request Body:

```json
{
	"fullname": {
		"firstname": "John", // Minimum 3 characters, required
		"lastname": "Doe" // Minimum 3 characters
	},
	"email": "john.doe@example.com", // Must be a valid email address, required
	"password": "securePassword123" // Minimum 6 characters, required
}
```

### Notes:

- Ensure that the `JWT_SECRET` environment variable is set.
- Passwords should be strong and securely stored.

---

## User Login Endpoint

### Endpoint: `users/login`

### Method: POST

### Description:

This endpoint is used to log in an existing user. It expects a JSON payload with the user's email and password, validates the input, and returns a JWT token upon successful authentication.

### Status Codes:

- **200 OK**: User successfully logged in. Returns a JWT token and the user object.
- **400 Bad Request**: Validation error or missing required fields. The response body will contain an array of error messages.
- **401 Unauthorized**: Invalid password.
- **404 Not Found**: User not found.
- **500 Internal Server Error**: Server encountered an error.

### Request Body:

The request body must be a JSON object with the following structure:

- `email`: String (must be a valid email address, required). The user's email address.
- `password`: String (minimum 6 characters, required). The user's password.

#### Example Request Body:

```json
{
	"email": "john.doe@example.com", // Must be a valid email address, required
	"password": "securePassword123" // Minimum 6 characters, required
}
```

### Response:

#### Success (200 OK):

The response body will be a JSON object containing:

- `token`: A JWT token that can be used for authentication.
- `user`: The user object.

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzZjA4NzU4NjQzZjE2NjQ4NzU4NjQiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNjkxNzE4NDAwLCJleHAiOjE2OTE3MjIwMDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
	"user": {
		"_id": "64d3f08758643f1664875864",
		"fullname": {
			"firstname": "John",
			"lastname": "Doe"
		},
		"email": "john.doe@example.com",
		"socketId": null
	}
}
```

---

## User Profile Endpoint

### Endpoint: `users/profile`

### Method: GET

### Description:

This endpoint is used to retrieve the profile information of the currently authenticated user. It requires a valid JWT token in the `Authorization` header or cookie.

### Request Headers:

- `Authorization`: `Bearer <JWT_TOKEN>` (optional, if token is not in cookies)
- Cookies: token=<JWT_TOKEN>

#### Example Request Headers:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzZjA4NzU4NjQzZjE2NjQ4NzU4NjQiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNjkxNzE4NDAwLCJleHAiOjE2OTE3MjIwMDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Status Codes:

- **200 OK**: User profile successfully retrieved. Returns the user object.
- **401 Unauthorized**: Missing or invalid JWT token.

### Response:

#### Success (200 OK):

The response body will be a JSON object containing the user's profile information.

```json
{
	"_id": "64d3f08758643f1664875864",
	"fullname": {
		"firstname": "John",
		"lastname": "Doe"
	},
	"email": "john.doe@example.com",
	"socketId": null
}
```

---

## User Logout Endpoint

### Endpoint: `users/logout`

### Method: GET

### Description:

This endpoint is used to log out the currently authenticated user. It requires a valid JWT token in the `Authorization` header or cookie. The token is then blacklisted.

### Request Headers:

- `Authorization`: `Bearer <JWT_TOKEN>` (optional, if token is not in cookies)
- Cookies: token=<JWT_TOKEN>

#### Example Request Headers:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzZjA4NzU4NjQzZjE2NjQ4NzU4NjQiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwiaWF0IjoxNjkxNzE4NDAwLCJleHAiOjE2OTE3MjIwMDB9.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Status Codes:

- **200 OK**: User successfully logged out.
- **401 Unauthorized**: Missing or invalid JWT token.

### Response:

#### Success (200 OK):

The response body will be a JSON object containing a `message` indicating successful logout.

```json
{
	"message": "Logout successful"
}
```

---

## Captain Registration Endpoint

### Endpoint: `/captains/register`

### Method: POST

### Description:

This endpoint is used to register a new captain. It expects a JSON payload with captain details, validates the input, hashes the password, and creates a new captain in the database, returning a JWT token and the captain object.

### Request Body:

The request body must be a JSON object with the following structure:

- `fullname`: An object containing the captain's first and last names.
  - `firstname`: String (minimum 3 characters, required). The captain's first name.
  - `lastname`: String (minimum 3 characters, required). The captain's last name.
- `email`: String (must be a valid email address, required). The captain's email address.
- `password`: String (minimum 6 characters, required). The captain's password.
- `vehicle`: An object containing the captain's vehicle details:
  - `color`: String (minimum 3 characters, required). The vehicle's color.
  - `plate`: String (minimum 3 characters, required). The vehicle's license plate.
  - `capacity`: Number (minimum 1, required). The vehicle's passenger capacity.
  - `vehicleType`: String (enum: `car`, `motorcycle`, `auto`, `van`, required). The type of vehicle.

#### Example Request Body:

```json
{
	"fullname": {
		"firstname": "Captain", // Minimum 3 characters, required
		"lastname": "Awesome" // Minimum 3 characters
	},
	"email": "captain.awesome@example.com", // Must be a valid email address, required
	"password": "secureCaptainPassword", // Minimum 6 characters, required
	"vehicle": {
		"color": "red", // Minimum 3 characters, required
		"plate": "ABC-123", // Minimum 3 characters, required
		"capacity": 4, // Minimum 1, required
		"vehicleType": "car" // Enum: car, motorcycle, auto, van, required
	}
}
```

### Status Codes:

- **201 Created**: Captain successfully registered. Returns the captain object and a JWT token.
- **400 Bad Request**: Validation error, missing required fields, or invalid input. The response body will contain an array of error messages.

### Response:

#### Success (201 Created):

The response body will be a JSON object containing:

- `captain`: The newly created captain object.
- `token`: A JWT token for authentication.

```json
{
	"captain": {
		"_id": "captain_id_here",
		"fullname": {
			"firstname": "Captain",
			"lastname": "Awesome"
		},
		"email": "captain.awesome@example.com",
		"socketId": null,
		"status": "active",
		"vehicle": {
			"color": "red",
			"plate": "ABC-123",
			"capacity": 4,
			"vehicleType": "car"
		}
	},
	"token": "jwt_token_here"
}
```

---

## Captain Login Endpoint

### Endpoint: `/captains/login`

### Method: POST

### Description:

This endpoint is used to log in an existing captain. It expects a JSON payload with the captain's email and password, validates the input, and returns a JWT token upon successful authentication.

### Request Body:

```json
{
	"email": "captain.awesome@example.com", // Required, valid email
	"password": "secureCaptainPassword" // Required, minimum 6 characters
}
```

### Status Codes:

- **200 OK**: Captain successfully logged in. Returns a JWT token and the captain object.
- **400 Bad Request**: Validation error or missing required fields.
- **401 Unauthorized**: Invalid password.
- **404 Not Found**: Captain not found.
- **500 Internal Server Error**: Server encountered an error.

### Response:

#### Success (200 OK):

```json
{
	"token": "jwt_token_here",
	"captain": {
		"_id": "captain_id_here",
		"fullname": {
			"firstname": "Captain",
			"lastname": "Awesome"
		},
		"email": "captain.awesome@example.com",
		"socketId": null,
		"status": "active",
		"vehicle": {
			"color": "red",
			"plate": "ABC-123",
			"capacity": 4,
			"vehicleType": "car"
		}
	}
}
```

---

## Captain Profile Endpoint

### Endpoint: `/captains/profile`

### Method: GET

### Description:

This endpoint retrieves the profile information of the authenticated captain. It requires a valid JWT token in the `Authorization` header or cookie.

### Request Headers:

- `Authorization`: `Bearer <JWT_TOKEN>` (optional, if token is not in cookies)
- Cookies: `token=<JWT_TOKEN>`

### Status Codes:

- **200 OK**: Captain profile successfully retrieved.
- **401 Unauthorized**: Missing or invalid JWT token.

### Response:

#### Success (200 OK):

```json
{
	"_id": "captain_id_here",
	"fullname": {
		"firstname": "Captain",
		"lastname": "Awesome"
	},
	"email": "captain.awesome@example.com",
	"socketId": null,
	"status": "active",
	"vehicle": {
		"color": "red",
		"plate": "ABC-123",
		"capacity": 4,
		"vehicleType": "car"
	}
}
```

---

## Captain Logout Endpoint

### Endpoint: `/captains/logout`

### Method: GET

### Description:

This endpoint logs out the currently authenticated captain by blacklisting the JWT token.

### Request Headers:

- `Authorization`: `Bearer <JWT_TOKEN>` (optional, if token is not in cookies)
- Cookies: `token=<JWT_TOKEN>`

### Status Codes:

- **200 OK**: Captain successfully logged out.
- **401 Unauthorized**: Missing or invalid JWT token.

### Response:

#### Success (200 OK):

```json
{
	"message": "Logout successful"
}
```
