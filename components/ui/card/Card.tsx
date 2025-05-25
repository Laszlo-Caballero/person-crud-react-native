import ModalConfirm from '@/components/shared/modalConfirm/ModalConfirm';
import { Person } from '@/interface/types';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface CardProps extends Person {
  onRefresh?: () => void;
}

export default function Card({ age, gender, id, lastName, name, phone, onRefresh }: CardProps) {
  const router = useRouter();
  const [open, setOpen] = useState<{
    id: string;
    open: boolean;
  }>({
    id: '',
    open: false,
  });

  return (
    <View className="flex w-full flex-col gap-y-4 rounded-lg bg-white p-4 shadow-md">
      <View className="flex flex-col gap-y-5 border-b border-slate-400/30 pb-4">
        <View className="flex w-full flex-row">
          <Feather name="user" size={24} color="black" />
          <Text className="text-xl">
            {name} {lastName}
          </Text>
        </View>

        <View className="flex w-full flex-row items-center gap-x-2">
          <Feather name="users" size={18} color="#94a3b8" />
          <Text className="text-lg text-slate-400">
            Genero:
            <Text className="text-black">{gender}</Text>
          </Text>
        </View>

        <View className="flex w-full flex-row items-center gap-x-2">
          <AntDesign name="calendar" size={18} color="#94a3b8" />
          <Text className="text-lg text-slate-400">
            Edad:
            <Text className="text-black">{age}</Text>
          </Text>
        </View>

        <View className="flex w-full flex-row items-center gap-x-2">
          <Feather name="phone" size={18} color="#94a3b8" />
          <Text className="text-lg text-slate-400">
            Telefono:
            <Text className="text-black">{phone}</Text>
          </Text>
        </View>
      </View>

      <View className="flex w-full flex-row items-center justify-center gap-x-4">
        <Pressable
          className="flex flex-row gap-x-2 rounded-xl border px-4 py-2"
          onPress={() => {
            router.navigate(`./edit/${id}`);
          }}>
          <Feather name="edit" size={24} color="black" />
          <Text className="text-lg">Editar</Text>
        </Pressable>
        <Pressable
          className="flex flex-row gap-x-2 rounded-xl border px-4 py-2"
          onPress={() => {
            setOpen({
              id: id.toString(),
              open: true,
            });
          }}>
          <Feather name="trash-2" size={24} color="#dc2626" />
          <Text className="text-lg text-red-600">Eliminar</Text>
        </Pressable>
      </View>

      {open.open && (
        <ModalConfirm
          id={open.id}
          onClose={() => {
            setOpen({ id: '', open: false });
            onRefresh?.();
          }}
        />
      )}
    </View>
  );
}
