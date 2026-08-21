import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useApp } from '../context/AppContext';
import Card from '../components/Card';

export default function StatsScreen() {
  const { habits, completedTodos, totalTodos } = useApp();

  const totalHabitStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const bestHabit = habits.length
    ? habits.reduce((best, h) => (h.streak > best.streak ? h : best), habits[0])
    : null;
  const completedTodayCount = habits.filter((h) => h.completedToday).length;
  const habitsCount = habits.length;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#E6F3FF', '#FFF8FA']} style={styles.header}>
        <Text style={styles.heading}>Your Stats 🌸</Text>
        <Text style={styles.subtitle}>Keep shining, babe!</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <Card style={styles.statCard}>
            <Text style={styles.statEmoji}>🔥</Text>
            <Text style={styles.statNumber}>{totalHabitStreak}</Text>
            <Text style={styles.statLabel}>Total Streak Days</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statEmoji}>✅</Text>
            <Text style={styles.statNumber}>
              {habitsCount ? Math.round((completedTodayCount / habitsCount) * 100) : 0}%
            </Text>
            <Text style={styles.statLabel}>Habits Today</Text>
          </Card>
        </View>

        <Card>
          <Text style={styles.cardTitle}>Tasks Done</Text>
          <Text style={styles.bigStat}>
            {completedTodos}/{totalTodos}
          </Text>
          <Text style={styles.cardSub}>to-do items completed</Text>
        </Card>

        {bestHabit && (
          <Card>
            <Text style={styles.cardTitle}>Longest Streak</Text>
            <Text style={styles.bestHabitText}>
              {bestHabit.emoji} {bestHabit.title}
            </Text>
            <Text style={styles.bigStat}>{bestHabit.streak} days</Text>
          </Card>
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
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
  heading: {
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
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#5A3D5C',
  },
  statLabel: {
    fontSize: 12,
    color: '#9B6A9E',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#9B6A9E',
    marginBottom: 6,
  },
  bigStat: {
    fontSize: 34,
    fontWeight: '800',
    color: '#5A3D5C',
  },
  cardSub: {
    fontSize: 13,
    color: '#9B6A9E',
    marginTop: 2,
  },
  bestHabitText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF9AA2',
    marginVertical: 4,
  },
});
