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

export interface ISelectedRoom {
  id: string;
  value: number[];
}

const RoomDetails: FC = () => {
  const { hotelId, rooms: totalRoom, adult, children } = useAppSelector(selectReservation);

  const totalPeople = adult + children;
  const filteredRooms = rooms.filter((room) => room.hotelId === hotelId);

  const chunkedArray = _.chunk(filteredRooms, 3);
  const chunkedArrayLength = chunkedArray.length;
 
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedRoom, setSelectedRoom] = useState<ISelectedRoom[]>(
    filteredRooms.map((value) => {
      return { id: value.roomId.toString(), value: [] };
    })
  );
  const [disableSelect, setDisableSelect] = useState(false);

  useEffect(() => {

    const totalSelectRoom = _.sumBy(selectedRoom, function (value) {
      return value.value.length ;
    });
    const selectedOccupancy = _.sumBy(selectedRoom, function (value) {
      const array = _.find(filteredRooms, { roomId: +value.id });
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
  }, [selectedRoom, totalRoom, totalPeople, filteredRooms]);

  const handlePaginationChange = (e: ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const isIncludedNumber = (id: string, value: number) => {
    const array = _.find(selectedRoom, { id });
    return !array?.value.includes(value) && disableSelect;
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {chunkedArray[currentPage - 1].map((value, index) => {
          return (
            <Grid item key={index}>
              <Card key={value.roomId} sx={{ height: "100%" }}>
                <CardHeader title={value.name} />
                <CardMedia component={"img"} src={value.photo} height="150px" />
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
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                    sx={{ width: "100%" }}
                  >
                    {value.roomNumbers.map((name) => (
                      <MenuItem key={name} value={name} disabled={isIncludedNumber(value.roomId.toString(), name)}>
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
      ></Pagination>
    </>
  );
};

export default RoomDetails;
