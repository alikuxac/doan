import React, {
  FC,
  useCallback,
  useState,
  Fragment,
  cloneElement,
} from "react";
import Link from "next/link";
import { useAppSelector, useAppDispatch } from "../../../hooks/reduxHooks";
import { selectAuth, logout } from "../../../reducers/authSlice";

import {
  AppBar,
  Button,
  Typography,
  Container,
  Toolbar,
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  useScrollTrigger,
  Slide,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  // window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function StickOnScroll(props: Props) {
  const { children } = props;

  return cloneElement(children, {});
}

const notLoggedInPages = [
  { name: "Sign In", url: "/login" },
  { name: "Register", url: "/register" },
];

const pages = [
  { name: "Home", url: "/" },
  { name: "Price", url: "/price" },
];

const Navbar: FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, isAdmin } = useAppSelector(selectAuth);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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

  return (
    <Fragment>
      <HideOnScroll>
        <AppBar
          sx={{
            backgroundColor: "#000", //003580
            display: "flex",
            position: "static",
            justifyContent: "center",
          }}
          position="fixed"
          hidden={true}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                width: "100%",
                mx: "auto",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BOOKING
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link href={page.url}>{page.name}</Link>
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                BOOKING
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    <Link href={page.url}>{page.name}</Link>
                  </Button>
                ))}
              </Box>

              {/** If logged in */}
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {isAuthenticated ? (
                    <Container>
                      <MenuItem key="Profile">
                        <Link href={"/profile"}>Profile</Link>
                      </MenuItem>
                      <MenuItem key="Booking">
                        <Link href={"/profile/booking"}>Booking</Link>
                      </MenuItem>
                      {isAdmin && <MenuItem key="Admin">Admin</MenuItem>}
                      <MenuItem key="Log out">
                        <Link href={"/"} onClick={() => dispatch(logout({}))}>
                          Log out
                        </Link>
                      </MenuItem>
                    </Container>
                  ) : (
                    notLoggedInPages.map((page) => (
                      <MenuItem key={page.name}>
                        <Typography textAlign="center">
                          <Link href={page.url}>{page.name}</Link>{" "}
                        </Typography>
                      </MenuItem>
                    ))
                  )}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
    </Fragment>
  );
};

export default Navbar;
