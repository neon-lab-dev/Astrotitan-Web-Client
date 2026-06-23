import { FaGenderless, FaMars, FaVenus } from "react-icons/fa";
import { ICONS } from "../assets";

export const genders = [
    {
        id: "male",
        label: "Male",
        icon: FaMars,
    },
    {
        id: "female",
        label: "Female",
        icon: FaVenus,
    },
    {
        id: "non-binary",
        label: "Non-Binary",
        icon: FaGenderless,
    },
];

export const intents = [
    { label: "Love", icon: ICONS.love },
    { label: "Job", icon: ICONS.job },
    { label: "Education", icon: ICONS.education },
    { label: "Marriage", icon: ICONS.marriage },
    { label: "Health", icon: ICONS.health },
    { label: "Business", icon: ICONS.business },
];

export const zodiacSigns = [
    {
        name: "Aries",
        icon: ICONS.aries,
    },
    {
        name: "Taurus",
        icon: ICONS.taurus,
    },
    {
        name: "Gemini",
        icon: ICONS.gemini,
    },
    {
        name: "Cancer",
        icon: ICONS.cancer,
    },
    {
        name: "Leo",
        icon: ICONS.leo,
    },
    // {
    //   name: "Virgo",
    // //   icon: ICONS.virgo,
    // },
];