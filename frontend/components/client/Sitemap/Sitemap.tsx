import { FC } from "react";

import {
  Typography,
  Container,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

import { styled } from "@mui/styles";

const StyledContainer = styled(Container)({});

const Sitemap: FC = () => {
  return (
    <>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          paddingTop: "30px",
          alignItems: "center",
          backgroundColor: "#231f20",
        }}
      >
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between", display: "flex" }}
          spacing={10}
        >
          <StyledContainer>
            <Typography
              variant="h5"
              color="#faa61a"
              sx={{ fontSize: 26, fontWeight: 100 }}
            >
              CONTACT US
            </Typography>
            <List sx={{ color: "white" }}>
              <ListItem sx={{ fontSize: "15px" }}>
                <ListItemIcon sx={{ color: "white" }}>
                  <RoomIcon />
                </ListItemIcon>
                <ListItemText>Unknown</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: "white" }}>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText>+0123456789</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ color: "white" }}>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>contact@alikuxac.xyz</ListItemText>
              </ListItem>
            </List>
          </StyledContainer>
          <StyledContainer>
            <Typography variant="h5" color="#faa61a">
              COMPANY
            </Typography>
            <List>
              <ListItem sx={{ color: "white" }}>HOME</ListItem>
            </List>
          </StyledContainer>
          <StyledContainer>
            <Typography variant="h5" color="#faa61a">
              RESOURCE
            </Typography>
            <List>
              <ListItem sx={{ color: "white" }}>
                <ListItemText>LOGIN</ListItemText>
              </ListItem>
              <ListItem sx={{ color: "white" }}>
                <ListItemText>SIGN UP</ListItemText>
              </ListItem>
            </List>
          </StyledContainer>
          <StyledContainer>
            <Typography variant="h5" color="#faa61a">
              ABOUT US
            </Typography>
            <List>
              <ListItem sx={{ color: "white" }}>
                <ListItemText>
                  This is a website about booking hotel.
                </ListItemText>
              </ListItem>
            </List>
            <Typography color="white"> </Typography>
          </StyledContainer>
        </Stack>
      </Container>
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: "30px",
          backgroundColor: "#0a0909",
        }}
      >
        <Typography fontSize={"sx"} color="white" sx={{ marginBottom: 0 }}>
          Copyright &copy; 2022 Booking&trade;. All rights reserved.
        </Typography>
      </Container>
    </>
  );
};

export default Sitemap;
