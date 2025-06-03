import { Link } from "react-router-dom";

interface Props {
  doctorId: number;
  patientId: number;
}

const DoctorPatientLink: React.FC<Props> = ({ doctorId, patientId }) => (
  <Link to={`/doctors/${doctorId}/patients/${patientId}`}>
    View Doctor {doctorId} – Patient {patientId}
  </Link>
);

export default DoctorPatientLink;
