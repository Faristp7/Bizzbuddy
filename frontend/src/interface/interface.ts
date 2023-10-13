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

export interface User {
  _id: string;
  username: string;
  email: string;
  phone: string;
  activeStatus: boolean;
}

export type ProfilerCallbackType = (
  id: string,
  phase: "mount" | "update",
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) => void;

export interface AccountProps {
  datas?: {
    username: string;
    profileImage: string;
    bussinessName: string;
    userId: {
      profileImage: string;
    };
  }[];
  pending: boolean;
}
