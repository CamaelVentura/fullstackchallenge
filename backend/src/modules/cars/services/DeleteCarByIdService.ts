import { injectable, inject } from 'tsyringe';

import ICarsRepository from '../repositories/ICarsRepository';

interface IRequest {
  id: string;
}

@injectable()
class DeleteCarByIdService {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void>{
    await this.carsRepository.deleteById(id);
  }
}

export default DeleteCarByIdService;