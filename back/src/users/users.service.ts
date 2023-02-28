import { Injectable } from '@nestjs/common';
import{ User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import passport from 'passport';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
            @InjectRepository(User)
            private repository: Repository<User>
        ) {}

   //public async getAll(): Promise<string[]> {
   //     return ['oui', 'c\'est', 'moi'];
   //}

    public async getAll(): Promise<User[]> {
        return this.repository.find();
    }

    public async getById(idToFind: number): Promise<User> {
        let userById = await this.repository.findOne({
            where : { id: Equal(idToFind) }
        });
        return userById;
    }

    public async create(lastname: string, firstname: string, age: number, password: string) : Promise<User> {
        
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        
        let userToCreate = this.repository.create({
            lastname: lastname,
            firstname: firstname,
            age: age,
            password: hash
        })
        this.repository.save(userToCreate);
        return userToCreate;
    }

    public async put(id: number, lastname: string, firstname: string, age: number, password: string) : Promise<User> {
        let userToModify = await this.getById(id);
        if(lastname !== undefined) {
            userToModify.lastname = lastname;
        }
        if(firstname !== undefined) {
            userToModify.firstname = firstname;
        }
        if(age !== undefined) {
            userToModify.age = age;
        }
        if(password !== undefined) {
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(password, saltOrRounds);
            userToModify.password = hash;
        }
        await this.repository.save(userToModify);
        return this.getById(id);
    }

    public async deleteById(id: number) : Promise<boolean> {
        let userToDelete = await this.getById(id);
        let userDeleted = await this.repository.delete(userToDelete);
        return (userDeleted !== null);
    }

}
