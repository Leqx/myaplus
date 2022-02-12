const TODO = [
  {
    id: '01',
    category: 'Business',
    title: 'Accounting',
    description: '',
    time: '',
    inMyList: false,
    isScheduled: true,
    isCompleted: false,
  },
  {
    id: '02',
    category: 'Business',
    title: 'Microeconomics',
    description: '',
    time: '',
    inMyList: false,
    isScheduled: true,
    isCompleted: false,
  },
  {
    id: '03',
    category: 'Business',
    title: 'Business Finance',
    description: '',
    time: '',
    inMyList: false,
    isScheduled: false,
    isCompleted: false,
  },
];

export interface ITodo {
  id: string;
  category: string;
  title: string;
  description: string;
  time: string;
  inMyList: boolean;
  isScheduled: boolean;
  isCompleted: boolean;
  index: number;
}

export const TODOS: ITodo[] = TODO.map(
  (
    {
      id,
      category,
      title,
      description,
      time,
      inMyList,
      isScheduled,
      isCompleted,
    },
    index
  ) => ({
    id,
    category,
    title,
    description,
    time,
    inMyList,
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
