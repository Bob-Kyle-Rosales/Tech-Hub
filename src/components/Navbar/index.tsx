import { useState, MouseEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Box,
  useMediaQuery,
  useTheme,
  Drawer,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import useCart from '../../hooks/useCart';
import useUserStore from '../../hooks/useUser';

import logo from '../../assets/logo.png';
import './NavBar.css';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

function NavBar() {
  const { cart } = useCart();
  const { user } = useUserStore();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleAccountClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate('/login');
    }
  };

  const handleAccountClose = () => {
    setAnchorEl(null);
  };

  const renderNavLinks = () => (
    <>
      <IconButton aria-label="account" onClick={handleAccountClick}>
        <AccountCircleIcon style={{ color: 'black' }} />
      </IconButton>
      <NavLink to="/cart" onClick={handleCloseDrawer}>
        <IconButton aria-label="cart">
          <StyledBadge badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon style={{ color: 'black' }} />
          </StyledBadge>
        </IconButton>
      </NavLink>
    </>
  );

  const renderDesktopNavLinks = () => (
    <Box sx={{ marginLeft: 'auto', display: { xs: 'none', md: 'flex' } }}>
      {renderNavLinks()}
    </Box>
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

  const renderSubNavLinks = () => (
    <>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? 'activeNavLink' : 'navLink')}
      >
        <Button color="inherit" onClick={handleCloseDrawer}>
          Home
        </Button>
      </NavLink>
      <NavLink
        to="/iphone"
        className={({ isActive }) => (isActive ? 'activeNavLink' : 'navLink')}
      >
        <Button color="inherit" onClick={handleCloseDrawer}>
          iPhone
        </Button>
      </NavLink>
      <NavLink
        to="/ipad"
        className={({ isActive }) => (isActive ? 'activeNavLink' : 'navLink')}
      >
        <Button color="inherit" onClick={handleCloseDrawer}>
          iPad
        </Button>
      </NavLink>
      <NavLink
        to="/mac"
        className={({ isActive }) => (isActive ? 'activeNavLink' : 'navLink')}
      >
        <Button color="inherit" onClick={handleCloseDrawer}>
          Mac
        </Button>
      </NavLink>
    </>
  );

  const accountMenu = (
    <Menu
      id="account-menu"
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleAccountClose}
      style={{
        marginLeft: '-40px', // Move the menu to the left
      }}
    >
      <MenuItem onClick={handleAccountClose}>Profile</MenuItem>
      <MenuItem onClick={handleAccountClose}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
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
          {isMobile ? renderMobileNavLinks() : renderDesktopNavLinks()}
        </Toolbar>
      </AppBar>

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
            {renderSubNavLinks()}
          </Box>
        </Toolbar>
      </AppBar>

      {accountMenu}
    </>
  );
}

export default NavBar;
