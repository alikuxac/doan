import type { NextPage } from "next";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectReservation } from "../../reducers/reservationSlice";
import { selectAuth } from "../../reducers/authSlice";


import {
  Box,
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import Client from "../../layout/Client";
import InfoDetails from "../../components/client/InfoDetails/InfoDetails";

const PreviewBooking: NextPage = () => {
  const { roomNumber } = useAppSelector(selectReservation);
  const { user } = useAppSelector(selectAuth);

  
  return (
    <Client>
      <Box sx={{ height: "100%" }}>
        <InfoDetails />
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={6}>
            <Paper sx={{ margin: 5 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Room Number</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {roomNumber.map((value, index) => {
                    return (
                      <TableRow key={value.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{value.name}</TableCell>
                        <TableCell>{value.value.join(", ")}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Stack spacing={2}>
              {user ? (
                <Paper
                  sx={{
                    backgroundColor: "yellow",
                    display: "flex",
                    alignItems: "center",
                    alignContent: "stretch",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography variant="h5">
                    You&apos;re logged in as {user.email}
                  </Typography>
                </Paper>
              ) : (
                <Paper>
                  <TextField
                    variant="outlined"
                    label="Name"
                    sx={{ width: "80%" }}
                  />
                  <TextField
                    variant="outlined"
                    label="Name"
                    sx={{ width: "80%" }}
                  />
                </Paper>
              )}
              <Paper
                sx={{
                  margin: 5,
                  flexDirection: "row",
                  display: "flex",
                  alignItems: "center",
                  alignContent: "stretch",
                  justifyContent: "space-around",
                }}
              >
                <Typography variant="h6">Coupon</Typography>
                <TextField></TextField>
                <Button>Apply</Button>
              </Paper>
              <Paper>
                
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Client>
  );
};

export default PreviewBooking;
