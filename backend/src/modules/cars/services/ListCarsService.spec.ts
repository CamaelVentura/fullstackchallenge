import 'reflect-metadata';

import ListCarsService from './ListCarsService';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';

let fakeCarsRepository: FakeCarsRepository;
let listCars: ListCarsService;

describe ('ListCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    listCars = new ListCarsService(
      fakeCarsRepository,
    );
  });

  it('Should be able to list a specific car', async () => {
    const firstCar = await fakeCarsRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      version: 'Version',
      year: 1234,
    });

    const secondCar = await fakeCarsRepository.create({
      license_plate: 'BBB0000',
      brand: 'Brand',
      model: 'Model',
      version: 'Version',
      year: 1234,
    });

    const cars = await listCars.execute();

    expect(cars).toContain(firstCar);
    expect(cars).toContain(secondCar);
  });
});