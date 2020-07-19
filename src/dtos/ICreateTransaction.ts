export default interface ICreateTransaction {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
