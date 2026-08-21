import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@girly-habit-tracker:state';

export async function loadState() {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    return json ? JSON.parse(json) : null;
  } catch (e) {
    console.warn('Failed to load state', e);
    return null;
  }
}

export async function saveState(state) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Failed to save state', e);
  }
}
