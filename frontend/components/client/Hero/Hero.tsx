import { FC } from "react";
import { useRouter } from "next/router";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

// import SearchBar from "../SearchBar";

const Hero: FC = () => {
  const router = useRouter();

  return (
    <Container
      maxWidth={false}
      // className="text-white flex justify-center relative"
      // style={{
      //   backgroundColor: "#003580",
      //   display: "flex",
      //   justifyContent: "center",
      //   textDecorationColor: "white",
      //   position: "relative",
      // }}
      sx={{
        backgroundColor: "#003580",
        display: "flex",
        justifyContent: "center",
        textDecorationColor: "white",
        position: "relative",
      }}
    >
      <Container
        // className="w-full max-w-5xl mb-24"
        // disableGutters
        // style={{ marginBottom: "24px" }}
        sx={{ marginBottom: "24px", width: "full", maxWidth: "5xl" }}
      >
        <Typography
          sx={{ fontWeight: "bold", marginTop: "4", fontSize: "3xl" }}
        >
          A lifetime of discounts? It&apos;s Genius.
        </Typography>
        <Typography
          // className="py-5"
          sx={{ paddingY: "5px" }}
          // style={{ paddingTop: "5px", paddingBottom: "5px" }}
        >
          Get rewarded for your travels - unlock instant savings of 10% or more
          with a free Booking account
        </Typography>
        <Button
          // className="bg-[#0071c2] border-none font-medium py-2.5 px-4 cursor-pointer rounded-sm"
          sx={{ backgroundColor: "#0071c2", border: "none", paddingY: "2.5", paddingX: "4", cursor: "pointer", borderRadius: "sm" }}
          onClick={() => router.push("/")}
        >
          Sign in / Register
        </Button>
        {/* <SearchBar /> */}
      </Container>
    </Container>
  );
};

export default Hero;
