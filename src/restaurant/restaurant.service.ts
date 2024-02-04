import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { query } from 'express';

@Injectable()
export class RestaurantService {
  private readonly supportedCities = [
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
    'Dallas',
    'San Jose',
    'Austin',
  ];

  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const cafe = this.restaurantRepository.create(createRestaurantDto);
    console.log(cafe);
    return this.restaurantRepository.save(cafe);
  }

  async findAll(query: {
    city?: string;
    latitude?: number;
    longitude?: number;
    distance?: number;
  }): Promise<Restaurant[]> {
    // Check if city is provided and supported
    if (query.city && !this.supportedCities.includes(query.city)) {
      throw new NotFoundException(
        `City '${query.city}' is not valid or not supported.`,
      );
    }

    const city = query.city;
    const radiusOfEarthInMeters = 6371000; // Earth's radius in meters
    const latitude = query.latitude;
    const longitude = query.longitude;

    const queryBuilder =
      this.restaurantRepository.createQueryBuilder('restaurants');

    // Filter by city if provided
    if (query.city) {
      queryBuilder.andWhere('restaurants.address LIKE :city', {
        city: `%${city}%`,
      });
    }

    // Filter by distance if coordinates and distance are provided
    if (
      query.latitude !== undefined &&
      query.longitude !== undefined &&
      query.distance !== undefined
    ) {
      queryBuilder.andWhere(
        `ST_Distance_Sphere(
            point(restaurants.longitude, restaurants.latitude),
            point(:longitude, :latitude)
         ) <= :distance`,
        {
          longitude,
          latitude,
          distance: query.distance * 1000, // Convert distance to meters if needed
        },
      );
    }

    const cafes = await queryBuilder.getMany();
    return cafes;
  }

  async findOne(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateRestaurantDto: UpdateRestaurantDto,
  ): Promise<Restaurant> {
    await this.restaurantRepository.update(id, updateRestaurantDto);
    return this.restaurantRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.restaurantRepository.delete(id);
    return {
      response: 'restaurant deleted',
    };
  }
}
