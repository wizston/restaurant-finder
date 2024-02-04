import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsLatitude,
  IsLongitude,
  IsNumber,
  Min,
  ValidateIf,
} from 'class-validator';

export class FindAllCafesDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsLatitude()
  latitude?: number;

  @IsLongitude()
  longitude?: number;

  @Transform(({ value }) => (value ? Number(value) : 0))
  @IsNotEmpty({ message: 'distance cannot be empty' })
  @IsNumber({}, { message: 'distance must be a number' })
  @Min(0, { message: 'distance cannot be negative' })
  distance?: number;
}
