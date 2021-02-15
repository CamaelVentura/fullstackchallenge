import { Router } from 'express';

import VehiclesController from '../controllers/VehiclesController';

const vehiclesRouter = Router();
const vehiclesController = new VehiclesController();

vehiclesRouter.post('/', vehiclesController.create);

vehiclesRouter.get('/', vehiclesController.index);

vehiclesRouter.get('/:id', vehiclesController.show);

vehiclesRouter.delete('/:id', vehiclesController.delete);

vehiclesRouter.put('/:id', vehiclesController.update)

export default vehiclesRouter;