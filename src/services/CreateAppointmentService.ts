// Arquivo reponsável pela criacão de agendamentos

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentRepository';
import { startOfHour } from 'date-fns';

/**
 * [x] Recebimento das informações
 * [/] Tratativa de erros e exessões
 * [x] Acesso ao repositório
 */

interface RequestDTO {
  provider: string;
  date: Date;
}

/**
 * Dependence inversion (SOLID)
 *
 * Single responsability Principle
 * Dependency Invertion Principle
 */

class CreateAppointmentServices {
  private appointmentRopository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentRopository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRopository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentRopository.create({
      provider,
      date: appointmentDate,
    });
    return appointment;
  }
}

export default CreateAppointmentServices;
