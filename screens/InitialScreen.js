import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function InitialScreen({ navigation }) {
  const handlePress = (screen) => {
    // 매개변수로 전달된 screen에 따라 이동
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ㅇㅇ커피</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('General')} // 일반 화면으로 이동
      >
        <Text style={styles.buttonText}>일반</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Senior')} // 노인 화면으로 이동
      >
        <Text style={styles.buttonText}>노인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('Wheelchair')} // 휠체어/아이 화면으로 이동
      >
        <Text style={styles.buttonText}>휠체어/아이</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handlePress('VisualImpairment')} // 시각장애 화면으로 이동
      >
        <Text style={styles.buttonText}>시각장애</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#007bff',
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
