import ThemedCard from "@/components/shared/ThemedCard";
import ThemedSwitch from "@/components/shared/ThemedSwitch";
import ThemedView from "@/components/shared/ThemedView";
import { useState } from "react";
type State = { isActive: boolean; isHungry: boolean; isHappy: boolean };
const Switches = () => {
  const [isEnabled, setIsEnabled] = useState<State>({
    isActive: true,
    isHungry: false,
    isHappy: true,
  });

  const toggleSwitch = (label: keyof State) =>
    setIsEnabled((previousState) => ({
      ...previousState,
      [label]: !previousState[label],
    }));

  return (
    <ThemedView margin>
      <ThemedCard>
        <ThemedSwitch
          onValueChange={() => toggleSwitch("isActive")}
          value={isEnabled.isActive}
          text="Activo"
          className="mb-2"
        />
        <ThemedSwitch
          onValueChange={() => toggleSwitch("isHappy")}
          value={isEnabled.isHappy}
          text="Feliz"
          className="mb-2"
        />
        <ThemedSwitch
          onValueChange={() => toggleSwitch("isHungry")}
          value={isEnabled.isHungry}
          text="Hambriento"
          className="mb-2"
        />
      </ThemedCard>
    </ThemedView>
  );
};
export default Switches;
