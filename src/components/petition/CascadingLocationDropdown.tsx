
import { useState, useEffect } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { LocationData } from "@/types";
import { Label } from "@/components/ui/label";

interface CascadingLocationDropdownProps {
  locationData: LocationData[];
  onChange: (location: { level1: string; level2: string; level3: string }) => void;
  value?: { level1: string; level2: string; level3: string };
}

const CascadingLocationDropdown = ({
  locationData,
  onChange,
  value = { level1: "", level2: "", level3: "" }
}: CascadingLocationDropdownProps) => {
  const [level1, setLevel1] = useState<string>(value.level1 || "");
  const [level2, setLevel2] = useState<string>(value.level2 || "");
  const [level3, setLevel3] = useState<string>(value.level3 || "");
  
  const [level2Options, setLevel2Options] = useState<LocationData[]>([]);
  const [level3Options, setLevel3Options] = useState<LocationData[]>([]);

  // Update level 2 options when level 1 changes
  useEffect(() => {
    if (level1) {
      const selectedLocation = locationData.find(location => location.name === level1);
      setLevel2Options(selectedLocation?.children || []);
      setLevel2("");
      setLevel3("");
    } else {
      setLevel2Options([]);
      setLevel2("");
      setLevel3("");
    }
  }, [level1, locationData]);

  // Update level 3 options when level 2 changes
  useEffect(() => {
    if (level2) {
      const selectedLevel1 = locationData.find(location => location.name === level1);
      const selectedLevel2 = selectedLevel1?.children?.find(location => location.name === level2);
      setLevel3Options(selectedLevel2?.children || []);
      setLevel3("");
    } else {
      setLevel3Options([]);
      setLevel3("");
    }
  }, [level2, level1, locationData]);

  // Update parent component when any level changes
  useEffect(() => {
    onChange({ level1, level2, level3 });
  }, [level1, level2, level3, onChange]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="level1">Area Level 1</Label>
        <Select 
          value={level1} 
          onValueChange={setLevel1}
        >
          <SelectTrigger id="level1">
            <SelectValue placeholder="Select area level 1" />
          </SelectTrigger>
          <SelectContent>
            {locationData.map((location) => (
              <SelectItem key={location.name} value={location.name}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level2">Area Level 2</Label>
        <Select 
          value={level2} 
          onValueChange={setLevel2}
          disabled={!level1 || level2Options.length === 0}
        >
          <SelectTrigger id="level2">
            <SelectValue placeholder="Select area level 2" />
          </SelectTrigger>
          <SelectContent>
            {level2Options.map((location) => (
              <SelectItem key={location.name} value={location.name}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level3">Area Level 3</Label>
        <Select 
          value={level3} 
          onValueChange={setLevel3}
          disabled={!level2 || level3Options.length === 0}
        >
          <SelectTrigger id="level3">
            <SelectValue placeholder="Select area level 3" />
          </SelectTrigger>
          <SelectContent>
            {level3Options.map((location) => (
              <SelectItem key={location.name} value={location.name}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Display the current path */}
      {(level1 || level2 || level3) && (
        <div className="mt-2 text-sm text-muted-foreground">
          Current path: {level1}{level2 ? ` → ${level2}` : ""}{level3 ? ` → ${level3}` : ""}
        </div>
      )}
    </div>
  );
};

export default CascadingLocationDropdown;
