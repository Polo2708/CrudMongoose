import { IsNumber, IsString } from 'class-validator';

export class CreatePeliculaDto {
  @IsString()
  title: string;

  @IsString()
  user: string;

  @IsNumber()
  year: number;
}
