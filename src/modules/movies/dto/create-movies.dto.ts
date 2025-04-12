import {IsNotEmpty, IsString, IsNumber, IsArray , Length} from 'class-validator'
import { BaseDto } from '../../../utils/base-dto'

export class CreateMovieDto extends BaseDto {
  @IsNotEmpty()
  @IsString()
  @Length(1)
  title: string

  @IsNotEmpty()
  @IsNumber()
  year: number

  @IsNotEmpty()
  @IsString()
  @Length(1)
  format: string

  @IsNotEmpty()
  @IsArray()
  actors: string[]

  constructor(data: any) {
    super(data)
  }
}
