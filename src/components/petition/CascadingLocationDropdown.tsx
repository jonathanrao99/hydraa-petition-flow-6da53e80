import { Label } from "@/components/ui/label";
import NestedZoneSelect from "@/components/common/NestedZoneSelect";

interface CascadingLocationDropdownProps {
  value: {
    level1: string;
    level2: string;
    level3: string;
  };
  onChange: (value: { level1: string; level2: string; level3: string }) => void;
  locationData?: {
    name: string;
    children: {
      name: string;
      children: {
        name: string;
      }[];
    }[];
  }[];
}

const CascadingLocationDropdown = ({ value, onChange, locationData }: CascadingLocationDropdownProps) => {
  const handleZoneChange = (selectedValue: string) => {
    // Parse the selected value to get the full path
    const path = selectedValue.split(" > ");
    onChange({
      level1: path[0] || "",
      level2: path[1] || "",
      level3: path[2] || "",
    });
  };

  return (
      <div className="space-y-2">
        <Label>Encroachment Zone</Label>
      <NestedZoneSelect
        value={value.level3 || value.level2 || value.level1}
        onChange={handleZoneChange}
      />
    </div>
  );
};

export default CascadingLocationDropdown;
