import { Service, Inject } from "typedi";

import { NotificationService } from "../notifications/NotificationService";
import { NotificationServiceToken } from "../notifications/tokens";

import { BillingService } from "../billing/BillingService";
import { BillingServiceToken } from "../billing/tokens";

@Service()
export class AppointmentService {
  constructor(
    // @Inject(() => SMSService) private notifier: NotificationService
    // this won't work, use Token instead
    @Inject(NotificationServiceToken) private notifier: NotificationService,
    @Inject(BillingServiceToken) private billing: BillingService
  ) {}

  async bookAppointment(
    patient: string,
    time: string,
    amount: number = 0
  ): Promise<{ status: string }> {
    await this.billing.charge(patient, amount);
    await this.notifier.send(patient, `Your appointment is booked for ${time}`);
    return { status: "confirmed" };
  }
}
