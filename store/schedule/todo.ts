const TODO = [
  {
    id: '001',
    title: 'Accounting',
    additionalInfo: '',
    day: '',
    time: '',
    isScheduled: true,
    isCompleted: false,
  },
  {
    id: '002',
    title: 'Microeconomics',
    additionalInfo: '',
    day: '',
    time: '',
    isScheduled: true,
    isCompleted: false,
  },
  {
    id: '003',
    title: 'Business Finance',
    additionalInfo: '',
    day: '',
    time: '',
    isScheduled: false,
    isCompleted: false,
  },
];

export interface ITodo {
  id: string;
  title: string;
  additionalInfo: string;
  day: string;
  time: string;
  isScheduled: boolean;
  isCompleted: boolean;
}

export const TODOS: ITodo[] = TODO.map(
  (
    { id, title, additionalInfo, day, time, isScheduled, isCompleted },
    index
  ) => ({
    id,
    title,
    additionalInfo,
    day,
    time,
    isScheduled,
    isCompleted,
    index,
  })
);

// const TITLES = [
//   'Accounting 🎥',
//   'Math 👍🏼 ',
//   'Economics',
//   'Physics 🚀',
//   'Statistics ⭐️',
// ];

// interface TaskInterface {
//   title: string;
//   index: number;
// }

// const TODOS: TaskInterface[] = TITLES.map((title, index) => ({ title, index }));
