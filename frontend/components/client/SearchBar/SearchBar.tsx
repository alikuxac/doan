import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IOptions } from "../../../interfaces/SearchBar.interface";
import { addDays, compareDesc } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectReservation,
  setStepOne,
  setHotel,
} from "../../../reducers/reservationSlice";
import { Hotel } from "../../../interfaces/Hotel.interface";

import {
  Container,
  Autocomplete,
  TextField,
  Grid,
  Button,
  Paper,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import HotelIcon from "@mui/icons-material/Hotel";

// import { hotels } from "../../../data/hotel";
import { useJwtHook } from "../../../hooks/useJwtHooks";

interface SearchBarProps {
  hotels: Hotel[];
}

const SearchBar: FC<SearchBarProps> = ({ hotels }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    checkIn,
    checkOut,
    
    hotel: currentHotel,
  } = useAppSelector(selectReservation);

  const [hotel, selectHotel] = useState<any>(currentHotel);
  // const [hotels, setHotels] = useState<Hotel[]>([]);

  // useEffect(() => {
  //   const getHotels = async () => {
  //     const response = await useJwtHook.getHotels()
  //     setHotels(response.data.hotels as Hotel[]);
  //   }
  //   getHotels();
  // }, []);

  const now = new Date();

  // Date
  const [startDate, setStartDate] = useState<Date | null>(
    checkIn ? new Date(checkIn as string) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    checkOut ? new Date(checkOut as string) : null
  );

  const [isValidDate, setIsValidDate] = useState<boolean>(false);

  useEffect(() => {
    if (!startDate && !endDate) return;
    const dateCompare = compareDesc(
      new Date(startDate as Date),
      new Date(endDate as Date)
    );
    if (dateCompare === -1) {
      setIsValidDate(false);
    } else {
      setIsValidDate(true);
    }
  }, [startDate, endDate]);

  const [guest, setGuest] = useState(1);
  const [isChildrenAllowed, setIsChildrenAllowed] = useState<boolean>(false);

  // Search button
  const [disabledButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    if (hotel === currentHotel) return;
    dispatch(setHotel({ hotel }));
  }, [dispatch, hotel, currentHotel]);

  useEffect(() => {
    if (hotel && startDate && endDate) {
      setDisableButton(true);
    } else {
      setDisableButton(false)
    }
  }, [hotel, startDate, endDate, guest]);

  const handleSubmit = () => {
    dispatch(
      setStepOne({
        checkIn: startDate,
        checkOut: endDate,
        guest: guest,
        hotelId: hotel.id,
        hotel,
      })
    );
    router.push("/booking");
  };

  return (
    <Container>
      <Paper sx={{ marginTop: 5 }} elevation={8}>
        <Grid
          container
          spacing={2}
          alignItems="stretch"
          sx={{
            display: "flex",
            position: "relative",
            padding: "26px",
          }}
          justifyContent="flex-end"
        >
          <Grid item xs={12}>
            <Autocomplete
              popupIcon={<HotelIcon />}
              key={"Hotel"}
              defaultValue={hotel}
              value={hotel}
              options={hotels}
              getOptionLabel={(option) => `${option.name} (${option.country})`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => <TextField {...params} label="Hotel" />}
              onChange={(_e, value) => {
                selectHotel(value);
              }}
            />
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="Start date"
                value={startDate}
                inputFormat="dd/MM/yyyy"
                minDate={addDays(now, 1)}
                onChange={(value) => setStartDate(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      !isValidDate && startDate !== null && endDate !== null
                    }
                    helperText={
                      !isValidDate && startDate && endDate
                        ? "Check-in Date must be before check-out Date"
                        : ""
                    }
                    // inputProps={{ readOnly: true }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="End date"
                value={endDate}
                inputFormat="dd/MM/yyyy"
                minDate={addDays(now, 2)}
                onChange={(value) => setEndDate(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      !isValidDate && startDate !== null && endDate !== null
                    }
                    helperText={
                      !isValidDate && startDate && endDate
                        ? "Check-out Date must be after check-in Date"
                        : ""
                    }
                    // inputProps={{ readOnly: true }}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4} sx={{ display: "flex", alignItems: "center", width: "100&" }}>
            <TextField
              type="number"
              label="Guest"
              value={guest}
              InputProps={{ inputProps: { min: 1, max: 5 } }}
              onChange={(e) => {
                setGuest(+e.target.value);
              }}
              sx={{ width: "100%" }}
            />
          </Grid>
          {/* <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              type="number"
              label="Chilren"
              value={options.children}
              disabled={isChildrenAllowed}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, children: +e.target.value }))
              }
            />
          </Grid>
          <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
            <TextField
              type="number"
              label="Rooms"
              value={options.room}
              InputProps={{ inputProps: { min: 1 } }}
              error={!isValidOptions}
              helperText={
                options.adult + options.children < options.room
                  ? "Room cannot higher than total people"
                  : options.adult + options.children > 4 && options.room === 1
                  ? "Number of people too high."
                  : ""
              }
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, room: +e.target.value }))
              }
            />
          </Grid> */}
          <Grid item xs={6}>
            {/* Intentionally Empty */}
          </Grid>
          <Grid item xs={6}>
            {/* Intentionally Empty */}
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              disabled={!disabledButton}
              onClick={() => {
                handleSubmit();
              }}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SearchBar;
