import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities/user.pg.entity';

export class AddsDefaultUser1707086585575 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const defaultUser = new User({
      name: 'Default User',
      email: 'default@user.com',
      password: 'password',
    });

    await queryRunner.manager.save(defaultUser);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.manager.findOne(User, {
      where: {
        email: 'default@user.com',
      },
    });

    await queryRunner.manager.remove(user);
  }
}
