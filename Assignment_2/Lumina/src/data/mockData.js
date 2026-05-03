// mock data

export const subjects = [
  {
    id: "1",
    name: "DIS 303",
    icon: "calculator",
    color: "#00D4B4",
    tasks: 5,
    completed: 3,
  },
  {
    id: "2",
    name: "SWE 201",
    icon: "flask",
    color: "#8B5CF6",
    tasks: 8,
    completed: 5,
  },
  {
    id: "3",
    name: "SDA 202",
    icon: "laptop-code",
    color: "#10E68B",
    tasks: 12,
    completed: 9,
  },
  {
    id: "4",
    name: "CTE 205",
    icon: "book-open",
    color: "#F472B6",
    tasks: 4,
    completed: 1,
  },
  {
    id: "5",
    name: "DSO 101",
    icon: "atom",
    color: "#FBBF24",
    tasks: 6,
    completed: 4,
  },
];

export const tasks = [
  {
    id: "1",
    title: "Lab Report - AES Encryption",
    subject: "DIS 303",
    due: "Today",
    done: false,
    priority: "high",
  },
  {
    id: "2",
    title: "Lab Report - Cross Platform Development",
    subject: "SWE 201",
    due: "Tomorrow",
    done: false,
    priority: "high",
  },
  {
    id: "3",
    title: "UML Diagrams - Software Design",
    subject: "SDA 202",
    due: "Wed",
    done: false,
    priority: "medium",
  },
  {
    id: "4",
    title: "Assignment 1 - CPU Scheduling",
    subject: "CTE 205",
    due: "Fri",
    done: false,
    priority: "low",
  },
  {
    id: "5",
    title: "Titration Experiment Notes",
    subject: "Chemistry",
    due: "Thu",
    done: false,
    priority: "medium",
  },
  {
    id: "6",
    title: "Timeline — Industrial Rev.",
    subject: "History",
    due: "Next Mon",
    done: true,
    priority: "low",
  },
];

export const weeklyHours = [2.5, 4, 3, 5.5, 4, 6, 2];
export const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

export const streakData = {
  current: 14,
  best: 21,
  todayDone: false,
};

export const quotes = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar",
  },
];
