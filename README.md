# TodoExpress

TodoExpress is a web application that allows users to manage their tasks efficiently. It provides various features such as login history, audit logging, admin permissions, task creation and manipulation, login and signup, and refresh and access tokens.

## Features

- **Login History**: Keep track of user login history to monitor account activity and enhance security.

- **Audit Logging**: Maintain a log of all user actions and system events for auditing and troubleshooting purposes.

- **Admin Permissions**: Grant administrative privileges to certain users, allowing them to manage user accounts and perform administrative tasks.

- **Task Creation and Manipulation**: Create, update, and delete tasks with ease. Organize tasks into categories, set due dates, and track progress.

- **Login and Signup**: Users can securely log in to their accounts or create new accounts to access the application.

- **Refresh and Access Tokens**: Implement token-based authentication for secure and seamless user authentication and authorization.

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/Benjamin-01/todo-express.git
    ```

2. Install the dependencies:

    ```
    npm install
    ```

3. Run the server:

    ```
    npm start
    ```

    Update the `.env` file with your desired configuration.

4. Start the application:

    ```
    npm start
    ```

    The application will be accessible at `http://localhost:3001` by default.
Endpoints
Task Router
POST /api/tasks/create
Creates a new task. Requires authentication and an active user status.

PUT /api/tasks/update/

Updates an existing task by its ID. Requires authentication and an active user status.

GET /api/tasks/all
Retrieves all tasks. Requires authentication and an active user status.

DELETE /api/tasks/delete/

Deletes a task by its ID. Requires authentication and an active user status.

GET /api/tasks/deleted
Retrieves all soft-deleted tasks. Requires authentication and an active user status.

DELETE /api/tasks/wipe
Permanently deletes all soft-deleted tasks. Requires authentication and an active user status.

User Router
POST /api/users/login
Authenticates a user and provides access and refresh tokens. Includes rate limiting.

POST /api/users/signup
Registers a new user.

POST /api/users/refresh
Refreshes the access token using a valid refresh token.

GET /api/users/profile
Retrieves the authenticated user's profile information. Requires authentication and an active user status.

GET /api/users/login-history
Retrieves the login history of the authenticated user. Requires authentication and an active user status.

GET /api/users/activity-history
Retrieves the activity history of the authenticated user. Requires authentication and an active user status.

Admin Router
POST /api/admin/disable
Disables a user account by email. Requires admin privileges and authentication.

POST /api/admin/enable
Enables a user account by email. Requires admin privileges and authentication.

GET /api/admin/disabled
Retrieves all disabled user accounts. Requires admin privileges and authentication.

GET /api/admin/active
Retrieves all active user accounts. Requires admin privileges and authentication.

POST /api/admin/grant-admin
Grants admin privileges to a user by email. Requires admin privileges and authentication.