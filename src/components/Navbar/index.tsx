import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  Button,
} from '@mui/material';
import { IoMdMenu } from 'react-icons/io';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from '../../assets/logo.png';

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    padding: '4px 16px',
    borderBottom: 'none',
  };

  const activeLinkStyle = {
    ...linkStyle,
    borderTop: '3.5px solid rgb(25, 181, 254)',
    borderRadius: '2px',
  };

  const renderNavLinks = () => (
    <>
      <NavLink to="/login">
        <Button color="inherit" onClick={handleCloseDrawer}>
          <AccountCircleIcon style={{ color: 'black' }} />
        </Button>
      </NavLink>
      <NavLink to="/cart">
        <Button color="inherit" onClick={handleCloseDrawer}>
          <ShoppingCartIcon style={{ color: 'black' }} />
        </Button>
      </NavLink>
    </>
  );

  const renderMobileNavLinks = () => (
    <>
      <IconButton
        size="large"
        edge="start"
        aria-label="menu"
        sx={{ ml: 'auto' }}
        onClick={handleDrawerToggle}
      >
        <IoMdMenu />
      </IconButton>
      <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          {renderNavLinks()}
        </Box>
      </Drawer>
    </>
  );

  return (
    <>
      {/* Main Nav Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgb(240, 242, 245)',
          padding: { xs: '0px 1rem', md: '0px 6rem' },
          boxShadow: 'none',
          borderBottom: '2px solid black',
        }}
      >
        <Toolbar>
          <NavLink
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img
              src={logo}
              alt="logo"
              style={{ height: 96, width: 'auto', marginRight: '16px' }}
            />
          </NavLink>
          <Box sx={{ marginLeft: 'auto', display: { xs: 'none', md: 'flex' } }}>
            {renderNavLinks()}
          </Box>
          {isMobile && renderMobileNavLinks()}
        </Toolbar>
      </AppBar>

      {/* Sub Nav Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'rgb(240, 242, 245)',
          padding: { xs: '0px 1rem', md: '0px 6rem' },
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ minHeight: { xs: '38px', sm: '38px' } }}>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <Button color="inherit" onClick={handleCloseDrawer}>
                Home
              </Button>
            </NavLink>
            <NavLink
              to="/iphone"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <Button color="inherit" onClick={handleCloseDrawer}>
                iPhone
              </Button>
            </NavLink>
            <NavLink
              to="/ipad"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <Button color="inherit" onClick={handleCloseDrawer}>
                Ipad
              </Button>
            </NavLink>
            <NavLink
              to="/mac"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              <Button color="inherit" onClick={handleCloseDrawer}>
                Mac
              </Button>
            </NavLink>
          </Box>
          {/* {isMobile && renderMobileNavLinks()} */}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default NavBar;
