import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

import { AppProvider } from './src/context/AppContext';
import { requestNotificationPermissions } from './src/utils/notifications';
import HabitsScreen from './src/screens/HabitsScreen';
import TodosScreen from './src/screens/TodosScreen';
import StatsScreen from './src/screens/StatsScreen';
import TabBar from './src/components/TabBar';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [activeTab, setActiveTab] = useState('habits');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    requestNotificationPermissions().finally(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.screen}>
          {activeTab === 'habits' && <HabitsScreen />}
          {activeTab === 'todos' && <TodosScreen />}
          {activeTab === 'stats' && <StatsScreen />}
        </View>
        <TabBar activeTab={activeTab} onChange={setActiveTab} />
      </SafeAreaView>
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  screen: {
    flex: 1,
  },
});
