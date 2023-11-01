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
  _id: string;
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
    _id: string;
    username: string;
    profileImage: string;
    bussinessName: string;
    userId: {
      profileImage: string;
      _id: string;
    };
  }[];
  pending: boolean;
}

type SetUserIdFunction = (userId: string) => void;

export interface PostCollectionProps {
  role: string;
  userIdForPost: string;
  guestUser: boolean;
  selectedFilter: string;
  setUserId?: SetUserIdFunction;
}

export interface PropsData {
  _id: string;
  title: string;
  description: string;
  image: string;
  likes: string[];
  userId: {
    _id: string;
    profileImage: string;
    username: string;
  };
}

export interface commentProps {
  viewComment: string;
  itemId: string;
}

export interface commentState {
  _id: string;
  message: string;
  createdAt: string;
  userId: {
    username: string;
    profileImage: string;
  };
}

interface Participant {
  username: string;
  _id: string;
  profileImage?: string;
}

export interface userChat {
  participantDetails: Participant[];
}

export interface userChats {
  senderId: string;
  message: string;
  timestamps: string;
}

export interface FollowCount {
  followerCount: number;
  followingCount: number;
}

export interface Followers {
  followerId: {
    _id: string;
    username: string;
    profileImage: string;
  };
}

export interface Following {
  followingId: {
    _id: string;
    username: string;
    profileImage: string;
  };
}

export interface count {
  postCount: number;
  blockedUser: number;
}

export interface ChatProps {
  userId: string;
}

interface Reports {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  message: string;
  userId: string;
  _id: string;
}

export interface ReportState {
  _id: string;
  title: string;
  image: string;
  description: string;
  message: string;
  userId: string;
  view : boolean
  reports: Reports[];
}

export interface ReportModalProps {
  close: () => void;
  reports: Reports[];
}
