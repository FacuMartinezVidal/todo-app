import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class Todo {
  id: number;
  title: string;
  status: boolean;
}

export class addDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class updateDTO {
  @IsBoolean()
  @IsNotEmpty()
  status: boolean;
}
