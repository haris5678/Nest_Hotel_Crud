import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'haris',
      email: 'test@gmail.com',
      phone: '13245667',
      role: 'Admin',
    },
    {
      id: 2,
      name: 'ibrahim',
      email: 'test2@gmail.com',
      phone: '13234',
      role: 'User',
    },
    {
      id: 3,
      name: 'ahmer',
      email: 'test3@gmail.com',
      phone: '132457',
      role: 'Admin',
    },
    {
      id: 4,
      name: 'wahab',
      email: 'test4@gmail.com',
      phone: '13245667',
      role: 'User',
    },
    {
      id: 5,
      name: 'haider',
      email: 'test5@gmail.com',
      phone: '13245667',
      role: 'User',
    },
  ];

  findAll(role?: 'Admin' | 'User') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    console.log('infine one', this.users);

    const user = this.users.find((user) => user.id === id);
    // console.log('user id is ', typeof id);
    // console.log(typeof user?.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
