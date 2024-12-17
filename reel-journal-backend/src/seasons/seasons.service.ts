import { Injectable } from '@nestjs/common';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeasonsService {
  constructor(private prismaService: PrismaService) {}

  create(createSeasonDto: CreateSeasonDto) {
    return this.prismaService.season.create({
      data: createSeasonDto,
    });
  }

  findAll() {
    return this.prismaService.season.findMany();
  }

  findOne(id: string) {
    return this.prismaService.season.findUnique({
      where: { id },
    });
  }

  update(id: string, updateSeasonDto: UpdateSeasonDto) {
    return this.prismaService.season.update({
      where: { id },
      data: updateSeasonDto,
    });
  }

  remove(id: string) {
    return this.prismaService.season.delete({
      where: { id },
    });
  }
}
