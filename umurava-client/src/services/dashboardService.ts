import { authService } from './authService';

interface DashboardStats {
  totalChallenges: number;
  userChallenges: number;
  completedChallenges: number;
  ongoingChallenges: number;
  recentChallenges: Array<{
    id: string;
    title: string;
    description: string;
    difficulty: string;
    duration: number;
    createdAt: string;
  }>;
}

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  joinedAt: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const dashboardService = {
  async getDashboardStats(): Promise<DashboardStats> {
    console.log("🚀 Frontend: Fetching dashboard stats");
    
    const response = await fetch(`${API_BASE_URL}/api/dashboard/stats`, {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Frontend: Dashboard stats error:", error);
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }

    const result = await response.json();
    console.log("✅ Frontend: Dashboard stats fetched successfully");
    return result;
  },

  async getUserProfile(): Promise<UserProfile> {
    console.log("🚀 Frontend: Fetching user profile");
    
    const response = await fetch(`${API_BASE_URL}/api/dashboard/profile`, {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Frontend: User profile error:", error);
      throw new Error(error.message || 'Failed to fetch user profile');
    }

    const result = await response.json();
    console.log("✅ Frontend: User profile fetched successfully");
    return result;
  },
};

export type { DashboardStats, UserProfile };