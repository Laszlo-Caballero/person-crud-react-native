import Load from '@/components/shared/load/Load';
import Input from '@/components/ui/input/Input';
import Select from '@/components/ui/select/Select';
import { env } from '@/config/env';
import { useMutation } from '@/hook/useMutation';
import { GenderEnum } from '@/interface/gender.enum';
import { PersonSchema } from '@/schemas/person.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';
import { z } from 'zod';

export default function CreatePerson() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof PersonSchema>>({
    resolver: zodResolver(PersonSchema),
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation<unknown, z.infer<typeof PersonSchema>>({
    mutationFn: async (data) => {
      const res = await axios.post(`${env.API_URL}/person`, data);
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
      {isLoading && <Load />}
      <View className="flex flex-col gap-y-2">
        <Text className="text-2xl font-semibold">Crear Persona</Text>
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
          error={errors.name?.message}
        />
        <Input
          label="Apellido"
          placeholder="Ingrese su apellido"
          className="w-1/2"
          {...register('lastName', { required: true })}
          onChange={(e) => setValue('lastName', e.nativeEvent.text)}
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
        error={errors.age?.message}
      />

      <Input
        label="Telefono"
        placeholder="Ingrese su telefono"
        {...register('phone', { required: true })}
        onChange={(e) => setValue('phone', e.nativeEvent.text)}
        error={errors.phone?.message}
      />

      <Pressable className="rounded-lg bg-blue-500 px-4 py-2" onPress={handleSubmit(onSubmit)}>
        <Text className="text-center text-white">Crear Persona</Text>
      </Pressable>
    </View>
  );
}
