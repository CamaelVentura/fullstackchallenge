import { getRepository, Repository } from 'typeorm';

import AppError from '../../../../../shared/errors/AppError';

import IVehiclesRepository from '../../../repositories/IVehiclesRepository';
import ICreateVehicleDTO from '../../../dtos/ICreateVehicleDTO';
import IEditVehicleDTO from '../../../dtos/IEditVehicleDTO';

import Vehicle from '../entities/Vehicle';

export default class VehiclesRepository implements IVehiclesRepository {
  private ormRepository: Repository<Vehicle>;
  constructor(){
    this.ormRepository = getRepository(Vehicle);
  }

  public async create(data: ICreateVehicleDTO): Promise<Vehicle>{
    const vehicle = this.ormRepository.create(data);

    await this.ormRepository.save(vehicle);

    return vehicle;
  }

  public async deleteById(id: string): Promise<void>{
    const vehicle = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    if(!vehicle){
      throw new AppError('This vehicle was not found');
    }

    await this.ormRepository.remove(vehicle);
  }

  public async editVehicle(data: IEditVehicleDTO): Promise<Vehicle>{
    const vehicle = await this.ormRepository.findOne({
      where: {
        id: data.id
      }
    });

    if(!vehicle){
      throw new AppError('This car was not found to edit them');
    }

    Object.assign(vehicle, { ...data });

    await this.ormRepository.save(vehicle);

    return vehicle;
  }

  public async findAll(): Promise<Vehicle[]>{
    const vehicles = await this.ormRepository.find();
    return vehicles;
  }

  public async findById(id: string): Promise<Vehicle | undefined>{
    const vehicle = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    return vehicle;
  }

  public async findByLicensePlate(license_plate: string): Promise<Vehicle | undefined>{
    const vehicle = await this.ormRepository.findOne({
      where: {
        license_plate
      }
    });

    return vehicle;
  }
}