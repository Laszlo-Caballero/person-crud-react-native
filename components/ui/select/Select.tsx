import AntDesign from '@expo/vector-icons/AntDesign';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface SelectProps {
  label?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  error?: string;
}

export default function Select({ label, onChange, value, options, error }: SelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <View className="relative flex w-full flex-col">
      <Text className="text-xl font-medium">{label}</Text>
      <Pressable
        className="flex flex-row items-center justify-between rounded-lg border border-slate-500/50 px-2 py-3"
        onPress={() => {
          setOpen(!open);
        }}>
        <Text>{value}</Text>
        <AntDesign name="down" size={24} color="black" />
      </Pressable>

      <AnimatePresence>
        {open && (
          <MotiView
            from={{
              height: 0,
              opacity: 0,
              translateY: -10,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
              translateY: 8,
            }}
            exit={{
              height: 0,
              opacity: 0,
              translateY: -10,
            }}
            transition={{
              type: 'timing',
              duration: 200,
            }}
            className="absolute top-full z-10 w-full translate-y-2 overflow-hidden rounded-lg border border-slate-500/50 bg-white shadow-lg">
            {options?.map((option) => {
              return (
                <Pressable
                  key={option.value}
                  className="flex w-full items-center justify-between px-2 py-3"
                  onPress={() => {
                    setOpen(false);
                    onChange?.(option.value);
                  }}>
                  <Text>{option.label}</Text>
                </Pressable>
              );
            })}
          </MotiView>
        )}
      </AnimatePresence>

      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
}
