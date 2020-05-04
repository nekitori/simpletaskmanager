import React, { Fragment, useState } from "react";
import {
  Box,
  Editable,
  EditablePreview,
  EditableInput,
  PseudoBox,
} from "@chakra-ui/core";
import TabComponent from "./Tab";

//data
const data: MappinTabProps[] = [
  {
    label: "Resources",
    taks: [
      {
        label: "Links",
        content: [
          {
            title: "Soy la tarea uno",
            description: "Debo hacer el pastel",
            status: false,
          },
        ],
      },
    ],
  },
  {
    label: "To Do",
    taks: [
      {
        label: "WireFrame",
        content: [
          {
            title: "Soy la tarea uno",
            description: "Debo hacer el queso",
            status: false,
          },
        ],
      },
    ],
  },
];

//typescript

interface MappinTabProps {
  label: string;
  taks: TaskI[];
}

interface TaskI {
  label: string;
  content: ContentInterface[];
}

interface ContentInterface {
  title: string;
  description: string;
  status: Boolean;
}
function Main(): JSX.Element {
  //state
  const [tabsC, setTabsC] = useState<MappinTabProps[]>(data);
  const [valOfEdit, setValOfEdit] = useState<string>("Add New Tab");
  //components

  //funtions

  const addTab = () => {
    const arrayTabs: MappinTabProps[] = [
      ...tabsC,
      { label: valOfEdit, taks: [] },
    ];
    setTabsC(arrayTabs);
    setValOfEdit("Add New Tab");
    console.log(tabsC);
  };

  //mappings
  const mappingTabs = (p: MappinTabProps, i: number) => (
    <TabComponent key={i} editTxt={p.label} taks={p.taks} />
  );

  return (
    <Fragment>
      <Box
        background={`url("https://cdn.pixabay.com/photo/2020/04/13/12/09/fog-5038082_1280.jpg")`}
        backgroundSize="cover"
        position="absolute"
        overflowX="scroll"
        top="0"
        right="0"
        left="0"
        bottom="0"
        whiteSpace="nowrap"
      >
        {tabsC.map(mappingTabs)}
        <Box
          bg="#ebecf0"
          borderRadius="0.5em"
          width="250px"
          margin="1em"
          padding="1em"
          display="inline-block"
          whiteSpace="nowrap"
          boxSizing="border-box"
        >
          <PseudoBox
            borderRadius="0.5em"
            padding="0.5em"
            transition="all 0.3s ease"
            _hover={{ background: "rgba(9, 30, 66, .08)" }}
          >
            <Editable
              value={valOfEdit}
              onChange={(e) => setValOfEdit(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTab();
              }}
            >
              <EditablePreview fontWeight="500" fontSize="14px" />
              <EditableInput />
            </Editable>
          </PseudoBox>
        </Box>
      </Box>
    </Fragment>
  );
}
export default Main;
