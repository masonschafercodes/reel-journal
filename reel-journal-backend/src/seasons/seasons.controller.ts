import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SeasonsService } from './seasons.service';
import { CreateSeasonDto } from './dto/create-season.dto';
import { UpdateSeasonDto } from './dto/update-season.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SeasonEntity } from './entities/season.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('seasons')
@ApiTags('seasons')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @Post()
  @ApiCreatedResponse({ type: SeasonEntity })
  create(@Body() createSeasonDto: CreateSeasonDto) {
    return this.seasonsService.create(createSeasonDto);
  }

  @Get()
  @ApiOkResponse({ type: SeasonEntity, isArray: true })
  findAll() {
    return this.seasonsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: SeasonEntity })
  findOne(@Param('id') id: string) {
    return this.seasonsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SeasonEntity })
  update(@Param('id') id: string, @Body() updateSeasonDto: UpdateSeasonDto) {
    return this.seasonsService.update(id, updateSeasonDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: SeasonEntity })
  remove(@Param('id') id: string) {
    return this.seasonsService.remove(id);
  }
}
