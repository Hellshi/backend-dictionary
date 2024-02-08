import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class FavoriteWords1707355183295 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_favorites',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'userId',
            type: 'uuid',
          },
          {
            name: 'wordId',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'user_favorites',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'user_favorites',
      new TableForeignKey({
        columnNames: ['wordId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'word',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userFavoritesTable = await queryRunner.getTable('user_favorites');
    const userIdForeignKey = userFavoritesTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    const wordIdForeignKey = userFavoritesTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('wordId') !== -1,
    );

    await queryRunner.dropForeignKey('user_favorites', userIdForeignKey);
    await queryRunner.dropForeignKey('user_favorites', wordIdForeignKey);

    await queryRunner.dropTable('user_favorites');
  }
}
