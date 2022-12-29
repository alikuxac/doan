import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectReservation } from "../../../reducers/reservationSlice";
import { format } from "date-fns";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TypoGraphy from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/styles";
import { fetchData } from "../../../api/base";

const RoomView: FC = () => {
  const { hotel, checkIn, checkOut, adult, children, rooms } =
    useAppSelector(selectReservation);

  const checkInDate = format(new Date(checkIn as Date), "dd/MM/yyyy");
  const checkOutDate = format(new Date(checkOut as Date), "dd/MM/yyyy");

  // const [roomLoading, setRoomLoading] = useState(false);

  // const { isLoading: roomLoading } = useQuery("", () => fetchData("a"));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        marginTop: "6",
        justifyContent: "center",
      }}
    >
      <Stack spacing={2} sx={{ display: "flex", position: "relative" }}>
        <Paper sx={{ padding: "1" }}>
          <List>
            <ListItem>
              <ListItemText
                primary={`Hotel: ${(hotel as any).label}`}
              ></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary={`Check In: ${checkInDate}`}></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText
                primary={`Check Out: ${checkOutDate}`}
              ></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary={`Adult: ${adult}`}></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary={`Children: ${children}`}></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText primary={`Rooms: ${rooms}`}></ListItemText>
            </ListItem>
          </List>
        </Paper>
        <Paper sx={{ padding: "1", textAlign: "center" }}>a</Paper>
        <Paper sx={{ padding: "1", textAlign: "center" }}>a</Paper>
        <Paper sx={{ padding: "1", textAlign: "center" }}>a</Paper>
      </Stack>
    </Box>
  );
};

export default RoomView;
