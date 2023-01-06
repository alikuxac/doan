import type { NextPage } from "next";
import { useState, useEffect, ChangeEvent, useMemo } from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { selectReservation } from "../../reducers/reservationSlice";
import Client from "../../layout/Client";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Slider,
  Select,
  MenuItem,
  Card,
  CardHeader,
  CardMedia,
  CardActions,
  Chip,
  Pagination,
  SelectChangeEvent,
  OutlinedInput,
  CardContent,
  Container,
} from "@mui/material";

import { rooms as roomsData } from "../../data/rooms";
import _ from "lodash";
import InfoDetails from "../../components/client/InfoDetails/InfoDetails";
import { ISelectedRoom } from "../../interfaces/Select.interface";
import { HotelRoom } from "../../interfaces/Hotel.interface";
import { useJwtHook } from "../../hooks/useJwtHooks";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const minDistance = 10;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const valueContent = (value: HotelRoom) => {
  return (
    <>
      <Typography>Price: {value.price}</Typography>
      <Typography>Type: {value.type}</Typography>
    </>
  );
};

const Search: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    hotelId,
    children,
    adult,
    rooms: totalRoom,
    hotel: currentHotel,
    roomNumber,
    checkIn,
    checkOut,
  } = useAppSelector(selectReservation);

    console.log(roomNumber);

  const router = useRouter();
  const [roomData, setRoomData] = useState<HotelRoom[]>([]);

  console.log(roomData);

  useEffect(() => {
    if (!currentHotel) {
      router.push("/");
    } else {
      const getAvailableRooms = async () => {
        const response = await useJwtHook.getAvailableRoom(
          hotelId,
          new Date(checkIn as string),
          new Date(checkOut as string)
        );

        setRoomData(response.data.rooms);
      };
      getAvailableRooms();
    }
  }, [currentHotel, router]);

  const totalPeople = adult + children;
  const filterHotelRoom = roomData;

  // Filter select type
  const filterType = _.uniq(roomData.map((data) => data.type));
  const [filteredType, setFilteredType] = useState<string[]>([]);

  const onSelectTypeChange = (event: SelectChangeEvent<typeof filterType>) => {
    const {
      target: { value },
    } = event;
    setFilteredType(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // price range
  const minPriceOfRoom = _.minBy(roomsData, "price");
  const maxPriceOfRoom = _.maxBy(roomsData, "price");
  const [price, setPrice] = useState<number[]>([
    minPriceOfRoom!.price,
    maxPriceOfRoom!.price,
  ]);

  const handleSetPriceRange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setPrice([Math.min(newValue[0], price[1] - minDistance), price[1]]);
    } else {
      setPrice([price[0], Math.max(newValue[1], price[0] + minDistance)]);
    }
  };

  const filtedList = useMemo(() => {
    let updatedList = filterHotelRoom;

    updatedList = filteredType.length
      ? filterHotelRoom.filter((value) => filteredType.includes(value.type))
      : filterHotelRoom;

    updatedList = updatedList.filter(
      (item) => item.price >= price[0] && item.price <= price[1]
    );

    return _.chunk(updatedList, 3);
  }, [filteredType, price, filterHotelRoom]);

  const chunkedArrayLength = filtedList.length;

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRoom, setSelectedRoom] = useState<ISelectedRoom[]>(
    filterHotelRoom.map((value) => {
      return { id: value.id.toString(), name: value.name, value: [], price: value.price };
    })
  );

  useEffect(() => {
    if (roomNumber.length > 0) {
      setSelectedRoom(roomNumber);
    } 
  }, []);



  console.log("selected room: ",selectedRoom);

  const [disableSelect, setDisableSelect] = useState(false);
  const [disableContinue, setDisableContinue] = useState(true);

  useEffect(() => {
    const totalSelectRoom = _.sumBy(selectedRoom, function (value) {
      return value.value.length;
    });
    const selectedOccupancy = _.sumBy(selectedRoom, function (value) {
      const array = _.find(filterHotelRoom, { id: +value.id });
      return value.value.length * array!.maxOccupancy;
    });

    if (
      totalSelectRoom >= totalRoom ||
      (totalPeople <= selectedOccupancy && totalSelectRoom >= totalRoom)
    ) {
      setDisableSelect(true);
      setDisableContinue(false);
    } else {
      setDisableSelect(false);
      setDisableContinue(true);
    }
  }, [selectedRoom, totalRoom, totalPeople, filterHotelRoom]);

  const handlePaginationChange = (e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleResetButton = () => {
    setFilteredType([]);
    setPrice([minPriceOfRoom!.price, maxPriceOfRoom!.price]);
  };

  const isIncludedNumber = (id: number, value: number) => {
    const array = _.find(selectedRoom, { id: id.toString() });
    return !array?.value.includes(value) && disableSelect;
  };

  const handleSumbit = () => {};

  return currentHotel ? (
    <Client>
      <Box sx={{ height: "100%", backgroundColor: "#f5f9fd" }}>
        <InfoDetails />
        <Grid
          container
          sx={
            {
              // marginBottom: 5,
            }
          }
          spacing={1}
          justifyContent="space-around"
          alignItems="stretch"
          alignContent="center"
        >
          <Grid
            item
            xs={3}
            sx={{ height: "100%", paddingTop: 5, marginTop: 2 }}
          >
            <Paper
              sx={{
                margin: 5,
                height: "100%",
                // backgroundColor: "#6d6d6d",
              }}
            >
              <Grid
                container
                rowSpacing={2}
                spacing={1}
                sx={{ height: "100%" }}
              >
                <Grid item xs={12} sx={{ margin: 1 }}>
                  <Typography variant="h6">Type</Typography>
                  <Select
                    value={filteredType}
                    multiple
                    onChange={onSelectTypeChange}
                    input={<OutlinedInput label="Type" />}
                    sx={{ width: "100%" }}
                  >
                    {filterType.map((data) => (
                      <MenuItem key={data} value={data}>
                        {data}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={12} sx={{ padding: 1, margin: 1 }}>
                  <Typography variant="h6">Price</Typography>
                  <Slider
                    min={minPriceOfRoom!.price}
                    max={maxPriceOfRoom!.price}
                    value={price}
                    defaultValue={[
                      minPriceOfRoom!.price,
                      maxPriceOfRoom!.price,
                    ]}
                    onChange={handleSetPriceRange}
                    valueLabelDisplay="auto"
                    disableSwap
                    step={10}
                    // marks={marks}
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
                  <Button onClick={handleResetButton}>Reset</Button>
                  <Button variant="contained" disabled={disableContinue}>
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Paper
              sx={{
                margin: 5,
                alignContent: "center",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {filtedList.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <Grid container spacing={2} justifyContent="center">
                    {filtedList.length > 0 ? (
                      filtedList[currentPage - 1].map((value, index) => {
                        return (
                          <Grid item key={index}>
                            <Card key={value.id} sx={{ height: "100%" }}>
                              <CardHeader title={value.name} />
                              <CardMedia
                                component={"img"}
                                src={value.photo}
                                height="150px"
                              />
                              <CardContent>{valueContent(value)}</CardContent>
                              <CardActions>
                                {/* <InputLabel id="select_rooms">Select rooms</InputLabel> */}
                                <Select
                                  label="Select rooms"
                                  labelId="select_rooms"
                                  multiple
                                  value={
                                    selectedRoom.find(
                                      (selectValue) =>
                                        selectValue.id ===
                                        value.id.toString()
                                    )?.value
                                  }
                                  onChange={(e) => {
                                    const {
                                      target: { value: currentValue },
                                    } = e;

                                    setSelectedRoom((room) =>
                                      room.map((detail) =>
                                        detail.id === value.id.toString()
                                          ? {
                                              ...detail,
                                              value:
                                                typeof currentValue === "string"
                                                  ? currentValue
                                                      .split(",")
                                                      .map((value) =>
                                                        parseInt(value)
                                                      )
                                                  : currentValue,
                                            }
                                          : detail
                                      )
                                    );
                                  }}
                                  renderValue={(selected) => (
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 0.5,
                                      }}
                                    >
                                      {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                      ))}
                                    </Box>
                                  )}
                                  MenuProps={MenuProps}
                                  sx={{ width: "100%" }}
                                >
                                  {value.roomNumber.map((name) => (
                                    <MenuItem
                                      key={name}
                                      value={name}
                                      disabled={isIncludedNumber(
                                        value.id,
                                        name
                                      )}
                                    >
                                      {name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </CardActions>
                            </Card>
                          </Grid>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </Grid>
                  <Pagination
                    count={chunkedArrayLength}
                    page={currentPage}
                    onChange={handlePaginationChange}
                    showFirstButton
                    showLastButton
                    sx={{ justifyContent: "center", alignContent: "center" }}
                  />
                </Box>
              ) : (
                <Container
                  sx={{
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <Typography variant="h4">No result found</Typography>
                </Container>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Client>
  ) : (
    <></>
  );
};

export default Search;
