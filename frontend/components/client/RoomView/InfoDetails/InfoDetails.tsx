import { format } from "date-fns";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { selectReservation } from "../../../../reducers/reservationSlice";

import Stack from "@mui/material/Stack";
import TypoGraphy from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from '@mui/material/Box';

const titleInfo = (name: string, value: any) => {
  return (
    <>
      <TypoGraphy variant="h5" color="#14226b" fontWeight="bold">
        {name}
      </TypoGraphy>
      <TypoGraphy variant="h6">{value}</TypoGraphy>
    </>
  );
};

const InfoDetails = () => {
  const { hotel, checkIn, checkOut, adult, children, rooms } =
    useAppSelector(selectReservation);

  const checkInDate = format(new Date(checkIn as Date), "dd/MM/yyyy");
  const checkOutDate = format(new Date(checkOut as Date), "dd/MM/yyyy");
  return (
    <Box alignContent="center" justifyContent={"center"} display="flex" marginTop={5}>
      <List>
        <ListItem>
          <TypoGraphy
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: "1.25 rem",
            }}
            color="#14226b"
          >
            {hotel?.name} ({hotel?.city})
          </TypoGraphy>
        </ListItem>
        <ListItem>
          <Stack
            direction={"row"}
            alignContent="center"
            justifyContent={"center"}
            spacing={1}
            sx={{ display: "flex" }}
          >
            {titleInfo("Check-in Date: ", checkInDate)}
            {titleInfo("Check-out Date:", checkOutDate)}
          </Stack>
        </ListItem>
        <ListItem>
          <Stack
            direction={"row"}
            alignContent="center"
            justifyContent={"center"}
            spacing={1}
            sx={{ display: "flex" }}
          >
            {titleInfo("Adult: ", adult)}
            {titleInfo("Children: ", children)}
            {titleInfo("Rooms: ", rooms)}
          </Stack>
        </ListItem>
      </List>
    </Box>
  );
};

export default InfoDetails;