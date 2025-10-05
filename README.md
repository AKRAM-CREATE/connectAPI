🌐 ConnectApi – Full Stack Web Chatting App 💬

ConnectApi is a full-stack real-time web chat application built with React on the frontend and ASP.NET Core REST API + SignalR on the backend.
It allows users to communicate seamlessly in real-time with features like message storage, notifications, and user search.

📁 Project Structure
frontend/  🖥️  → React app handling UI, login/logout, chat UI, notifications, and message display
backend/   ⚡  → ASP.NET Core REST API with SignalR hub for real-time messaging and SQL Server storage

✨ Features

🔐 User Authentication: Users can log in and log out.

⚡ Real-Time Chat: Messages are sent instantly using SignalR.

📝 Message History: All messages are stored in SQL Server for easy access.

📩 Unread Messages: Users receive all unread messages after logging back in.

🔍 User Search: Quickly find other users to start a conversation.

🔔 Notifications: Sound alerts for new incoming messages.

💻 Full Stack: React frontend + ASP.NET Core REST API backend with live SignalR connections.

💾 Database

All chat messages and user data are stored in SQL Server.

Messages are persisted so users can access chat history after logging out and back in.

Key tables:

Users

Messages (sender, receiver, timestamp, read/unread status)

🔔 Notifications

Sound alerts for new messages.

Real-time updates ensure users never miss a chat.

🛠️ Technologies Used

Frontend: React, React Router, Tailwind CSS 🖌️

Backend: ASP.NET Core, SignalR, REST API ⚡

Database: SQL Server 🗄️

Real-Time Communication: SignalR 🔗

📌 How It Works

Login: User logs in and connects to the SignalR hub 🔑

Search & Chat: Users search for others and start conversations 🔍💬

Real-Time Messaging: Messages are sent instantly via SignalR ⚡

Storage: Messages are saved in SQL Server 📝

Unread Messages: Any unread messages are fetched upon login 📩

Notifications: New messages trigger sound alerts 🔔


