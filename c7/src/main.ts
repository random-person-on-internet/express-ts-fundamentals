import "reflect-metadata";
import { Container } from "typedi";

import { AppointmentService } from "./appointments/AppointmentService";
import { EmailService } from "./notifications/EmailService";
import { NotificationServiceToken } from "./notifications/tokens";

Container.set(NotificationServiceToken, new EmailService());

const appointmentService = Container.get(AppointmentService);
appointmentService.bookAppointment("Ved Lakkad", "Saturday 7pm");
