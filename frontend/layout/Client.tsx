import { FC } from "react";

import Navbar from "../components/client/Navbar";
import Sitemap from '../components/client/Sitemap';

const Client: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <Navbar/>
      {children}
      <Sitemap />
    </>
  )
}

export default Client;