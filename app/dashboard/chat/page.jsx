/*
 * File: app/dashboard/chat/page.jsx
 * This is the Super Admin's "Live Chat" interface.
 */

'use client'; 

import { useState } from 'react';
import styles from './chat.module.css';
import { Send, User } from 'lucide-react';

// --- Placeholder Data ---
// Your friend will replace this with real-time data
const chatContacts = [
  { id: 1, name: "Rohan Sharma", preview: "Hi, my order #1024 is delayed...", status: "Online" },
  { id: 2, name: "Priya Singh", preview: "Do you have this in blue?", status: "Offline" },
  { id: 3, name: "Amit Patel", preview: "My coupon code isn't working.", status: "Online" },
];

const chatMessages = [
  { id: 1, sender: "customer", text: "Hi, my order #1024 is delayed. Can I get an update?" },
  { id: 2, sender: "admin", text: "Hi Rohan, let me check that for you right now." },
  { id: 3, sender: "admin", text: "I see it's currently at the Bangalore hub. It should be out for delivery tomorrow." },
  { id: 4, sender: "customer", text: "Okay, thank you!" },
];
// --- End Placeholder Data ---


export default function LiveChatPage() {
  
  // State to manage which chat is active
  const [activeChat, setActiveChat] = useState(chatContacts[0]);
  // State for the message input
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    console.log("Sending message:", newMessage);
    // Your friend will add backend logic here to send the message
    
    // This is just a placeholder to clear the input
    setNewMessage(''); 
  };

  return (
    <div className={styles.chatContainer}>
      
      {/* --- 1. Left Column: Chat List --- */}
      <aside className={styles.chatList}>
        <div className={styles.chatListHeader}>
          <h2 className={styles.chatListTitle}>Chat Queue</h2>
        </div>
        
        {/* Search Bar (optional) */}
        <div className={styles.chatListSearch}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Search contacts..." 
          />
        </div>

        {/* Contact List */}
        <div className={styles.contacts}>
          {chatContacts.map((contact) => (
            <div 
              key={contact.id}
              className={activeChat.id === contact.id ? styles.contactActive : styles.contact}
              onClick={() => setActiveChat(contact)}
            >
              <div className={styles.contactAvatar}>
                <User size={24} />
              </div>
              {/* --- THIS IS THE FIX --- */}
              {/* Changed "classNameS" to "className" */}
              <div className={styles.contactInfo}>
                <div className={styles.contactName}>{contact.name}</div>
                <div className={styles.contactPreview}>{contact.preview}</div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* --- 2. Right Column: Active Chat Window --- */}
      <main className={styles.chatWindow}>
        
        {/* Chat Header */}
        <header className={styles.chatWindowHeader}>
          <div className={styles.contactAvatar}>
            <User size={22} />
          </div>
          <h3 className={styles.chatWindowTitle}>{activeChat.name}</h3>
        </header>

        {/* Message Area */}
        <div className={styles.messageArea}>
          {/* Loop through messages */}
          {chatMessages.map((msg) => (
            <div 
              key={msg.id}
              // Apply 'admin' or 'customer' style
              className={msg.sender === 'admin' ? styles.admin : styles.customer}
            >
              <div className={styles.messageContent}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <footer className={styles.inputArea}>
          <form onSubmit={handleSendMessage} className={styles.inputForm}>
            <input 
              type="text"
              className={styles.input}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit" className={styles.sendButton}>
              <Send size={18} />
            </button>
          </form>
        </footer>

      </main>
    </div>
  );
}