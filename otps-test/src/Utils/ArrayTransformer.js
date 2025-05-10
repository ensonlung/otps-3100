export const days = [
    "All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
]


const transformedSubjects = days.map((subject, index) => ({
  label: subject,
  value: index
}));

console.log(transformedSubjects);