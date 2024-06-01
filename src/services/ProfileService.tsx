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
      .select();
    if (error) {
      throw new Error(`Error updating profile: ${error.message}`);
    }
    return data ? data[0] : null;
  },

  // Delete a profile by ID
  deleteProfile: async (id: string) => {
    const { error } = await supabase.from('Profile').delete().eq('id', id);
    if (error) {
      throw new Error(`Error deleting profile: ${error.message}`);
    }
    return true;
  },
};

export default ProfileService;
