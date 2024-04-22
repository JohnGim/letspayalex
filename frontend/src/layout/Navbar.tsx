import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Styles/global.scss";
import UserContext from "../context/UserContext";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Switch } from "@mui/material";

const pagesLanding = [
  { name: "Home", path: "/" },
  { name: "Login", path: "/login" },
  { name: "Register", path: "/register" },
];
const pagesLoggedIn = [
  { name: "Transactions", path: "/transaction/list" },
  { name: "Add", path: "/transaction/submit" },
  { name: "Groups", path: "/group/list" },
  { name: "Add Group", path: "/group/submit" },
];

const settings = [
  { name: "Settings", path: "/settings" },
];

function Navbar () {
  const { username, onLogout, darkMode, setDarkMode } = useContext(UserContext);
  const [transactionsMenuOpen, setTransactionsMenuOpen] = useState(false);
  const [groupsMenuOpen, setGroupsMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  const toggleMode = () => {
    setDarkMode(!darkMode);
  };
  const pages = useMemo(() => {
    return username ? pagesLoggedIn : pagesLanding;
  }, [username]);

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Remove event listener when component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: { target: any; }) => {
    const current = headerRef.current; // Add type assertion
    if (current && !(current as HTMLElement).contains(event.target)) {
      setTransactionsMenuOpen(false);
      setGroupsMenuOpen(false);
    }
  };

  const toggleTransactionsMenu = () => {
    setTransactionsMenuOpen(!transactionsMenuOpen);
    setGroupsMenuOpen(false);
  };

  const toggleGroupsMenu = () => {
    setGroupsMenuOpen(!groupsMenuOpen);
    setTransactionsMenuOpen(false);
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handle = (path: string) => {
    handleCloseUserMenu();
    handleCloseNavMenu();
    navigate(path);
  }

  return (
    <AppBar position="fixed" color="primary">
      <Container maxWidth="xl" >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu} component={NavLink} to={page.path}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={NavLink}
                to={page.path}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '47px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.name} onClick={handleCloseUserMenu} component={NavLink} to={setting.path}>
                  <Typography textAlign="center">{setting.name}</Typography>
                </MenuItem>
              ))}
              <MenuItem key="Logout" onClick={onLogout} component={NavLink} to={"/"}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
              <MenuItem key="Switch" onClick={toggleMode}>
                <Typography textAlign="center">Dark Mode</Typography>
                <Switch checked={darkMode} onChange={toggleMode} inputProps={{ 'aria-label': 'controlled'}} />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
