import type { NextPage } from "next";
import { Fragment } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import Carousel from "react-material-ui-carousel";

import Image from "next/image";
import { Container, Box, Paper } from "@mui/material";

import Client from "../layout/Client";
import SearchBar from "../components/client/SearchBar";
import BestFeature from "../components/client/BestFeature";
import Properties from "../components/client/Properties";

const slideImages = [
  {
    url: "https://cdn.alikuxac.xyz/file/doanali/room-deluxe.jpg",
    caption: "Slide 1",
  },
  {
    url: "https://cdn.alikuxac.xyz/file/doanali/room-standard.jpg",
    caption: "Slide 2",
  },
  {
    url: "https://cdn.alikuxac.xyz/file/doanali/room-suite.jpg",
    caption: "Slide 3",
  },
];

const Home: NextPage = () => {
  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <Client>
        <>
          <Carousel autoPlay interval={5000}>
            {slideImages.map((value) => (
              <Image
                key={value.caption}
                src={value.url}
                alt={value.caption}
                width={1920}
                height={712}
              />
            ))}
          </Carousel>
          <Container
            maxWidth={false}
            sx={{
              backgroundColor: "#848484",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <Box
              maxWidth="lg"
              sx={{
                width: "100%",
                margin: "1rem auto",
                padding: "25px",
              }}
            >
              <SearchBar />
            </Box>
          </Container>
          <Properties />
          <BestFeature />
        </>
      </Client>
    </Fragment>
  );
};

export default Home;
