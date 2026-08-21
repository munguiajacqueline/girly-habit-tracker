import { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import AddHabitModal from '../components/AddHabitModal';

function HabitItem({ habit, onToggle, onDelete }) {
  return (
    <Card style={{ borderLeftWidth: 6, borderLeftColor: habit.color }}>
      <View style={styles.habitRow}>
        <TouchableOpacity
          style={[styles.checkbox, habit.completedToday && styles.checkboxChecked]}
          onPress={onToggle}
          activeOpacity={0.8}
        >
          <Text style={styles.checkmark}>{habit.completedToday ? '✓' : ''}</Text>
        </TouchableOpacity>

        <View style={styles.habitInfo}>
          <Text style={styles.habitTitle}>
            {habit.emoji} {habit.title}
          </Text>
          {habit.reminderTime && (
            <Text style={styles.reminderText}>⏰ {habit.reminderTime}</Text>
          )}
        </View>

        <View style={styles.streakBadge}>
          <Text style={styles.streakNumber}>{habit.streak}</Text>
          <Text style={styles.streakLabel}>day streak</Text>
        </View>

        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>🗑</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

export default function HabitsScreen() {
  const { habits, addHabit, toggleHabit, deleteHabit } = useApp();
  const [modalVisible, setModalVisible] = useState(false);

  const completedCount = habits.filter((h) => h.completedToday).length;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FFF0F3', '#FFF8FA']}
        style={styles.header}
      >
        <Text style={styles.greeting}>Hello, gorgeous 💕</Text>
        <Text style={styles.subtitle}>
          {completedCount}/{habits.length || 0} habits completed today
        </Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      >
        {habits.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🌸</Text>
            <Text style={styles.emptyTitle}>No habits yet</Text>
            <Text style={styles.emptyText}>
              Add your first daily habit and start building your glow-up streak!
            </Text>
          </View>
        )}

        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            onToggle={() => toggleHabit(habit.id)}
            onDelete={() => deleteHabit(habit.id)}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.85}
        onPress={() => setModalVisible(true)}
      >
        <LinearGradient
          colors={['#FF9AA2', '#FFB7C5']}
          style={styles.fabGradient}
        >
          <Text style={styles.fabText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>

      <AddHabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addHabit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  header: {
    paddingTop: 14,
    paddingHorizontal: 24,
    paddingBottom: 22,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#5A3D5C',
  },
  subtitle: {
    fontSize: 15,
    color: '#9B6A9E',
    marginTop: 4,
    fontWeight: '600',
  },
  list: {
    padding: 20,
    paddingTop: 10,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#FFF0F3',
    borderWidth: 2,
    borderColor: '#FFB7C5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#FFB7C5',
    borderColor: '#FFB7C5',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  habitInfo: {
    flex: 1,
    marginLeft: 14,
  },
  habitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5A3D5C',
  },
  reminderText: {
    fontSize: 12,
    color: '#9B6A9E',
    marginTop: 2,
  },
  streakBadge: {
    backgroundColor: '#FFF0F3',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'center',
    marginRight: 8,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF9AA2',
  },
  streakLabel: {
    fontSize: 9,
    color: '#9B6A9E',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  deleteButton: {
    padding: 4,
  },
  deleteText: {
    fontSize: 16,
    opacity: 0.6,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#FF9AA2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  fabGradient: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '300',
    marginTop: -2,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 30,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#5A3D5C',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9B6A9E',
    textAlign: 'center',
    lineHeight: 20,
  },
});
