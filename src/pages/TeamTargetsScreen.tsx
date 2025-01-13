import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type TeamTargetsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TeamTargets'>;
};

type Target = {
  id: string;
  title: string;
  description: string;
  currentValue: number;
  targetValue: number;
  deadline: string;
  category: 'recruitment' | 'sales' | 'debicheck' | 'training';
};

export default function TeamTargetsScreen({ navigation }: TeamTargetsScreenProps) {
  const [targets, setTargets] = useState<Target[]>([
    {
      id: '1',
      title: 'New Team Members',
      description: 'Recruit new team members this month',
      currentValue: 8,
      targetValue: 15,
      deadline: '2024-02-28',
      category: 'recruitment',
    },
    {
      id: '2',
      title: 'Sales Target',
      description: 'Achieve monthly sales target',
      currentValue: 45000,
      targetValue: 75000,
      deadline: '2024-02-28',
      category: 'sales',
    },
    {
      id: '3',
      title: 'DebiCheck Verifications',
      description: 'Complete DebiCheck verifications',
      currentValue: 12,
      targetValue: 20,
      deadline: '2024-02-28',
      category: 'debicheck',
    },
    {
      id: '4',
      title: 'Training Sessions',
      description: 'Complete team training sessions',
      currentValue: 3,
      targetValue: 5,
      deadline: '2024-02-28',
      category: 'training',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Targets', icon: 'grid-outline' },
    { id: 'recruitment', label: 'Recruitment', icon: 'people-outline' },
    { id: 'sales', label: 'Sales', icon: 'cash-outline' },
    { id: 'debicheck', label: 'DebiCheck', icon: 'checkmark-circle-outline' },
    { id: 'training', label: 'Training', icon: 'school-outline' },
  ];

  const filteredTargets = selectedCategory === 'all'
    ? targets
    : targets.filter(target => target.category === selectedCategory);

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const formatValue = (value: number, category: string) => {
    if (category === 'sales') {
      return `R${value.toLocaleString()}`;
    }
    return value.toString();
  };

  const handleAddTarget = () => {
    // Implement add target logic
    console.log('Add new target');
  };

  const handleEditTarget = (targetId: string) => {
    // Implement edit target logic
    console.log('Edit target:', targetId);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons
              name={category.icon as any}
              size={20}
              color={selectedCategory === category.id ? '#FFD700' : '#FFFFFF'}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.targetList}>
        {filteredTargets.map((target) => (
          <View key={target.id} style={styles.targetCard}>
            <View style={styles.targetHeader}>
              <View>
                <Text style={styles.targetTitle}>{target.title}</Text>
                <Text style={styles.targetDescription}>{target.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditTarget(target.id)}
              >
                <Ionicons name="pencil-outline" size={20} color="#FFD700" />
              </TouchableOpacity>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${calculateProgress(target.currentValue, target.targetValue)}%` },
                  ]}
                />
              </View>
              <View style={styles.progressValues}>
                <Text style={styles.currentValue}>
                  {formatValue(target.currentValue, target.category)}
                </Text>
                <Text style={styles.targetValue}>
                  {formatValue(target.targetValue, target.category)}
                </Text>
              </View>
            </View>

            <View style={styles.targetFooter}>
              <Text style={styles.deadline}>Deadline: {target.deadline}</Text>
              <Text style={styles.progress}>
                {Math.round(calculateProgress(target.currentValue, target.targetValue))}%
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={handleAddTarget}>
        <Ionicons name="add" size={24} color="#000000" />
        <Text style={styles.addButtonText}>Add New Target</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B1F24',
  },
  categoryBar: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2E37',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#2A2E37',
  },
  selectedCategory: {
    backgroundColor: '#3A3E47',
    borderColor: '#FFD700',
    borderWidth: 1,
  },
  categoryText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#FFD700',
  },
  targetList: {
    flex: 1,
    padding: 15,
  },
  targetCard: {
    backgroundColor: '#2A2E37',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  targetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  targetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  targetDescription: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    padding: 5,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#3A3E47',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  progressValues: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  currentValue: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  targetValue: {
    fontSize: 14,
    color: '#666',
  },
  targetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deadline: {
    fontSize: 14,
    color: '#666',
  },
  progress: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    padding: 15,
    margin: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
}); 