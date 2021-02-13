import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Car from '../infra/typeorm/entities/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  license_plate: string;
  brand: string;
  model: string;
  version: string; 
  year: number;
}

@injectable()
class CreateCarService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({license_plate, brand, model, version, year}: IRequest): Promise<Car>{
    const findCar = await this.carsRepository.findByLicensePlate(license_plate);

    if(findCar){
      throw new AppError('Already have a car with this license plate');
    }

    const car = await this.carsRepository.create({
      license_plate,
      brand,
      model,
      version,
      year,
    });

    return car;
  }
}

export default CreateCarService;