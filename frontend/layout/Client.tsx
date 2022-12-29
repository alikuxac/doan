import { FC } from "react";

import Navbar from "../components/client/Navbar/Navbar";

const Client: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <>
      <Navbar/>
      {children}
    </>
  )
}

export default Client;