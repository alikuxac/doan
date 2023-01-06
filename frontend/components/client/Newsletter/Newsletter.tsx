import { FC } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/EmailOutlined";
const NewsLetter: FC = () => {
  return (
    <Container maxWidth={false} sx={{ backgroundColor: "#4c4c4c" }}>
      <Box
        sx={{
          width: "auto",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          paddingBottom: 10,
          paddingTop: 5,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            color: "white",
            fontSize: "2.25em",
            marginBottom: 0,
            marginTop: 5,
          }}
        >
          SUBCRIBE TO OUR NEWSLETTER
        </Typography>
        <Typography variant="h6" sx={{ color: "white", marginBotton: 40 }}>
          SUBSCIBE TO RECEIVE OUR INTERESTING UPDATES
        </Typography>
        <form
          style={{
            // margin: "0 auto",
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            alignItems: "center",
            marginTop: 0,
            marginBottom: "auto",
          }}
        >
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-email">
              Enter your email address
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-email"
              type="email"
              // label="Enter your email address"
              required
              sx={{ backgroundColor: "white", width: "610px" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <EmailIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
      </Box>
    </Container>
  );
};

export default NewsLetter;
