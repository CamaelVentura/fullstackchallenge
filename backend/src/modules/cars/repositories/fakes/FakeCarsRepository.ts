import { uuid } from 'uuidv4';

import AppError from '../../../../shared/errors/AppError';

import ICarsRepository from '../ICarsRepository';
import ICreateCarDTO from '../../dtos/ICreateCarDTO';
import IEditCarDTO from '../../dtos/IEditCarDTO';

import Car from '../../infra/typeorm/entities/Car';

export default class CarsRepository implements ICarsRepository {
  private cars: Car[];
  constructor(){
    this.cars = [];
  }

  public async create(data: ICreateCarDTO): Promise<Car>{

    const car = new Car();

    Object.assign(car, { id: uuid(), ...data})

    this.cars.push(car)

    return car;
  }

  public async deleteById(id: string): Promise<void>{
    const findCar = this.cars.find(car => car.id === id);

    if(!findCar){
      throw new AppError('This car was not found');
    }

    const index = this.cars.indexOf(findCar);
    this.cars.splice(index, 1);
  }

  public async editCar(data: IEditCarDTO): Promise<Car>{
    const findCar = this.cars.find(car => car.id === data.id);

    if(!findCar){
      throw new AppError('This car was not found to edit them');
    }

    Object.assign(findCar, { ...data });

    const index = this.cars.indexOf(findCar);
    this.cars[index] = findCar;

    return findCar;
  }

  public async findAll(): Promise<Car[]>{
    return this.cars;
  }

  public async findById(id: string): Promise<Car | undefined>{
    const findCar = this.cars.find(car => car.id === id);

    return findCar;
  }

  public async findByLicensePlate(license_plate: string): Promise<Car | undefined>{
    const findCar = this.cars.find(car => car.license_plate === license_plate);

    return findCar;
  }
}