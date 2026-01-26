
export interface Group {
  id: number;
  name: string;
  members: string[];
}

export type DistributionMode = 'per_member' | 'total_groups';
