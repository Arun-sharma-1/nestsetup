import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [{
    provide: UserService,
    useClass: UserService, // class injection
    // useValue:'NEST_MODE'// value injection
  }], //dependency injeection
  exports: [UserService]
})
//IOC -> depe inj => UserService:Userservice
export class UserModule { }
