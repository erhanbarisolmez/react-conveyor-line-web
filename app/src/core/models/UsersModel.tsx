export default class UsersModel{
  id: number;
  name: string;
  password:string;
  permission: string;
  image: string;

  constructor( id: number,  name: string, password:string, permission: string,  image: string  ){
    this.id = id;
    this.name = name;
    this.password = password;
    this.permission = permission;
    this.password = password;
    this.image = image;
  }
}