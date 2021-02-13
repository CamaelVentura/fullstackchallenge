import ICreateCarDTO from '../dtos/ICreateCarDTO';
import IEditCarDTO from '../dtos/IEditCarDTO';
import Car from '../infra/typeorm/entities/Car';

export default interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findAll(): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  editCar(data: IEditCarDTO): Promise<Car>
  deleteById(id: string): Promise<void>;
}