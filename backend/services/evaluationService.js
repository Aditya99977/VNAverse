const evaluateAnswers = (questions, submittedAnswers) => {
    const answerMap = new Map();

    submittedAnswers.forEach((answer) => {
        answerMap.set(String(answer.questionId), answer.selectedAnswer);
    });

    const result = {
        totalQuestions: questions.length,
        attemptedQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        skippedQuestions: 0,
        score: 0,
        accuracy: 0,
        answers: [],
    };

    questions.forEach((question) => {
        const selectedAnswer = answerMap.get(String(question._id)) ?? null;
        const correctAnswer = question.correctAnswer;

        let status = "skipped";

        if (selectedAnswer === null || selectedAnswer === "") {
            result.skippedQuestions++;
        } else {
            result.attemptedQuestions++;

            if (selectedAnswer === correctAnswer) {
                status = "correct";
                result.correctAnswers++;
                result.score++;
            } else {
                status = "wrong";
                result.wrongAnswers++;
            }
        }

        result.answers.push({
            questionId: question._id,
            selectedAnswer,
            correctAnswer,
            isCorrect: status === "correct",
            status,
        });
    });

    result.accuracy =
        result.attemptedQuestions === 0
            ? 0
            : Number(
                  (
                      (result.correctAnswers / result.attemptedQuestions) *
                      100
                  ).toFixed(2)
              );

    return result;
};

module.exports = {
    evaluateAnswers,
};