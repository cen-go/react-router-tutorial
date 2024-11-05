import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation.state === "loading" && <h2 className="loading-text">Loading...</h2>}
        <Outlet />
      </main>      
    </>
  )
}

export default RootLayout;