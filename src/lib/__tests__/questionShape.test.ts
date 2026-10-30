import { describe, expect, it } from "vitest";
import { isValidQuestion, validateQuestion } from "../questionShape";

const valid = {
  question: "What does the JavaScript event loop do?",
  answers: ["Schedules callbacks", "Compiles bytecode", "Allocates the heap"],
  correctAnswer: "A",
};

describe("validateQuestion", () => {
  it("accepts a well-formed question", () => {
    expect(validateQuestion(valid)).toEqual([]);
    expect(isValidQuestion(valid)).toBe(true);
  });

  it.each([
    ["too many answers", { ...valid, answers: ["a", "b", "c", "d"] }, /exactly 3 entries, got 4/],
    ["too few answers", { ...valid, answers: ["a", "b"] }, /exactly 3 entries, got 2/],
    ["duplicate answers", { ...valid, answers: ["a", "A", "c"] }, /must be distinct/],
    ["empty answer", { ...valid, answers: ["a", "", "c"] }, /non-empty string/],
    ["non-string answer", { ...valid, answers: ["a", 2, "c"] }, /non-empty string/],
    ["answers not an array", { ...valid, answers: "a,b,c" }, /must be an array of 3 strings/],
    ["letter out of range", { ...valid, correctAnswer: "D" }, /exactly one of A, B, C/],
    ["lowercase letter", { ...valid, correctAnswer: "b" }, /exactly one of A, B, C/],
    ["blank question", { ...valid, question: "   " }, /"question" must be a non-empty string/],
    ["missing question", { answers: ["a", "b", "c"], correctAnswer: "A" }, /"question" must be/],
    ["not an object", null, /is not an object/],
  ])("rejects %s", (_label, input, expected) => {
    const problems = validateQuestion(input);
    expect(problems.length).toBeGreaterThan(0);
    expect(problems.join(" ")).toMatch(expected);
    expect(isValidQuestion(input)).toBe(false);
  });

  it("reports every independent problem at once, so one repair turn can fix all of them", () => {
    const problems = validateQuestion({
      question: "",
      answers: ["a", "b"],
      correctAnswer: "Z",
    });
    expect(problems).toHaveLength(3);
  });

  it("labels the question number when validating a batch", () => {
    expect(validateQuestion({ ...valid, correctAnswer: "D" }, 4).join(" ")).toContain(
      "(question 5)"
    );
    // No label for a single-question request.
    expect(validateQuestion({ ...valid, correctAnswer: "D" }).join(" ")).not.toContain(
      "question 1"
    );
  });
});
