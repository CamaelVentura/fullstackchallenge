import { uuid } from 'uuidv4';

import AppError from '../../../../shared/errors/AppError';

import IVehiclesRepository from '../IVehiclesRepository';
import ICreateVehicleDTO from '../../dtos/ICreateVehicleDTO';
import IEditVehicleDTO from '../../dtos/IEditVehicleDTO';

import Vehicle from '../../infra/typeorm/entities/Vehicle';

export default class VehiclesRepository implements IVehiclesRepository {
  private vehicles: Vehicle[];
  constructor(){
    this.vehicles = [];
  }

  public async create(data: ICreateVehicleDTO): Promise<Vehicle>{

    const vehicle = new Vehicle();

    Object.assign(vehicle, { id: uuid(), ...data});
    
    this.vehicles.push(vehicle);

    return vehicle;
  }

  public async deleteById(id: string): Promise<void>{
    const findVehicle = this.vehicles.find(vehicle => vehicle.id === id);

    if(!findVehicle){
      throw new AppError('This car was not found');
    }

    const index = this.vehicles.indexOf(findVehicle);
    this.vehicles.splice(index, 1);
  }

  public async editVehicle(data: IEditVehicleDTO): Promise<Vehicle>{
    const findVehicle = this.vehicles.find(vehicle => vehicle.id === data.id);

    if(!findVehicle){
      throw new AppError('This car was not found to edit them');
    }

    Object.assign(findVehicle, { ...data });

    const index = this.vehicles.indexOf(findVehicle);
    this.vehicles[index] = findVehicle;

    return findVehicle;
  }

  public async findAll(): Promise<Vehicle[]>{
    return this.vehicles;
  }

  public async findById(id: string): Promise<Vehicle | undefined>{
    const findVehicle = this.vehicles.find(vehicle => vehicle.id === id);

    return findVehicle;
  }

  public async findByLicensePlate(license_plate: string): Promise<Vehicle | undefined>{
    const findVehicle = this.vehicles.find(vehicle => vehicle.license_plate === license_plate);

    return findVehicle;
  }
}