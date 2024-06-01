import supabase from '../config/supabaseClient';

const fetchData = async (tableName: string) => {
  const { data, error } = await supabase.from(tableName).select('*');

  if (error) {
    throw new Error(`Error fetching data from ${tableName}: ${error.message}`);
  }

  return data;
};

const fetchDataById = async (tableName: string, id: string) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*')
    .eq('id', id);

  if (error) {
    throw new Error(
      `Error fetching data from ${tableName} with ID ${id}: ${error.message}`,
    );
  }

  return data;
};

const DeviceService = {
  // Fetch all iPad devices
  getiPad: async () => fetchData('iPad'),

  // Fetch iPad device by ID
  getiPadById: async (id: string) => fetchDataById('iPad', id),

  // Fetch all iPhone devices
  getiPhone: async () => fetchData('iPhone'),

  // Fetch iPhone device by ID
  getiPhoneById: async (id: string) => fetchDataById('iPhone', id),

  // Fetch all Mac devices
  getMacs: async () => fetchData('Mac'),

  // Fetch Mac device by ID
  getMacById: async (id: string) => fetchDataById('Mac', id),
};

export default DeviceService;
