import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField } from '@mui/material';
import Swal from 'sweetalert2';
import Card from '../../components/Card';

import supabase from '../../config/supabaseClient';

import useUserStore from '../../hooks/useUser';
import { UserCredentialsSchema } from '../../models/User';
import { UserLogin } from '../../interface/types';

// Define interface for form data
interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UserCredentialsSchema),
  });

  const { login } = useUserStore();

  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const { email, password } = data;

      // Perform login with Supabase
      const { data: loginData, error } = await supabase.auth.signInWithPassword(
        {
          email,
          password,
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      const userData: UserLogin = {
        id: loginData.user.id,
        email: loginData.user.email || '',
      };

      login(userData);

      navigate('/');
    } catch (error) {
      Swal.fire({
        title: 'Login Error!',
        text: 'Enter correct credentials',
        icon: 'error',
        confirmButtonText: 'Confirm',
      });
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="flex-col items-center p-8 border border-gray-300 shadow-md w-1/3">
        <div>
          <p className="text-4xl font-normal mb-4">Login</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            inputProps={{ ...register('email') }}
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
            type="email"
            id="email"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            inputProps={{ ...register('password') }}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
            type="password"
            id="password"
            fullWidth
            margin="normal"
          />
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
        </form>
        <div className="mt-4">
          Create account{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:underline hover:text-blue-800 hover:cursor-pointer"
          >
            Here
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginForm;
