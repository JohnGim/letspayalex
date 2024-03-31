const config = {
  frontend: {},
  backend: {},
  mongodb: {},
};

config.frontend.url = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3001";
config.mongodb.url = process.env.REACT_APP_DB_URL || "mongodb://localhost:27017/letspayalex";
config.backend.url = process.env.REACT_APP_BACKEND_URL || "http://localhost:6001";
config.backend.port = process.env.REACT_APP_BACKEND_PORT || 6001;

module.exports = config;
