import { container } from 'tsyringe';

import IVehiclesRepository from '../../modules/vehicles/repositories/IVehiclesRepository';
import VehiclesRepository from '../../modules/vehicles/infra/typeorm/repositories/VehiclesRepository';

container.registerSingleton<IVehiclesRepository>(
  'VehiclesRepository',
  VehiclesRepository,
);