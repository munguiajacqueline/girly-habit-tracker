import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TABS = [
  { key: 'habits', label: 'Habits', emoji: '💖' },
  { key: 'todos', label: 'To-Dos', emoji: '📝' },
  { key: 'stats', label: 'Stats', emoji: '🌸' },
];

export default function TabBar({ activeTab, onChange }) {
  return (
    <View style={styles.container}>
      {activeTab === 'habits' && (
        <LinearGradient
          colors={['#FFC1CC', '#FFB7C5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.background}
        />
      )}
      {activeTab === 'todos' && (
        <LinearGradient
          colors={['#C9A0DC', '#D4A5D7']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.background}
        />
      )}
      {activeTab === 'stats' && (
        <LinearGradient
          colors={['#A2D2FF', '#BDE0FE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.background}
        />
      )}
      <View style={styles.tabs}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.activeTab]}
              onPress={() => onChange(tab.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.emoji, isActive && styles.activeEmoji]}>{tab.emoji}</Text>
              <Text style={[styles.label, isActive && styles.activeLabel]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    paddingTop: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    shadowColor: '#FF9EB5',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 10,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: 'rgba(255,255,255,0.35)',
  },
  emoji: {
    fontSize: 22,
    marginBottom: 2,
    opacity: 0.7,
  },
  activeEmoji: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    opacity: 0.85,
  },
  activeLabel: {
    opacity: 1,
    fontWeight: '700',
  },
});
