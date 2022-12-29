import { FC, SyntheticEvent, useCallback, useState, useEffect } from "react";
import { styled } from "@mui/system";
import { IDateRange, IOptions } from "../../../interfaces/SearchBar.interface";
import { addDays, compareDesc } from "date-fns";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectReservation,
  setStepOne,
  setHotel,
} from "../../../reducers/reservationSlice";
import { setStep, setValid } from "../../../reducers/globalSlice";

import { DateRange } from "react-date-range";
import Container from "@mui/material/Container";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import TypoGraphy from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { DesktopDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import HotelIcon from "@mui/icons-material/Hotel";
import DateRangeIcon from "@mui/icons-material/DateRange";

const defaultDateRange: IDateRange[] = [
  {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
];

const hotels: any[] = [
  { label: "hotel 1", id: 1,  noChildren: false },
  { label: "hotel 2", id: 2,  noChildren: true },
];

const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const { checkIn, checkOut, children, adult, rooms, hotel: currentHotel } = useAppSelector(selectReservation);

  const [hotel, selectHotel] = useState<any>(currentHotel);

  const now = new Date();

  // Date
  const [startDate, setStartDate] = useState<Date | null>(checkIn); // addDays(now, 1)
  const [endDate, setEndDate] = useState<Date | null>(checkOut); // addDays(now, 2)

  const [isValidDate, setIsValidDate] = useState<boolean>(true);

  useEffect(() => {
    if (!startDate || !endDate) return;
    const dateCompare = compareDesc(new Date(startDate), new Date(endDate));
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
  const [isValidOptions, setIsValidOptions] = useState<boolean>(true);

  // Search button
  const [disabledButton, setDisableButton] = useState<boolean>(false);

  useEffect(() => {
    dispatch(setHotel({ hotel }))
    setIsChildrenAllowed(hotel?.noChildren as boolean);
  }, [dispatch, hotel]);

  useEffect(() => {
    if (isChildrenAllowed) {
      setOptions((prev) => ({ ...prev, children: 0 }));
    }
  }, [isChildrenAllowed]);

  useEffect(() => {
    const total = options.adult + options.children;
    if (options.room > total) {
      setIsValidOptions(false);
      dispatch(setValid({ valid: false }))
    } else {
      setIsValidOptions(true);
    }
  }, [dispatch, options]);

  useEffect(() => {
    if (!hotel && isValidDate && isValidOptions) {
      setDisableButton(false);
      dispatch(setValid({ valid: true }));
    }

    if (!isValidDate || !isValidOptions || !hotel) {
      setDisableButton(false);
      dispatch(setValid({ valid: false }));
    } else {
      setDisableButton(true);
    }
  }, [dispatch, hotel, isValidDate, isValidOptions]);

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
    dispatch(setStep({ step: 1 }))
  };

  return (
    <Container maxWidth="lg">
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
    </Container>
  );
};

export default SearchBar;
