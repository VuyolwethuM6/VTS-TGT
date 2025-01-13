import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LanguageScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Language'>;
};

type Language = {
  id: string;
  name: string;
  nativeName: string;
  code: string;
};

export default function LanguageScreen({ navigation }: LanguageScreenProps) {
  const languages: Language[] = [
    { id: '1', name: 'English', nativeName: 'English', code: 'en' },
    { id: '2', name: 'Afrikaans', nativeName: 'Afrikaans', code: 'af' },
    { id: '3', name: 'Zulu', nativeName: 'isiZulu', code: 'zu' },
    { id: '4', name: 'Xhosa', nativeName: 'isiXhosa', code: 'xh' },
    { id: '5', name: 'Sotho', nativeName: 'Sesotho', code: 'st' },
    { id: '6', name: 'Tswana', nativeName: 'Setswana', code: 'tn' },
    { id: '7', name: 'Venda', nativeName: 'Tshivenda', code: 've' },
    { id: '8', name: 'Tsonga', nativeName: 'Xitsonga', code: 'ts' },
    { id: '9', name: 'Swati', nativeName: 'siSwati', code: 'ss' },
    { id: '10', name: 'Ndebele', nativeName: 'isiNdebele', code: 'nr' },
    { id: '11', name: 'Pedi', nativeName: 'Sepedi', code: 'nso' },
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    // Implement language change logic here
    console.log('Selected language:', code);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Choose Your Language</Text>
        <Text style={styles.sectionDescription}>
          Select your preferred language for the app interface
        </Text>
      </View>

      <View style={styles.languageList}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.languageItem,
              selectedLanguage === language.code && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageSelect(language.code)}
          >
            <View style={styles.languageInfo}>
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.nativeName}>{language.nativeName}</Text>
            </View>
            {selectedLanguage === language.code && (
              <Ionicons name="checkmark-circle" size={24} color="#FFD700" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Changes will be applied immediately
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  languageList: {
    padding: 10,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#2A2E37',
    borderRadius: 10,
    marginVertical: 5,
  },
  selectedLanguage: {
    backgroundColor: '#3A3E47',
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  nativeName: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
}); 