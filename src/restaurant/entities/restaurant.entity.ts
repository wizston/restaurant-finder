import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, Point, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity('Restaurants')
export class Restaurant {
  constructor(partial: Partial<Restaurant>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column({ length: 100 })
  cuisineType: string;

  @Column('text')
  priceRange: string;

  @Column('decimal', { precision: 2, scale: 1 })
  ratings: number;

  @Column({
    type: 'point',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
    transformer: {
      from(value: any): Point {
        return value;
      },
      to(value: Point): string {
        return `POINT(${value.coordinates[0]} ${value.coordinates[1]})`;
      },
    },
  })
  @Exclude()
  location: Point;

  @BeforeInsert()
  @BeforeUpdate()
  updateLocation() {
    if (this.latitude && this.longitude) {
      this.location = {
        type: 'Point',
        coordinates: [this.longitude, this.latitude],
      };
    }
  }
}
