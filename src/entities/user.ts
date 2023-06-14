export type User = {
  id: string;
  userName: string;
  email: string;
  passwd: string;
};

export type UserLogin = {
  user: string; // Equal to userName or email
  passwd: string;
};
