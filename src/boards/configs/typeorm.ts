import 'reflect-metadata';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'dkskqkek',
  database: 'testuserdb',
  entities: [__dirname + '/../**/*.entity.{js,ts}'], //엔티티를 이용해서 db테이블 생성 그래서 엔티티 파일이 어디에 있는지 성정해준다.
  synchronize: true,
};
