import {z} from 'zod';

const zSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})

export const loginSchema = zSchema;

export const registerSchema = zSchema.extend({
    name: z.string().min(1, { message: 'Name is required' }),
    confirmPassword: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 digits long' }),
    role: z.enum(['admin', 'user'], { errorMap: () => ({ message: 'Role is required' }) }),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
});

