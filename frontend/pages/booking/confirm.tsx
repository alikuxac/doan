import type { NextPage } from "next";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectReservation } from "../../reducers/reservationSlice";

import { Box, Grid, Paper } from '@mui/material';
import Client from "../../layout/Client";

const ConfirmBooking: NextPage = () => {
  const {} = useAppSelector(selectReservation);
  return (
    <Client>
      <></>
    </Client>
  );
};

export default ConfirmBooking;
