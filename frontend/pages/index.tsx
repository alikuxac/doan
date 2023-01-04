import type { NextPage } from "next";
import { Fragment } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import Carousel from "react-material-ui-carousel";

import Image from "next/image";
import { Container, Box, Paper } from "@mui/material";
import { Slide } from "react-slideshow-image";

import Client from "../layout/Client";
import SearchBar from "../components/client/SearchBar";
import Newsletter from "../components/client/Newsletter/Newsletter";

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
          <Box
            maxWidth="lg"
            sx={{
              width: "100%",
              margin: "1rem auto",
              padding: "25px 0 0",
            }}
          >
            <SearchBar />
          </Box>

          {/* <Container>
            <Box sx={{ my: 2 }}>
              {[...new Array(20)]
                .map(
                  () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                )
                .join("\n")}
            </Box>
          </Container> */}
          <Newsletter />
        </>
      </Client>
    </Fragment>
  );
};

export default Home;
