const config = {
  backend: {
    url: "",
  }
};

config.backend.url = process.env.REACT_APP_BACKEND_URL || "http://localhost:6001";

export default config;
