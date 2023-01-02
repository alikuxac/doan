import { FC, useState } from "react";
import { useQuery } from "react-query";
import { useAppSelector } from "../../../hooks/reduxHooks";
import { selectReservation } from "../../../reducers/reservationSlice";
import { format } from "date-fns";
import { styled } from "@mui/styles";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import TypoGraphy from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import InfoDetails from "./InfoDetails/InfoDetails";
import RoomDetails from "./RoomDetails/RoomDetails";

const rooms = [
  {
    name: "Giường đơn",
    roomNumbers: [101, 103, 106],
    hotelId: 1,
    type: "SINGLE",
    maxOccupancy: 2,
    photo:
      "https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-standart.jpg",
  },
  {
    name: "Giường đôi",
    roomNumbers: [201, 202, 206],
    hotelId: 1,
    type: "DOUBLE",
    maxOccupancy: 4,
    photo:
      "https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-standart.jpg",
  },
  {
    name: "Giường đôi",
    roomNumbers: [201, 202, 206],
    hotelId: 1,
    type: "DOUBLE",
    maxOccupancy: 4,
    photo:
      "https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-standart.jpg",
  },
  {
    name: "Giường đôi",
    roomNumbers: [201, 202, 206],
    hotelId: 1,
    type: "DOUBLE",
    maxOccupancy: 4,
    photo:
      "https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-standart.jpg",
  },
  {
    name: "Giường đôi 1",
    roomNumbers: [301, 302, 306],
    hotelId: 1,
    type: "STUDIO",
    maxOccupancy: 4,
    photo:
      "https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-standart.jpg",
  },
  {
    name: "Giường đôi",
    roomNumbers: [401],
    hotelId: 1,
    type: "PRESIDENTIAL",
    maxOccupancy: 4,
    photo:
      "https://teknasyon-mailling.s3.eu-central-1.amazonaws.com/challenge/frontend/img/1-standart.jpg",
  },
];

const RoomView: FC = () => {
  const { hotel, checkIn, checkOut, adult, children, rooms } =
    useAppSelector(selectReservation);

  const [activeID, setActiveId] = useState<string | null>(null);
  const [roomLoading, setRoomLoading] = useState(false);

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
      <Stack spacing={2} sx={{ display: "flex", position: "relative", width: "100%" }}>
        {/* <Paper sx={{ padding: "1" }}>
          <TypoGraphy
          variant="h5"
          fontWeight="bold"
          color="#14226b"
          sx={{
            fontWeight: 700,
            fontSize: "1.25 rem",
          }}
        >
          Info
        </TypoGraphy>
        </Paper> */}
        
        {/* <Divider textAlign="left"></Divider> */}
        <Paper sx={{ padding: "1" }}>
          <InfoDetails />
        </Paper>
        <TypoGraphy
          variant="h5"
          fontWeight="bold"
          color="#14226b"
          sx={{
            fontWeight: 700,
            fontSize: "1.25 rem",
          }}
        >
          Rooms
        </TypoGraphy>
        <Divider textAlign="left"/>
        <Paper sx={{ padding: "1" }}>
          <Box flexDirection={"column"} display="flex" alignItems="center" >
            <RoomDetails />
          </Box>
          
          
          <Paper></Paper>
        </Paper>
        <Paper sx={{ padding: "1", textAlign: "center" }}>a</Paper>
        <Paper sx={{ padding: "1", textAlign: "center" }}>a</Paper>
      </Stack>
    </Box>
  );
};

export default RoomView;
