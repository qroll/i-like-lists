export interface Data {
  name: string;
  displayLabel: string;
  description: string;
  tags: string[];
  isRecyclable: "YES" | "NO" | "DEPENDS";
}

export const database: Data[] = [
  {
    name: "plastic-recycling-symbol-1",
    displayLabel: "Plastic Recycling Symbol #1",
    tags: ["plastic", "PET", "PETE", "polyethylene terephthalate"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-2",
    displayLabel: "Plastic Recycling Symbol #2",
    tags: ["plastic", "HDPE", "PE-HD", "high-density polyethylene"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-3",
    displayLabel: "Plastic Recycling Symbol #3",
    tags: ["plastic", "PVC", "polyvinyl chloride"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-4",
    displayLabel: "Plastic Recycling Symbol #4",
    tags: ["plastic", "LDPE", "PE-LD", "low-density polyethylene"],
    isRecyclable: "NO",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-5",
    displayLabel: "Plastic Recycling Symbol #5",
    tags: ["plastic", "PP", "polypropylene"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "plastic-recycling-symbol-6",
    displayLabel: "Plastic Recycling Symbol #6",
    tags: ["plastic", "PS", "polystyrene"],
    isRecyclable: "NO",
    description: "",
  },
  {
    name: "styrofoam",
    displayLabel: "Styrofoam",
    tags: ["takeaway"],
    isRecyclable: "NO",
    description: "",
  },
  {
    name: "printed-paper",
    displayLabel: "Printed paper",
    tags: ["paper"],
    isRecyclable: "YES",
    description: "",
  },
  {
    name: "tissue",
    displayLabel: "Tissue",
    tags: ["paper", "tissue paper"],
    isRecyclable: "NO",
    description: "Really, please throw your used tissues in the bin",
  },
  {
    name: "rechargeable-battery",
    displayLabel: "Rechargable battery",
    tags: ["battery", "electronics"],
    isRecyclable: "DEPENDS",
    description: "",
  },
];
