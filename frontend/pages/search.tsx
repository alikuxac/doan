import type { NextPage } from "next";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { selectReservation } from "../reducers/reservationSlice";
import Client from "../layout/Client";

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
} from "@mui/material";

import { rooms as roomsData } from "../data/rooms";
import _ from "lodash";
import InfoDetails from "../components/client/RoomView/InfoDetails/InfoDetails";
import { ISelectedRoom } from "../interfaces/Select.interface";
import { HotelRoom } from "../interfaces/Hotel.interface";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Search: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    hotelId,
    children,
    adult,
    rooms: totalRoom,
    hotel: currentHotel,
  } = useAppSelector(selectReservation);

  const router = useRouter();
  useEffect(() => {
    if (!currentHotel) router.push("/");
  }, [currentHotel, router]);

  const filterHotelRoom = roomsData.filter((data) => data.hotelId === hotelId);

  // Filter select type
  const filterType = _.uniq(roomsData.map((data) => data.type));
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

  const totalPeople = adult + children;
  const [list, setList] = useState(filterHotelRoom);

  const chunkedArray = _.chunk(list, 3);
  const chunkedArrayLength = chunkedArray.length;

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRoom, setSelectedRoom] = useState<ISelectedRoom[]>(
    filterHotelRoom.map((value) => {
      return { id: value.roomId.toString(), value: [] };
    })
  );

  const [disableSelect, setDisableSelect] = useState(false);

  useEffect(() => {
    let updatedList = list;
    if (filterType.length > 0) {
      updatedList = filterHotelRoom.filter((value) =>
        filterType.includes(value.type)
      );
    }

    updatedList = updatedList.filter(
      (item) => item.price >= price[0] && item.price <= price[1]
    );

    setList(updatedList)
  }, [list, filterType, price, filterHotelRoom]);

  useEffect(() => {
    const totalSelectRoom = _.sumBy(selectedRoom, function (value) {
      return value.value.length;
    });
    const selectedOccupancy = _.sumBy(selectedRoom, function (value) {
      const array = _.find(list, { roomId: +value.id });
      return value.value.length * array!.maxOccupancy;
    });

    if (
      totalSelectRoom >= totalRoom ||
      (totalPeople <= selectedOccupancy && totalSelectRoom >= totalRoom)
    ) {
      setDisableSelect(true);
    } else {
      setDisableSelect(false);
    }
  }, [selectedRoom, totalRoom, totalPeople, list, filterType, filterHotelRoom]);

  const handlePaginationChange = (e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const isIncludedNumber = (id: string, value: number) => {
    const array = _.find(selectedRoom, { id });
    return !array?.value.includes(value) && disableSelect;
  };

  return currentHotel ? (
    <Client>
      <Box sx={{ height: "100%" }}>
        <InfoDetails />
        <Grid
          container
          sx={{
            marginBottom: 5,
            height: "100%",
          }}
          spacing={1}
          justifyContent="space-around"
        >
          <Grid item xs={4} sx={{ height: "100%" }}>
            <Paper
              sx={{
                margin: 5,
              }}
            >
              <Grid
                container
                rowSpacing={2}
                spacing={1}
                sx={{ height: "100%" }}
              >
                <Grid item xs={12} sx={{ height: "100%" }}>
                  <Typography variant="h6">TYPE</Typography>
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
                <Grid item xs={12} sx={{ padding: 1 }}>
                  <Typography variant="h6">Price</Typography>
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
          <Grid
            item
            xs={7}
            sx={{ justifyContent: "center", alignContent: "center" }}
          >
            <Paper sx={{ margin: 5, alignContent: "center" }}>
              <Grid container spacing={2} justifyContent="center">
                {chunkedArray[currentPage - 1].map((value, index) => {
                  return (
                    <Grid item key={index}>
                      <Card key={value.roomId} sx={{ height: "100%" }}>
                        <CardHeader title={value.name} />
                        <CardMedia
                          component={"img"}
                          src={value.photo}
                          height="150px"
                        />
                        <CardContent>{value.type}</CardContent>
                        <CardActions>
                          {/* <InputLabel id="select_rooms">Select rooms</InputLabel> */}
                          <Select
                            label="Select rooms"
                            labelId="select_rooms"
                            multiple
                            value={
                              selectedRoom.find(
                                (selectValue) =>
                                  selectValue.id === value.roomId.toString()
                              )?.value
                            }
                            onChange={(e) => {
                              const {
                                target: { value: currentValue },
                              } = e;

                              setSelectedRoom((room) =>
                                room.map((detail) =>
                                  detail.id === value.roomId.toString()
                                    ? {
                                        ...detail,
                                        value:
                                          typeof currentValue === "string"
                                            ? currentValue
                                                .split(",")
                                                .map((value) => parseInt(value))
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
                            {value.roomNumbers.map((name) => (
                              <MenuItem
                                key={name}
                                value={name}
                                disabled={isIncludedNumber(
                                  value.roomId.toString(),
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
                })}
              </Grid>
              <Pagination
                count={chunkedArrayLength}
                page={currentPage}
                onChange={handlePaginationChange}
                showFirstButton
                showLastButton
                sx={{ justifyContent: "center", alignContent: "center" }}
              />
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
