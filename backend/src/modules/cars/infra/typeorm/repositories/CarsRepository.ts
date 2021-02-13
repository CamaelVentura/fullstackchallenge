import { getRepository, Repository } from 'typeorm';

import AppError from '../../../../../shared/errors/AppError';

import ICarsRepository from '../../../repositories/ICarsRepository';
import ICreateCarDTO from '../../../dtos/ICreateCarDTO';
import IEditCarDTO from '../../../dtos/IEditCarDTO';

import Car from '../entities/Car';

export default class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;
  constructor(){
    this.ormRepository = getRepository(Car);
  }

  public async create(data: ICreateCarDTO): Promise<Car>{
    const car = this.ormRepository.create(data);

    await this.ormRepository.save(car);

    return car;
  }

  public async deleteById(id: string): Promise<void>{
    const car = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    if(!car){
      throw new AppError('This car was not found');
    }

    await this.ormRepository.remove(car);
  }

  public async editCar(data: IEditCarDTO): Promise<Car>{
    const car = await this.ormRepository.findOne({
      where: {
        id: data.id
      }
    });

    if(!car){
      throw new AppError('This car was not found to edit them');
    }

    Object.assign(car, { ...data });

    await this.ormRepository.save(car);

    return car;
  }

  public async findAll(): Promise<Car[]>{
    const cars = await this.ormRepository.find();
    return cars;
  }

  public async findById(id: string): Promise<Car | undefined>{
    const car = await this.ormRepository.findOne({
      where: {
        id
      }
    });

    return car;
  }

  public async findByLicensePlate(license_plate: string): Promise<Car | undefined>{
    const car = await this.ormRepository.findOne({
      where: {
        license_plate
      }
    });

    return car;
  }
}