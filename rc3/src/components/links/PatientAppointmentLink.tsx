import { Link } from "react-router-dom";

interface Props {
  patientId: string;
  appointmentId: number;
}

const PatientAppointmentLink: React.FC<Props> = ({
  patientId,
  appointmentId,
}) => (
  <Link to={`/patients/${patientId}/appointments/${appointmentId}`}>
    View Appointment {appointmentId}
  </Link>
);

export default PatientAppointmentLink;
