# Task Manager Application

## Overview
This is a Task Manager application built with React.js and Node.js. It allows users to manage tasks effectively by providing features to create, read, update, delete, and filter tasks. The application also includes user authentication and session management.

## Features
- **User Authentication**: Simple login screen with email/password authentication.
- **Task Management**: 
  - Create tasks with title, description, priority, and due date.
  - Read and display tasks with options to edit, delete, and toggle completion status.
  - Update tasks inline or via a modal.
  - Delete tasks with confirmation.
- **Filtering & Search**: 
  - Filter tasks by All, Completed, Pending, and Priority.
  - Case-insensitive search with debouncing to optimize performance.
- **Session Management**: Uses session storage to persist login sessions until the browser tab is closed.
- **Task Mail Automation**: Simulated cron job that checks for pending tasks every 20 minutes and logs/sends mock email notifications.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **State Management**: React Hooks
- **TypeScript**: For type safety and better development experience
- **Custom Hooks**: For debouncing and session management
- **Services**: For handling tasks and authentication

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd task-manager
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```

## Usage
- Access the application in your browser at `http://localhost:3000`.
- Use the login screen to authenticate.
- Once logged in, you can manage tasks through the Task Dashboard.

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.