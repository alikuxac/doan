import { FC } from "react";
import { format } from "date-fns";

import ProtectedLayout from "../../layout/Protected";
import BookingComp from "../../components/client/Booking";
import {
  Box,
} from "@mui/material";
import { Info as InfoIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from "@mui/icons-material";

const rows = [
  {
    id: 1,
    hotel: "Hi",
    checkin: new Date(),
    checkout: new Date(),
    adult: 5,
    children: 0,
    rooms: 1,
    details: [{ id: 1, numbers: [1, 2, 3] }],
    price: 3000,
  },
  {
    id: 2,
    hotel: "aa",
    checkin: new Date(),
    checkout: new Date(),
    adult: 9,
    children: 0,
    rooms: 1,
    details: [{ id: 5, numbers: [2, 3, 1] }],
  },
];

const Booking: FC = () => {
  return (
    <ProtectedLayout>
      <Box sx={{ marginTop: 1 }}>
        <BookingComp/>
      </Box>
    </ProtectedLayout>
  );
};

export default Booking;
