/*
 * File: app/login/page.jsx
 * FIXED: Saves token as 'vendorToken' so the API can find it.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";
import { api } from "../utils/api";

export default function LoginPage() {
  const router = useRouter();

  // Default to 'vendor' so you don't have to click the tab every time
  const [role, setRole] = useState("vendor");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (role === "vendor") {
        const response = await api.vendorLogin({ email, password });
        localStorage.setItem("vendorToken", response.token);
        localStorage.setItem("role", "vendor");
        router.push("/vendor-dashboard");
      } else if (role === "superadmin") {
        const response = await api.adminLogin({ email, password });
        if (response?.token) {
          localStorage.setItem("adminToken", response.token);
          localStorage.setItem("role", "superadmin");
          router.push("/dashboard");
        } else {
          throw new Error("Login successful but no token received!");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(
        "Login Failed: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            {role === "vendor" ? "Vendor Login" : "Super Admin"}
          </h1>
          <p className={styles.subtitle}>Sign in to manage your store</p>
        </div>

        {/* Role Toggles */}
        <div className={styles.tabContainer}>
          <button
            type="button"
            className={`${styles.tab} ${
              role === "vendor" ? styles.activeTab : ""
            }`}
            onClick={() => setRole("vendor")}
          >
            Vendor
          </button>
          <button
            type="button"
            className={`${styles.tab} ${
              role === "superadmin" ? styles.activeTab : ""
            }`}
            onClick={() => setRole("superadmin")}
          >
            Super Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder={
                role === "vendor" ? "vendor@store.com" : "admin@platform.com"
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={isLoading} className={styles.button}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {role === "vendor" && (
          <p className={styles.registerText}>
            Not a vendor yet?{" "}
            <Link href="/register/admin" className={styles.registerLink}>
              Register Here
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
