export type ObjectiveType = 'percentage' | 'reduction' | 'quantity';

export interface BaseObjective {
  id: string;
  title: string;
  description: string;
  type: ObjectiveType;
  status: 'completed' | 'in-progress' | 'delayed';
}

export interface TimelineEntry {
  year: number;
  target: number;
  actual?: number;
}

export interface PercentageObjective extends BaseObjective {
  type: 'percentage';
  targetPercentage: number;
  timeline: TimelineEntry[];
}

export interface ReductionObjective extends BaseObjective {
  type: 'reduction';
  baselineValue: number;
  targetReduction: number;
  unit: string;
  timeline: TimelineEntry[];
}

export interface QuantityObjective extends BaseObjective {
  type: 'quantity';
  currentCount: number;
  targetCount: number;
  items?: string[];
  timeline: TimelineEntry[];
}

export type Objective = PercentageObjective | ReductionObjective | QuantityObjective;
