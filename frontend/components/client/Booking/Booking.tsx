import { FC, Fragment, useState } from "react";
import { format } from "date-fns";

import {
  Box,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  Collapse,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import {
  Info as InfoIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { Booking } from "../../../interfaces/Booking.interface";

const rows: Booking[] = [
  {
    id: 1,
    hotel: "Hi",
    checkin: new Date(),
    checkout: new Date(),
    adult: 5,
    children: 0,
    rooms: 1,
    details: [
      { id: 1, name: "Room 1", numbers: [1, 2, 3] },
      { id: 2, name: "Room 100", numbers: [25, 2, 3] },
    ],
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
    details: [{ id: 5, name: "Room 2", numbers: [2, 3, 1] }],
    price: 5000,
  },
];

function Rows(props: { row: Booking}) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const checkInDate = format(row.checkin, "dd/MM/yyyy");
  const checkOutDate = format(row.checkout, "dd/MM/yyyy");

  return (
    <Fragment>
      <TableRow key={row.id} sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.hotel}</TableCell>
        <TableCell>{checkInDate}</TableCell>
        <TableCell>{checkOutDate}</TableCell>
        <TableCell>{row.adult}</TableCell>
        <TableCell>{row.children}</TableCell>
        <TableCell>{row.rooms}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton>
            <InfoIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={9} sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Room numbers</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.details.map((detailRow) => {
                    return (
                      <TableRow key={detailRow.id}>
                        <TableCell>{detailRow.id}</TableCell>
                        <TableCell>{detailRow.name}</TableCell>
                        <TableCell align="right">
                          {detailRow.numbers.join(",")}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const Booking: FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Hotel</TableCell>
            <TableCell>Check-In Date</TableCell>
            <TableCell>Check-Out Date</TableCell>
            <TableCell>Adults</TableCell>
            <TableCell>Childrens</TableCell>
            <TableCell>Rooms</TableCell>
            <TableCell>Details</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((value) => {
            return <Rows key={value.id} row={value}></Rows>;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Booking;
