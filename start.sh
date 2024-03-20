#!/bin/bash

kill_process_on_port() {
  local port="$1"
  local pid="$(lsof -ti :$port)"
  if [[ -n "$pid" ]]; then
    echo "Killing process listening on port $port..."
    kill "$pid"
  fi
}

ensure_db_folder() {
  if [ ! -d "data/db" ]; then
    echo "Creating db folder..."
    mkdir -p data/db
  fi
}

start_backend() {
  kill_process_on_port 6000 # Adjust the port number as needed
  cd backend || { echo "Error: Unable to navigate to the backend directory" ; exit 1; }
  if [ "$1" = "deploy" ]
  then
      node server.js &
  else
      nodemon server.js &
  fi
}

start_frontend() {
  kill_process_on_port 3000 # Adjust the port number as needed
  cd ../frontend || { echo "Error: Unable to navigate to the frontend directory" ; exit 1; }
  npm start
}

start_mongo() {
  ensure_db_folder
  kill_process_on_port 27017
  mongod --dbpath data/db &
}

main() {
  echo "Starting MongoDB..."
  start_mongo

  echo "Starting the backend..."
  start_backend

  echo "Starting the frontend..."
  start_frontend
}

main
