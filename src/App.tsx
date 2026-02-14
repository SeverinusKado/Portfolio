import { useEffect } from "react";
import { motion } from "framer-motion";
import { NeuralNetwork } from "./components/NeuralNetwork.js";
import { CustomCursor } from "./components/CustomCursor.js";
import { Hero } from "./components/Hero.js";
import { ContactZone } from "./components/ContactZone.js";
import { ProjectCard } from "./components/ProjectCard.js";
import { SkillOrb } from "./components/SkillOrb.js";

export default function App() {
    useEffect(() => {
        document.body.style.cursor = "none";
        return () => {
            document.body.style.cursor = "auto";
        };
    }, []);

    const projects = [
        {
            title: "Online Blood Donation System",
            description:
                "Web application that simplifies donor registration, hospital coordination, and emergency blood requests.",
            tags: ["PHP", "Laravel", "MySQL"],
        },
        {
            title: "MedNow App",
            description:
                "Mobile-first emergency assistance app using AI and GPS to provide first aid guidelines and locate nearest hospitals.",
            tags: ["Java", "AI", "GeoLocation"],
        },
        {
            title: "Smart Home Intrusion & Fire Detection System",
            description:
                "Arduino-based IoT system integrating motion and fire sensors with GSM alerts for real-time home protection.",
            tags: ["Arduino", "IoT", "GSM"],
        },
        {
            title: "Therapy Tracker",
            description:
                "Web app that allows kids with cerebral palsy to track their therapy sessions.",
            tags: ["TypeScript", "JavaScript", "Firebase"],
        },
    ];

    const skills = [
        { skill: "React", level: 4 },
        { skill: "React Native", level: 4 },
        { skill: "TypeScript", level: 5 },
        { skill: "SQL", level: 5 },
        { skill: "PHP", level: 5 },
        { skill: "Laravel", level: 4 },
        { skill: "UI/UX", level: 5 },
        { skill: "AI/ML", level: 2 },
        { skill: "Web3", level: 3 },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground relative">
            {/* Background effects */}
            <NeuralNetwork />
            <CustomCursor />

            {/* Hero Section */}
            <section className="relative z-10">
                <Hero />
            </section>

            {/* Projects Section */}
            <section id="projects"
                className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl mb-4">
                            Featured <span className="text-cyan-400">Projects</span>
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl">
                            A few of the ideas and systems I've brought to life.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <ProjectCard {...project} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills & Connect Section */}
            <section id="connect"
                     className="relative py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-6xl mb-4">
                            Skill <span className="text-cyan-400">Set</span>
                        </h2>
                        <p className="text-gray-400 text-lg md:text-xl">
                            Hover over the orbs to uncover my proficiency levels.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 max-w-4xl mx-auto">
                        {skills.map((skill, index) => (
                            <SkillOrb key={index} {...skill} delay={index * 0.05} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <ContactZone />

            {/* Footer */}
            <footer className="relative border-t border-gray-800 py-8 mt-20">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
                    <div className="mb-4">
                        <span className="text-cyan-400">Severinus Kado</span> © 2026
                    </div>
                    <div className="text-sm">
                        Built with React, Motion, and a passion for immersive experiences
                    </div>
                </div>
            </footer>
        </div>
    );
}
