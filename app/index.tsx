import Card from '@/components/ui/card/Card';
import { env } from '@/config/env';
import { useQuery } from '@/hook/useQuery';
import { Person } from '@/interface/types';
import axios from 'axios';
import { ActivityIndicator, View } from 'react-native';

export default function HomeScreen() {
  const { data, isLoading } = useQuery<Person[]>({
    queryFn: async () => {
      const res = await axios.get(`${env.API_URL}/person`);
      return res.data;
    },
  });

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      {data?.map((person) => <Card key={person.id} {...person} />)}
    </View>
  );
}
