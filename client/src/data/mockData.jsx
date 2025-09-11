export const mockCounselors = [
  { id: 1, name: 'Dr. Anya Sharma', specialty: 'Anxiety & Stress', available: true, image: 'https://placehold.co/100x100/E0E7FF/4F46E5?text=Dr.+S' },
  { id: 2, name: 'Mr. Rohan Verma', specialty: 'Depression & Burnout', available: true, image: 'https://placehold.co/100x100/DBEAFE/1D4ED8?text=Mr.+V' },
  { id: 3, name: 'Ms. Priya Singh', specialty: 'Academic Stress', available: false, image: 'https://placehold.co/100x100/E0F2FE/0891B2?text=Ms.+S' },  
];

export const mockResources = [
  { id: 1, type: 'video', title: '5-Minute Guided Meditation for Anxiety', category: 'Anxiety', url: '#', duration: '5 min' },
  { id: 2, type: 'audio', title: 'Calming Sounds for Deep Sleep', category: 'Sleep', url: '#', duration: '30 min' },
  { id: 3, type: 'guide', title: 'Managing Exam Stress Effectively', category: 'Academic Stress', url: '#' },
  { id: 4, type: 'video', title: 'Understanding Burnout and How to Combat It', category: 'Burnout', url: '#', duration: '12 min' },
  { id: 5, type: 'guide', title: 'Building Healthy Social Connections in College', category: 'Social Isolation', url: '#' },
  { id: 6, type: 'audio', title: 'Mindful Breathing Exercise', category: 'Stress', url: '#', duration: '10 min' },
];

export const mockForumPosts = [
    { 
        id: 1, 
        author: 'AnonymousStudent1', 
        title: "Feeling overwhelmed with coursework. Any tips?", 
        content: "Lately, I've been finding it really hard to keep up with all the assignments and lectures. It feels like I'm drowning and my grades are starting to slip. Has anyone else felt this way? How do you cope?",
        replies: [
            { author: 'PeerVolunteer1', content: "I totally get that. What helped me was creating a strict schedule and breaking down tasks into smaller chunks. The Pomodoro Technique is great for this!" },
            { author: 'AnonymousStudent2', content: "Yeah, and don't forget to take breaks. Going for a short walk between study sessions can make a huge difference." }
        ],
        tags: ['Academic Stress', 'Burnout']
    },
    { 
        id: 2, 
        author: 'AnonymousStudent3', 
        title: "Struggling to make friends in a new city.", 
        content: "I moved here for college and I don't know anyone. It's been a few months and I'm feeling really lonely. It's tough to approach people. Any advice on how to build social connections?",
        replies: [
             { author: 'PeerVolunteer2', content: "Joining clubs or student groups related to your hobbies is a fantastic way to meet like-minded people. It gives you an instant common ground." }
        ],
        tags: ['Social Isolation']
    }
];