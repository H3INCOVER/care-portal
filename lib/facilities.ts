import fs from "fs";
import path from "path";

export type Facility = {
  facilityId: string;
  officeNumber: string;

  companyId: string;
  companyName: string;

  name: string;
  slug: string;

  prefecture: string;
  city: string;
  ward: string;
  area: string;
  type: string;

  icon: string;
  color: "green" | "blue" | "amber" | "purple" | "orange" | "rose";

  desc: string;
  tags: string[];

  address: string;
  tel: string;
  hours: string;

  website: string;
  serviceArea: string;

  isPublished: boolean;

  contactStatus: string;

  updatedAt: string;
  createdAt: string;
};

function parseCsvLine(line: string): string[] {
  const result: string[] = [];

  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  result.push(current);

  return result;
}

export function getFacilities(): Facility[] {
  const filePath = path.join(process.cwd(), "data", "facilities.csv");

  const file = fs.readFileSync(filePath, "utf-8");

  const lines = file.trim().split(/\r?\n/);

  const headers = parseCsvLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);

    const row = Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? ""]),
    );

    return {
      facilityId: row.facilityId,
      officeNumber: row.officeNumber,

      companyId: row.companyId,
      companyName: row.companyName,

      name: row.name,
      slug: row.slug,

      prefecture: row.prefecture,
      city: row.city,
      ward: row.ward,
      area: row.area,
      type: row.type,

      icon: row.icon,

      color: row.color as Facility["color"],

      desc: row.desc,

      tags: row.tags ? row.tags.split("|") : [],

      address: row.address,
      tel: row.tel,
      hours: row.hours,

      website: row.website,
      serviceArea: row.serviceArea,

      isPublished: row.isPublished ? row.isPublished.toLowerCase() === "true" : false,

      contactStatus: row.contactStatus,

      updatedAt: row.updatedAt,
      createdAt: row.createdAt,
    };
  });
}