import 'reflect-metadata';

import ListVehiclesService from './ListVehiclesService';
import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';

let fakeVehiclesRepository: FakeVehiclesRepository;
let listVehicles: ListVehiclesService;

describe ('ListVehicles', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();

    listVehicles = new ListVehiclesService(
      fakeVehiclesRepository,
    );
  });

  it('Should be able to list all the vehicles', async () => {
    const firstVehicle = await fakeVehiclesRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    const secondVehicle = await fakeVehiclesRepository.create({
      license_plate: 'BBB0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    const vehicles = await listVehicles.execute();

    expect(vehicles).toContain(firstVehicle);
    expect(vehicles).toContain(secondVehicle);
  });
});