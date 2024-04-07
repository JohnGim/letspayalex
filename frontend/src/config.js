const config = {
    backend: {}
};

console.log(process.env.REACT_APP_BACKEND_URL);
config.backend.url = process.env.REACT_APP_BACKEND_URL || "http://localhost:6001";

module.exports = config;
