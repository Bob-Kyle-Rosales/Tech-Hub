import { z } from 'zod';

export const ProfileSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(2, { message: 'First name must be 2 or more characters long' }),
  last_name: z
    .string()
    .trim()
    .min(2, { message: 'Last name must be 2 or more characters long' }),
  phone: z
    .string()
    .regex(/^\d+$/, { message: 'Phone number must contain only digits' })
    .min(10, { message: 'Phone numbers are a minimum of 10 digits' })
    .max(12, { message: 'Phone numbers are a maximum of 12 digits' }),
  address: z.string(),
});

export const UserCredentialsSchema = z.object({
  email: z.string().email({
    message: 'Invalid email format',
  }),
  password: z
    .string()
    .min(8)
    .max(50)
    .refine(
      (value) => {
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[^A-Za-z0-9]/;

        return (
          uppercaseRegex.test(value) &&
          lowercaseRegex.test(value) &&
          numberRegex.test(value) &&
          specialCharRegex.test(value)
        );
      },
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    ),
});

export const UserAddressSchema = z.object({
  street: z
    .string()
    .trim()
    .min(5, { message: 'Street must be 5 or more characters long' }),
  subd: z.string().trim().optional(),
  city: z
    .string()
    .trim()
    .min(2, { message: 'City must be 2 or more characters long' }),
  zipcode: z.string().regex(/^\d{5}(?:[-\s]\d{4})?$/, {
    message: 'Must be 4 digit zip. Optional 4 digit extension allowed.',
  }),
});

export const RegisterSchema = z.object({
  credentials: UserCredentialsSchema,
  profile: ProfileSchema,
});
