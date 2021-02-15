import { injectable, inject } from 'tsyringe';

import Vehicle from '../infra/typeorm/entities/Vehicle';
import IVehiclesRepository from '../repositories/IVehiclesRepository';


@injectable()
class ListVehiclesService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute(): Promise<Vehicle[]>{
    const vehicles = await this.vehiclesRepository.findAll();

    return vehicles;
  }
}

export default ListVehiclesService;