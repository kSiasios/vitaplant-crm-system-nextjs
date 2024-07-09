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

export interface Item {
  plant: string;
  subject: string;
  variety: string;
  price: string;
  amount: string;
  stock: Stock;
}

export interface Stock {
  own: string;
  distributor: string;
}

export function deepCompare(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  if (typeof obj1 === "object" && typeof obj2 === "object") {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (!keys2.includes(key)) {
        return false;
      }
      if (!deepCompare(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  return false;
}
