import 'reflect-metadata';

import DeleteVehicleByIdService from './DeleteVehicleByIdService';
import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';

let fakeVehiclesRepository: FakeVehiclesRepository;
let deleteVehicleById: DeleteVehicleByIdService;

describe ('DeleteVehicle', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();

    deleteVehicleById = new DeleteVehicleByIdService(
      fakeVehiclesRepository,
    );
  });

  it('Should be able to delete a vehicle', async () => {
    const vehicle = await fakeVehiclesRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    await deleteVehicleById.execute({id: vehicle.id});

    expect(fakeVehiclesRepository.findAll).not.toEqual(
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
});