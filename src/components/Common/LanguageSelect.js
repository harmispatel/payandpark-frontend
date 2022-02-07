import React from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Select } from "antd";

const { Option } = Select;
const languageMap = {
  de: { label: "German", dir: "ltr", active: true },
  en: { label: "English", dir: "ltr", active: false }
};

const LanguageSelect = () => {
  const selected = localStorage.getItem("i18nextLng") || "de";

  function handleChange(value) {
    i18next.changeLanguage(value);
  }

  return (
    <div className="">
      <Select defaultValue={languageMap[selected].label} style={{ width: 120 }} onChange={handleChange}>
        {Object.keys(languageMap)?.map(item => (
          <Option key={item} value={item} >{languageMap[item].label}</Option>
        ))}
      </Select>
    </div>
  );
};

export default LanguageSelect;
