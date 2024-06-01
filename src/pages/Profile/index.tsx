import { useForm, SubmitHandler } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useProfileById, useUpdateProfile } from '../../hooks/useProfile';
import useUserStore from '../../hooks/useUser';
import Card from '../../components/Card';
import { User } from '../../interface/types';

function ProfilePage() {
  const navigate = useNavigate();

  const { user } = useUserStore();
  // Fetch profile data by ID
  const { data: profileData, isLoading: profileLoading } = useProfileById(
    user?.id || '',
  );

  // Mutation hook for updating profile
  const { mutate: updateProfile, isLoading: updateLoading } =
    useUpdateProfile();

  // Initialize React Hook Form
  const { register, handleSubmit } = useForm({
    defaultValues: profileData || {}, // Set default values if profile data is available
  });

  // Function to handle form submission
  const onSubmit: SubmitHandler<User> = async (data) => {
    if (user) {
      const newData: User = { ...data, id: user.id };
      updateProfile(newData);
      Swal.fire({
        title: 'Profile Update Success!',
        text: 'Your account has been updated successfully',
        icon: 'success',
        confirmButtonText: 'Confirm',
      });
      navigate('/');
    } else {
      Swal.fire({
        title: 'Profile Update Error!',
        text: 'Error updating your account. Please come back later',
        icon: 'error',
        confirmButtonText: 'Confirm',
      });
    }
  };

  return (
    <div className="w-screen mt-44 flex justify-center items-center">
      <Card className="flex flex-col items-center justify-center border border-gray-300 shadow-md w-1/2 p-6">
        <h1 className="text-4xl font-normal mb-4">Your Profile</h1>
        {profileLoading ? (
          <p>Loading profile...</p>
        ) : (
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="First Name"
              variant="outlined"
              margin="normal"
              className="mb-4"
              inputProps={{ ...register('first_name') }}
            />
            <TextField
              fullWidth
              label="Last Name"
              variant="outlined"
              margin="normal"
              className="mb-4"
              inputProps={{ ...register('last_name') }}
            />
            <TextField
              fullWidth
              label="Phone"
              variant="outlined"
              margin="normal"
              className="mb-4"
              inputProps={{ ...register('phone') }}
            />
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              margin="normal"
              className="mb-4"
              inputProps={{ ...register('address') }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={updateLoading}
            >
              {updateLoading ? 'Saving...' : 'Save'}
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
}

export default ProfilePage;
