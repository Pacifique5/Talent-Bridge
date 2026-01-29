"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { createChallengeAsync } from "@/store/challengesSlice";
import { ArrowLeft, Save, Trophy, Clock, Target } from "lucide-react";
import Link from "next/link";

const CreateChallengePage = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const [challengeData, setChallengeData] = useState({
        title: "",
        description: "",
        difficulty: "easy" as "easy" | "medium" | "hard",
        duration: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setChallengeData({
            ...challengeData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await dispatch(createChallengeAsync({
                title: challengeData.title,
                description: challengeData.description,
                difficulty: challengeData.difficulty,
                duration: Number(challengeData.duration),
            })).unwrap();
            
            router.push("/dashboard/challenges");
        } catch (error) {
            console.error("Error creating challenge:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link href="/dashboard/challenges">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create New Challenge</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Design a challenge to help others build their skills</p>
                </div>
            </div>

            {/* Form */}
            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-8 space-y-6">
                    {/* Challenge Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Challenge Title
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                ({challengeData.title.length}/200 characters)
                            </span>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Trophy className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                            </div>
                            <input 
                                type="text" 
                                id="title" 
                                name="title" 
                                value={challengeData.title} 
                                onChange={handleChange} 
                                required 
                                maxLength={200}
                                placeholder="Enter a compelling challenge title"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-colors" 
                            />
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Challenge Description
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                ({challengeData.description.length}/2000 characters)
                            </span>
                        </label>
                        <textarea 
                            id="description" 
                            name="description" 
                            value={challengeData.description} 
                            onChange={handleChange} 
                            required 
                            rows={8}
                            maxLength={2000}
                            placeholder="Describe the challenge objectives, requirements, and what participants will learn..."
                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-colors resize-vertical" 
                        />
                    </div>
                    
                    {/* Difficulty and Duration Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Difficulty */}
                        <div>
                            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Difficulty Level
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Target className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                </div>
                                <select 
                                    name="difficulty" 
                                    value={challengeData.difficulty} 
                                    onChange={handleChange} 
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-colors"
                                >
                                    <option value="easy">Easy - Beginner friendly</option>
                                    <option value="medium">Medium - Some experience required</option>
                                    <option value="hard">Hard - Advanced skills needed</option>
                                </select>
                            </div>
                        </div>
                        
                        {/* Duration */}
                        <div>
                            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Duration (days)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Clock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                                </div>
                                <input 
                                    type="number" 
                                    id="duration" 
                                    name="duration" 
                                    value={challengeData.duration} 
                                    onChange={handleChange} 
                                    required 
                                    min="1"
                                    max="365"
                                    placeholder="e.g., 7"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-transparent transition-colors" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* Challenge Guidelines */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Challenge Guidelines</h3>
                        <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                            <li>• Title: 3-200 characters, clear and engaging</li>
                            <li>• Description: 10-2000 characters, detailed requirements and objectives</li>
                            <li>• Duration: 1-365 days, realistic based on complexity</li>
                            <li>• Choose appropriate difficulty level for target audience</li>
                        </ul>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <Link href="/dashboard/challenges" className="flex-1">
                            <button 
                                type="button"
                                className="w-full px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </Link>
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 bg-blue-light hover:bg-blue-dark disabled:bg-blue-300 dark:disabled:bg-blue-800 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Create Challenge
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateChallengePage;
