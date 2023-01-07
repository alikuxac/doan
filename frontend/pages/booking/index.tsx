/* eslint-disable react-hooks/exhaustive-deps */
import type { NextPage } from "next";
import {
  useState,
  useEffect,
  ChangeEvent,
  useMemo,
  useLayoutEffect,
} from "react";
import { useRouter } from "next/router";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import { selectReservation } from "../../reducers/reservationSlice";
import Client from "../../layout/Client";
import Image from "next/image";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Slider,
  Select,
  MenuItem,
  Stack,
  Divider,
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

import PlaceIcon from "@mui/icons-material/Place";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import NoBackpackIcon from "@mui/icons-material/NoBackpack";

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
const numberPeople = [0, 1, 2, 3, 4];

const valueContent = (value: HotelRoom) => {
  return (
    <Paper
      sx={{
        margin: 5,
        alignContent: "space-around",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Box>
          <Image
            src="https://cdn.alikuxac.xyz/file/doanali/villa.jpeg"
            alt="g"
            height={200}
            width={150}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "left",
            alignItems: "stretch",
            alignContent: "space-around",
            padding: 1,
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 100 }}>
            {value.name}
          </Typography>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <PlaceIcon />
            <Typography variant="h6">{value.extra_bed}</Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <PersonIcon />
            <Typography variant="h6">
              {value.maxOccupancy}{" "}
              {value.maxOccupancy > 1 ? "person" : "people"}
            </Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <AttachMoneyIcon />
            <Typography variant="h6">${value.price}</Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
            }}
          >
            <NoBackpackIcon />
            <Typography variant="h6">Non Refundable</Typography>
          </Container>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button variant="contained" sx={{ padding: 1, m: 2 }}>
            Order now
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

const Search: NextPage = () => {
  const dispatch = useAppDispatch();
  const {
    hotelId,
    guest,
    hotel: currentHotel,
    checkIn,
    checkOut,
  } = useAppSelector(selectReservation);

  const router = useRouter();
  const [roomData, setRoomData] = useState<HotelRoom[]>([]);

  useLayoutEffect(() => {
    if (!currentHotel) {
      router.push("/");
    }
  }, [currentHotel, router]);

  useLayoutEffect(() => {
    const getdata = async () => {
      const response = await useJwtHook.getAvailableRoom(
        +hotelId,
        new Date(checkIn as string),
        new Date(checkOut as string)
      );
      setRoomData(response.data.rooms);
    };
    getdata();
  }, []);

  const filterHotelRoom = roomData;

  const [filteredPeople, setFilteredPeople] = useState(0);

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

    updatedList =
      filteredPeople !== 0
        ? filterHotelRoom.filter(
            (value) => value.maxOccupancy === filteredPeople
          )
        : filterHotelRoom;

    updatedList = updatedList.filter(
      (item) => item.price >= price[0] && item.price <= price[1]
    );

    return _.chunk(updatedList, 3);
  }, [filteredType, price, filterHotelRoom]);

  const chunkedArrayLength = filtedList.length;

  const [currentPage, setCurrentPage] = useState(1);

  const handlePaginationChange = (e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleResetButton = () => {
    setFilteredType([]);
    setPrice([minPriceOfRoom!.price, maxPriceOfRoom!.price]);
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
                <Grid item xs={12}>
                  <Typography variant="h6">Max People</Typography>
                  <Select
                    value={filteredPeople}
                    onChange={(e) => setFilteredPeople(+e.target.value)}
                    input={
                      <OutlinedInput
                        label="Max People"
                        sx={{ width: "100%" }}
                      />
                    }
                  >
                    {numberPeople.map((data) => (
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
              display: "flex",
            }}
          >
            {filtedList.length > 0 ? (
              <Container
                sx={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Stack>
                  {filtedList[currentPage - 1].map((value) =>
                    valueContent(value)
                  )}
                </Stack>
                <Pagination
                  count={chunkedArrayLength}
                  page={currentPage}
                  onChange={handlePaginationChange}
                  showFirstButton
                  showLastButton
                  sx={{ justifyContent: "center", alignContent: "center" }}
                />
              </Container>
            ) : (
              <Paper
                sx={{
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h4">No result found</Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Client>
  ) : (
    <></>
  );
};

export default Search;
