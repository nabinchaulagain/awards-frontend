import countries from "@/constants/countries";
import { Soldier } from "@/services/solider";

interface Country {
  name: string;
  code: string;
  emoji: string;
  unicode: string;
  image: string;
}

export function getCountry(soldier: Soldier): Country | undefined {
  return countries.find(({ code }) => code === soldier?.unit?.country);
}

export function getSoldierAllegiance(soldier: Soldier): string {
  return `${getCountry(soldier)?.emoji} ${soldier?.unit?.name}, ${
    soldier?.unit?.branch
  }, ${soldier?.unit?.country}`;
}
