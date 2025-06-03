import { useParams } from "react-router-dom";
import type { AppointmentParams } from "../../types/routeParams";

const AppointmentDetails: React.FC = () => {
  const { patientId, appointmentId } = useParams<AppointmentParams>();

  if (!patientId || !appointmentId || isNaN(Number(appointmentId))) {
    return <div>Missing or invalid parameters</div>;
  }

  const apptId = Number(appointmentId);

  return (
    <div>
      <h1>Patient: {patientId}</h1>
      <h2>Appointment ID: {apptId}</h2>
    </div>
  );
};

export default AppointmentDetails;
