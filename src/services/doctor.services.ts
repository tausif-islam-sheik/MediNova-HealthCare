"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDoctor } from "@/types/doctor.types";
import { ISpeciality } from "@/types/speciality.types";

export const getDoctors = async () => {
  try {
    const doctors = await httpClient.get<IDoctor[]>("/doctors");
    return doctors;
  } catch (error) {
    console.log("Error fetching doctors:", error);
    throw error;
  }
};

export const getAllSpecialities = async () => {
  try {
    const specialities = await httpClient.get<ISpeciality[]>("/specialities");
    return specialities;
  } catch (error) {
    console.log("Error fetching specialties:", error);
    throw error;
  }
};
