import React from 'react';
import { Button, TextField } from '@mui/material';
import { AuthError } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';
import { RegisterSchema } from '../../models/User';
import supabase from '../../config/supabaseClient';
import Card from '../../components/Card';

// Define interface for form data
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

      console.log('User registered successfully:', data.user);

      // Now that the user is registered, insert the profile information into the Profile table
      const profileData = {
        id: data.user?.id || '', // Ensure id is populated with a string value
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

      console.log('Profile created successfully:', profile);
      // Handle further actions like redirecting to a new page
    } catch (error) {
      const customError = error as AuthError | null;
      console.error('Registration error:', customError?.message);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="flex-col items-center p-8 border border-gray-300 shadow-md w-1/3">
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
                <span className="error">First Name is required</span>
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
                <span className="error">Last Name is required</span>
              )}
            </div>
          </div>

          <TextField
            label="Phone"
            variant="outlined"
            type="text"
            fullWidth
            margin="normal"
            inputProps={{ ...register('profile.phone') }}
          />

          <TextField
            label="Address"
            variant="outlined"
            type="text"
            fullWidth
            margin="normal"
            inputProps={{ ...register('profile.address') }}
          />

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
            <span className="error">Email is required</span>
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
            <span className="error">Password is required</span>
          )}
          <Button type="submit" variant="contained">
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Register;
