import {Worker} from './worker.interface';

export interface Company {
  id: number;
  name: string;
  workers: Worker[];
}
