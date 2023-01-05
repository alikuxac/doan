import { FC, Fragment } from "react";
import { CssBaseline } from "@mui/material";
import Navbar from "../components/client/Navbar";
import Sitemap from '../components/client/Sitemap';
import Hero from "../components/client/Hero";
import BestFeature from "../components/client/BestFeature";
import Newsletter from "../components/client/Newsletter/Newsletter";

const Client: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Fragment>
      <CssBaseline />
      <Navbar />
      {/* <Hero/> */}
      {children}

      <Newsletter />
      <Sitemap />
    </Fragment>
  );
}

export default Client;