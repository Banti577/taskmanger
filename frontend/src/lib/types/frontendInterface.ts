type TaskStatus = "pending" | "completed" | "in-progress";

export interface CategoryCount {
  pending: number;
  "in-progress": number;
  completed: number;
}

export interface AnalyseDashProps {
  categoryCounts: CategoryCount;
}