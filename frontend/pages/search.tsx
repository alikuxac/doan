import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { selectReservation, setHotel } from "../reducers/reservationSlice";
import Client from "../layout/Client";

import {
  Box,
  Grid,
  Paper,
  Autocomplete,
  TextField,
  Typography,
  Button,
  Slider,
  Select,
} from "@mui/material";

import { hotels } from "../data/hotel";
import { rooms as roomsData } from "../data/rooms";
import RoomDetails from "../components/client/RoomView/RoomDetails/RoomDetails";
import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addDays, compareDesc } from "date-fns";
import { IOptions } from "../interfaces/SearchBar.interface";
import { setValid } from "../reducers/globalSlice";
import _ from "lodash";
import InfoDetails from "../components/client/RoomView/InfoDetails/InfoDetails";

const Search: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    checkIn,
    checkOut,
    children,
    adult,
    rooms,
    hotel: currentHotel,
  } = useAppSelector(selectReservation);

  const [hotel, setHotel] = useState<any>(currentHotel);

  const now = new Date();

  // Date
  const [startDate, setStartDate] = useState<Date | null>(checkIn); // addDays(now, 1)
  const [endDate, setEndDate] = useState<Date | null>(checkOut); // addDays(now, 2)

  const [isValidDate, setIsValidDate] = useState<boolean>(false);

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
  const [isValidOptions, setIsValidOptions] = useState<boolean>(false);

  // Search button
  const [disabledButton, setDisableButton] = useState<boolean>(false);

  // price range
  const minPriceOfRoom = _.minBy(roomsData, "price");
  const maxPriceOfRoom = _.maxBy(roomsData, "price");
  const [price, setPrice] = useState<number[]>([0, maxPriceOfRoom!.price]);
  const marks = [
    {
      value: 0,
      label: minPriceOfRoom!.price,
    },
    { value: 100, label: maxPriceOfRoom!.price },
  ];

  const handleSetPriceRange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    setPrice(newValue);
  };

  useEffect(() => {
    if (hotel === currentHotel) return;
    // dispatch(setHotel({ hotel }));
    setIsChildrenAllowed(hotel?.noChildren as boolean);
  }, [dispatch, hotel, currentHotel]);

  useEffect(() => {
    if (isChildrenAllowed) {
      setOptions((prev) => ({ ...prev, children: 0 }));
    }
  }, [isChildrenAllowed]);

  useEffect(() => {
    const total = options.adult + options.children;
    if (options.room > total) {
      setIsValidOptions(false);
      dispatch(setValid({ valid: false }));
    } else {
      setIsValidOptions(true);
    }
  }, [dispatch, options]);

  useEffect(() => {
    if (!hotel && isValidDate && isValidOptions) {
      setDisableButton(false);
    }

    if (!isValidDate || !isValidOptions || !hotel) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [hotel, isValidDate, isValidOptions]);

  return (
    <Client>
      <Box sx={{ height: "100%" }}>
        <InfoDetails />
        <Grid
          container
          sx={{
            marginBottom: 5,
          }}
          spacing={1}
          justifyContent="space-around"
        >
          <Grid item xs={4}>
            <Paper
              sx={{
                margin: 5,
              }}
            >
              <Typography variant="h6">Info</Typography>
              <Grid container rowSpacing={2} spacing={1}>
                <Grid item xs={12}>
                  <Select></Select>
                  {/* <Autocomplete
                    key={"Hotel"}
                    defaultValue={hotel}
                    value={hotel}
                    options={hotels}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="Hotel" />
                    )}
                    onChange={(_e, value) => {
                      setHotel(value);
                    }}
                  /> */}
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    label="Adult"
                    value={options.adult}
                    InputProps={{ inputProps: { min: 1 } }}
                    error={!isValidOptions}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        adult: +e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    type="number"
                    label="Chilren"
                    value={options.children}
                    disabled={isChildrenAllowed}
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        children: +e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={4}>
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
                <Grid item xs={12} sx={{ padding: 1 }}>
                  <Typography>Price: </Typography>
                  <Slider
                    value={price}
                    defaultValue={price}
                    onChange={handleSetPriceRange}
                    valueLabelDisplay="off"
                    disableSwap
                    marks={marks}
                  />
                </Grid>
                <Grid
                  item
                  xs
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: 1,
                  }}
                >
                  <Button>Reset</Button>
                  <Button variant="contained">Continue</Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={7}>
            <Paper sx={{ margin: 5 }}>
              <RoomDetails />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Client>
  );
};

export default Search;
