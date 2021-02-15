import ICreateVehicleDTO from '../dtos/ICreateVehicleDTO';
import IEditVehicleDTO from '../dtos/IEditVehicleDTO';
import Vehicle from '../infra/typeorm/entities/Vehicle';

export default interface IVehiclesRepository {
  create(data: ICreateVehicleDTO): Promise<Vehicle>;
  findAll(): Promise<Vehicle[]>;
  findById(id: string): Promise<Vehicle | undefined>;
  findByLicensePlate(license_plate: string): Promise<Vehicle | undefined>;
  editVehicle(data: IEditVehicleDTO): Promise<Vehicle>
  deleteById(id: string): Promise<void>;
}