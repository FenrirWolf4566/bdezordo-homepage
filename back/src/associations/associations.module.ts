import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AssociationsController } from './associations.controller';
import { Association } from './associations.entity';
import { AssociationsService } from './associations.service';

@Module({
    //imports: [TypeOrmModule.forFeature([Association, UsersModule])],
    controllers: [AssociationsController],
    imports: [TypeOrmModule.forFeature([Association]),UsersModule],
    providers: [AssociationsService],
    exports: [AssociationsService]
})
export class AssociationsModule {}
