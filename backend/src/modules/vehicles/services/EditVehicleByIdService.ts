import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehiclesRepository from '../repositories/IVehiclesRepository';

interface IRequest {
  id: string;
  license_plate: string;
  brand: string;
  model: string;
  year: string; 
  type: string;
}

@injectable()
class EditVehicleByIdService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute({id, license_plate, brand, model, year, type}: IRequest): Promise<Vehicle>{
    const vehicle = await this.vehiclesRepository.findById(id);

    if(!vehicle){
      throw new AppError('This vehicle was not found');
    }

    if(license_plate !== vehicle.license_plate){
      const findVehicle = await this.vehiclesRepository.findByLicensePlate(license_plate);
      if(findVehicle){
        throw new AppError('Already have a vehicle with this license plate');
      }
    }

    const editedVehicle = await this.vehiclesRepository.editVehicle({
      id,
      license_plate,
      brand,
      model,
      year,
      type,
    });

    return editedVehicle;
  }
}

export default EditVehicleByIdService;