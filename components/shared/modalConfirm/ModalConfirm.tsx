import { env } from '@/config/env';
import { useMutation } from '@/hook/useMutation';
import Feather from '@expo/vector-icons/Feather';
import axios from 'axios';
import { View } from 'moti';
import React from 'react';
import { Modal, Pressable, Text } from 'react-native';

interface ModalConfirmProps {
  id?: string;
  onClose?: () => void;
}

export default function ModalConfirm({ id, onClose }: ModalConfirmProps) {
  const { mutate } = useMutation<unknown, { id?: string }>({
    mutationFn: async ({ id }) => {
      const res = await axios.delete(`${env.API_URL}/person/${id}`);
      return res.data;
    },
  });

  return (
    <Modal transparent onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="flex w-11/12 max-w-md flex-col items-center rounded-lg bg-white p-6 shadow-lg">
          <Feather name="check-circle" size={24} color="black" />
          <Text className="mt-4 text-lg font-semibold">Confirmación</Text>
          <Text className="mt-2 text-center text-gray-600">
            ¿Estás seguro de que deseas continuar con esta acción?
          </Text>

          <View className="mt-6 flex w-full flex-row items-center justify-center gap-x-4">
            <Pressable
              className="rounded-lg bg-blue-500 px-4 py-2"
              onPress={() => {
                mutate({ id });
                onClose?.();
              }}>
              <Text className="text-white">Confirmar</Text>
            </Pressable>
            <Pressable
              className="rounded-lg bg-red-500 px-4 py-2"
              onPress={() => {
                onClose?.();
              }}>
              <Text className="text-white">Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
