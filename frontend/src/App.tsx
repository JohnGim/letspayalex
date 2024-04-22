import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/global.scss";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Home from "./components/Home";
import TransactionSubmit from "./components/TransactionSubmit";
import TransactionListPage from "./pages/TransactionListPage";
import GroupListPage from "./pages/GroupListPage";
import GroupSubmitPage from "./pages/GroupSubmitPage";
import UserContext from "./context/UserContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { globalTheme } from "./Styles/globalTheme";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [username, setUsername] = React.useState(sessionStorage.getItem("username"));
  const [darkMode, setDarkMode] = React.useState<boolean>(true);

  const theme = React.useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? "dark" : "light",
        primary: {
          // light: '#337066',
          main: '#004d40',
          // dark: '#00352c',
          // contrastText: '#fff',
        },
        secondary: {
          main: '#f9a825',
          // light: '#fab950',
          // dark: '#ae7519',
          // contrastText: '#000',
        },
        action: {
          // active: '#00352c',
          // hover: '#f9a825',
          // hoverOpacity: 0.08,
          // selected: '#f9a825',
          // selectedOpacity: 0.14,
          // disabled: '#f9a825',
          // disabledOpacity: 0.26,
          // disabledBackground: '#f9a825',
          // focus: '#f9a825',
          // focusOpacity: 0.12,
          // activatedOpacity: 0.12,
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: ({ ownerState }) => ({
              '&:hover': {
                opacity:0.5,
              },
            }),
          },
        },
      },
    });
  }, [darkMode]);

  const onLogout = () => {
    setUsername(null);
    sessionStorage.removeItem("username");
    document.cookie = "token=; expires=Thu, 01 Jan1970 00:00:00 UTC; path=/;";
    console.log("User logged out successfully!");
  };

  return (
    <UserContext.Provider value={{ username, setUsername, onLogout, darkMode, setDarkMode }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/transaction/submit" element={<TransactionSubmit />} />
              <Route path="/transaction/list" element={<TransactionListPage />} />
              <Route path="/group/list" element={<GroupListPage />} />
              <Route path="/group/submit" element={<GroupSubmitPage />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </UserContext.Provider>
  );
}

export default App;
