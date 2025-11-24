import React from "react";
import {
  PackagePlus,
  Trash2,
  UserCog,
  UserSearch,
  BarChart3,
  CalendarDays,
  CalendarRange,
  Globe,
} from "lucide-react";

export type AdminModalType =
  | "addProduct"
  | "deleteProduct"
  | "modifyUser"
  | "viewUser"
  | "monthlyBusiness"
  | "dailyBusiness"
  | "yearlyBusiness"
  | "overallBusiness";

export interface AdminCard {
  type: AdminModalType;
  title: string;
  description: string;
  team: string;
  gradient: string;
  icon: React.ComponentType<{ className?: string }>;
}

const adminCards: AdminCard[] = [
  {
    type: "addProduct",
    title: "Add Product",
    description: "Create a new product listing with pricing and inventory.",
    team: "Inventory Ops",
    icon: PackagePlus,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    type: "deleteProduct",
    title: "Delete Product",
    description: "Remove outdated or unavailable products from catalog.",
    team: "Inventory Ops",
    icon: Trash2,
    gradient: "from-rose-500 to-red-500",
  },
  {
    type: "modifyUser",
    title: "Modify User",
    description: "Update user profiles, access levels, and credentials.",
    team: "Customer Success",
    icon: UserCog,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    type: "viewUser",
    title: "View User Details",
    description: "Quickly view specific user information and roles.",
    team: "Customer Success",
    icon: UserSearch,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    type: "monthlyBusiness",
    title: "Monthly Business",
    description: "Analyze revenue for any month and year combination.",
    team: "Finance",
    icon: CalendarRange,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    type: "dailyBusiness",
    title: "Daily Business",
    description: "Track performance and volume for any specific day.",
    team: "Finance",
    icon: CalendarDays,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    type: "yearlyBusiness",
    title: "Yearly Business",
    description: "Review annual revenue trends and KPIs.",
    team: "Finance",
    icon: BarChart3,
    gradient: "from-slate-500 to-gray-700",
  },
  {
    type: "overallBusiness",
    title: "Overall Business",
    description: "Get a snapshot of total revenue since inception.",
    team: "Executive",
    icon: Globe,
    gradient: "from-teal-500 to-lime-500",
  },
];

export default adminCards;

