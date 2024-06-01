import { useMutation, useQuery, useQueryClient } from 'react-query';
import ProfileService from '../services/ProfileService';
import { User } from '../interface/types';

export const useCreateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(async (newProfile: User) => {
    await ProfileService.createProfile(newProfile);
    queryClient.invalidateQueries('profiles');
  });
};

export const useProfileById = (id: string) => {
  return useQuery(['profile', id], () => ProfileService.getProfileById(id));
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(async (updates: User) => {
    const id = updates.id!;
    await ProfileService.updateProfile(id, updates);
    queryClient.invalidateQueries(['profile', id]);
  });
};

export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation(async (id: string) => {
    await ProfileService.deleteProfile(id);
    queryClient.invalidateQueries('profiles');
  });
};
