export type Task = {
  _id: string;
  title: string;
  status: 'To do' | 'In progress' | 'Under review' | 'Finished';
  priority: 'Low' | 'Medium' | 'Urgent';
  deadline: string;
  description: string;
};
