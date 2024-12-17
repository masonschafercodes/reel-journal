import { Injectable } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ShowsService {
  constructor(private prismaService: PrismaService) {}

  create(createShowDto: CreateShowDto) {
    return this.prismaService.show.create({
      data: createShowDto,
    });
  }

  findAll(includeSeasons?: string) {
    return this.prismaService.show.findMany(
      includeSeasons === 'true'
        ? {
            include: { seasons: true },
          }
        : undefined,
    );
  }

  findOne(id: string) {
    return this.prismaService.show.findUnique({
      where: { id },
    });
  }

  update(id: string, updateShowDto: UpdateShowDto) {
    return this.prismaService.show.update({
      where: { id },
      data: updateShowDto,
    });
  }

  remove(id: string) {
    return this.prismaService.show.delete({
      where: { id },
    });
  }
}
