import { Guid } from 'guid-typescript';

export interface CourseModel {
  id: Guid;
  title: string;
  creationDate: Date;
  duration: number;
  description: string[];
}
