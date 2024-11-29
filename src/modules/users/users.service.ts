import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/modules/users/dto/user-dto';

@Injectable()
export class UsersService {
  private _users: UserDto[];

  constructor() {
    this._users = [];
  }

  createUser(user: UserDto) {
    const userFound = this._users.find((u) => u.id == user.id);

    if (!userFound) {
      this._users.push(user);
      console.log(this._users);
      return true;
    }
    return false;
  }

  getUsers(start: Date, end: Date) {
    // console.log(start);
    // console.log(end);
    if (start && end) {
      return this._users.filter(
        (u) =>
          u.birthDate.getTime() >= start.getTime() &&
          u.birthDate.getTime() <= end.getTime(),
      );
    } else if (start && !end) {
      return this._users.filter(
        (u) => u.birthDate.getTime() >= start.getTime(),
      );
    } else if (!start && end) {
      return this._users.filter((u) => u.birthDate.getTime() <= end.getTime());
    } else {
      return this._users;
    }
  }

  updateUser(user: UserDto) {
    const userAdded = this.createUser(user);

    if (!userAdded) {
      const index = this._users.findIndex((u) => u.id == user.id);
      this._users[index] = user;
    }

    return true;
  }

  deleteUser(idUser: number) {
    const index = this._users.findIndex((u) => u.id === idUser);
    console.log(index);

    if (index != -1) {
      this._users.splice(index, 1);
      return true;
    }

    return false;
  }
}
