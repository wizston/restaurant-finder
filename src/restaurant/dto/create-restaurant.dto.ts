import { IsEmail, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRestaurantDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @IsString()
  cuisineType: string | null;

  @IsString()
  priceRange: string | null;

  @IsNumber()
  ratings: number | null;
}
