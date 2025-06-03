import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppointmentDetails from "../components/routes/AppoinemtDetails";
import DoctorPatientDetails from "../components/routes/DoctorPatientDetails";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/patients/:patientId/appointments/:appointmentId"
        element={<AppointmentDetails />}
      />
      <Route
        path="/doctors/:doctorId/patients/:patientId"
        element={<DoctorPatientDetails />}
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
