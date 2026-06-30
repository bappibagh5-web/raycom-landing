// ─── Coverage area data ───────────────────────────────────────────────────────
// Structure: District → Upazila → Union → Areas[]
// To add new coverage: add entries following the same shape below.
// "All areas in X" is a sentinel string meaning the whole union is covered.

export interface CoverageArea {
  name: string;
  areas: string[];
}

export interface CoverageUnion {
  name: string;
  areas: CoverageArea[];
}

export interface CoverageUpazila {
  name: string;
  unions: CoverageUnion[];
}

export interface CoverageDistrict {
  name: string;
  upazilas: CoverageUpazila[];
}

const ALL = (union: string) => [`All areas in ${union}`];

export const coverageData: CoverageDistrict[] = [
  {
    name: "Jessore",
    upazilas: [
      {
        name: "Sharsha",
        unions: [
          {
            name: "Bagachara",
            areas: [
              { name: "7 Mile",      areas: [] },
              { name: "Amtola",      areas: [] },
              { name: "Samta",       areas: [] },
              { name: "Pipragachi",  areas: [] },
              { name: "Tengra",      areas: [] },
              { name: "Bostopur",    areas: [] },
            ],
          },
          {
            name: "Kaiba",
            areas: [{ name: "All areas in Kaiba", areas: [] }],
          },
          {
            name: "Goga",
            areas: [{ name: "All areas in Goga", areas: [] }],
          },
        ],
      },
      {
        name: "Jhikargacha",
        unions: [
          {
            name: "Gadkhali",
            areas: [{ name: "All areas in Gadkhali", areas: [] }],
          },
        ],
      },
    ],
  },
  {
    name: "Satkhira",
    upazilas: [
      {
        name: "Kolaroa",
        unions: [
          {
            name: "Sonabaria",
            areas: [
              { name: "Sonabaria Gram",     areas: [] },
              { name: "Dakkhin Sonabaria",  areas: [] },
              { name: "Uttor Sonabaria",    areas: [] },
              { name: "Borali",             areas: [] },
              { name: "Sreerampur",         areas: [] },
              { name: "Ramkrishnopur",      areas: [] },
              { name: "Boyalia",            areas: [] },
            ],
          },
          {
            name: "Chandanpur",
            areas: [{ name: "All areas in Chandanpur", areas: [] }],
          },
          {
            name: "Langolzhara",
            areas: [{ name: "All areas in Langolzhara", areas: [] }],
          },
          {
            name: "Keralkata",
            areas: [{ name: "All areas in Keralkata", areas: [] }],
          },
          {
            name: "Helatola",
            areas: [{ name: "All areas in Helatola", areas: [] }],
          },
        ],
      },
    ],
  },
];
