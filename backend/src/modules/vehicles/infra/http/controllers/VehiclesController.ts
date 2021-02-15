import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateVehicleService from '../../../services/CreateVehicleService';
import DeleteVehicleByIdService from '../../../services/DeleteVehicleByIdService';
import EditVehicleByIdService from '../../../services/EditVehicleByIdService';
import ListVehicleByIdService from '../../../services/ListVehicleByIdService';
import ListVehiclesService from '../../../services/ListVehiclesService';

export default class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { license_plate, brand, model, year, type } = request.body;
    
    const createVehicle = container.resolve(CreateVehicleService);

    const vehicle = await createVehicle.execute({
      license_plate,
      brand,
      model,
      year,
      type,
    });

    return response.json(vehicle);
  }

  public async index(request: Request, response: Response): Promise<Response>{
    const listVehicles = container.resolve(ListVehiclesService);

    const vehicles = await listVehicles.execute();

    return response.json(vehicles);
  }

  public async show(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const findVehicle = container.resolve(ListVehicleByIdService);

    const vehicle = await findVehicle.execute({id});

    return response.json(vehicle);
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const deleteVehicle = container.resolve(DeleteVehicleByIdService);

    await deleteVehicle.execute({id});

    return response.send();
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const { license_plate, brand, model, year, type } = request.body;

    const editVehicleById = container.resolve(EditVehicleByIdService);

    const vehicle = await editVehicleById.execute({
      id,
      license_plate,
      brand,
      model,
      year,
      type,
    });

    return response.json(vehicle);
  }
}