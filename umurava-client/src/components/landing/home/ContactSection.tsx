"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSubmitMessage("Thank you! Your message has been sent successfully.");
            setFormData({ name: "", email: "", message: "" });
        } catch {
            setSubmitMessage("Sorry, there was an error sending your message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Have questions about our challenges or programs? We&apos;d love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Information Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-light rounded-full p-3">
                                    <Mail className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Email</h3>
                                    <p className="text-gray-600 dark:text-gray-300">career@umurava.com</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-light rounded-full p-3">
                                    <Phone className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Phone</h3>
                                    <p className="text-gray-600 dark:text-gray-300">+250 700 000 000</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
                            <div className="flex items-center mb-4">
                                <div className="bg-blue-light rounded-full p-3">
                                    <MapPin className="h-6 w-6 text-white" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Address</h3>
                                    <p className="text-gray-600 dark:text-gray-300">89 KG 14 Ave, Kigali, Rwanda</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Send us a Message</h3>
                            
                            {submitMessage && (
                                <div className={`mb-6 p-4 rounded-md ${
                                    submitMessage.includes('Thank you') 
                                        ? 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-400 border border-green-200 dark:border-green-800' 
                                        : 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800'
                                }`}>
                                    {submitMessage}
                                </div>
                            )}
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-blue-light transition-colors duration-200"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-blue-light transition-colors duration-200"
                                            placeholder="your.email@example.com"
                                        />
                                    </div>
                                </div>
                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-light focus:border-blue-light transition-colors duration-200"
                                        placeholder="Tell us about your inquiry..."
                                    />
                                </div>
                                
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-blue-light text-white py-3 px-6 rounded-md hover:bg-blue-dark focus:outline-none focus:ring-2 focus:ring-blue-light focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="h-5 w-5 mr-2" />
                                            Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}