import { FC } from "react";
import { useQuery } from "react-query";

import {
  Typography,
  Stack,
  Container,
  Card,
  CardMedia,
  Box,
} from "@mui/material";

const Properties: FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Stack direction={"row"} spacing={2}>
        <Container>
          <Card>
            <Box sx={{ position: "relative" }}>
              <CardMedia
              height={"300"}
                sx={{ height: 300, width: 200 }}
                component="img"
                image="https://cdn.alikuxac.xyz/file/doanali/room-suite.jpg"
                alt="hotel"
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  // bgcolor: "rgba(0, 0, 0, 0.54)",
                  color: "white",
                  padding: "10px",
                }}
              >
                <Typography variant="h5">Hotel</Typography>
                <Typography variant="body2">Subtitle</Typography>
              </Box>
            </Box>
          </Card>
        </Container>
        <Container>
          <Card>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                sx={{ height: 300, width: 200 }}
                component="img"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  // bgcolor: "rgba(0, 0, 0, 0.54)",
                  color: "white",
                  padding: "10px",
                }}
              >
                <Typography variant="h5">Lizard</Typography>
                <Typography variant="body2">Subtitle</Typography>
              </Box>
            </Box>
          </Card>
        </Container>
        <Container>
          <Card>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                sx={{ height: 300, width: 200 }}
                component="img"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  // bgcolor: "rgba(0, 0, 0, 0.54)",
                  color: "white",
                  padding: "10px",
                }}
              >
                <Typography variant="h5">Lizard</Typography>
                <Typography variant="body2">Subtitle</Typography>
              </Box>
            </Box>
          </Card>
        </Container>
        <Container>
          <Card>
            <Box sx={{ position: "relative" }}>
              <CardMedia
                sx={{ height: 300, width: 200 }}
                component="img"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  // bgcolor: "rgba(0, 0, 0, 0.54)",
                  color: "white",
                  padding: "10px",
                }}
              >
                <Typography variant="h5">Lizard</Typography>
                <Typography variant="body2">Subtitle</Typography>
              </Box>
            </Box>
          </Card>
        </Container>
      </Stack>
    </Container>
  );
};

export default Properties;
