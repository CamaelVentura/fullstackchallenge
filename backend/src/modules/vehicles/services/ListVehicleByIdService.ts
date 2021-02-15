import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehiclesRepository from '../repositories/IVehiclesRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListVehicleByIdService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Vehicle>{
    const vehicle = await this.vehiclesRepository.findById(id);

    if(!vehicle){
      throw new AppError('The vehicle was not found');
    }

    return vehicle;
  }
}

export default ListVehicleByIdService;