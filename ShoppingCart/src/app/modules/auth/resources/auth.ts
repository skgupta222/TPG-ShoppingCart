export interface User {
    id: string;
    username: string;
    email: string;
    isadmin: boolean;
  }
  
  export var UserModel: User = {
    id: '',
    username: '',
    email: '',
    isadmin: false,
  };
  