require("dotenv").config();

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");

const Exam = require("../models/Exam");
const Subject = require("../models/Subject");
const Question = require("../models/Question");

const MONGO_URI = process.env.MONGO_URI;

async function seedQuestions() {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("✅ MongoDB Connected");

        const questions = [];

        fs.createReadStream(
            path.join(__dirname, "../question.csv")
        )
            .pipe(csv())
            .on("data", (row) => {
                questions.push(row);
            })
            .on("end", async () => {

                let inserted = 0;
                let skipped = 0;

                for (const row of questions) {

                    try {

                        const exam = await Exam.findOne({
                            name: row.exam.trim(),
                            isActive: true,
                        });

                        if (!exam) {
                            console.log(
                                `❌ Exam not found: ${row.exam}`
                            );
                            skipped++;
                            continue;
                        }

                        const subject = await Subject.findOne({
                            exam: exam._id,
                            name: row.subject.trim(),
                            isActive: true,
                        });

                        if (!subject) {
                            console.log(
                                `❌ Subject not found: ${row.subject} (${row.exam})`
                            );
                            skipped++;
                            continue;
                        }

                        const exists = await Question.findOne({
                            question: row.question.trim(),
                            subject: subject._id,
                        });

                        if (exists) {
                            console.log(
                                `⏩ Skipped Duplicate: ${row.question}`
                            );
                            skipped++;
                            continue;
                        }

                        await Question.create({
                            question: row.question.trim(),

                            options: [
                                row.option1.trim(),
                                row.option2.trim(),
                                row.option3.trim(),
                                row.option4.trim(),
                            ],

                            correctAnswer:
                                row.correctAnswer.trim(),

                            subject: subject._id,

                            difficulty:
                                row.difficulty.trim(),

                            explanation:
                                row.explanation?.trim() || "",
                        });

                        console.log(
                            `✅ Added: ${row.question}`
                        );

                        inserted++;

                    } catch (error) {

                        console.log(
                            `❌ Failed: ${row.question}`
                        );

                        console.error(error.message);

                        skipped++;
                    }
                }

                console.log("\n===========================");
                console.log(`Inserted : ${inserted}`);
                console.log(`Skipped  : ${skipped}`);
                console.log("===========================");

                console.log(
                    "\n🎉 Question seeding completed."
                );

                mongoose.disconnect();

            });

    } catch (error) {

        console.error(error);

        process.exit(1);

    }
}

seedQuestions();