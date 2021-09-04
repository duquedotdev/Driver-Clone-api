export interface AuthResponse {
  account: {
    id?: number;

    name: string;

    email: string;

    roles: string[];
  };

  token: string;
}
