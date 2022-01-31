import { IElement } from './testStore';

const elMaps: Map<string, IElement> = new Map([
  ['1', { id: '1', content: 'first content', date: 'today', goals: 0 }],
  ['2', { id: '2', content: 'second content', date: 'yesterday', goals: 0 }],
  ['3', { id: '3', content: 'third content', date: 'yesterday', goals: 0 }],
  ['4', { id: '4', content: 'fourth content', date: 'yesterday', goals: 0 }],
  ['5', { id: '5', content: 'fifth content', date: 'yesterday', goals: 0 }],
  ['6', { id: '6', content: 'sixth content', date: 'yesterday', goals: 0 }],
]);

export default elMaps;
