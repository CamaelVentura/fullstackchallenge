import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';

import ListVehicleByIdService from './ListVehicleByIdService';
import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';

let fakeVehiclesRepository: FakeVehiclesRepository;
let listVehicleById: ListVehicleByIdService;

describe ('ListVehicle', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();

    listVehicleById = new ListVehicleByIdService(
      fakeVehiclesRepository,
    );
  });

  it('Should be able to list a specific vehicle', async () => {
    const vehicle = await fakeVehiclesRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    const findVehicle = await listVehicleById.execute({id: vehicle.id});

    expect(findVehicle).toEqual(
      expect.objectContaining({
        id: vehicle.id,
        license_plate: 'AAA0000',
        brand: 'Brand',
        model: 'Model',
        year: '1234',
        type: 'carro',
        
      }),
    );
  });

  it('Should not be able to list a vehicle with an invalid id', async () => {
    await expect(listVehicleById.execute({
      id: 'invalidID'
    })).rejects.toBeInstanceOf(AppError);
  });
});