import { GenderEnum } from '@/interface/gender.enum';
import { z } from 'zod';

export const PersonSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum([GenderEnum.Male, GenderEnum.Female, GenderEnum.Other], {
    message: 'Gender is required',
  }),
  age: z.number().min(1, 'Age is required').max(120, 'Age must be less than 120'),
  phone: z.string().min(1, 'Phone is required').max(15, 'Phone must be less than 15 characters'),
});
