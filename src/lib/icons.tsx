import {
  Banknote, Wallet, Home, Briefcase, TrendingUp, Gift, BarChart2,
  Landmark, CreditCard, ShoppingCart, Fuel, Zap, Utensils, Film,
  Activity, Shirt, BookOpen, Car, Plane, Laptop, ShoppingBag, Sparkles,
  Shield, GraduationCap, Receipt, Wrench, Tv, Calendar, Clipboard,
  Users, Pencil, CheckCircle, AlertTriangle, FileText, Building2,
  type LucideProps,
} from 'lucide-react';
import type { FC } from 'react';

export const iconMap: Record<string, FC<LucideProps>> = {
  // Income / expense categories
  'banknote':      Banknote,
  'wallet':        Wallet,
  'home':          Home,
  'briefcase':     Briefcase,
  'trending-up':   TrendingUp,
  'gift':          Gift,
  'bar-chart':     BarChart2,
  'landmark':      Landmark,
  'credit-card':   CreditCard,
  'shopping-cart': ShoppingCart,
  'fuel':          Fuel,
  'zap':           Zap,
  'utensils':      Utensils,
  'film':          Film,
  'activity':      Activity,
  'shirt':         Shirt,
  'book-open':     BookOpen,
  'car':           Car,
  'plane':         Plane,
  'laptop':        Laptop,
  'shopping-bag':  ShoppingBag,
  'sparkles':      Sparkles,
  // Schedule categories
  'shield':           Shield,
  'graduation-cap':   GraduationCap,
  'receipt':          Receipt,
  'wrench':           Wrench,
  'tv':               Tv,
  'calendar':         Calendar,
  'clipboard':        Clipboard,
  'building':         Building2,
  // UI
  'users':            Users,
  'pencil':           Pencil,
  'check-circle':     CheckCircle,
  'alert-triangle':   AlertTriangle,
  'file-text':        FileText,
};

/** Renders a named Lucide icon. Falls back to a neutral circle if name not found. */
export function AppIcon({ name, className = 'w-5 h-5' }: { name?: string; className?: string }) {
  if (!name) return <Banknote className={className} />;
  const Icon = iconMap[name];
  if (!Icon) return <Banknote className={className} />;
  return <Icon className={className} />;
}

/** Ordered list used in icon pickers. */
export const pickerIcons: string[] = [
  'banknote', 'wallet', 'home', 'briefcase', 'trending-up',
  'gift', 'bar-chart', 'landmark', 'credit-card', 'shopping-cart',
  'fuel', 'zap', 'utensils', 'film', 'activity',
  'shirt', 'book-open', 'car', 'plane', 'laptop',
  'shopping-bag', 'sparkles', 'shield', 'graduation-cap', 'receipt',
  'wrench', 'tv', 'building', 'users', 'file-text',
];
