import { ChangeEvent, FC, useState, useEffect } from "react";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectReservation } from "../../../../reducers/reservationSlice";
import { rooms } from "../../../../data/rooms";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


import _ from "lodash";





const RoomDetails: FC = () => {
  const { hotelId, rooms: totalRoom, adult, children } = useAppSelector(selectReservation);


  

  return (
    <>
      
    </>
  );
};

export default RoomDetails;
