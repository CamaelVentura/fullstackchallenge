import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateCarService from '../../../services/CreateCarService';
import DeleteCarByIdService from '../../../services/DeleteCarByIdService';
import EditCarByIdService from '../../../services/EditCarByIdService';
import ListCarByIdService from '../../../services/ListCarByIdService';
import ListCarsService from '../../../services/ListCarsService';

export default class CarsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { license_plate, brand, model, year, type } = request.body;
    
    const createCar = container.resolve(CreateCarService);

    const car = await createCar.execute({
      license_plate,
      brand,
      model,
      year,
      type,
    });

    return response.json(car);
  }

  public async index(request: Request, response: Response): Promise<Response>{
    const listCars = container.resolve(ListCarsService);

    const cars = await listCars.execute();

    return response.json(cars);
  }

  public async show(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const findCar = container.resolve(ListCarByIdService);

    const car = await findCar.execute({id});

    return response.json(car);
  }

  public async delete(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const deleteCar = container.resolve(DeleteCarByIdService);

    await deleteCar.execute({id});

    return response.send();
  }

  public async update(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const { license_plate, brand, model, year, type } = request.body;

    const editCarById = container.resolve(EditCarByIdService);

    const car = await editCarById.execute({
      id,
      license_plate,
      brand,
      model,
      year,
      type,
    });

    return response.json(car);
  }
}