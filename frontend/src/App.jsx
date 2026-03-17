import { Outlet } from "react-router-dom"
import Navigation from "./pages/Auth/Navigation"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="py-3 lg:ml-[84px] mt-[72px] lg:mt-0 transition-all duration-300 min-h-screen">
        <Outlet />
      </main>
    </>
  )
}

export default App
