import { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const EMOJIS = ['✨', '💧', '📚', '🏃‍♀️', '🧘‍♀️', '🥗', '💤', '🎨', '🎀', '💖'];
const COLORS = ['#FFB7C5', '#C9A0DC', '#A2D2FF', '#FFDAC1', '#B5EAD7', '#FF9AA2'];

export default function AddHabitModal({ visible, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('✨');
  const [selectedColor, setSelectedColor] = useState('#FFB7C5');
  const [reminderTime, setReminderTime] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      emoji: selectedEmoji,
      color: selectedColor,
      reminderTime: reminderTime || null,
    });
    setTitle('');
    setReminderTime('');
    setSelectedEmoji('✨');
    setSelectedColor('#FFB7C5');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.heading}>New Habit 💕</Text>

          <Text style={styles.label}>What habit do you want to track?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Drink 8 glasses of water"
            placeholderTextColor="#C9A0DC"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Pick an emoji</Text>
          <View style={styles.emojiRow}>
            {EMOJIS.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                style={[styles.emojiButton, selectedEmoji === emoji && styles.selectedEmoji]}
                onPress={() => setSelectedEmoji(emoji)}
              >
                <Text style={styles.emojiText}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Choose a color</Text>
          <View style={styles.colorRow}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>

          <Text style={styles.label}>Daily reminder time (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM (24h)"
            placeholderTextColor="#C9A0DC"
            value={reminderTime}
            onChangeText={setReminderTime}
            keyboardType="numbers-and-punctuation"
            maxLength={5}
          />

          <TouchableOpacity activeOpacity={0.8} onPress={handleAdd}>
            <LinearGradient
              colors={['#FF9AA2', '#FFB7C5']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add Habit ✨</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(90, 60, 80, 0.35)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#FFF8FA',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    padding: 28,
    paddingBottom: 42,
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#5A3D5C',
    marginBottom: 22,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9B6A9E',
    marginBottom: 8,
    marginTop: 14,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: '#5A3D5C',
    borderWidth: 1,
    borderColor: '#FFE4E9',
  },
  emojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  emojiButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE4E9',
  },
  selectedEmoji: {
    borderColor: '#FF9AA2',
    borderWidth: 2,
    backgroundColor: '#FFF0F3',
  },
  emojiText: {
    fontSize: 22,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
  },
  colorButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  selectedColor: {
    borderColor: '#5A3D5C',
    borderWidth: 3,
  },
  addButton: {
    borderRadius: 20,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 14,
    alignItems: 'center',
  },
  cancelText: {
    color: '#C9A0DC',
    fontWeight: '700',
    fontSize: 15,
  },
});
