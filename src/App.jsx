import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing.jsx";
import Header from "./components/Header/Header";
import ShowMonth from "./components/ShowMonth/ShowMonth";
import SuperRootAdmin from "./components/SuperRootAdmin/SuperRootAdmin.jsx";
import SuperRootMenu from "./components/SuperRootMenu/SuperRootMenu.jsx";
//import DoctorsAdmin from './components/DoctorsAdmin/DoctorsAdmin.jsx';
import LandingDoctors from "./components/DoctorsAdmin/DoctorsAdmin.jsx";
import DoctorsMenu from "./components/DoctorsMenu/DoctorsMenu.jsx";
import DoctorChangePassword from "./components/DoctorChangePassword/DoctorChangePassword.jsx";
import SuperRootDoctorList from "./components/SuperRootDoctorList/SuperRootDoctorList.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="w-auto h-screen sm:h-screen ">
        <Header />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/month" element={<ShowMonth />} />
          <Route path="/admin" element={<SuperRootAdmin />} />
          <Route path="/admin/menu" element={<SuperRootMenu />} />
          <Route path="/admin/doctorList" element={<SuperRootDoctorList />} />
          <Route path="/doctors" element={<LandingDoctors />} />
          <Route path="/doctors/menu" element={<DoctorsMenu />} />
          <Route
            path="/doctors/changePassword"
            element={<DoctorChangePassword />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
