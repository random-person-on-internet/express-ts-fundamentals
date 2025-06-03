import { useParams } from "react-router-dom";
import type { DoctorPatientParams } from "../../types/routeParams";

const DoctorPatientDetails: React.FC = () => {
  const { doctorId, patientId } = useParams<DoctorPatientParams>();

  if (
    !doctorId ||
    !patientId ||
    isNaN(Number(doctorId)) ||
    isNaN(Number(patientId))
  ) {
    return <div>Invalid or missing parameters</div>;
  }

  return (
    <div>
      <h1>Doctor ID: {doctorId}</h1>
      <h2>Patient ID: {patientId}</h2>
    </div>
  );
};

export default DoctorPatientDetails;
