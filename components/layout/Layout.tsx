import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { Link } from 'expo-router';
import { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
export default function Layout({ children }: PropsWithChildren) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
      className="relative flex-1">
      <View
        className="flex w-full items-center justify-center bg-blue-500"
        style={[
          {
            paddingTop: insets.top,
          },
        ]}>
        <Text className="py-5 text-4xl font-semibold text-white">Person App</Text>
      </View>

      <View className="flex-1 p-4">{children}</View>

      <View className="flex w-full flex-row items-center justify-center gap-x-4 rounded-t-xl bg-blue-500 py-4">
        <Link href="/" className="flex flex-row items-center gap-x-2">
          <Feather name="home" size={24} color="white" />
          <Text className="pl-4 text-lg text-white">Inicio</Text>
        </Link>
        <Link href="./create" className="flex flex-row items-center gap-x-2">
          <AntDesign name="adduser" size={24} color="white" />
          <Text className="p-4 text-lg text-white">Crear</Text>
        </Link>
      </View>
    </View>
  );
}
