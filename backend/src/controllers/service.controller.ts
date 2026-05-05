import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { ServiceService } from '@/services/service.service';
import { CreateServiceDto, UpdateServiceDto } from '@/dto/service.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  async findAll(@Query('departmentId') departmentId?: string) {
    if (departmentId) {
      return this.serviceService.findByDepartment(departmentId);
    }
    return this.serviceService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.serviceService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return this.serviceService.update(id, updateServiceDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.serviceService.delete(id);
  }
}
