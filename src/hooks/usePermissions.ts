import { useAuth } from '../contexts/AuthContext';

export function usePermissions() {
  const { user } = useAuth();

  const isAdmin = user?.role === 'admin';

  const can = {
    manageUsers: isAdmin,
    managePermissions: isAdmin,
    viewAdminControls: isAdmin,
    editTeamTargets: isAdmin,
    viewPerformanceMetrics: true, // All users can view metrics
    logActivities: true, // All users can log activities
    viewProfile: true, // All users can view their profile
    editProfile: true, // All users can edit their profile
    viewTeam: true, // All users can view team
    inviteMembers: isAdmin, // Only admins can invite new members
  };

  return {
    isAdmin,
    can,
  };
} 