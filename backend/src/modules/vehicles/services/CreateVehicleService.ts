import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehiclesRepository from '../repositories/IVehiclesRepository';

interface IRequest {
  license_plate: string;
  brand: string;
  model: string;
  year: string;
  type: string;
}

@injectable()
class CreateVehicleService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute({license_plate, brand, model, year, type}: IRequest): Promise<Vehicle>{
    const findVehicle = await this.vehiclesRepository.findByLicensePlate(license_plate);

    if(findVehicle){
      throw new AppError('Already have a car with this license plate');
    }

    const vehicle = await this.vehiclesRepository.create({
      license_plate,
      brand,
      model,
      year,
      type,
    });

    return vehicle;
  }
}

export default CreateVehicleService;