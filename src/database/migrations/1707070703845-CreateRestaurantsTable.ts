import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRestaurantsTable1707070703845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE restaurants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(500) NOT NULL,
                address TEXT NOT NULL,
                latitude FLOAT NOT NULL,
                longitude FLOAT NOT NULL,
                location POINT NOT NULL,
                cuisineType VARCHAR(100) NULL,
                priceRange TEXT NULL,
                ratings DECIMAL(2,1) NULL,
                created_at TIMESTAMP NOT NULL DEFAULT now(),
                updated_at TIMESTAMP NOT NULL DEFAULT now()
            );

        `);

        await queryRunner.query(`
            CREATE SPATIAL INDEX sx_restaurants_location ON restaurants(location);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE restaurants;`);
         await queryRunner.query(
           `DROP INDEX "public"."sx_restaurants_location"`,
         );
    }

}
