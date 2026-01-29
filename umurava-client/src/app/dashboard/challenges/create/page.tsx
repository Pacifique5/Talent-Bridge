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
        targetUrl: "", // Add target URL field
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
                        
                        {/* Quick Templates */}
                        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                            <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Quick Templates:</p>
                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => setChallengeData({
                                        title: "🕵️ Web Application Security Assessment",
                                        description: "In this hands-on cybersecurity challenge, participants will conduct a comprehensive security assessment of a real-world portfolio website. Your mission is to identify, document, and report security vulnerabilities using industry-standard methodologies.\n\n🎯 **Target Website:** https://mpacifique.vercel.app/\n\n**Objectives:**\n• Explore the target web application systematically\n• Identify security vulnerabilities and weaknesses\n• Document findings with detailed evidence\n• Submit professional vulnerability reports\n• Learn real-world penetration testing techniques\n\n🔍 **Assessment Areas:**\n• Input validation and sanitization\n• Authentication and session management\n• Cross-site scripting (XSS) vulnerabilities\n• Information disclosure issues\n• Client-side security controls\n• Network and infrastructure assessment\n\n📚 **Skills You'll Develop:**\n• Web application security testing\n• Vulnerability identification and classification\n• Security report writing\n• Understanding of OWASP Top 10\n• Ethical hacking methodologies\n\n🔧 **Recommended Tools:**\n• Browser developer tools (F12)\n• Burp Suite Community Edition\n• OWASP ZAP (Free)\n• Postman for API testing\n• Nmap for network scanning\n\n⚠️ **Ethical Guidelines:**\n• Only test the specified target website\n• Do not attempt to access unauthorized areas\n• Follow responsible disclosure principles\n• Focus on learning and skill development\n• Document everything professionally\n\nBy completing this challenge, you'll gain practical experience in cybersecurity assessment and develop skills highly valued in the information security industry.",
                                        difficulty: "medium",
                                        duration: "7"
                                    })}
                                    className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-2 py-1 rounded hover:bg-blue-200 dark:hover:bg-blue-700 transition-colors"
                                >
                                    🔒 Security Assessment
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setChallengeData({
                                        title: "💻 Build a Modern Web Dashboard",
                                        description: "Create a responsive, feature-rich dashboard application using modern web technologies. This challenge focuses on frontend development, user experience design, and API integration.\n\n🎯 **Project Requirements:**\n• Responsive design that works on all devices\n• Interactive data visualizations\n• User authentication and authorization\n• Real-time data updates\n• Clean, intuitive user interface\n\n🛠️ **Technical Stack:**\n• Frontend: React, Vue, or Angular\n• Styling: Tailwind CSS or styled-components\n• Charts: Chart.js, D3.js, or similar\n• State Management: Redux, Vuex, or Context API\n• API Integration: REST or GraphQL\n\n📊 **Features to Implement:**\n• User dashboard with key metrics\n• Data filtering and search functionality\n• Export capabilities (PDF, CSV)\n• Dark/light theme toggle\n• Mobile-responsive navigation\n\nThis challenge will help you develop full-stack development skills and create a portfolio-worthy project.",
                                        difficulty: "medium",
                                        duration: "14"
                                    })}
                                    className="text-xs bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 px-2 py-1 rounded hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
                                >
                                    💻 Web Development
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setChallengeData({
                                        title: "🤖 AI-Powered Data Analysis Challenge",
                                        description: "Dive into the world of artificial intelligence and machine learning by building a comprehensive data analysis solution. This challenge combines data science, machine learning, and practical AI implementation.\n\n🎯 **Challenge Objectives:**\n• Analyze complex datasets using AI/ML techniques\n• Build predictive models and algorithms\n• Create data visualizations and insights\n• Implement machine learning pipelines\n• Present findings in a clear, actionable format\n\n🔬 **Technical Requirements:**\n• Python with pandas, numpy, scikit-learn\n• Data visualization with matplotlib/seaborn\n• Machine learning model development\n• Statistical analysis and hypothesis testing\n• Model evaluation and optimization\n\n📈 **Deliverables:**\n• Jupyter notebook with complete analysis\n• Trained machine learning models\n• Interactive dashboard or web app\n• Technical report with findings\n• Code documentation and README\n\nThis challenge is perfect for aspiring data scientists and AI enthusiasts looking to build practical experience with real-world datasets.",
                                        difficulty: "hard",
                                        duration: "21"
                                    })}
                                    className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-2 py-1 rounded hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors"
                                >
                                    🤖 AI/ML Project
                                </button>
                            </div>
                        </div>
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
