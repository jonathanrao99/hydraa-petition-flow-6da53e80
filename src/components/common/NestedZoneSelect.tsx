import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ZoneOption {
  label: string;
  value: string;
  children?: ZoneOption[];
}

const zoneOptions: ZoneOption[] = [
  {
    label: "Hyderabad",
    value: "hyderabad",
    children: [
      {
        label: "North",
        value: "north",
        children: [
          { label: "Begumpet", value: "begumpet" },
          { label: "Bowenpally", value: "bowenpally" },
          { label: "Gopalapuram", value: "gopalapuram" },
          { label: "Tukaramgate", value: "tukaramgate" },
          { label: "Marredpally", value: "marredpally" },
          { label: "Mahankali", value: "mahankali" },
          { label: "Ramgopalpet", value: "ramgopalpet" },
          { label: "Market", value: "market" },
          { label: "Tirumalgherry", value: "tirumalgherry" },
          { label: "Bolarum", value: "bolarum" },
          { label: "Karkhana", value: "karkhana" },
        ],
      },
      {
        label: "West",
        value: "west",
        children: [
          { label: "Banjara Hills", value: "banjara-hills" },
          { label: "Masab Tank", value: "masab-tank" },
          { label: "Jubilee Hills", value: "jubilee-hills" },
          { label: "Film Nagar", value: "film-nagar" },
          { label: "Panjagutta", value: "panjagutta" },
          { label: "Madhuranaar", value: "madhuranaar" },
          { label: "SR Nagar", value: "sr-nagar" },
          { label: "Borabanda", value: "borabanda" },
        ],
      },
      {
        label: "East",
        value: "east",
        children: [
          { label: "Amberpet", value: "amberpet" },
          { label: "Kachiguda", value: "kachiguda" },
          { label: "Lalaguda", value: "lalaguda" },
          { label: "Chilkalguda", value: "chilkalguda" },
          { label: "Warasiguda", value: "warasiguda" },
          { label: "OU", value: "ou" },
          { label: "Nallakunta", value: "nallakunta" },
          { label: "Sultan Bazar", value: "sultan-bazar" },
          { label: "Afzalgunj", value: "afzalgunj" },
          { label: "Narayanaguda", value: "narayanaguda" },
        ],
      },
      {
        label: "Central",
        value: "central",
        children: [
          { label: "Abids", value: "abids" },
          { label: "Begum Bazar", value: "begum-bazar" },
          { label: "Chikkadpally", value: "chikkadpally" },
          { label: "Musheerabad", value: "musheerabad" },
          { label: "Gandhi Nagar", value: "gandhi-nagar" },
          { label: "Domalguda", value: "domalguda" },
          { label: "Secretariat", value: "secretariat" },
          { label: "Saifabad", value: "saifabad" },
          { label: "Nampally", value: "nampally" },
          { label: "Khairtabad", value: "khairtabad" },
        ],
      },
      {
        label: "South",
        value: "south",
        children: [
          { label: "Charminar", value: "charminar" },
          { label: "Kamatipura", value: "kamatipura" },
          { label: "Hussainialam", value: "hussainialam" },
          { label: "Falaknuma", value: "falaknuma" },
          { label: "Bahadurpura", value: "bahadurpura" },
          { label: "Kalapathar", value: "kalapathar" },
          { label: "Moghalpura", value: "moghalpura" },
          { label: "Chaitrinaka", value: "chaitrinaka" },
          { label: "Shalibanda", value: "shalibanda" },
          { label: "Mirchowk", value: "mirchowk" },
          { label: "Bhavani Nagar", value: "bhavani-nagar" },
          { label: "Rein Bazar", value: "rein-bazar" },
        ],
      },
      {
        label: "South/West",
        value: "south-west",
        children: [
          { label: "Asif Nagar", value: "asif-nagar" },
          { label: "Humayun Nagar", value: "humayun-nagar" },
          { label: "Habeeb Nagar", value: "habeeb-nagar" },
          { label: "Shainathgunj", value: "shainathgunj" },
          { label: "Manghalhat", value: "manghalhat" },
          { label: "Golconda", value: "golconda" },
          { label: "Langar House", value: "langar-house" },
          { label: "Gudimalkapur", value: "gudimalkapur" },
          { label: "Kulsumpura", value: "kulsumpura" },
          { label: "Tappachabutra", value: "tappachabutra" },
          { label: "Chanrayangutta", value: "chanrayangutta" },
          { label: "Bandlaguda", value: "bandlaguda" },
          { label: "Kanchanbagh", value: "kanchanbagh" },
          { label: "Santosh Nagar", value: "santosh-nagar" },
          { label: "IS Sadan", value: "is-sadan" },
          { label: "Madannapet", value: "madannapet" },
          { label: "Saidabad", value: "saidabad" },
          { label: "Malakpet", value: "malakpet" },
          { label: "Chaderghat", value: "chaderghat" },
          { label: "Dabeerpura", value: "dabeerpura" },
        ],
      },
    ],
  },
  {
    label: "Cyberbad",
    value: "cyberbad",
    children: [
      {
        label: "Madhapur",
        value: "madhapur",
        children: [
          { label: "Madhapur", value: "madhapur" },
          { label: "Raidurgam", value: "raidurgam" },
          { label: "Gachibowli", value: "gachibowli" },
        ],
      },
      {
        label: "Shamshabad",
        value: "shamshabad",
        children: [
          { label: "Shamshabad", value: "shamshabad" },
          { label: "RGI Airport", value: "rgi-airport" },
        ],
      },
      {
        label: "Rajendranagar",
        value: "rajendranagar",
        children: [
          { label: "Rajendranagar", value: "rajendranagar" },
          { label: "Mailardevpally", value: "mailardevpally" },
          { label: "Attapur", value: "attapur" },
          { label: "Narsingi", value: "narsingi" },
          { label: "Mokila", value: "mokila" },
          { label: "Tellapur", value: "tellapur" },
        ],
      },
      {
        label: "Balanagar",
        value: "balanagar",
        children: [
          { label: "Balanagar", value: "balanagar" },
          { label: "Sanathnagar", value: "sanathnagar" },
          { label: "Jeedimetla", value: "jeedimetla" },
          { label: "Jagadgirigutta", value: "jagadgirigutta" },
          { label: "Kukatpally", value: "kukatpally" },
          { label: "KPHB PS", value: "kphb-ps" },
          { label: "Bachupally", value: "bachupally" },
          { label: "Allapur PS", value: "allapur-ps" },
        ],
      },
      {
        label: "Medchal",
        value: "medchal",
        children: [
          { label: "Pet Basheerabad", value: "pet-basheerabad" },
          { label: "Shamirpet", value: "shamirpet" },
          { label: "Alwal", value: "alwal" },
          { label: "Suraram", value: "suraram" },
          { label: "Medchal", value: "medchal" },
          { label: "G.Pochampally", value: "g-pochampally" },
          { label: "Thumkunta", value: "thumkunta" },
        ],
      },
    ],
  },
  {
    label: "Rachakonda",
    value: "rachakonda",
    children: [
      {
        label: "Malkajgiri",
        value: "malkajgiri",
        children: [
          { label: "Malkajgiri", value: "malkajgiri" },
          { label: "Nacharam", value: "nacharam" },
          { label: "Uppal", value: "uppal" },
          { label: "Medipally", value: "medipally" },
          { label: "Ghatkesar", value: "ghatkesar" },
          { label: "Kushaiguda", value: "kushaiguda" },
          { label: "Neredmet", value: "neredmet" },
          { label: "Jawaharnagar", value: "jawaharnagar" },
          { label: "Keesara", value: "keesara" },
          { label: "Chelapally", value: "chelapally" },
          { label: "Pocharam", value: "pocharam" },
          { label: "Dammaiguda", value: "dammaiguda" },
          { label: "Nagaram", value: "nagaram" },
        ],
      },
      {
        label: "LB Nagar",
        value: "lb-nagar",
        children: [
          { label: "LB Nagar", value: "lb-nagar" },
          { label: "Saroornagar", value: "saroornagar" },
          { label: "Chaitanyapuri", value: "chaitanyapuri" },
          { label: "Nagole", value: "nagole" },
          { label: "Vanasthalipuram", value: "vanasthalipuram" },
          { label: "Hayathnagar", value: "hayathnagar" },
          { label: "Abdullapurmet", value: "abdullapurmet" },
          { label: "Meerpet", value: "meerpet" },
          { label: "Pedda Amberpet", value: "pedda-amberpet" },
        ],
      },
      {
        label: "Maheshwaram",
        value: "maheshwaram",
        children: [
          { label: "Maheshwaram", value: "maheshwaram" },
          { label: "Kandukur", value: "kandukur" },
          { label: "Pahadishareef", value: "pahadishareef" },
          { label: "Balapur", value: "balapur" },
          { label: "Adibatla", value: "adibatla" },
          { label: "Thukkuguda", value: "thukkuguda" },
        ],
      },
    ],
  },
  {
    label: "Sangareddy",
    value: "sangareddy",
    children: [
      { label: "Patancheru", value: "patancheru" },
      { label: "Miyapur", value: "miyapur" },
      { label: "Chandanagar", value: "chandanagar" },
      { label: "Ameenpur", value: "ameenpur" },
    ],
  },
];

interface NestedZoneSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const NestedZoneSelect = ({ value, onChange, className }: NestedZoneSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState<ZoneOption[]>([]);
  const [currentOptions, setCurrentOptions] = useState<ZoneOption[]>(zoneOptions);

  const handleOptionClick = (option: ZoneOption) => {
    if (option.children) {
      setSelectedPath([...selectedPath, option]);
      setCurrentOptions(option.children);
    } else {
      onChange?.(option.value);
      setIsOpen(false);
      setSelectedPath([]);
      setCurrentOptions(zoneOptions);
    }
  };

  const handleBack = () => {
    if (selectedPath.length > 0) {
      const newPath = selectedPath.slice(0, -1);
      setSelectedPath(newPath);
      setCurrentOptions(newPath.length > 0 ? newPath[newPath.length - 1].children! : zoneOptions);
    }
  };

  // Find the selected option based on the value
  const findSelectedOption = (value: string, options: ZoneOption[]): ZoneOption | null => {
    for (const option of options) {
      if (option.value === value) {
        return option;
      }
      if (option.children) {
        const found = findSelectedOption(value, option.children);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedOption = value ? findSelectedOption(value, zoneOptions) : null;

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="outline"
        className="w-full justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <span className="truncate">
            {selectedOption.label}
          </span>
        ) : (
          "Select Zone"
        )}
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover shadow-md">
          {selectedPath.length > 0 && (
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={handleBack}
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          <div className="max-h-[300px] overflow-y-auto">
            {currentOptions.map((option) => (
              <Button
                key={option.value}
                variant="ghost"
                className="w-full justify-between"
                onClick={() => handleOptionClick(option)}
              >
                <span>{option.label}</span>
                {option.children && <ChevronRight className="h-4 w-4" />}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NestedZoneSelect; 