export const ROLES = ["user", "assistant"] as const;

export type Message = {
  role: (typeof ROLES)[number];
  content: string;
};
