// Arquivo reponsável pela criacão de agendamentos
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentRepository';

/**
 * [x] Recebimento das informações
 * [/] Tratativa de erros e exessões
 * [x] Acesso ao repositório
 */

interface RequestDTO {
  provider_id: string;
  date: Date;
}

/**
 * Dependence inversion (SOLID)
 *
 * Single responsability Principle
 * Dependency Invertion Principle
 */

class CreateAppointmentServices {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentServices;
