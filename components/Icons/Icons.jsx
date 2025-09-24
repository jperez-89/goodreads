import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Feather from "@expo/vector-icons/Feather";

export const Mail = () => {
  return <AntDesign name="mail" size={24} color="black" />;
};

export const Eye = () => {
  return <FontAwesome name="eye" size={24} color="black" />;
};

export const EyeSlash = () => {
  return <FontAwesome name="eye-slash" size={24} color="black" />;
};

export const Lock = () => {
  return <Feather name="lock" size={24} color="black" />;
};

export const Search = () => {
  return <FontAwesome name="search" size={24} color="black" />;
};

export const MovieIcon = (props) => {
  return <MaterialIcons name="local-movies" size={24} color="black" {...props} />;
};

export const AboutIcon = (props) => {
  return <FontAwesome name="info-circle" size={24} color="black" {...props} />;
};

export const CloseIcon = (props) => {
  return <FontAwesome name="close" size={24} color="black" {...props} />;
};

export const PlusIcon = (props) => {
  return <FontAwesome name="plus" size={24} color="black" {...props} />;
};

export const DarkThemeIcon = (props) => {
  return <FontAwesome name="plus" size={24} color="black" {...props} />;
  // return <MaterialIcons name="dark-mode" size={24} {...props} />;
};

export const LightThemeIcon = (props) => {
  return <Feather name="sun" size={24} {...props} />;
};

export const SettingThemeIcon = (props) => {
  return <AntDesign name="setting" size={24} {...props} />;
};
