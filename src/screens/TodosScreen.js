import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useApp } from '../context/AppContext';
import Card from '../components/Card';
import AddTodoModal from '../components/AddTodoModal';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <Card>
      <View style={styles.todoRow}>
        <TouchableOpacity
          style={[styles.checkbox, todo.completed && styles.checkboxChecked]}
          onPress={onToggle}
          activeOpacity={0.8}
        >
          <Text style={styles.checkmark}>{todo.completed ? '✓' : ''}</Text>
        </TouchableOpacity>

        <Text style={[styles.todoText, todo.completed && styles.todoCompleted]}>
          {todo.title}
        </Text>

        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>🗑</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

export default function TodosScreen() {
  const { todos, addTodo, toggleTodo, deleteTodo, completedTodos, totalTodos } = useApp();
  const [modalVisible, setModalVisible] = useState(false);

  const progress = totalTodos === 0 ? 0 : completedTodos / totalTodos;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F3E8F7', '#FFF8FA']} style={styles.header}>
        <Text style={styles.heading}>To-Do List 📝</Text>
        <Text style={styles.subtitle}>
          {completedTodos}/{totalTodos} tasks done
        </Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {todos.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎀</Text>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyText}>
              Add a task and keep your day perfectly organized.
            </Text>
          </View>
        )}

        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => setModalVisible(true)}>
        <LinearGradient colors={['#C9A0DC', '#A2D2FF']} style={styles.fabGradient}>
          <Text style={styles.fabText}>+</Text>
        </LinearGradient>
      </TouchableOpacity>

      <AddTodoModal visible={modalVisible} onClose={() => setModalVisible(false)} onAdd={addTodo} />
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
  progressBarBackground: {
    height: 10,
    backgroundColor: '#E6D8EC',
    borderRadius: 5,
    marginTop: 14,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#C9A0DC',
    borderRadius: 5,
  },
  list: {
    padding: 20,
    paddingTop: 10,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#F3E8F7',
    borderWidth: 2,
    borderColor: '#C9A0DC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#C9A0DC',
    borderColor: '#C9A0DC',
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  todoText: {
    flex: 1,
    marginLeft: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#5A3D5C',
  },
  todoCompleted: {
    textDecorationLine: 'line-through',
    color: '#C9A0DC',
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
    shadowColor: '#C9A0DC',
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
