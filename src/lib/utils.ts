import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Performance optimization utilities
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Local storage utilities with error handling
export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  },
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Silently fail if localStorage is not available
    }
  },
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch {
      // Silently fail if localStorage is not available
    }
  },
}

// Date formatting utilities
export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

export function formatDateTime(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[6-9]\d{9}$/
  return phoneRegex.test(phone.replace(/\D/g, ''))
}

// String utilities
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str
}

// Petition-specific utilities
export function generatePetitionNumber(): string {
  const date = new Date();
  const year = 2025; // Fixed to 2025 as per requirements
  
  // In a real app, this would fetch the last petition number from the database
  // For demo purposes, we'll use a random number
  const count = Math.floor(Math.random() * 1000) + 1;
  
  return `PTN${count.toString().padStart(5, '0')}/${year}`;
}

// Generate a user ID based on name and designation
export function generateUserId(name: string, designation: string): string {
  const firstName = name.split(' ')[0];
  return `${firstName}/${designation}`;
}

// Get a random item from an array
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
