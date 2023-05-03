import { ruToLatMap, latToRuMap } from "./maps";

export const transleteToLat = text => {
    console.warn(111, text);
    return text.split("").map(char => ruToLatMap.get(char) || char).join("");
};

export const transleteToRu = text => {
    return text.split("").map(char => latToRuMap.get(char) || char).join("");
};