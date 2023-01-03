import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { IDateRange, IOptions } from "../../../interfaces/SearchBar.interface";
import { addDays, compareDesc } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectReservation,
  setStepOne,
  setHotel,
} from "../../../reducers/reservationSlice";
import { setStep, setValid } from "../../../reducers/globalSlice";

import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper"

import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import HotelIcon from "@mui/icons-material/Hotel";

import { hotels } from "../../../data/hotel";

const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { checkIn, checkOut, children, adult, rooms, hotel: currentHotel } = useAppSelector(selectReservation);

  const [hotel, selectHotel] = useState<any>(currentHotel);

  const now = new Date();

  // Date
  const [startDate, setStartDate] = useState<Date | null>(checkIn); // addDays(now, 1)
  const [endDate, setEndDate] = useState<Date | null>(checkOut); // addDays(now, 2)

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

  // Options
  const defaultOptions: IOptions = {
    adult: adult,
    children: children,
    room: rooms,
  };
  const [options, setOptions] = useState<IOptions>(defaultOptions);
  const [isChildrenAllowed, setIsChildrenAllowed] = useState<boolean>(false);
  const [isValidOptions, setIsValidOptions] = useState<boolean>(false);

  // Search button
  const [disabledButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    if (hotel === currentHotel) return;
    dispatch(setHotel({ hotel }))
    setIsChildrenAllowed(hotel?.noChildren as boolean);
  }, [dispatch, hotel, currentHotel]);

  useEffect(() => {
    if (isChildrenAllowed) {
      setOptions((prev) => ({ ...prev, children: 0 }));
    }
  }, [isChildrenAllowed]);

  useEffect(() => {
    const total = options.adult;
    if (options.room > total) {
      setIsValidOptions(false);
    } else {
      setIsValidOptions(true);
    }
  }, [options]);

  useEffect(() => {
    if (!hotel && isValidDate && !isValidOptions) {
      setDisableButton(false);
    }

    if (!isValidDate || !isValidOptions || !hotel) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [hotel, isValidDate, isValidOptions]);

  const handleSubmit = () => {
    dispatch(
      setStepOne({
        checkIn: startDate,
        checkOut: endDate,
        adult: options.adult,
        children: options.children,
        rooms: options.room,
        hotelId: hotel.id,
        hotel,
      })
    );
    router.push('/search', )
  };

  return (
    <Paper sx={{ marginTop: 10 }} elevation={2}>
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
            getOptionLabel={(option) => `${option.name} (${option.city})`}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => <TextField {...params} label="Hotel" />}
            onChange={(_e, value) => {
              selectHotel(value);
            }}
          />
        </Grid>
        <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
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
                  error={!isValidDate}
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
        <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
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
                  error={!isValidDate}
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
        <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            type="number"
            label="Adult"
            value={options.adult}
            InputProps={{ inputProps: { min: 1 } }}
            error={!isValidOptions}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, adult: +e.target.value }))
            }
          />
        </Grid>
        <Grid item xs={2} sx={{ display: "flex", alignItems: "center" }}>
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
            helperText={isValidOptions ?"" : "Room cannot higher than total people" }
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, room: +e.target.value }))
            }
          />
        </Grid>
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
  );
};

export default SearchBar;
