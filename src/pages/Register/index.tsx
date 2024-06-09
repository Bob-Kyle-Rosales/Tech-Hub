import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  } = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (formData: FormData) => {
    try {
      // Zod validation is handled by the resolver, no need to manually validate here
      const { email, password } = formData.credentials;

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      const profileData = {
        id: data.user?.id,
        first_name: formData.profile.first_name,
        last_name: formData.profile.last_name,
        phone: formData.profile.phone,
        address: formData.profile.address,
      };

      const { error: profileError } = await supabase
        .from('Profile')
        .insert(profileData)
        .single();

      if (profileError) {
        throw new Error(profileError.message);
      }

      Swal.fire({
        title: 'Registration Success!',
        icon: 'success',
        confirmButtonText: 'Confirm',
      }).then(() => {
        navigate('/login');
      });
    } catch (error) {
      Swal.fire({
        title: 'Registration Error!',
        text: `There seems to be an error. ${error}.`,
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
                  ...register('profile.first_name'),
                }}
              />
              {errors?.profile?.first_name && (
                <span className="text-red-400 text-xs">
                  {errors.profile.first_name.message}
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
                  ...register('profile.last_name'),
                }}
              />
              {errors?.profile?.last_name && (
                <span className="text-red-400 text-xs">
                  {errors.profile.last_name.message}
                </span>
              )}
            </div>
          </div>
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
            margin="normal"
            inputProps={{
              ...register('credentials.email'),
            }}
          />
          {errors?.credentials?.email && (
            <span className="text-red-400 text-xs">
              {errors.credentials.email.message}
            </span>
          )}
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            inputProps={{
              ...register('credentials.password'),
            }}
          />
          {errors?.credentials?.password && (
            <span className="text-red-400 text-xs">
              {errors.credentials.password.message}
            </span>
          )}
          <TextField
            label="Phone"
            variant="outlined"
            type="text"
            fullWidth
            margin="normal"
            inputProps={{ ...register('profile.phone') }}
          />
          {errors?.profile?.phone && (
            <span className="text-red-400 text-xs">
              {errors.profile.phone.message}
            </span>
          )}
          <TextField
            label="Address"
            variant="outlined"
            type="text"
            fullWidth
            margin="normal"
            inputProps={{ ...register('profile.address') }}
          />
          {errors?.profile?.address && (
            <span className="text-red-400 text-xs">
              {errors.profile.address.message}
            </span>
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
