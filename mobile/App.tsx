import { Button, StatusBar } from 'react-native';
import { useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { Loading } from './src/components/Loading';
import './src/lib/dayjs';
import { Routes } from './src/routes';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

export async function allowsNotificationsAsync() {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
}

export default function App() {

  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold });

  async function scheduleNotification() {
    const hasPushNotificationPermissionGranted = await allowsNotificationsAsync()

    const trigger = new Date(Date.now());

    trigger.setMinutes(trigger.getMinutes() + 1);
    if (hasPushNotificationPermissionGranted) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Hello',
          body: 'Voce praticou seus hábitos hoje?',
          data: { data: 'goes here' },
        },
        trigger: {
          seconds: 2
        },
      });
    }
  }

  if (!fontsLoaded) {
    return (<Loading />);
  }
  return (
    <>

      <Routes />
      <Button title='clique' onPress={() => scheduleNotification()} />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}