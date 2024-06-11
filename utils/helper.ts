import { Item } from "@/components/OrderItem";

export const normalizeGreekString = (str: string) => {
  // Convert to lowercase
  str = str.toLowerCase();

  // Normalize the string to NFD form
  str = str.normalize("NFD");

  // Remove diacritical marks (accents)
  str = str.replace(/[\u0300-\u036f]/g, "");

  return str;
};

export interface statusDictionary {
  [index: string]: string;
}

export const statusMap: statusDictionary = {
  registered: "Καταχωρημένη",
  complete: "Ολοκληρωμένη",
  packed: "Πακεταρισμένη",
};

export const paymentStatusMap: statusDictionary = {
  due: "Χρωστούμενη",
  complete: "Ολοκληρωμένη",
  "in-advance": "Προκαταβολή",
};

export interface OrderData {
  name: string;
  address: string;
  taxpayerNumber: string;
  status: string;
  paymentStatus: string;
  paymentAmount: number;
  created: {
    by: string;
    at: string;
  };
  items: [items: Item];
}
