import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';

import AppointmentsController from '../controller/AppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get("/", async(request, response) => {
//   const appointments = await appointmentsRepository.all();

//   return response.json(appointments);
// });

appointmentsRouter.post("/", appointmentsController.create);

export default appointmentsRouter;
