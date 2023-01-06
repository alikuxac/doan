import { FC, useState } from "react";

import {
  Container,
  Paper,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const FindBooking: FC = () => {
  const [id, setId] = useState("");

  return (
    <Container>
      <Paper
        sx={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <form>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="find-booking">
              Enter your booking Id
            </InputLabel>
            <OutlinedInput
              id="find-booking"
              type="text"
              required
              onChange={(e) => {
                setId(e.target.value);
              }}
              value={id}
              sx={{ backgroundColor: "white", width: "100%" }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </form>
      </Paper>
    </Container>
  );
};

export default FindBooking;
