import { useState } from "react";
import { ICONS } from "../../assets";
import SelectDropdown from "../../components/Reusable/SelectDropdown/SelectDropdown";

const Filters = () => {
  const [gender, setGender] = useState<string>("");
  const [areaOfPractice, setAreaOfPractice] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("Relevance");

  const genderOptions = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-Binary", value: "non-binary" },
  ];

  const areaOfPracticeOptions = [
    { label: "Career", value: "Career" },
    { label: "Job", value: "Job" },
    { label: "Education", value: "Education" },
    { label: "Marriage", value: "Marriage" },
    { label: "Health", value: "Health" },
    { label: "Business", value: "Business" },
    { label: "Love", value: "Love" },
  ];

  const consultLanguages = [
    { label: "Hindi", value: "Hindi" },
    { label: "English", value: "English" },
    { label: "Bengali", value: "Bengali" },
    { label: "Telugu", value: "Telugu" },
    { label: "Marathi", value: "Marathi" },
    { label: "Tamil", value: "Tamil" },
    { label: "Urdu", value: "Urdu" },
    { label: "Gujarati", value: "Gujarati" },
    { label: "Kannada", value: "Kannada" },
    { label: "Odia", value: "Odia" },
    { label: "Malayalam", value: "Malayalam" },
    { label: "Punjabi", value: "Punjabi" },
    { label: "Assamese", value: "Assamese" },
    { label: "Maithili", value: "Maithili" },
    { label: "Sanskrit", value: "Sanskrit" },
    { label: "Kashmiri", value: "Kashmiri" },
    { label: "Nepali", value: "Nepali" },
    { label: "Sindhi", value: "Sindhi" },
    { label: "Konkani", value: "Konkani" },
    { label: "Dogri", value: "Dogri" },
    { label: "Bodo", value: "Bodo" },
    { label: "Santali", value: "Santali" },
    { label: "Manipuri", value: "Manipuri" },
    { label: "Mizo", value: "Mizo" },
    { label: "Tripuri", value: "Tripuri" },
    { label: "Garhwali", value: "Garhwali" },
    { label: "Kumaoni", value: "Kumaoni" },
    { label: "Bhojpuri", value: "Bhojpuri" },
    { label: "Magahi", value: "Magahi" },
    { label: "Chhattisgarhi", value: "Chhattisgarhi" },
    { label: "Tulu", value: "Tulu" },
    { label: "Kodava", value: "Kodava" },
    { label: "Sikkimese", value: "Sikkimese" },
    { label: "Ladakhi", value: "Ladakhi" },
  ];

  const sortByOptions = [
    { label: "Relevance", value: "Relevance" },
    { label: "Top Rated", value: "topRated" },
    { label: "Most Experienced", value: "mostExperienced" },
  ];

  const handleClearFilters = () => {
    setGender("");
    setAreaOfPractice("");
    setLanguage("");
    setSortBy("Relevance");
  };
  return (
    <div className="bg-white rounded-2xl px-6 py-5 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-40/60 pb-4">
        <h3 className="text-neutral-5 font-medium">Apply Filters</h3>
        <button
          onClick={handleClearFilters}
          className="flex items-center gap-1.5 text-primary-5 hover:opacity-70 transition-opacity"
        >
          Clear <img src={ICONS.reset} alt="reset" className="size-4" />
        </button>
      </div>

      <div className="space-y-4 mt-4">
        <div>
          <span className="text-neutral-10/90 text-[15px] font-medium">
            Sort By:
          </span>
          <div className="flex items-center gap-4 mt-2">
            {sortByOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="sortBy"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="hidden"
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                    sortBy === option.value
                      ? "border-primary-5"
                      : "border-gray-300 group-hover:border-primary-5/50"
                  }`}
                >
                  {sortBy === option.value && (
                    <div className="w-2 h-2 rounded-full bg-primary-5" />
                  )}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    sortBy === option.value
                      ? "text-primary-5 font-medium"
                      : "text-neutral-5 group-hover:text-primary-5/70"
                  }`}
                >
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        <SelectDropdown
          label="Gender"
          options={genderOptions}
          value={gender}
          onChangeEvent={setGender}
          bgColor="bg-white"
          borderColor="border-neutral-40/30"
          isRequired={false}
        />
        <SelectDropdown
          label="Area of Practice"
          options={areaOfPracticeOptions}
          value={areaOfPractice}
          onChangeEvent={setAreaOfPractice}
          bgColor="bg-white"
          borderColor="border-neutral-40/30"
          isRequired={false}
        />
        <SelectDropdown
          label="Language"
          options={consultLanguages}
          value={language}
          onChangeEvent={setLanguage}
          bgColor="bg-white"
          borderColor="border-neutral-40/30"
          isRequired={false}
        />
      </div>
    </div>
  );
};

export default Filters;
