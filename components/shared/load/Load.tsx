import { View } from 'moti';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export default function Load() {
  return (
    <View
      className="inset-0 z-50 flex flex-1 items-center justify-center bg-black/40"
      style={{
        position: 'absolute',
      }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
