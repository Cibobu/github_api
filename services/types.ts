export enum Status {
  ENABLE = "0",
  DISABLE = "1"
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  roles: string[];
  password: string;
  status: Status;
  otp_code: string;
  last_iat: number;
  created_by: Admin;
  updated_by: Admin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export type ErrorObj<T extends object> = {
  [key in keyof T]: string;
}

export interface ResponseAPI<T = any> {
  items: T,
  incomplete_results: boolean,
  total_count: number
}

// JSON Placeholder Request and Response Type
export interface IItems {
  avatar_url: string,
  events_url: string,
  followers_url: string,
  following_url: string,
  gists_url: string,
  gravatar_id: string,
  html_url: string,
  id: number,
  login: string,
  node_id: string,
  organizations_url: string,
  received_events_url: string,
  repos_url: string,
  score: number,
  site_admin: boolean,
  starred_url: string,
  subscriptions_url: string,
  type: string,
  url: string
}

export interface LoginExampleRequest {
  username: string;
  password: string;
}