import { Router } from 'express';

const appointmentsRoutes = Router();

// http://localhost:3333/appointments

appointmentsRoutes.post('/', (request, response) => {
  response.json({ message: 'Hello World' });
});

export default appointmentsRoutes;
