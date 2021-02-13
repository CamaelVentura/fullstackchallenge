import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';

import DeleteCarByIdService from './DeleteCarByIdService';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';

let fakeCarsRepository: FakeCarsRepository;
let deleteCarById: DeleteCarByIdService;

describe ('DeleteCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    deleteCarById = new DeleteCarByIdService(
      fakeCarsRepository,
    );
  });

  it('Should be able to delete a car', async () => {
    const car = await fakeCarsRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      version: 'Version',
      year: 1234,
    });

    await deleteCarById.execute({id: car.id});

    expect(fakeCarsRepository.findAll).not.toEqual(
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
});