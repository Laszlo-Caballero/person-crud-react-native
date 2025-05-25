import Load from '@/components/shared/load/Load';
import Input from '@/components/ui/input/Input';
import Select from '@/components/ui/select/Select';
import { env } from '@/config/env';
import { useMutation } from '@/hook/useMutation';
import { useQuery } from '@/hook/useQuery';
import { GenderEnum } from '@/interface/gender.enum';
import { Person } from '@/interface/types';
import { PersonSchema } from '@/schemas/person.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'moti';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text } from 'react-native';
import { z } from 'zod';

export default function EditPerson() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof PersonSchema>>({
    resolver: zodResolver(PersonSchema),
  });

  const { data, isLoading: loadFind } = useQuery<Person>({
    queryFn: async () => {
      const res = await axios.get(`${env.API_URL}/person/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (data) {
      setValue('name', data.name);
      setValue('lastName', data.lastName);
      setValue('age', data.age);
      setValue('gender', data.gender as GenderEnum);
      setValue('phone', data.phone);
    }
  }, [data]);

  const router = useRouter();

  const { mutate, isLoading } = useMutation<unknown, z.infer<typeof PersonSchema>>({
    mutationFn: async (data) => {
      const res = await axios.patch(`${env.API_URL}/person/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      router.navigate('/');
    },
  });

  const onSubmit = async (data: z.infer<typeof PersonSchema>) => {
    mutate(data);
  };

  return (
    <View className="flex flex-col gap-y-8">
      {(isLoading || loadFind) && <Load />}
      <View className="flex flex-col gap-y-2">
        <Text className="text-2xl font-semibold">Actualizar Persona</Text>
        <Text className="text-slate-400">
          Completa el formulario para agregar una nueva persona
        </Text>
      </View>

      <View className="flex flex-row gap-x-2">
        <Input
          label="Nombre"
          placeholder="Ingrese su nombre"
          className="w-1/2"
          {...register('name', { required: true })}
          onChange={(e) => setValue('name', e.nativeEvent.text)}
          value={watch('name')}
          error={errors.name?.message}
        />
        <Input
          label="Apellido"
          placeholder="Ingrese su apellido"
          className="w-1/2"
          {...register('lastName', { required: true })}
          onChange={(e) => setValue('lastName', e.nativeEvent.text)}
          value={watch('lastName')}
          error={errors.lastName?.message}
        />
      </View>

      <Select
        label="Genero"
        value={watch('gender')}
        options={Object.entries(GenderEnum).map(([key, value]) => ({ label: key, value }))}
        onChange={(value) => {
          setValue('gender', value as GenderEnum);
        }}
        error={errors.gender?.message}
      />

      <Input
        label="Edad"
        placeholder="Ingrese su edad"
        {...register('age', { required: true })}
        onChange={(e) => setValue('age', parseInt(e.nativeEvent.text, 10))}
        value={watch('age')?.toString()}
        error={errors.age?.message}
      />

      <Input
        label="Telefono"
        placeholder="Ingrese su telefono"
        {...register('phone', { required: true })}
        onChange={(e) => setValue('phone', e.nativeEvent.text)}
        value={watch('phone')}
        error={errors.phone?.message}
      />

      <Pressable className="rounded-lg bg-blue-500 px-4 py-2" onPress={handleSubmit(onSubmit)}>
        <Text className="text-center text-white">Actualizar Persona</Text>
      </Pressable>
    </View>
  );
}
