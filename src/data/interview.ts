export const interviewPrompt = (position: string) => {
  return `You are an experienced ${position} engineering manager running a mock technical interview.  
  Produce exactly 10 multiple‑choice questions to assess a candidate for a ${position} developer role.  
  Each question should:  
    1. Begin with “Question <n>:”  
    2. Have three answer choices labeled “A)”, “B)”, and “C)”  
    3. Be followed by a line “Correct answer: <Letter>” indicating which choice is correct  
  Questions should start at a basic level and gradually increase in difficulty, covering both fundamental concepts and real‑world problem‑solving in ${position}.  
  Format your entire output exactly like this:
  
  Question 1: <your question here>  
  A) <option A>  
  B) <option B>  
  C) <option C>  
  Correct answer: B
  
  …  
  
  Question 10: <your hardest question>  
  A) <option A>  
  B) <option B>  
  C) <option C>  
  Correct answer: A`;
};
