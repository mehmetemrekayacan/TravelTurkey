/**
 * TravelTurkey - Badge Notification System
 * Manages badge counts for tab navigation
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BadgeContextType {
  badges: { [key: string]: number };
  setBadge: (tabName: string, count: number) => void;
  clearBadge: (tabName: string) => void;
  getBadge: (tabName: string) => number;
}

const BadgeContext = createContext<BadgeContextType | undefined>(undefined);

interface BadgeProviderProps {
  children: ReactNode;
}

export const BadgeProvider: React.FC<BadgeProviderProps> = ({ children }) => {
  const [badges, setBadges] = useState<{ [key: string]: number }>({
    PlansTab: 2, // Example: 2 new plans
    ProfileTab: 1, // Example: 1 notification
  });

  const setBadge = (tabName: string, count: number) => {
    setBadges(prev => ({
      ...prev,
      [tabName]: count,
    }));
  };

  const clearBadge = (tabName: string) => {
    setBadges(prev => ({
      ...prev,
      [tabName]: 0,
    }));
  };

  const getBadge = (tabName: string): number => {
    return badges[tabName] || 0;
  };

  return (
    <BadgeContext.Provider value={{ badges, setBadge, clearBadge, getBadge }}>
      {children}
    </BadgeContext.Provider>
  );
};

export const useBadge = (): BadgeContextType => {
  const context = useContext(BadgeContext);
  if (context === undefined) {
    throw new Error('useBadge must be used within a BadgeProvider');
  }
  return context;
};

// Hook for easy badge management
export const useBadgeCount = (tabName: string) => {
  const { getBadge, setBadge, clearBadge } = useBadge();

  return {
    count: getBadge(tabName),
    setCount: (count: number) => setBadge(tabName, count),
    clear: () => clearBadge(tabName),
    increment: () => setBadge(tabName, getBadge(tabName) + 1),
    decrement: () => {
      const current = getBadge(tabName);
      setBadge(tabName, Math.max(0, current - 1));
    },
  };
};
