import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import { RootState } from "../../features/store"; // Adjust the import based on your store setup

const logoStyle: React.CSSProperties = {
  width: "140px",
  height: "auto",
  cursor: "pointer",
};

export const Navbar = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
console.log("isAuthenticated",isAuthenticated)
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(255, 255, 255, 0.4)",
          backdropFilter: "blur(24px)",
          boxShadow: `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`,
          backgroundImage: "none",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              maxHeight: 40,
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Link to="/">
                {/* <img
                  src={
                    "https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg"
                  }
                  style={logoStyle}
                  alt="logo of innovatica"
                /> */}
                <Typography variant="h5" className="text-blue-500 text-xl">
                    Porao
                  </Typography>
              </Link>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem
                  onClick={() => scrollToSection("features")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  {/* <Typography variant="body2" color="text.primary">
                    For Tutor
                  </Typography> */}
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("testimonials")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  {/* <Typography variant="body2" color="text.primary">
                    For Student
                  </Typography> */}
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("highlights")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Tuitions
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("pricing")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    Blog
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("faq")}
                  sx={{ py: "6px", px: "12px" }}
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {/* {!isAuthenticated && (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component={Link}
                    to="/login"
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component={Link}
                    to="/student/register"
                  >
                    Sign up
                  </Button>
                </>
              )} */}
              {
                isAuthenticated ? (
                  <>
                     <Button
                      color="primary"
                      variant="text"
                      size="small"
                      component={Link}
                      to="/student/profle"
                    >
                      Profile
                    </Button>
                    <Button
                      color="warning"
                      variant="text"
                      size="small"
                    >
                      Logout
                    </Button>
                  </>
                ):(
                  <>
                   
                    <Button
                      color="primary"
                      variant="text"
                      size="small"
                      component={Link}
                      to="/login"
                    >
                      Sign in
                    </Button>
                    <Button
                      color="primary"
                      variant="text"
                      size="small"
                      component={Link}
                      to="/student/register"
                    >
                      Logout
                    </Button>
                  </>
                )
              }
            </Box>
            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                  </Box>
                  <MenuItem onClick={() => scrollToSection("features")}>
                    For Sale
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("testimonials")}>
                    For Rent
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("highlights")}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("pricing")}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQ
                  </MenuItem>
                  <Divider />
                  {!isAuthenticated && (
                    <>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="contained"
                          component={Link}
                          to="/material-ui/getting-started/templates/sign-up/"
                          target="_blank"
                          sx={{ width: "100%" }}
                        >
                          Sign up
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          component={Link}
                          to="/material-ui/getting-started/templates/sign-in/"
                          target="_blank"
                          sx={{ width: "100%" }}
                        >
                          Sign in
                        </Button>
                      </MenuItem>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
