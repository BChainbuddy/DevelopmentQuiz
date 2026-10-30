/**
 * Shared question shape + validator.
 *
 * Lives in its own module so the server (openai.ts) and the client pages can
 * both validate without the client pulling axios / server env into its bundle.
 */

export const ANSWER_CHOICES = ["A", "B", "C"] as const;

export type AnswerChoice = (typeof ANSWER_CHOICES)[number];

export type QuizQuestion = {
  question: string;
  answers: string[];
  correctAnswer: AnswerChoice;
};

/**
 * Returns a list of human-readable problems with `item`, empty if it is valid.
 * The strings are fed back to the model verbatim by the repair loop, so they
 * should read as instructions, not as internal error codes.
 */
export function validateQuestion(item: unknown, index?: number): string[] {
  const at = index === undefined ? "" : ` (question ${index + 1})`;
  const problems: string[] = [];

  if (typeof item !== "object" || item === null) {
    return [`Entry${at} is not an object.`];
  }

  const { question, answers, correctAnswer } = item as Record<string, unknown>;

  if (typeof question !== "string" || question.trim() === "") {
    problems.push(`"question"${at} must be a non-empty string.`);
  }

  if (!Array.isArray(answers)) {
    problems.push(`"answers"${at} must be an array of 3 strings.`);
  } else {
    // The JSON schema cannot pin array length (minItems/maxItems are not part
    // of the structured-outputs schema subset), so this stays a runtime check.
    if (answers.length !== 3) {
      problems.push(
        `"answers"${at} must contain exactly 3 entries, got ${answers.length}.`
      );
    }
    if (answers.some((a) => typeof a !== "string" || a.trim() === "")) {
      problems.push(`every entry in "answers"${at} must be a non-empty string.`);
    }
    if (new Set(answers.map((a) => String(a).toLowerCase())).size !== answers.length) {
      problems.push(`the entries in "answers"${at} must be distinct.`);
    }
  }

  if (!ANSWER_CHOICES.includes(correctAnswer as AnswerChoice)) {
    problems.push(
      `"correctAnswer"${at} must be exactly one of ${ANSWER_CHOICES.join(", ")}.`
    );
  }

  return problems;
}

export function isValidQuestion(item: unknown): item is QuizQuestion {
  return validateQuestion(item).length === 0;
}
