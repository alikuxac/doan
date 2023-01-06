import type { NextPage } from "next";
import { Fragment, useState, SyntheticEvent, useEffect } from "react";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useJwtHook } from "../hooks/useJwtHooks";
import { Hotel } from "../interfaces/Hotel.interface";
import Carousel from "react-material-ui-carousel";

import Image from "next/image";
import { Container, Box, Tabs, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Client from "../layout/Client";
import SearchBar from "../components/client/SearchBar";
import FindBooking from "../components/client/FindBooking";
import BestFeature from "../components/client/BestFeature";
import Properties from "../components/client/Properties";

import SearchIcon from "@mui/icons-material/Search";
import BookIcon from "@mui/icons-material/Book";


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
    url: "https://cdn.alikuxac.xyz/file/doanali/room-standard.jpg",
    caption: "Slide 3",
  },
];

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const [tabValue, setTabValue] = useState<string>("search");

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [slideImages, setSlideImage] = useState<{ photo: string }[]>([]);
  useEffect(() => {
    const getHotels = async () => {
      const response = await useJwtHook.getHotels();
      setHotels(response.data.hotels as Hotel[]);
    };
    getHotels();
  }, []);

  useEffect(() => {
    const getSlideImage = async () => {
      const response = await useJwtHook.getRandomImage();
      setSlideImage(response.data);
    };
    getSlideImage();
  }, []);

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    localStorage.setItem("tab", newValue);
  };

  return (
    <Fragment>
      <Client>
        <>
          <Carousel autoPlay interval={5000}>
            {slideImages.map((value, index) => (
              <Image
                key={`random ${index}`}
                src={value.photo}
                alt={`random ${index}`}
                width={1920}
                height={712}
              />
            ))}
          </Carousel>
          <Container
            maxWidth={false}
            sx={{
              backgroundColor: "#f5f9fd",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <TabContext value={tabValue}>
              <Box
                maxWidth="lg"
                sx={{
                  width: "100%",
                  margin: "1rem auto",
                  padding: "5px",
                }}
              >
                <TabList
                  centered
                  onChange={handleChange}
                  sx={{ width: "100%", padding: "15px", heitgh: "50%" }}
                >
                  <Tab
                    label="Search"
                    value="search"
                    iconPosition="start"
                    icon={<SearchIcon />}
                    sx={{ backgroundColor: "#faa61a" }}
                  />
                  <Tab
                    label="Check"
                    value="check"
                    iconPosition="start"
                    icon={<BookIcon />}
                    sx={{ backgroundColor: "#faa61a" }}
                  />
                </TabList>
                <TabPanel value="search">
                  <SearchBar hotels={hotels} />
                </TabPanel>
                <TabPanel value="check">
                  <FindBooking />
                </TabPanel>
              </Box>
            </TabContext>
          </Container>
          <Properties />
          <BestFeature array={[{ name: "", count: 5 }]} />
        </>
      </Client>
    </Fragment>
  );
};

export default Home;
