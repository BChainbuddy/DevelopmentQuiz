# Development Quiz (DevQuiz)

**Live Demo**: [https://developmentquiz.vercel.app/](https://developmentquiz.vercel.app/)

DevQuiz is a web-based multiple-choice quiz game that tests your knowledge of web development. Log in with your Gmail account, pick the correct answers to randomly generated questions, track your wins and losses, and see how you rank against other players.

---

## Overview

DevQuiz dynamically generates questions on web development using the **ChatGPT API**, ensuring each game provides a new learning experience. You can sign in securely using Google (Gmail) authentication, and all your game progress—like wins, losses, and rank—is maintained in a PostgreSQL database via **Prisma** ORM.

---

## Key Features

1. **Dynamic Web Dev Questions**

   - Powered by the ChatGPT API (OpenAI).
   - Each round offers a unique multiple-choice question with three possible answers.

2. **Win/Loss Tracking**

   - Correct answers grant you a **win**.
   - Incorrect answers result in a **loss**.
   - Stats (wins, losses, ratio) are displayed on your profile.

3. **User Profiles**

   - Access your personal profile at `/profile` to view your records (wins, losses, ratio).
   - Toggle public or private mode—only public profiles appear on the leaderboard.
   - Logout functionality is available here.

4. **Leaderboard**

   - Check out the top 100 public players at `/leaderboard`.
   - Ranks are assigned by comparing player wins/losses.
   - Leaderboard is visible only for **public** profiles.

5. **Security**

   - **Gmail Login** (via NextAuth) ensures secure sign-in.
   - Middleware restricts all main routes (`/game`, `/profile`, `/leaderboard`) to logged-in users only.

6. **Game Flow**

   - Navigate to `/game` to start playing.
   - You have one question per round, displayed with three possible answers.
   - Once you select your answer, the quiz updates your win or loss count immediately.
   - Proceed to the next round whenever you’re ready.

7. **Persistent Data**
   - Uses **Prisma** connected to a **PostgreSQL** database (hosted on NILE).
   - Your stats, leaderboard rankings, and profile preferences are all stored server-side.

---

## App Structure

- **`/game`**  
  The main quiz interface. Each session gives you a new web dev question (multiple choice).

- **`/profile`**  
  View your personal statistics: total wins, losses, and win/loss ratio. Toggle your profile’s visibility (public or private). Logout here if desired.

- **`/leaderboard`**  
  Displays the top 100 public players, ranked by performance. Public users also see their own rank if they appear on the leaderboard.

---

## Technologies Used

- **Next.js 14**  
  App Router-based project with client/server components and API routes.
- **Prisma**  
  ORM connecting to a **PostgreSQL** database (NILE-hosted).
- **NextAuth**  
  Secure authentication using Gmail (Google) as the provider.
- **ChatGPT API**  
  Generates unique web development questions and answers.
- **Vercel**  
  Deployment for the production environment.

---

## Live Demo

Visit **[DevQuiz](https://developmentquiz.vercel.app/)** and sign in with your Gmail account to start playing. You’ll be able to:

1. Test your web dev knowledge through dynamically generated questions.
2. Track your wins, losses, and ratio in your profile.
3. Compare results on the leaderboard if your profile is public.

---

## Additional Notes

- **User Experience**: Emphasizes quick, fun rounds with immediate feedback on answers.
- **Data Privacy**: Only the username, win/loss stats, and rank for **public** users are shown on the leaderboard.
- **Future Improvements**: Potentially adding difficulty levels, broader question topics, or real-time competition modes.

---

**Enjoy Development Quiz (DevQuiz)** and sharpen your web dev skills in a playful, competitive environment!
