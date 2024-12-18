import "jspdf";

declare module "jspdf" {
  interface jsPDF {
    autoTable: <T = unknown>(options: AutoTableOptions<T>) => jsPDF;
    lastAutoTable: { finalY: number };
  }
}

interface AutoTableOptions<T> {
  head?: T[][];
  body?: T[][];
  foot?: T[][];
  startY?: number;
  theme?: "striped" | "grid" | "plain";
  styles?: Record<string, unknown>;
  headStyles?: Record<string, unknown>;
  bodyStyles?: Record<string, unknown>;
  footStyles?: Record<string, unknown>;
  alternateRowStyles?: Record<string, unknown>;
  columnStyles?: Record<string, unknown>;
  margin?: { top?: number; right?: number; bottom?: number; left?: number };
}
