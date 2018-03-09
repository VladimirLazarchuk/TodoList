interface Task {
  id: number;
  title: string;
  completed: boolean;
  task: string;
}

interface User {
  id: number;
  fullName: string;
  userEmail: string;
  token: string;
}

export {Task, User};
