import { Candidate } from "../types/Candidate";

const names = [
  "Aarav Sharma","Riya Verma","Aditya Singh","Neha Gupta","Rahul Yadav",
  "Sneha Kapoor","Karan Mehta","Pooja Singh","Amit Kumar","Anjali Mishra",
  "Vikas Patel","Priya Nair","Rohit Sharma","Kavya Reddy","Arjun Das",
  "Meera Iyer","Sahil Khan","Nisha Agarwal","Manish Tiwari","Simran Kaur",
  "Deepak Chauhan","Isha Jain","Yash Thakur","Divya Bansal","Harsh Vardhan",
  "Tanvi Joshi","Mohit Arora","Ritika Sinha","Akash Gupta","Shreya Paul",
  "Nitin Sharma","Payal Verma","Gaurav Singh","Komal Yadav","Varun Kapoor",
  "Alok Mishra","Ruchi Saxena","Sumit Kumar","Swati Singh","Ankit Verma",
  "Preeti Sharma","Ramesh Gupta","Sonal Jain","Ajay Yadav","Neeraj Singh",
  "Pankaj Kumar","Seema Verma","Vivek Mishra","Rekha Sharma","Tarun Gupta"
];

export const candidates: Candidate[] = names.map((name, index) => ({
  id: index + 1,
  name,
  college: ["IIT Delhi", "NIT Trichy", "DTU", "BITS Pilani", "VIT"][index % 5],

  assignment: Math.floor(60 + Math.random() * 40),
  video: Math.floor(60 + Math.random() * 40),
  ats: Math.floor(60 + Math.random() * 40),
  github: Math.floor(60 + Math.random() * 40),
  communication: Math.floor(60 + Math.random() * 40),
}));