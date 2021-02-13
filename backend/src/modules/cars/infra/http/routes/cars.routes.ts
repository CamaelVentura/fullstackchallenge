import { Router } from 'express';

import CarsController from '../controllers/CarsController';

const carsRouter = Router();
const carsController = new CarsController();

carsRouter.post('/', carsController.create);

carsRouter.get('/', carsController.index);

carsRouter.get('/:id', carsController.show);

carsRouter.delete('/:id', carsController.delete);

carsRouter.put('/:id', carsController.update)

export default carsRouter;