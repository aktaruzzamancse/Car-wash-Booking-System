
import { Service } from "./service.interface";
import { ServiceModel } from "./service.model";

const Createservice = async (service: Service) => {
  const result = await ServiceModel.create(service);
  return result;
};
const getAllServices = async () => {
  const result = await ServiceModel.find().select({
    password: 0,
  });
  return result;
};

const getSingleService = async (ServiceId: string) => {
  const result = await ServiceModel.findOne({
    _id: ServiceId,
    isDeleted: false,
  })
  return result;
};

const deleteSingleService = async (ServiceId: number) => {
  const result = await ServiceModel.updateOne({ ServiceId }, { isDeleted: true });
  return result;
};

const updateSingleService = async (ServiceId: string, Service: Service) => {
  console.log('updateSingleService');
  const ServiceData = Service;
  const result = await ServiceModel.updateOne({ ServiceId }, Service);
  return result;
};

export const ServiceServices = {
  Createservice,
  getAllServices,
  getSingleService,
  deleteSingleService,
  updateSingleService,
};
