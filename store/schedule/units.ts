const UNITS = [
  {
    id: '01',
    category: 'Business',
    title: 'Accounting',
    description: '',
    inMyList: false,
  },
  {
    id: '02',
    category: 'Business',
    title: 'Microeconomics',
    description: '',
    inMyList: false,
  },
  {
    id: '03',
    category: 'Business',
    title: 'Business Finance',
    description: '',
    inMyList: false,
  },
];

export interface IUnit {
  id: string;
  category: string;
  title: string;
  description: string;
  inMyList: boolean;
  index?: number;
}

export const UNIT: IUnit[] = UNITS.map(
  ({ id, category, title, description, inMyList }, index) => ({
    id,
    category,
    title,
    description,
    inMyList,
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
