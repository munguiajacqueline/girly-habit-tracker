import { createContext, useContext, useEffect, useState } from 'react';
import { loadState, saveState } from '../utils/storage';
import { scheduleHabitReminder, cancelHabitReminder } from '../utils/notifications';
import { calculateStreak, isSameDay, getTodayKey } from '../utils/streaks';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [habits, setHabits] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadState().then((state) => {
      if (state) {
        setHabits(state.habits || []);
        setTodos(state.todos || []);
      }
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      saveState({ habits, todos });
    }
  }, [habits, todos, loaded]);

  const addHabit = (habit) => {
    const newHabit = {
      id: Date.now().toString(),
      title: habit.title,
      emoji: habit.emoji || '✨',
      color: habit.color || '#FFB7C5',
      reminderTime: habit.reminderTime || null,
      completions: [],
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, newHabit]);
    if (newHabit.reminderTime) {
      scheduleHabitReminder(newHabit.id, newHabit.title, newHabit.reminderTime);
    }
  };

  const toggleHabit = (id) => {
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        const todayKey = getTodayKey();
        const alreadyCompleted = habit.completions.some((c) => isSameDay(c, todayKey));
        const completions = alreadyCompleted
          ? habit.completions.filter((c) => !isSameDay(c, todayKey))
          : [...habit.completions, todayKey];
        return { ...habit, completions };
      })
    );
  };

  const deleteHabit = (id) => {
    cancelHabitReminder(id);
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const addTodo = (todo) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: todo.title,
        completed: false,
        dueDate: todo.dueDate || null,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const habitsWithStreaks = habits.map((habit) => ({
    ...habit,
    streak: calculateStreak(habit.completions),
    completedToday: habit.completions.some((c) => isSameDay(c, getTodayKey())),
  }));

  const completedTodos = todos.filter((t) => t.completed).length;
  const totalTodos = todos.length;

  return (
    <AppContext.Provider
      value={{
        habits: habitsWithStreaks,
        todos,
        addHabit,
        toggleHabit,
        deleteHabit,
        addTodo,
        toggleTodo,
        deleteTodo,
        completedTodos,
        totalTodos,
        loaded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
