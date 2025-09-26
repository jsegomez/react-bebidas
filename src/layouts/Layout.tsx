import { Outlet } from "react-router-dom";
// import { useAppStore } from "../stores/useAppStore";

import Header from "../components/Header";
import Notification from "../components/Notification";


export default function Layout() {
  // const { notification } = useAppStore();

  return (
    <>
        <div >
            <Header />

            <main className="mt-10">
              <Outlet />
            </main>

            <Notification />
        </div>
    </>
  )
}
