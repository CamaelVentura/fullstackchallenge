import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';

import CreateCarService from './CreateCarService';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';

let fakeCarsRepository: FakeCarsRepository;
let createCar: CreateCarService;

describe ('CreateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    createCar = new CreateCarService(
      fakeCarsRepository,
    );
  });

  it('Should be able to create a new car', async () => {
    const car = await createCar.execute({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      version: 'Version',
      year: 1234,
    });

    expect(car).toEqual(
      expect.objectContaining({
        license_plate: 'AAA0000',
        brand: 'Brand',
        model: 'Model',
        version: 'Version',
        year: 1234,
      }),
    );

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with a license plate already been used', async () => {
    await createCar.execute({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      version: 'Version',
      year: 1234,
    });

    await expect(createCar.execute({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      version: 'Version',
      year: 1234,
    })).rejects.toBeInstanceOf(AppError);
  });
});