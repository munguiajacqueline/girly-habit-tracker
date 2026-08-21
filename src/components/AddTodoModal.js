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

export default function AddTodoModal({ visible, onClose, onAdd }) {
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd({ title: title.trim() });
    setTitle('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.heading}>New To-Do 📝</Text>

          <Text style={styles.label}>What do you need to do?</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Buy pink flowers"
            placeholderTextColor="#C9A0DC"
            value={title}
            onChangeText={setTitle}
          />

          <TouchableOpacity activeOpacity={0.8} onPress={handleAdd}>
            <LinearGradient
              colors={['#C9A0DC', '#A2D2FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>Add To-Do ✨</Text>
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
