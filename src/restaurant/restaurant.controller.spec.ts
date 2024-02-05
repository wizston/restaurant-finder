import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { FindAllCafesDto } from './dto/find-restaurants.dto';
import { Point } from 'typeorm';

describe('RestaurantController', () => {
  let controller: RestaurantController;
  let service: RestaurantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [RestaurantService],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
    service = module.get<RestaurantService>(RestaurantService);
  });

  describe('create', () => {
    it('should create a new restaurant', async () => {
      const createRestaurantDto: CreateRestaurantDto = {
        name: 'Pizzeria Delight',
        address: '585 Reynolds Rapids, San Diego, CA',
        latitude: 31.8739,
        longitude: -84.0516,
        cuisineType: 'French',
        priceRange: '$',
        ratings: 1.3,
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const createdRestaurant: Restaurant = {
        name: 'Pizzeria Delight',
        address: '585 Reynolds Rapids, San Diego, CA',
        latitude: 31.8739,
        longitude: -84.0516,
        cuisineType: 'French',
        priceRange: '$',
        ratings: 1.3,
        location: {
          type: 'Point',
          coordinates: [-84.0516, 31.8739],
        },
        id: 5,
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdRestaurant);

      const result = await controller.create(createRestaurantDto);

      expect(result).toEqual(createdRestaurant);
      expect(service.create).toHaveBeenCalledWith(createRestaurantDto);
    });
  });

  describe('findAll', () => {
    it('should return all restaurants', async () => {
      const findAllCafesDto: FindAllCafesDto = {
        // provide the necessary data for findAllCafesDto
      };

      const restaurants: Restaurant[] = [
        // provide the expected array of restaurants
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(restaurants);

      const result = await controller.findAll(findAllCafesDto);

      expect(result).toEqual(restaurants);
      expect(service.findAll).toHaveBeenCalledWith(findAllCafesDto);
    });
  });

  describe('findOne', () => {
    it('should return a restaurant by id', async () => {
      const id = '1';
      const restaurant: Restaurant = {
        location: undefined,
        updateLocation(): void {},
        id: 1,
        name: 'Pizzeria Delight',
        address: '585 Reynolds Rapids, San Diego, CA',
        latitude: 31.8739,
        longitude: -84.0516,
        cuisineType: 'French',
        priceRange: '$',
        ratings: 1.3,
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(restaurant);

      const result = await controller.findOne(id);

      expect(result).toEqual(restaurant);
      expect(service.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a restaurant', async () => {
      const id = '1';
      const updateRestaurantDto: UpdateRestaurantDto = {
        name: 'Pizzeria Delight Update',
        address: '585 Reynolds Rapids, San Diego, CA',
        latitude: 31.8739,
        longitude: -84.0516,
        cuisineType: 'French',
        priceRange: '$',
        ratings: 1.3,
      };
      const point: Point = {
        type: 'Point',
        coordinates: [-84.0516, 31.8739],
      };
      const updatedRestaurant: Restaurant = {
        id: 1,
        name: 'Pizzeria Delight Update',
        address: '585 Reynolds Rapids, San Diego, CA',
        latitude: 31.8739,
        longitude: -84.0516,
        cuisineType: 'French',
        priceRange: '$',
        ratings: 1.3,
        location: point,
        updateLocation: function (): void {
          throw new Error('Function not implemented.');
        },
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedRestaurant);

      const result = await controller.update(id, updateRestaurantDto);

      expect(result).toEqual(updatedRestaurant);
      expect(service.update).toHaveBeenCalledWith(+id, updateRestaurantDto);
    });
  });

  describe('remove', () => {
    it('should remove a restaurant', async () => {
      const id = '1';

      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      const result = await controller.remove(id);

      expect(result).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith(+id);
    });
  });
});
