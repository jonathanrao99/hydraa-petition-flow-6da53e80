// Demo encroachment zones for cascading dropdown
export const LOCATION_DATA = [
  {
    name: "Hyderabad",
    children: [
      {
        name: "North",
        children: [
          { name: "Begumpet" },
          { name: "Secunderabad" },
          { name: "Bowenpally" }
        ]
      },
      {
        name: "South",
        children: [
          { name: "Mehdipatnam" },
          { name: "Attapur" },
          { name: "Rajendranagar" }
        ]
      },
      {
        name: "East",
        children: [
          { name: "Uppal" },
          { name: "LB Nagar" },
          { name: "Nacharam" }
        ]
      },
      {
        name: "West",
        children: [
          { name: "Gachibowli" },
          { name: "Madhapur" },
          { name: "Kukatpally" }
        ]
      },
      {
        name: "Central",
        children: [
          { name: "Abids" },
          { name: "Nampally" },
          { name: "Koti" }
        ]
      }
    ]
  },
  {
    name: "Cyberbad",
    children: [
      {
        name: "North",
        children: [
          { name: "HITEC City" },
          { name: "Gachibowli" },
          { name: "Nanakramguda" }
        ]
      },
      {
        name: "South",
        children: [
          { name: "Madhapur" },
          { name: "Kondapur" },
          { name: "Jubilee Hills" }
        ]
      }
    ]
  },
  {
    name: "Rachakonda",
    children: [
      {
        name: "North",
        children: [
          { name: "Uppal" },
          { name: "Nagole" },
          { name: "Boduppal" }
        ]
      },
      {
        name: "South",
        children: [
          { name: "LB Nagar" },
          { name: "Vanastalipuram" },
          { name: "Hayathnagar" }
        ]
      }
    ]
  },
  {
    name: "Sangareddy",
    children: [
      {
        name: "North",
        children: [
          { name: "Patancheru" },
          { name: "Bollaram" },
          { name: "Jinnaram" }
        ]
      },
      {
        name: "South",
        children: [
          { name: "Sangareddy" },
          { name: "Zaheerabad" },
          { name: "Narayankhed" }
        ]
      }
    ]
  }
];

// Demo encroachment types for multi-select
export const ENCROACHMENT_TYPES = [
  { id: "1", name: "Park Encroachment" },
  { id: "2", name: "Nala Encroachment" },
  { id: "3", name: "Lake Encroachment" },
  { id: "4", name: "Government Land Encroachment" },
  { id: "5", name: "Open Space Encroachment" },
  { id: "6", name: "FTL Encroachment" },
  { id: "7", name: "Buffer Zone Encroachment" },
  { id: "8", name: "Road Encroachment" },
  { id: "9", name: "Unauthorized Construction" },
  { id: "10", name: "Layout Violation" },
  { id: "11", name: "Footpath Encroachment" },
  { id: "12", name: "Other" }
];

// Petition status options
export const PETITION_STATUS = [
  { value: "Pending", label: "Pending" },
  { value: "Assigned", label: "Assigned" },
  { value: "Under Investigation", label: "Under Investigation" },
  { value: "Decision Made", label: "Decision Made" }
];

// Time bound options
export const TIME_BOUND_OPTIONS = [
  { value: "Priority", label: "Priority" },
  { value: "Immediate", label: "Immediate" },
  { value: "Normal", label: "Normal" }
];

// User designations
export const DESIGNATIONS = [
  { value: "DCP", label: "DCP" },
  { value: "ACP", label: "ACP" },
  { value: "Inspector", label: "Inspector" },
  { value: "Other", label: "Other" }
];

// User roles
export const ROLES = [
  { value: "Reception", label: "Reception" },
  { value: "EnquiryOfficer", label: "Enquiry Officer" },
  { value: "HOD", label: "HOD" },
  { value: "Admin", label: "Admin" }
];

// Petition submission types
export const PETITION_SUBMISSION_TYPES = [
  { value: "Individual", label: "Individual" },
  { value: "Association", label: "Association" },
  { value: "Govt", label: "Government" },
  { value: "Public Rep", label: "Public Representative" },
  { value: "Other", label: "Other" }
];

// Petition types
export const PETITION_TYPES = [
  { value: "General", label: "General" },
  { value: "Prajavani", label: "Prajavani" },
  { value: "Email", label: "Email" },
  { value: "WhatsApp", label: "WhatsApp" },
  { value: "Twitter", label: "Twitter" },
  { value: "Other", label: "Other" }
];
