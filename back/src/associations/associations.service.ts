import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Association } from './associations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { use } from 'passport';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AssociationsService {

    constructor(
        @InjectRepository(Association)
        private repository: Repository<Association>,
        private service: UsersService
    ) {}

    //public async getAll(): Promise<string[]> {
    //    return ['oui', 'c\'est', 'moi'];
    //}
    
    public async getAll(): Promise<Association[]> {
        return this.repository.find();
    }
    
    public async getById(idToFind: number): Promise<Association> { 
        let associationById = await this.repository.findOne({
            where : { id: Equal(idToFind) }
        });
        return associationById;
    }

    public async getMembers(id: number): Promise<User[]> {
        let usersToGet = await this.getById(id);
        console.log("try to getMember");
        return usersToGet.users;
    }
    
    public async create(idUsers: number[], name: string) : Promise<Association> {
        let users: User[] = [];
        for (let id of idUsers) {
            users.push(await this.service.getById(id));
        }
        let associationToCreate = this.repository.create({
            name: name,
            users: users,
        })
        await this.repository.save(associationToCreate);
        return associationToCreate;
    }

/*
    public async create(idUsers: number[], name: string) : Promise<Association> {
        let usersToCreate = []
        idUsers.forEach(id => {
            usersToCreate.push(this.service.getById(id));
        });
        let associationToCreate = this.repository.create({
            name: name,
            users: usersToCreate
        })
        await this.repository.save(associationToCreate);
        return associationToCreate;
*/

    public async put(id: number, idUsers: number[], name: string) : Promise<Association> {
        let associationToModify = await this.getById(id);
        if(idUsers !== undefined) {
            let usersToCreate = []
            idUsers.forEach(id => {
                usersToCreate.push(this.service.getById(id));
            });
            associationToModify.users = usersToCreate;
        }
        if(name !== undefined) {
            associationToModify.name = name;
        }
        await this.repository.save(associationToModify);
        return this.getById(id);
    }
    
    public async deleteById(id: number) : Promise<boolean> {
        let associationToDelete = await this.getById(id);
        let associationDeleted = await this.repository.remove(associationToDelete);
        return (associationDeleted !== null);
    }

}
