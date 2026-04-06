import React from 'react';
import{ View, Text, TouchableOpacity, StyleSheet, StatusBar, } from 'react-native';
import type { ScreenProps } from  '../App';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = ScreenProps<'Home'>;

export default function HomeScreen({ navigation}: Props): React.JSX.Element {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor= "#0f172A" />

      <View style={styles.container}>
        <View>
            <Text style={styles.title}>Basic Multi-Screen Application</Text>
            <View style={styles.box}>
              <Text style={styles.Paragraph}>
                This is a simple React Native application demonstrating navigation between multiple screens using React Navigation.
                Click the button below to learn more about me and my background.
              </Text>        
            </View>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('About')}
          activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>About Me</Text>
            <Text style={styles.buttonArrow}>→</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 400,
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    lineHeight: 32,
  },

  Paragraph: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24,
    paddingVertical: 16,
  },

  button: {
    backgroundColor: '#0F172A',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 8,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },

  buttonArrow: {
    color: '#94A3B8',
    fontSize: 16,
  },

  box: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#E2E8F0',
    padding: 16,
    marginTop: 20,
  },
})