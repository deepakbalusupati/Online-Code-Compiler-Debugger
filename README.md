![Screenshot](online-compiler.png)

# Online Code Compiler & Debugger

A web-based code compiler and debugger that supports C, C++, and Java programming languages. This application provides a user-friendly interface for writing, compiling, and debugging code directly in your browser.

## Features

- **Multi-language Support**: Write and execute code in C, C++, and Java
- **Real-time Compilation**: Compile and run code with immediate feedback
- **Error Detection**: View detailed compilation and runtime errors
- **Debugging Mode**: Debug your code with additional error information
- **Cross-platform**: Works on both Windows and Linux environments

## Tech Stack

- **Frontend**: React.js with React Bootstrap for UI components
- **Code Editor**: Monaco Editor (same as VS Code)
- **Backend**: Node.js with Express
- **API Communication**: Axios for HTTP requests
- **State Management**: React Context API

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (v14.0.0 or higher)
- npm (included with Node.js)
- C/C++ compiler (GCC/G++) for C and C++ code execution
- Java Development Kit (JDK) for Java code execution

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/deepakbalusupati/Online-Code-Compiler-Debugger.git
cd Online-Code-Compiler-Debugger
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

This will start both the React frontend and Node.js backend concurrently.

## Project Structure

```
online-code-compiler-debugger/
├── public/               # Static files
├── server/               # Backend server code
│   ├── controllers/      # API controllers
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── tmp/              # Temporary files for compilation
├── src/                  # Frontend React code
│   ├── components/       # UI components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components
│   ├── services/         # API service functions
│   └── styles/           # CSS styles
├── .gitignore            # Git ignore file
├── package.json          # Project dependencies
├── server.js             # Express server entry point
└── README.md             # Project documentation
```

## Usage

1. Access the application at `http://localhost:3000`
2. Select your programming language (C, C++, or Java)
3. Write your code in the editor
4. Optionally provide input if your program expects it
5. Click "Run" to compile and execute your code
6. View the output or errors in the console panel
7. Toggle debug mode for additional error information

## Supported Languages

| Language | Extensions | Compiler/Interpreter |
| -------- | ---------- | -------------------- |
| C        | .c         | GCC                  |
| C++      | .cpp       | G++                  |
| Java     | .java      | JDK (javac/java)     |

## Environment Variables

The application uses the following environment variables:

- `PORT`: The port on which the server runs (default: 5000)
- `NODE_ENV`: The environment mode (development/production)

## Deployment

The application can be deployed to platforms like Heroku using the following command:

```bash
npm run build
```

This will create a production build of the React frontend which will be served by the Express server.
