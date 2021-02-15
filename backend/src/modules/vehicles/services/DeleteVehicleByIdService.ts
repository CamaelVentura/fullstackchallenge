import { injectable, inject } from 'tsyringe';

import IVehiclesRepository from '../repositories/IVehiclesRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteVehicleByIdService {
  constructor(
    @inject('VehiclesRepository')
    private vehiclesRepository: IVehiclesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void>{
    await this.vehiclesRepository.deleteById(id);
  }
}

export default DeleteVehicleByIdService;