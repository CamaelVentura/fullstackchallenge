import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';

import EditVehicleByIdService from './EditVehicleByIdService';
import FakeVehiclesRepository from '../repositories/fakes/FakeVehiclesRepository';

let fakeVehiclesRepository: FakeVehiclesRepository;
let editVehicleById: EditVehicleByIdService;

describe ('EditVehicle', () => {
  beforeEach(() => {
    fakeVehiclesRepository = new FakeVehiclesRepository();

    editVehicleById = new EditVehicleByIdService(
      fakeVehiclesRepository,
    );
  });

  it('Should be able to edit a existent vehicle', async () => {    
    const newVehicle = await fakeVehiclesRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model One',
      year: '1234',
      type: 'carro',
    });

    const editedVehicle = await editVehicleById.execute({
      id: newVehicle.id,
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model Two',
      year: '1234',
      type: 'carro',
    });

    expect(editedVehicle).toEqual(
      expect.objectContaining({
        license_plate: 'AAA0000',
        brand: 'Brand',
        model: 'Model Two',
        year: '1234',
        type: 'carro',
      }),
    );

    expect(editedVehicle).toHaveProperty('id');

    expect(await fakeVehiclesRepository.findById(newVehicle.id)).toEqual(editedVehicle);
  });

  it('Should be able to edit a existent vehicle to another license plate', async () => {    
    const newVehicle = await fakeVehiclesRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    const editedVehicle = await editVehicleById.execute({
      id: newVehicle.id,
      license_plate: 'BBB0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    expect(editedVehicle).toEqual(
      expect.objectContaining({
        license_plate: 'BBB0000',
        brand: 'Brand',
        model: 'Model',
        year: '1234',
        type: 'carro',
      }),
    );

    expect(editedVehicle).toHaveProperty('id');

    expect(await fakeVehiclesRepository.findById(newVehicle.id)).toEqual(editedVehicle);
  });

  it('Should not be able to edit a vehicle without a valid id', async () => {
    await expect(editVehicleById.execute({
      id: 'invalidID',
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to edit a vehicle with a license plate already been used', async () => {
    await fakeVehiclesRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    const vehicle = await fakeVehiclesRepository.create({
      license_plate: 'BBB0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    await expect(editVehicleById.execute({
      id: vehicle.id,
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    })).rejects.toBeInstanceOf(AppError);
  });
});