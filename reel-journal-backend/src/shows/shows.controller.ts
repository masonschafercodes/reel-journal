import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ShowsService } from './shows.service';
import { CreateShowDto } from './dto/create-show.dto';
import { UpdateShowDto } from './dto/update-show.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ShowEntity } from './entities/show.entity';

@Controller('shows')
@ApiTags('shows')
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
  findOne(@Param('id') id: string) {
    return this.showsService.findOne(id);
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
