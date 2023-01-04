import { FC, Fragment, useState } from "react";
import { format, differenceInDays } from "date-fns";

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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  TableFooter,
} from "@mui/material";
import {
  Cancel as CancelIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
import { Booking } from "../../../interfaces/Booking.interface";

const rows: Booking[] = [
  {
    id: 1,
    hotel: "Tâm An",
    checkin: new Date(),
    checkout: new Date(),
    adult: 5,
    children: 0,
    rooms: 2,
    details: [
      { id: 4, name: "Giường đôi", numbers: [201] },
      { id: 5, name: "Giường đơn", numbers: [301] },
    ],
    price: 3000,
    status: "Paid",
  },
  {
    id: 2,
    hotel: "Việt Tri",
    checkin: new Date(),
    checkout: new Date(),
    adult: 9,
    children: 0,
    rooms: 2,
    details: [
      { id: 4, name: "Giường đôi", numbers: [301] },
      { id: 6, name: "Giường đôi", numbers: [401] },
    ],
    price: 5000,
    status: "Cancelled",
  },
  {
    id: 3,
    hotel: "Vần Đào",
    checkin: new Date(),
    checkout: new Date(),
    adult: 2,
    children: 0,
    rooms: 1,
    details: [{ id: 5, name: "Room 2", numbers: [2] }],
    price: 5000,
    status: "Cancelled",
  },
];

function Rows(props: { row: Booking }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const checkInDate = format(row.checkin, "dd/MM/yyyy");
  const checkOutDate = format(row.checkout, "dd/MM/yyyy");

  const dialogCancelContent = (checkIn: Date, price: number) => {
    const now = new Date();
    const day = differenceInDays(now, checkIn);
    if (day < 3) {
      return `You won't get money that you paid`;
    } else if (day >= 3 && day < 7) {
      return `You will get ${price / 2} VND that you paid`;
    } else {
      return `You will get ${price} VND that you paid`;
    }
  };

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
        <TableCell>{row.price * 1000} VND</TableCell>
        <TableCell>{row.status}</TableCell>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton
            disabled={row.status === "Cancelled"}
            onClick={() => setOpenCancelDialog(true)}
          >
            <CancelIcon />
          </IconButton>
          <Dialog open={openCancelDialog}>
            <DialogTitle>Are you sure to cancel this reservation?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {dialogCancelContent(row.checkin, row.price)}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenCancelDialog(false)}>Cancel</Button>
              <Button onClick={() => setOpenCancelDialog(false)}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
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
              <TableCell>Price</TableCell>
              <TableCell>Status</TableCell>
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
      {/* <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={-1}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </>
  );
};

export default Booking;
