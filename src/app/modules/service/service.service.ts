
import { Service } from "./service.interface";
import { ServiceModel } from "./service.model";

const Createservice = async (service: Service) => {
  const result = await ServiceModel.create(service);
  return result;
};
const getAllServices = async () => {
  const result = await ServiceModel.find( { isDeleted: false });
  return result;
};

const getSingleService = async (ServiceId: string,isDeleted:boolean) => {
  const result = await ServiceModel.findOne({
    _id: ServiceId,
    isDeleted: isDeleted,
  })
  return result;
};

const deleteSingleService = async (ServiceId: string) => {
  const result = await ServiceModel.updateOne(
    { _id: ServiceId },
    { isDeleted: true }
  );
  return result;
};

const updateSingleService = async (ServiceId: string, Service: Service) => {

  const result = await ServiceModel.findOneAndUpdate({ServiceId }, Service,{
    new: true
  });
  return result;
};

export const ServiceServices = {
  Createservice,
  getAllServices,
  getSingleService,
  deleteSingleService,
  updateSingleService,
};
