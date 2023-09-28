export interface loginFormData {
  email: string;
  password: string;
}

export interface googleData {
  email: string;
  given_name: string;
  picture: string;
}

export interface signUpFormData {
  username: string;
  email: string;
  phone: string;
  password: string;
  ReenterPassword: string;
}

export interface ListBusinessProps {
  close: () => void;
}

export interface RegisterBussiness {
  businessName: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  tags: string;
}
