import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  Platform,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../utils/firebase';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const isLargeScreen = width > 768;

type TeamMember = {
  id: string;
  email: string;
  name: string;
  debiCheckStatus: 'Active' | 'Pending' | 'Inactive';
  targets: {
    invites: number;
    presentations: number;
    recruits: number;
  };
};

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // New member form state
  const [newMember, setNewMember] = useState({
    email: '',
    password: '',
    name: '',
    targets: {
      invites: 10,
      presentations: 5,
      recruits: 2,
    },
  });

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const teamMembers: TeamMember[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.role === 'member') {
          teamMembers.push({
            id: doc.id,
            email: data.email,
            name: data.name,
            debiCheckStatus: data.debiCheckStatus || 'Pending',
            targets: data.targets || {
              invites: 10,
              presentations: 5,
              recruits: 2,
            },
          });
        }
      });
      
      setMembers(teamMembers);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load team members',
        position: 'top',
        topOffset: 50,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMember.email || !newMember.password || !newMember.name) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill in all fields',
        position: 'top',
        topOffset: 50,
      });
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newMember.email,
        newMember.password
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: newMember.email,
        name: newMember.name,
        role: 'member',
        debiCheckStatus: 'Pending',
        targets: newMember.targets,
        createdAt: new Date().toISOString(),
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Team member added successfully',
        position: 'top',
        topOffset: 50,
      });

      setModalVisible(false);
      setNewMember({
        email: '',
        password: '',
        name: '',
        targets: {
          invites: 10,
          presentations: 5,
          recruits: 2,
        },
      });
      loadTeamMembers();
    } catch (error: any) {
      let errorMessage = 'Failed to add team member';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered';
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage,
        position: 'top',
        topOffset: 50,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (memberId: string, newStatus: TeamMember['debiCheckStatus']) => {
    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', memberId), {
        debiCheckStatus: newStatus,
      });
      
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Status updated successfully',
        position: 'top',
        topOffset: 50,
      });
      
      loadTeamMembers();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update status',
        position: 'top',
        topOffset: 50,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTargets = async () => {
    if (!selectedMember) return;

    try {
      setLoading(true);
      await updateDoc(doc(db, 'users', selectedMember.id), {
        targets: selectedMember.targets,
      });
      
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Targets updated successfully',
        position: 'top',
        topOffset: 50,
      });
      
      setEditModalVisible(false);
      loadTeamMembers();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update targets',
        position: 'top',
        topOffset: 50,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderMemberCard = (member: TeamMember) => (
    <View key={member.id} style={styles.memberCard}>
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'rgba(26,26,26,0.8)']}
        style={styles.gradientCard}
      >
        <View style={styles.memberHeader}>
          <View>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text style={styles.memberEmail}>{member.email}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            { backgroundColor: member.debiCheckStatus === 'Active' ? '#4CAF50' : 
                             member.debiCheckStatus === 'Pending' ? '#FFC107' : '#F44336' }
          ]}>
            <Text style={styles.statusText}>{member.debiCheckStatus}</Text>
          </View>
        </View>

        <View style={styles.targetsContainer}>
          <Text style={styles.targetsTitle}>Daily Targets:</Text>
          <View style={styles.targetsGrid}>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Invites</Text>
              <Text style={styles.targetValue}>{member.targets.invites}</Text>
            </View>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Presentations</Text>
              <Text style={styles.targetValue}>{member.targets.presentations}</Text>
            </View>
            <View style={styles.targetItem}>
              <Text style={styles.targetLabel}>Recruits</Text>
              <Text style={styles.targetValue}>{member.targets.recruits}</Text>
            </View>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => {
              setSelectedMember(member);
              setEditModalVisible(true);
            }}
          >
            <Ionicons name="settings-outline" size={20} color="#FFD700" />
            <Text style={styles.actionButtonText}>Edit Targets</Text>
          </TouchableOpacity>

          <View style={styles.statusButtons}>
            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => handleUpdateStatus(member.id, 'Active')}
            >
              <Text style={styles.statusButtonText}>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: '#FFC107' }]}
              onPress={() => handleUpdateStatus(member.id, 'Pending')}
            >
              <Text style={styles.statusButtonText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: '#F44336' }]}
              onPress={() => handleUpdateStatus(member.id, 'Inactive')}
            >
              <Text style={styles.statusButtonText}>Inactive</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Team Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <LinearGradient
            colors={['#FFD700', '#FDB931']}
            style={styles.addButtonGradient}
          >
            <Ionicons name="add" size={24} color="#000000" />
            <Text style={styles.addButtonText}>Add Member</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {members.map(renderMemberCard)}
      </ScrollView>

      {/* Add Member Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Team Member</Text>
            
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="#666666"
              value={newMember.name}
              onChangeText={(text) => setNewMember({ ...newMember, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#666666"
              value={newMember.email}
              onChangeText={(text) => setNewMember({ ...newMember, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#666666"
              value={newMember.password}
              onChangeText={(text) => setNewMember({ ...newMember, password: text })}
              secureTextEntry
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleAddMember}
              >
                <Text style={styles.modalButtonText}>Add Member</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Targets Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Targets</Text>
            
            {selectedMember && (
              <>
                <View style={styles.targetInput}>
                  <Text style={styles.targetInputLabel}>Invites Target</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Invites"
                    placeholderTextColor="#666666"
                    value={selectedMember.targets.invites.toString()}
                    onChangeText={(text) => setSelectedMember({
                      ...selectedMember,
                      targets: {
                        ...selectedMember.targets,
                        invites: parseInt(text) || 0,
                      },
                    })}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.targetInput}>
                  <Text style={styles.targetInputLabel}>Presentations Target</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Presentations"
                    placeholderTextColor="#666666"
                    value={selectedMember.targets.presentations.toString()}
                    onChangeText={(text) => setSelectedMember({
                      ...selectedMember,
                      targets: {
                        ...selectedMember.targets,
                        presentations: parseInt(text) || 0,
                      },
                    })}
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.targetInput}>
                  <Text style={styles.targetInputLabel}>Recruits Target</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Recruits"
                    placeholderTextColor="#666666"
                    value={selectedMember.targets.recruits.toString()}
                    onChangeText={(text) => setSelectedMember({
                      ...selectedMember,
                      targets: {
                        ...selectedMember.targets,
                        recruits: parseInt(text) || 0,
                      },
                    })}
                    keyboardType="numeric"
                  />
                </View>
              </>
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.submitButton]}
                onPress={handleUpdateTargets}
              >
                <Text style={styles.modalButtonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  addButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  memberCard: {
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  gradientCard: {
    padding: 20,
  },
  memberHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  memberEmail: {
    fontSize: 14,
    color: '#CCCCCC',
    marginTop: 5,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  targetsContainer: {
    marginTop: 10,
  },
  targetsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  targetsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  targetItem: {
    flex: 1,
    alignItems: 'center',
  },
  targetLabel: {
    fontSize: 12,
    color: '#CCCCCC',
    marginBottom: 5,
  },
  targetValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  actionButtons: {
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 215, 0, 0.1)',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFD700',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  statusButton: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  statusButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#000000',
  },
  targetInput: {
    marginBottom: 15,
  },
  targetInputLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
  },
  submitButton: {
    backgroundColor: '#FFD700',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
}); 