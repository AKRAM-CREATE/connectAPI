ConnectApi – Full Stack Web Chatting App

ConnectApi is a full-stack real-time web chat application built with React on the frontend and ASP.NET Core REST API + SignalR on the backend. 
This application allows users to communicate seamlessly in real-time with features like message storage, notifications, and user search.

frontend/: React app handling the user interface, login/logout, chat UI, notifications, and message display.
backend/: ASP.NET Core REST API with SignalR hub to manage real-time messaging and store messages in SQL Server.


Features

User Authentication: Users can log in and log out.

Real-Time Chat: Messages are sent instantly between users using SignalR.

Message History: All messages are stored in SQL Server, allowing users to see past conversations.

Unread Messages: Users receive all unread messages after logging back in.

User Search: Easily find other users to start a conversation.

Notifications: Receive sound notifications for new incoming messages.

Full Stack: React frontend + ASP.NET Core REST API backend with live SignalR connections.


Database

All chat messages and user data are stored in SQL Server.

Messages are persisted so users can access their history after logging out and back in.

Tables include:

Users

Messages (sender, receiver, timestamp, read/unread status)


Notifications

Sound alerts for new messages.

Real-time updates ensure users never miss a chat.

🔗 Technologies Used

Frontend: React, React Router, Tailwind CSS

Backend: ASP.NET Core, SignalR, REST API

Database: SQL Server

Real-Time Communication: SignalR

📌 How It Works

User logs in and connects to the SignalR hub.

Users can search for other users and start conversations.

Messages are sent in real-time via SignalR.

Messages are saved in SQL Server.

Unread messages are fetched upon login.

New messages trigger sound notifications.

