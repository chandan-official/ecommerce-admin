/*
 * File: app/vendor-dashboard/support/page.jsx
 * This is the Vendor's "Support Chat" page.
 */

'use client'; 

import { useState } from 'react';
import styles from './support.module.css';
import { Send, User } from 'lucide-react';

// --- Placeholder Data ---
// Your friend will replace this with real-time chat data
const chatMessages = [
  { id: 1, sender: "admin", text: "Hi! This is Super Admin Support. How can I help you with your account today?" },
  { id: 2, sender: "vendor", text: "Hi, my last payout seems to be delayed." },
  { id: 3, sender: "admin", text: "I'm sorry to hear that. Let me look up your account. One moment..." },
];
// --- End Placeholder Data ---


export default function VendorSupportPage() {
  
  // State for the message input
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    console.log("Sending message to Super Admin:", newMessage);
    // Your friend will add backend logic here to send the message
    
    // This is just a placeholder to clear the input
    setNewMessage(''); 
  };

  return (
    <div>
      <h1 className={styles.title}>Contact Support</h1>
      <p className={styles.subtitle}>
        Have a question about payouts, products, or your account? Chat with a Super Admin live.
      </p>

      {/* --- Main Chat Window --- */}
      <div className={styles.chatWindow}>
        
        {/* Chat Header */}
        <header className={styles.chatWindowHeader}>
          <User size={22} />
          <h3 className={styles.chatWindowTitle}>Chat with Super Admin</h3>
        </header>

        {/* Message Area */}
        <div className={styles.messageArea}>
          {/* Loop through messages */}
          {chatMessages.map((msg) => (
            <div 
              key={msg.id}
              // Apply 'admin' or 'vendor' style
              className={msg.sender === 'admin' ? styles.admin : styles.vendor}
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
              placeholder="Type your message to support..."
            />
            <button type="submit" className={styles.sendButton}>
              <Send size={18} />
            </button>
          </form>
        </footer>

      </div>
    </div>
  );
}