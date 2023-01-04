import type { NextPage } from "next";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectReservation } from "../../reducers/reservationSlice";
import { selectAuth } from "../../reducers/authSlice";

import {
  PayPalScriptProvider,
  PayPalButtons,
  BraintreePayPalButtons,
  PayPalHostedField,
  PayPalHostedFieldsProvider,
  usePayPalHostedFields,
} from "@paypal/react-paypal-js";

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
import InfoDetails from "../../components/client/RoomView/InfoDetails/InfoDetails";

const PreviewBooking: NextPage = () => {
  const { roomNumber } = useAppSelector(selectReservation);
  const { user } = useAppSelector(selectAuth);
  const hostedFields = usePayPalHostedFields();
  const submit = () => {
    if (typeof hostedFields.cardFields!.submit !== "function") return; // validate that `submit()` exists before using it
    hostedFields
      .cardFields!.submit({
        // The full name as shown in the card and billing address
        cardholderName: "John Wick",
      })
      .then((order) => {
        fetch("/your-server-side-integration-endpoint/capture-payment-info")
          .then((response) => response.json())
          .then((data) => {
            // Inside the data you can find all the information related to the payment
          })
          .catch((err) => {
            // Handle any error
          });
      });
  };
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
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AWJR3OCbwMt4oMb3mTkbzlNQAN9aF5OIAkvBIicj6kZ7YH604WmJhvozNGzIvi4btNYKaeFRi7bJi7rw",
                    "data-client-token":
                      "EFOxmGUI4I8MJP_kgJqTw_ufG5D4GrBUsR5Xqln3usiFAFhBDCzEn5OQkavKIb6Smn00efZCUfWgQAwm",
                    // components: "hosted-fields,buttons",
                    // currency: "VND",
                  }}
                >
                  <PayPalButtons
                    style={{ layout: "horizontal", color: "gold" }}
                    createOrder={(data, action) => {
                      return action.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: "1000000",
                              currency_code: "VND",
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, action) => {
                      return action.order!.capture().then((detail) => {
                        const name = detail.payer.name;
                      });
                    }}
                  />
                </PayPalScriptProvider>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Client>
  );
};

export default PreviewBooking;
