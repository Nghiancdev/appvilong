import React from "react";
import { useAppStore } from "../../store/appStore";
import { useDataAppStore } from "../../store/DataAppStore";
import { Button } from "react-native-paper";

const ButtonSheet = ({ children, isDefault = false, ...rest }) => {
  const { appTheme } = useDataAppStore((state) => state);
  const { color_main_1 } = appTheme;
  return (
    <Button
      // className="h-[40px] w-[100px] bg-primary text-white hover:bg-primary"
      // {...rest}
      // style={{ backgroundColor: !isDefault ? color_main_1 : "" }}
    >
      {children}
    </Button>
  );
};
export default ButtonSheet;
