import { injectable, inject } from 'tsyringe';

import AppError from '../../../shared/errors/AppError';

import Car from '../infra/typeorm/entities/Car';
import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  id: string;
  license_plate: string;
  brand: string;
  model: string;
  year: string; 
  type: string;
}

@injectable()
class EditCarByIdService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({id, license_plate, brand, model, year, type}: IRequest): Promise<Car>{
    const car = await this.carsRepository.findById(id);

    if(!car){
      throw new AppError('This car was not found');
    }

    if(license_plate !== car.license_plate){
      const findCar = await this.carsRepository.findByLicensePlate(license_plate);
      if(findCar){
        throw new AppError('Already have a car with this license plate');
      }
    }

    const editedCar = await this.carsRepository.editCar({
      id,
      license_plate,
      brand,
      model,
      year,
      type,
    });

    return editedCar;
  }
}

export default EditCarByIdService;