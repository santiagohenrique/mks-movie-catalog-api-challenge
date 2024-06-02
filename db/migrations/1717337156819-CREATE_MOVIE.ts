import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CREATEMOVIE1717337156819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await queryRunner.createTable(new Table({
            name: 'movies',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'title',
                    type: 'varchar'
                },
                {
                    name: 'synopsis',
                    type: 'varchar',
                    isNullable: true
                },
                {
                    name: 'year',
                    type: 'integer'
                },
                {
                    name: 'score',
                    type: 'float'
                },
                {
                    name: 'genreId',
                    type: 'uuid'
                }
            ]
        }));

        await queryRunner.createForeignKey('movies', new TableForeignKey({
            columnNames: ['genreId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'genres',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('DROP TABLE IF EXISTS movies');
    }
}
