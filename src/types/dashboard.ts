export interface FormCategory {
  id: string;
  title: string;
  completion: number;
  description: string;
}

export interface DetailedForm {
  id: string;
  title: string;
  completion: number;
  categoryId: string;
  description: string;
  dueDate?: string;
  capturedFields?: {
    [key: string]: string | number;
  };
  pendingFields?: string[];
}

export interface CategoryWithForms extends FormCategory {
  forms: DetailedForm[];