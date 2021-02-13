import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';

import ListCarByIdService from './ListCarByIdService';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';

let fakeCarsRepository: FakeCarsRepository;
let listCarById: ListCarByIdService;

describe ('ListCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    listCarById = new ListCarByIdService(
      fakeCarsRepository,
    );
  });

  it('Should be able to list a specific car', async () => {
    const car = await fakeCarsRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      version: 'Version',
      year: 1234,
    });

    const findCar = await listCarById.execute({id: car.id});

    expect(findCar).toEqual(
      expect.objectContaining({
        id: car.id,
        license_plate: 'AAA0000',
        brand: 'Brand',
        model: 'Model',
        version: 'Version',
        year: 1234,
      }),
    );
  });

  it('Should not be able to list a car with an invalid id', async () => {
    await expect(listCarById.execute({
      id: 'invalidID'
    })).rejects.toBeInstanceOf(AppError);
  });
});