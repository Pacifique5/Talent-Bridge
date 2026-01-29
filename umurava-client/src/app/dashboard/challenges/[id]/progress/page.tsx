"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Target,
  FileText,
  Send,
  Eye,
  Calendar,
  TrendingUp,
  Award,
  Shield,
  ExternalLink
} from "lucide-react";
import { RootState } from "@/store";
import { Challenge } from "@/types/challenge";
import { challengeService } from "@/services/challengeService";
import VulnerabilityReportForm from "@/components/dashboard/VulnerabilityReportForm";
import Link from "next/link";

interface ProgressData {
  challengeId: string;
  startedAt: string;
  lastActivity: string;
  timeSpent: number; // in minutes
  reportsSubmitted: number;
  status: 'in-progress' | 'completed' | 'submitted';
  score?: number;
  maxScore?: number;
}

const ChallengeProgressPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'report' | 'submissions'>('overview');

  const challengeId = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [challengeData] = await Promise.all([
          challengeService.getChallengeById(challengeId)
        ]);
        
        setChallenge(challengeData);
        
        // Mock progress data - in real app, this would come from API
        setProgress({
          challengeId,
          startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
          lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
          timeSpent: 180, // 3 hours
          reportsSubmitted: 0,
          status: 'in-progress'
        });
      } catch (err) {
        setError("Failed to load challenge progress");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      fetchData();
    }
  }, [challengeId]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'hard': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const calculateTimeRemaining = () => {
    if (!challenge || !progress) return 0;
    const startDate = new Date(progress.startedAt);
    const endDate = new Date(startDate.getTime() + challenge.duration * 24 * 60 * 60 * 1000);
    const now = new Date();
    const remaining = Math.max(0, Math.ceil((endDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)));
    return remaining;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-light"></div>
      </div>
    );
  }

  if (error || !challenge || !progress) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/challenges">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Progress Not Found</h1>
        </div>
      </div>
    );
  }

  const timeRemaining = calculateTimeRemaining();
  const progressPercentage = Math.min(100, (progress.timeSpent / (challenge.duration * 8 * 60)) * 100); // Assuming 8 hours per day

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href={`/dashboard/challenges/${challengeId}`}>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
              {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
              <Clock className="h-4 w-4" />
              In Progress
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{challenge.title}</h1>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Time Spent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{formatDuration(progress.timeSpent)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Days Remaining</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{timeRemaining}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reports Submitted</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{progress.reportsSubmitted}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Math.round(progressPercentage)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Challenge Progress</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
          <span>Started {new Date(progress.startedAt).toLocaleDateString()}</span>
          <span>Last activity {new Date(progress.lastActivity).toLocaleString()}</span>
        </div>
      </div>

      {/* Target Website Quick Access */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Target Website Access
            </h3>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Continue your security assessment of the target application
            </p>
            <p className="font-mono text-sm text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 px-3 py-1 rounded border">
              https://mpacifique.vercel.app/
            </p>
          </div>
          <a
            href="https://mpacifique.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            <ExternalLink className="h-5 w-5" />
            Launch Target
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Overview
              </div>
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'report'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Send className="h-4 w-4" />
                Submit Report
              </div>
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'submissions'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                My Submissions ({progress.reportsSubmitted})
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Assessment Guidelines</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                    <h4 className="font-medium text-red-900 dark:text-red-300 mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Security Testing Areas
                    </h4>
                    <ul className="text-sm text-red-800 dark:text-red-400 space-y-1">
                      <li>• Input validation and sanitization</li>
                      <li>• Authentication and session management</li>
                      <li>• Cross-site scripting (XSS) vulnerabilities</li>
                      <li>• SQL injection possibilities</li>
                      <li>• Information disclosure issues</li>
                      <li>• Client-side security controls</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                    <h4 className="font-medium text-green-900 dark:text-green-300 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Testing Methodology
                    </h4>
                    <ul className="text-sm text-green-800 dark:text-green-400 space-y-1">
                      <li>• Manual exploration and reconnaissance</li>
                      <li>• Automated scanning with tools</li>
                      <li>• Source code analysis (if accessible)</li>
                      <li>• Network and infrastructure assessment</li>
                      <li>• Social engineering considerations</li>
                      <li>• Documentation of all findings</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Submit Vulnerability Reports</h3>
              <VulnerabilityReportForm challengeId={challengeId} />
            </div>
          )}

          {activeTab === 'submissions' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Submissions</h3>
              {progress.reportsSubmitted === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No submissions yet</h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Start by exploring the target website and documenting any vulnerabilities you find.
                  </p>
                  <button
                    onClick={() => setActiveTab('report')}
                    className="bg-blue-light hover:bg-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Submit Your First Report
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* This would show actual submissions in a real app */}
                  <p className="text-gray-500 dark:text-gray-400">Your submitted vulnerability reports will appear here.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeProgressPage;