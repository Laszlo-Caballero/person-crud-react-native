import cx from '@/libs/cx';
import React, { forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
interface InputProps extends TextInputProps {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
}

const Input = forwardRef<TextInput, InputProps>(
  ({ label, placeholder, className, error, ...props }, ref) => {
    return (
      <View className={cx('flex w-full flex-col', className)}>
        <Text className="text-xl font-medium">{label}</Text>
        <TextInput
          ref={ref}
          className="rounded-lg border border-slate-500/50"
          placeholder={placeholder}
          {...props}
        />
        {error && <Text className="text-red-500">{error}</Text>}
      </View>
    );
  }
);

export default Input;

Input.displayName = 'Input';
