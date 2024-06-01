import supabase from '../config/supabaseClient';
import { User } from '../interface/types';

const ProfileService = {
  // Create a new profile
  createProfile: async (profile: User) => {
    const { data, error } = await supabase
      .from('Profile')
      .insert(profile)
      .select();
    if (error) {
      console.error(`Error creating profile: ${error.message}`);
      throw new Error(`Error creating profile: ${error.message}`);
    }
    return data ? data[0] : null;
  },

  // Get a profile by ID
  getProfileById: async (id: string) => {
    const { data, error } = await supabase
      .from('Profile')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.error(`Error fetching profile: ${error.message}`);
      throw new Error(`Error fetching profile: ${error.message}`);
    }
    return data || null;
  },

  // Update a profile by ID
  updateProfile: async (id: string, updates: Partial<User>) => {
    const { data, error } = await supabase
      .from('Profile')
      .update(updates)
      .eq('id', id)
      .select(); // Ensure the updated data including id is returned
    if (error) {
      console.error(`Error updating profile: ${error.message}`);
      throw new Error(`Error updating profile: ${error.message}`);
    }
    return data ? data[0] : null;
  },

  // Delete a profile by ID
  deleteProfile: async (id: string) => {
    const { error } = await supabase.from('Profile').delete().eq('id', id);
    if (error) {
      console.error(`Error deleting profile: ${error.message}`);
      throw new Error(`Error deleting profile: ${error.message}`);
    }
    return true;
  },
};

export default ProfileService;
