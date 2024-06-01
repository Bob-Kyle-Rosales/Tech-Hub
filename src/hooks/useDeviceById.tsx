import { useQuery } from 'react-query';
import DeviceService from '../services/DeviceService'; // Assuming DeviceService is defined in '../services/DeviceService'

const useDeviceById = (deviceType: 'iPad' | 'iPhone' | 'Mac', id: string) => {
  // Function to fetch device by its ID from the DeviceService
  const getDeviceById = async () => {
    switch (deviceType) {
      case 'iPad':
        return DeviceService.getiPadById(id);
      case 'iPhone':
        return DeviceService.getiPhoneById(id);
      case 'Mac':
        return DeviceService.getMacById(id);
      default:
        throw new Error(`Invalid device type: ${deviceType}`);
    }
  };

  // Use React Query for fetching device by its ID
  return useQuery(['device', deviceType, id], getDeviceById);
};

export default useDeviceById;
