require("dotenv").config();
const mongoose = require("mongoose");

const Exam = require("../models/Exam");
const Subject = require("../models/Subject");

const MONGO_URI = process.env.MONGO_URI;

const subjectData = {
  "ibps-clerk": [
    {
      name: "Quantitative Aptitude",
      slug: "quantitative-aptitude",
      icon: "calculator",
      color: "#3B82F6",
      order: 1,
    },
    {
      name: "Reasoning Ability",
      slug: "reasoning-ability",
      icon: "brain",
      color: "#8B5CF6",
      order: 2,
    },
    {
      name: "English Language",
      slug: "english-language",
      icon: "languages",
      color: "#10B981",
      order: 3,
    },
    {
      name: "General Awareness",
      slug: "general-awareness",
      icon: "globe",
      color: "#F59E0B",
      order: 4,
    },
    {
      name: "Computer Knowledge",
      slug: "computer-knowledge",
      icon: "computer",
      color: "#EF4444",
      order: 5,
    },
  ],

  "ibps-po": [
    {
      name: "Quantitative Aptitude",
      slug: "quantitative-aptitude",
      icon: "calculator",
      color: "#3B82F6",
      order: 1,
    },
    {
      name: "Reasoning Ability",
      slug: "reasoning-ability",
      icon: "brain",
      color: "#8B5CF6",
      order: 2,
    },
    {
      name: "English Language",
      slug: "english-language",
      icon: "languages",
      color: "#10B981",
      order: 3,
    },
    {
      name: "Banking Awareness",
      slug: "banking-awareness",
      icon: "landmark",
      color: "#F59E0B",
      order: 4,
    },
    {
      name: "Computer Aptitude",
      slug: "computer-aptitude",
      icon: "computer",
      color: "#EF4444",
      order: 5,
    },
  ],

  "sbi-clerk": [
    {
      name: "Quantitative Aptitude",
      slug: "quantitative-aptitude",
      icon: "calculator",
      color: "#3B82F6",
      order: 1,
    },
    {
      name: "Reasoning Ability",
      slug: "reasoning-ability",
      icon: "brain",
      color: "#8B5CF6",
      order: 2,
    },
    {
      name: "English Language",
      slug: "english-language",
      icon: "languages",
      color: "#10B981",
      order: 3,
    },
    {
      name: "General Awareness",
      slug: "general-awareness",
      icon: "globe",
      color: "#F59E0B",
      order: 4,
    },
    {
      name: "Computer Knowledge",
      slug: "computer-knowledge",
      icon: "computer",
      color: "#EF4444",
      order: 5,
    },
  ],

  "sbi-po": [
    {
      name: "Quantitative Aptitude",
      slug: "quantitative-aptitude",
      icon: "calculator",
      color: "#3B82F6",
      order: 1,
    },
    {
      name: "Reasoning Ability",
      slug: "reasoning-ability",
      icon: "brain",
      color: "#8B5CF6",
      order: 2,
    },
    {
      name: "English Language",
      slug: "english-language",
      icon: "languages",
      color: "#10B981",
      order: 3,
    },
    {
      name: "Banking Awareness",
      slug: "banking-awareness",
      icon: "landmark",
      color: "#F59E0B",
      order: 4,
    },
    {
      name: "Computer Aptitude",
      slug: "computer-aptitude",
      icon: "computer",
      color: "#EF4444",
      order: 5,
    },
  ],

  "ssc-cgl": [
    {
      name: "Quantitative Aptitude",
      slug: "quantitative-aptitude",
      icon: "calculator",
      color: "#3B82F6",
      order: 1,
    },
    {
      name: "General Intelligence & Reasoning",
      slug: "general-intelligence-reasoning",
      icon: "brain",
      color: "#8B5CF6",
      order: 2,
    },
    {
      name: "English Comprehension",
      slug: "english-comprehension",
      icon: "languages",
      color: "#10B981",
      order: 3,
    },
    {
      name: "General Awareness",
      slug: "general-awareness",
      icon: "globe",
      color: "#F59E0B",
      order: 4,
    },
  ],

  "ssc-chsl": [
    {
      name: "General Intelligence",
      slug: "general-intelligence",
      icon: "brain",
      color: "#8B5CF6",
      order: 1,
    },
    {
      name: "English Language",
      slug: "english-language",
      icon: "languages",
      color: "#10B981",
      order: 2,
    },
    {
      name: "Quantitative Aptitude",
      slug: "quantitative-aptitude",
      icon: "calculator",
      color: "#3B82F6",
      order: 3,
    },
    {
      name: "General Awareness",
      slug: "general-awareness",
      icon: "globe",
      color: "#F59E0B",
      order: 4,
    },
  ],

  "rrb-ntpc": [
    {
      name: "Mathematics",
      slug: "mathematics",
      icon: "calculator",
      color: "#3B82F6",
      order: 1,
    },
    {
      name: "General Intelligence & Reasoning",
      slug: "general-intelligence-reasoning",
      icon: "brain",
      color: "#8B5CF6",
      order: 2,
    },
    {
      name: "General Awareness",
      slug: "general-awareness",
      icon: "globe",
      color: "#F59E0B",
      order: 3,
    },
  ],

  "rrb-group-d": [
    {
      name: "Mathematics",
      slug: "mathematics",
      icon: "calculator",
      color: "#3B82F6",
      order: 1,
    },
    {
      name: "General Intelligence & Reasoning",
      slug: "general-intelligence-reasoning",
      icon: "brain",
      color: "#8B5CF6",
      order: 2,
    },
    {
      name: "General Science",
      slug: "general-science",
      icon: "flask",
      color: "#10B981",
      order: 3,
    },
    {
      name: "General Awareness",
      slug: "general-awareness",
      icon: "globe",
      color: "#F59E0B",
      order: 4,
    },
  ],
};

async function seedSubjects() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    for (const examSlug of Object.keys(subjectData)) {
      const exam = await Exam.findOne({ slug: examSlug });

      if (!exam) {
        console.log(`⚠️ Exam not found: ${examSlug}`);
        continue;
      }

      for (const subject of subjectData[examSlug]) {
        const exists = await Subject.findOne({
          exam: exam._id,
          slug: subject.slug,
        });

        if (exists) {
          console.log(`⏩ Skipped: ${subject.name}`);
          continue;
        }

        await Subject.create({
          ...subject,
          exam: exam._id,
        });

        console.log(`✅ Added: ${subject.name}`);
      }
    }

    console.log("\n🎉 Subject seeding completed.");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedSubjects();