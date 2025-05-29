import { Token } from "typedi";
import type { BillingService } from "./BillingService";

export const BillingServiceToken = new Token<BillingService>();
