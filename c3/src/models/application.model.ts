export interface Application {
  name: string;
  email: string;
  birthdate: string;
  grades: number[];
  essay: string;
  recommendationLetter: string;
  portfolioLink?: string;
  applicantType?: string;
}
