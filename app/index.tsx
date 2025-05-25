import Load from '@/components/shared/load/Load';
import Card from '@/components/ui/card/Card';
import { env } from '@/config/env';
import { useQuery } from '@/hook/useQuery';
import { Person } from '@/interface/types';
import axios from 'axios';
import { View } from 'moti';
import { useState } from 'react';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading } = useQuery<Person[]>({
    queryFn: async () => {
      const res = await axios.get(`${env.API_URL}/person`);
      return res.data;
    },
    dependencies: [refreshing],
  });

  return (
    <ScrollView className="flex max-h-full flex-1 flex-col gap-y-4 bg-white p-4">
      <View className="flex flex-col gap-y-4">
        {isLoading && <Load />}
        {data?.map((person) => (
          <Card key={person.id} {...person} onRefresh={() => setRefreshing(!refreshing)} />
        ))}
      </View>
    </ScrollView>
  );
}
