
import { Service } from "./service.interface";
import { ServiceModel } from "./service.model";

const Createservice = async (service: Service) => {
  const result = await ServiceModel.create(service);
  return result;
};


export const ServiceServices = {
  Createservice,
};
