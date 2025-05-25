import { View } from 'moti';
import React from 'react';
import { ActivityIndicator, Modal } from 'react-native';

export default function Load() {
  return (
    <Modal transparent>
      <View className="inset-0 z-50 flex flex-1 items-center justify-center bg-black/40">
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}
