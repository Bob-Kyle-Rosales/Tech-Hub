import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Button, TextField } from '@mui/material';

import Swal from 'sweetalert2';
import Card from '../../components/Card';

import { RegisterSchema } from '../../models/User';
import supabase from '../../config/supabaseClient';

interface FormData {
  credentials: {
    email: string;
    password: string;
  };
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
  };
}

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    try {
      RegisterSchema.parse(formData);

      const { email, password } = formData.credentials;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Now that the user is registered, insert the profile information into the Profile table
      const profileData = {
        id: data.user?.id,
        first_name: formData.profile.first_name,
        last_name: formData.profile.last_name,
        phone: formData.profile.phone,
        address: formData.profile.address,
      };

      const { data: profile, error: profileError } = await supabase
        .from('Profile')
        .insert(profileData)
        .single();

      if (profileError) {
        throw new Error(profileError.message);
      }

      // making sure there is profile
      if (profile) {
        navigate('/login');
      }
    } catch (error) {
      Swal.fire({
        title: 'Registration Error!',
        text: 'There seems to be an error. Come back later',
        icon: 'error',
        confirmButtonText: 'Okay',
      });
    }
  };

  return (
    <div className="w-screen mt-40 flex justify-center items-center">
      <Card className="flex-col items-center p-4 border border-gray-300 shadow-md w-1/3">
        <p className="text-xl font-medium">Registration</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="flex-1 mr-4">
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{
                  ...register('profile.first_name', { required: true }),
                }}
              />
              {errors?.profile?.first_name && (
                <span className="text-red-400 text-xs">
                  First Name is required
                </span>
              )}
            </div>
            <div className="flex-1">
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                inputProps={{
                  ...register('profile.last_name', { required: true }),
                }}
              />
              {errors?.profile?.last_name && (
                <span className="text-red-400 text-xs">
                  Last Name is required
                </span>
              )}
            </div>
          </div>

          <TextField
            label="Phone"
            variant="outlined"
            type="text"
            fullWidth
            margin="normal"
            inputProps={{ ...register('profile.phone', { required: true }) }}
          />
          {errors?.profile?.phone && (
            <span className="text-red-400 text-xs">Phone no is required</span>
          )}

          <TextField
            label="Address"
            variant="outlined"
            type="text"
            fullWidth
            margin="normal"
            inputProps={{ ...register('profile.address', { required: true }) }}
          />
          {errors?.profile?.address && (
            <span className="text-red-400 text-xs">Address is required</span>
          )}

          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            margin="normal"
            inputProps={{
              ...register('credentials.email', { required: true }),
            }}
          />
          {errors?.credentials?.email && (
            <span className="text-red-400 text-xs">Email is required</span>
          )}
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            inputProps={{
              ...register('credentials.password', { required: true }),
            }}
          />
          {errors?.credentials?.password && (
            <span className="text-red-400 text-xs">Password is required</span>
          )}

          <div className="flex justify-center">
            <Button type="submit" variant="contained">
              Register
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Register;
