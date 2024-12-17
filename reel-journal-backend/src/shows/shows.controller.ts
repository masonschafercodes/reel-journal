import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShowsService } from './shows.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ShowEntity } from './entities/show.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('shows')
@ApiTags('shows')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ShowsController {
  constructor(private readonly showsService: ShowsService) {}

  @Post()
  @ApiCreatedResponse({ type: ShowEntity })
  create(@Body() createShowDto: CreateShowDto) {
    return this.showsService.create(createShowDto);
  }

  @Get()
  @ApiOkResponse({ type: ShowEntity, isArray: true })
  @ApiQuery({ name: 'includeSeasons', required: false, type: Boolean })
  findAll(@Query() query: { includeSeasons?: string }) {
    return this.showsService.findAll(query.includeSeasons);
  }

  @Get(':id')
  @ApiOkResponse({ type: ShowEntity })
  @ApiQuery({ name: 'includeSeasons', required: false, type: Boolean })
  findOne(
    @Param('id') id: string,
    @Query() query: { includeSeasons?: string },
  ) {
    return this.showsService.findOne(id, query.includeSeasons);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ShowEntity })
  update(@Param('id') id: string, @Body() updateShowDto: UpdateShowDto) {
    return this.showsService.update(id, updateShowDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ShowEntity })
  remove(@Param('id') id: string) {
    return this.showsService.remove(id);
  }
}
