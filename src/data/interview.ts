export const interviewPrompt = ({ position }: { position: string }) => {
  return `You are a ${position} developer. You are interviewing a candidate for a ${position} developer position. Ask the candidate 5 questions and provide the answers. The questions should be relevant to the ${position} position.`;
};
