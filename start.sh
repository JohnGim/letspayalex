#!/bin/bash

# Function to check if a process is listening on a port and kill it
kill_process_on_port() {
  local port="$1"
  local pid="$(lsof -ti :$port)"
  if [[ -n "$pid" ]]; then
    echo "Killing process listening on port $port..."
    kill "$pid"
  fi
}

# Function to start the backend
start_backend() {
  kill_process_on_port 6000 # Adjust the port number as needed
  cd backend || { echo "Error: Unable to navigate to the backend directory" ; exit 1; }
  node server.js &
}

# Function to start the frontend
start_frontend() {
  kill_process_on_port 3000 # Adjust the port number as needed
  cd ../frontend || { echo "Error: Unable to navigate to the frontend directory" ; exit 1; }
  npm start
}

# Main function
main() {
  echo "Starting the backend..."
  start_backend

  echo "Starting the frontend..."
  start_frontend
}

# Call the main function
main
