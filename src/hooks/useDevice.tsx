import { useQuery } from 'react-query';
import DeviceService from '../services/DeviceService'; // Assuming DeviceService is defined in '../services/DeviceService'

const useDevices = (deviceType: 'iPad' | 'iPhone' | 'Mac') => {
  // Function to fetch devices of a specific type from the DeviceService
  const getDevices = async () => {
    try {
      switch (deviceType) {
        case 'iPad':
          return await DeviceService.getiPad();
        case 'iPhone':
          return await DeviceService.getiPhone();
        case 'Mac':
          return await DeviceService.getMacs();
        default:
          throw new Error(`Invalid device type: ${deviceType}`);
      }
    } catch (error) {
      throw error as Error;
    }
  };

  // Use React Query for fetching devices of a specific type
  return useQuery(['devices', deviceType], getDevices);
};

export default useDevices;
