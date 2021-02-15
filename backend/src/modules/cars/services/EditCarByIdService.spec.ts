import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';

import EditCarByIdService from './EditCarByIdService';
import FakeCarsRepository from '../repositories/fakes/FakeCarsRepository';

let fakeCarsRepository: FakeCarsRepository;
let editCarById: EditCarByIdService;

describe ('EditCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();

    editCarById = new EditCarByIdService(
      fakeCarsRepository,
    );
  });

  it('Should be able to edit a existent car', async () => {    
    const newCar = await fakeCarsRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model One',
      year: '1234',
      type: 'carro',
    });

    const editedCar = await editCarById.execute({
      id: newCar.id,
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model Two',
      year: '1234',
      type: 'carro',
    });

    expect(editedCar).toEqual(
      expect.objectContaining({
        license_plate: 'AAA0000',
        brand: 'Brand',
        model: 'Model Two',
        year: '1234',
        type: 'carro',
      }),
    );

    expect(editedCar).toHaveProperty('id');

    expect(await fakeCarsRepository.findById(newCar.id)).toEqual(editedCar);
  });

  it('Should be able to edit a existent car to another license plate', async () => {    
    const newCar = await fakeCarsRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    const editedCar = await editCarById.execute({
      id: newCar.id,
      license_plate: 'BBB0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    expect(editedCar).toEqual(
      expect.objectContaining({
        license_plate: 'BBB0000',
        brand: 'Brand',
        model: 'Model',
        year: '1234',
        type: 'carro',
      }),
    );

    expect(editedCar).toHaveProperty('id');

    expect(await fakeCarsRepository.findById(newCar.id)).toEqual(editedCar);
  });

  it('Should not be able to edit a car without a valid id', async () => {
    await expect(editCarById.execute({
      id: 'invalidID',
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to edit a car with a license plate already been used', async () => {
    await fakeCarsRepository.create({
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    const car = await fakeCarsRepository.create({
      license_plate: 'BBB0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    });

    await expect(editCarById.execute({
      id: car.id,
      license_plate: 'AAA0000',
      brand: 'Brand',
      model: 'Model',
      year: '1234',
      type: 'carro',
    })).rejects.toBeInstanceOf(AppError);
  });
});