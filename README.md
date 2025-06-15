# 🛠️ MVP Generator – From Idea to App in Minutes

**MVP Generator** is a SaaS platform that turns simple startup ideas into structured, AI-enhanced MVPs. Whether you're a founder, student, or entrepreneur, just describe your idea — and get back a working project structure with a landing page, authentication, and a basic database plan.

---

## 🚀 Features

- 💡 Describe your startup idea in a single sentence
- 🤖 AI-enhanced output using Gemini for project expansion
- 🧱 Generates:
  - Product Summary
  - Key MVP Features
  - Landing Page Content
  - Authentication Flow
  - Minimal Database Schema
- 💬 Chat-like UI to interact with the system and see revisions
- 🔐 Auth system with secure sign-up and login
- 📚 All project ideas and chat threads stored in the database
- 📂 Dashboard to view, continue, or start new projects

---

## 📸 Preview

> _Add screenshots here once available_  
> Suggested: Landing Page • Auth Page • Idea Input Chat • Build Dashboard

---

## 🏗️ Tech Stack

| Category        | Tools Used                       |
|----------------|----------------------------------|
| Frontend       | React, Tailwind CSS, ShadCN UI   |
| Backend        | Supabase (Database, Auth, Realtime) |
| AI Integration | Gemini API (Google)              |
| Routing        | Next.js App Router               |
| Deployment     | Vercel (planned)                 |

---

## 🧠 How It Works

1. **User signs in** via Supabase Auth.
2. **Clicks “New Project”** to start a new idea session.
3. **Enters a simple idea** like “a job board for remote developers.”
4. The app **enhances the idea** using Gemini API and returns a full MVP spec.
5. Enhanced content is **saved in Supabase** and shown in a chat-style UI.
6. User can **return to previous ideas**, refine them, or export results.

---

## 📁 Project Structure

.
├── app/
│ ├── build/ # Project dashboard + chat history
│ ├── signin/ # Auth pages (login/signup)
│ ├── new-project/ # Chat input for project idea
│ └── api/ # API routes (Gemini, DB ops)
├── lib/ # Supabase client and utility functions
├── components/ # Reusable UI components (Buttons, Cards, etc.)
└── README.md


---

## 💬 Sample Prompt & Output

**Prompt:**
> A mobile app to track plant growth and watering schedules

**AI-Enhanced Output:**
- **Product Summary:** A personal plant care assistant for hobbyists and botanists.
- **Features:** Plant profiles, watering reminders, growth tracking, community tips.
- **Auth:** Email-based login
- **DB Schema:** users, plants, reminders, logs
- **Pages:** Home, Dashboard, Add Plant, Profile

---

## 🔮 Planned Features

- Export MVP as downloadable boilerplate code
- Deploy MVP to live URL via Vercel
- Real-time collaboration (share with teammates)
- UI themes and project templates
- GPT/Vision integration for logo/image generation (future)

---

## 🧑‍💻 Author

**Haswanth**  
Student, Indie Hacker, and Builder  
GitHub: [@yourusername](https://github.com/yourusername)  
Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

## 📄 License

Licensed under the [MIT License](LICENSE).

---

> Built to empower makers. Start with just an idea.
