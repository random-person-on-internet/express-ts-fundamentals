import { Token } from "typedi";
import type { NotificationService } from "./NotificationService";

export const NotificationServiceToken = new Token<NotificationService>();
