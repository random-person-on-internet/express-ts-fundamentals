import { Service } from "typedi";
import { NotificationService } from "./NotificationService";

@Service()
export class SMSService implements NotificationService {
  async send(to: string, message: string): Promise<void> {
    console.log(`Sending SMS to ${to}: ${message}`);
  }
}
