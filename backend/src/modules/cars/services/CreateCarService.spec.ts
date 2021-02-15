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
      year: '1234',
      type: 'carro',
    });

    expect(car).toEqual(
      expect.objectContaining({
        license_plate: 'AAA0000',
        brand: 'Brand',
        model: 'Model',
        year: '1234',
        type: 'carro',
      }),
    );

    expect(car).toHaveProperty('id');
  });

  it('Should not be able to create a car with a license plate already been used', async () => {
    await createCar.execute({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    await expect(createCar.execute({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    })).rejects.toBeInstanceOf(AppError);
  });
});