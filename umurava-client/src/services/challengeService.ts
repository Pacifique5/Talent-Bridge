import { Challenge } from '@/types/challenge';
import { authService } from './authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const challengeService = {
  async getAllChallenges(): Promise<Challenge[]> {
    const response = await fetch(`${API_BASE_URL}/api/challenges`);
    if (!response.ok) {
      throw new Error('Failed to fetch challenges');
    }
    return response.json();
  },

  async getChallengeById(id: string): Promise<Challenge> {
    const response = await fetch(`${API_BASE_URL}/api/challenges/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch challenge');
    }
    return response.json();
  },

  async createChallenge(challenge: Omit<Challenge, 'id' | 'createdAt'>): Promise<Challenge> {
    console.log("🚀 Frontend: Creating challenge with data:", challenge);
    console.log("🚀 Frontend: Auth headers:", authService.getAuthHeaders());
    
    const response = await fetch(`${API_BASE_URL}/api/challenges`, {
      method: 'POST',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(challenge),
    });
    
    console.log("📥 Frontend: Response status:", response.status);
    console.log("📥 Frontend: Response headers:", Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      let error;
      try {
        error = await response.json();
        console.error("❌ Frontend: Create challenge error:", error);
        
        // Handle validation errors specifically
        if (error.errors && Array.isArray(error.errors)) {
          const validationMessages = error.errors.map((err: any) => err.msg).join(', ');
          throw new Error(`Validation failed: ${validationMessages}`);
        }
        
        throw new Error(error.message || 'Failed to create challenge');
      } catch (parseError) {
        console.error("❌ Frontend: Error parsing response:", parseError);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
    }
    
    const result = await response.json();
    console.log("✅ Frontend: Challenge created successfully:", result);
    return result;
  },

  async updateChallenge(id: string, challenge: Partial<Challenge>): Promise<Challenge> {
    console.log("🚀 Frontend: Updating challenge with auth");
    
    const response = await fetch(`${API_BASE_URL}/api/challenges/${id}`, {
      method: 'PUT',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify(challenge),
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Frontend: Update challenge error:", error);
      throw new Error(error.message || 'Failed to update challenge');
    }
    
    const result = await response.json();
    console.log("✅ Frontend: Challenge updated successfully");
    return result;
  },

  async deleteChallenge(id: string): Promise<void> {
    console.log("🚀 Frontend: Deleting challenge with auth");
    
    const response = await fetch(`${API_BASE_URL}/api/challenges/${id}`, {
      method: 'DELETE',
      headers: authService.getAuthHeaders(),
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Frontend: Delete challenge error:", error);
      throw new Error(error.message || 'Failed to delete challenge');
    }
    
    console.log("✅ Frontend: Challenge deleted successfully");
  },
};