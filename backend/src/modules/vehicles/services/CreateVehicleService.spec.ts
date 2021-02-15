import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';

import CreateVehicleService from './CreateVehicleService';
import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';

let fakeVehiclesRepository: FakeVehiclesRepository;
let createVehicle: CreateVehicleService;

describe ('CreateVehicle', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();

    createVehicle = new CreateVehicleService(
      fakeVehiclesRepository,
    );
  });

  it('Should be able to create a new vehicle', async () => {
    const vehicle = await createVehicle.execute({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    expect(vehicle).toEqual(
      expect.objectContaining({
        license_plate: 'AAA0000',
        brand: 'Brand',
        model: 'Model',
        year: '1234',
        type: 'carro',
      }),
    );

    expect(vehicle).toHaveProperty('id');
  });

  it('Should not be able to create a vehicle with a license plate already been used', async () => {
    await createVehicle.execute({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    await expect(createVehicle.execute({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    })).rejects.toBeInstanceOf(AppError);
  });
});