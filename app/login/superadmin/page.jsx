"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./superadmin-login.module.css";
import { api } from "../../utils/api";

export default function SuperAdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Trim inputs to avoid accidental spaces
      const payload = {
        email: email.trim(),
        password: password.trim(),
      };

      console.log("Attempting Super Admin login:", payload);

      // Call the adminLogin API
      const response = await api.adminLogin(payload);

      console.log("Login Successful:", response);

      if (response?.token) {
        // Save token under adminToken
        localStorage.setItem("adminToken", response.token);
        // Redirect to Super Admin Dashboard
        router.push("/dashboard/admin");
      }
    } catch (err) {
      console.error("Login error:", err);

      // Axios errors may have nested response
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Invalid Super Admin credentials";

      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Super Admin Login</h1>
          <p className={styles.subtitle}>
            Please sign in to manage the platform.
          </p>
        </div>

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="admin@wishzapp.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p
              style={{
                color: "red",
                fontSize: "0.875rem",
                textAlign: "center",
                marginBottom: "1rem",
              }}
            >
              {error}
            </p>
          )}

          <button type="submit" disabled={isLoading} className={styles.button}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.linkContainer}>
          <Link href="/" className={styles.link}>
            &larr; Back to Home
          </Link>
          <Link href="/forgot-password" className={styles.link}>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
