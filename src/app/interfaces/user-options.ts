export interface UserOptions {
  username: string;
  password: string;
}

export interface CreateAccountOptions {
  firstname: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginOptions {
  email: string;
  password: string;
}

export interface CreateClassOptions {
  classDescription: string;
  startTime: string;
  endTime: string;
}

export interface CreateStudentOptions {
  firstnames: string;
  surname: string;
  id: number;
  isActive: boolean;
  attendance: boolean;
}