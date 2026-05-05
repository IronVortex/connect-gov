import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from '@/schemas/department.schema';
import { CreateDepartmentDto, UpdateDepartmentDto } from '@/dto/department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto): Promise<Department> {
    const createdDepartment = new this.departmentModel(createDepartmentDto);
    return createdDepartment.save();
  }

  async findAll(): Promise<Department[]> {
    return this.departmentModel.find({ isActive: true }).exec();
  }

  async findById(id: string): Promise<Department | null> {
    return this.departmentModel.findById(id).exec();
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<Department | null> {
    return this.departmentModel
      .findByIdAndUpdate(id, updateDepartmentDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Department | null> {
    return this.departmentModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
  }
}

