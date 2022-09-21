import type { NextPage } from "next";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "../../auth-config";
import LoginButton from "../components/login-button";
import UserData from "../components/user-data";
import LogoutButton from "../components/logout-button";
import Head from "next/head";
import IdTokenButton from "../components/get-id-token";

const App: NextPage = () => {
  return (
    <>
      <Head>
        <title>WIIM</title>
      </Head>
      <MsalProvider instance={msalInstance}>
        <LoginButton />
        <br />
        <LogoutButton />
        <br />
        <IdTokenButton />
        <br />
        <UserData />
      </MsalProvider>
    </>
  );
};

export default App;
