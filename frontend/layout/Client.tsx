import { FC, Fragment } from "react";
import { CssBaseline } from "@mui/material";
import Navbar from "../components/client/Navbar";
import Sitemap from '../components/client/Sitemap';
import Hero from "../components/client/Hero";
const Client: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Fragment>
      <CssBaseline />
      <Navbar/>
      {/* <Hero/> */}
      {children}
      <Sitemap />
    </Fragment>
  )
}

export default Client;