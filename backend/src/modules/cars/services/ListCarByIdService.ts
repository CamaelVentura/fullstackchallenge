import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Car from '../infra/typeorm/entities/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListCarByIdService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Car>{
    const car = await this.carsRepository.findById(id);

    if(!car){
      throw new AppError('The car was not found');
    }

    return car;
  }
}

export default ListCarByIdService;