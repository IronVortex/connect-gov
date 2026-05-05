import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from '@/schemas/service.schema';
import { CreateServiceDto, UpdateServiceDto } from '@/dto/service.dto';

const FALLBACK_SERVICES = [
  {
    _id: '000000000000000000000101',
    name: 'Driver License Renewal',
    description: 'Renew your existing driver license',
    departmentId: '000000000000000000000201',
    requiredDocuments: ['National ID', 'Proof of Residence', 'Medical Certificate'],
    isActive: true,
  },
  {
    _id: '000000000000000000000102',
    name: 'Vehicle Registration',
    description: 'Register a new vehicle or renew registration',
    departmentId: '000000000000000000000201',
    requiredDocuments: ['Proof of Ownership', 'Insurance Certificate', 'ID Proof'],
    isActive: true,
  },
  {
    _id: '000000000000000000000103',
    name: 'Passport Application',
    description: 'Apply for a new passport or renew an existing passport',
    departmentId: '000000000000000000000202',
    requiredDocuments: ['Birth Certificate', 'National ID', 'Photo', 'Proof of Residence'],
    isActive: true,
  },
  {
    _id: '000000000000000000000104',
    name: 'Tax Return Filing',
    description: 'File your annual tax returns',
    departmentId: '000000000000000000000203',
    requiredDocuments: ['Income Statement', 'Tax Forms', 'Supporting Documents'],
    isActive: true,
  },
];

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<Service>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const createdService = new this.serviceModel(createServiceDto);
    return createdService.save();
  }

  async findAll(): Promise<Service[]> {
    const services = await this.serviceModel.find({ isActive: true }).exec();

    if (services.length > 0) {
      return services;
    }

    return FALLBACK_SERVICES as unknown as Service[];
  }

  async findByDepartment(departmentId: string): Promise<Service[]> {
    const services = await this.serviceModel
      .find({ departmentId, isActive: true })
      .exec();

    if (services.length > 0) {
      return services;
    }

    return FALLBACK_SERVICES.filter(
      (service) => service.departmentId === departmentId,
    ) as unknown as Service[];
  }

  async findById(id: string): Promise<Service | null> {
    return this.serviceModel.findById(id).exec();
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service | null> {
    return this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Service | null> {
    return this.serviceModel
      .findByIdAndUpdate(id, { isActive: false }, { new: true })
      .exec();
  }
}
