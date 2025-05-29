import "reflect-metadata";
import { Container } from "typedi";

import { AppointmentService } from "../src/appointments/AppointmentService";
import { NotificationService } from "../src/notifications/NotificationService";
import { SMSService } from "../src/notifications/SMSService";
import { EmailService } from "../src/notifications/EmailService";
import { NotificationServiceToken } from "../src/notifications/tokens";
import { BillingService } from "../src/billing/BillingService";
import { BillingServiceToken } from "../src/billing/tokens";
import { StripeBillingService } from "../src/billing/StripeBillingService";

class MockNotifier implements NotificationService {
  messages: string[] = [];
  async send(to: string, message: string) {
    this.messages.push(`${to}: ${message}`);
  }
}

class MockBillingService implements BillingService {
  charges: string[] = [];

  async charge(patient: string, amount: number) {
    this.charges.push(`${patient}: $${amount}`);
  }
}

test("should send notification on booking", async () => {
  const mock = new MockNotifier();
  const mockBilling = new MockBillingService();

  Container.set(NotificationServiceToken, mock);
  Container.set(BillingServiceToken, mockBilling);

  const service = Container.get(AppointmentService);
  await service.bookAppointment("Ved Lakkad", "Saturday 7pm");

  expect(mock.messages).toContain(
    "Ved Lakkad: Your appointment is booked for Saturday 7pm"
  );
  expect(mockBilling.charges).toContain("Ved Lakkad: $0");
});

test("should use SMSService for notifications", async () => {
  const smsService = new SMSService();
  Container.set(NotificationServiceToken, smsService);

  const service = Container.get(AppointmentService);
  await service.bookAppointment("Ved Lakkad", "Saturday 7pm");

  expect(smsService).toBeInstanceOf(SMSService);
});

test("should use EmailService for notifications", async () => {
  const emailService = new EmailService();
  Container.set(NotificationServiceToken, emailService);

  const service = Container.get(AppointmentService);
  await service.bookAppointment("Ved Lakkad", "Saturday 7pm");

  expect(emailService).toBeInstanceOf(EmailService);
});

test("should use StripeBillingService for billing", async () => {
  const notifier = new MockNotifier();
  const stripe = new StripeBillingService();

  Container.set(NotificationServiceToken, notifier);
  Container.set(BillingServiceToken, stripe);

  const service = Container.get(AppointmentService);
  await service.bookAppointment("Ved Lakkad", "Saturday 7pm", 100);

  expect(stripe).toBeInstanceOf(StripeBillingService);
});
