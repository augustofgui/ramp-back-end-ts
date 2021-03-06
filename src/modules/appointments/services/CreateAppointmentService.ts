import { startOfHour } from "date-fns";
import { inject, injectable } from "tsyringe";

import Appointment from "@modules/appointments/entities/Appointment";
import IAppointmentsRepository from "@modules/appointments/repositories/IAppointmentsRepository";

import AppError from "@shared/errors/AppError";

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject("AppointmentsRepository")
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError("This appointment is already booked!");
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
