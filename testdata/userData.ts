export interface UserData {
  name: string;
  email: string;
  role: string;
  status: string;
}

export const newUser: UserData = {
  name: 'Aaryan Risal',
  email: 'aaryan@gmail.com',
  role: 'Editor',
  status: 'Inactive',
};

export const updatedUser: Partial<UserData> = {
  name: 'Aaryan',
};