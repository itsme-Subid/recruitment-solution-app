export type User = {
  name: string;
  role:
    | "Backend Developer"
    | "Frontend Developer"
    | "Fullstack Developer"
    | "Designer"
    | "Project Manager"
    | "Tester"
    | "Mobile Developer"
    | "DevOps"
    | "Marketing";
  country: string;
};
