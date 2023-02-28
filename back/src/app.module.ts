import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssociationsService } from './associations/associations.service';
import { AssociationsController } from './associations/associations.controller';
import { AssociationsModule } from './associations/associations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Association } from './associations/associations.entity';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db',
      entities: [
        User,
        Association,
      ],
      synchronize: true,
      }),
    UsersModule, AssociationsModule, AuthModule],
  controllers: [AppController, AssociationsController],
  providers: [AppService],
})
export class AppModule {}
