import React, { useState } from "react";
import {
  Box,
  Button,
  Editable,
  EditablePreview,
  EditableInput,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  PseudoBox,
  useDisclosure,
  List,
  ButtonGroup,
  ListItem,
  Text,
  ListIcon,
} from "@chakra-ui/core";

type EditableProps = {
  val: string;
};
interface TabsInterface {
  editTxt: string;
  taks: TaskI[];
}

interface TaskI {
  label: string;
  content: ContentInterface[];
}
interface Taski2 {
  label: string;
  content: ContentInterface[];
  id: number;
}

interface ContentInterface {
  title: string;
  description: string;
  status: Boolean;
}

function Tab(props: TabsInterface): JSX.Element {
  //states
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState<Taski2>({
    label: "",
    content: [],
    id: 0,
  });
  const [tabs, setTabs] = useState<TaskI[]>(props.taks);
  const [valOfEdit, setValOfEdit] = useState<string>("Add New Task");
  const [addCont, setAddCont] = useState<string>("Add Description");

  //funtions
  const addTask = () => {
    const arrayTabs: TaskI[] = [...tabs, { label: valOfEdit, content: [] }];
    setTabs(arrayTabs);
    setValOfEdit("Add New Task");
  };

  const addContent = (i: number) => {
    const arrayTabs: TaskI[] = tabs;
    arrayTabs[i].content = [
      ...arrayTabs[i].content,
      { title: arrayTabs[i].label, description: addCont, status: false },
    ];
    setTabs(arrayTabs);
    changeContent(arrayTabs[i], i);
    setAddCont("Add Description");
  };

  const changeContent = (d: TaskI, i: number) => {
    const Task: Taski2 = { ...d, id: i };
    setContent(Task);
    onOpen();
  };

  const checkTask = (i: number, type: string, ci: number) => {
    if (type === "check") {
      const arrayTabs: TaskI[] = tabs;
      arrayTabs[ci].content[i].status = !arrayTabs[ci].content[i].status;
      setTabs(arrayTabs);
      changeContent(arrayTabs[ci], ci);
    } else if (type === "remove") {
      const arrayTabs: TaskI[] = [...tabs];
      arrayTabs[ci].content.splice(i, 1);
      setTabs(arrayTabs);
      changeContent(arrayTabs[ci], ci);
    }
  };
  const deleteTaskTab = (i: number) => {
    const arrayTabs: TaskI[] = [...tabs];
    arrayTabs.splice(i, 1);
    onClose();
    setTabs(arrayTabs);
  };
  //components
  const EditField = ({ val }: EditableProps): JSX.Element => (
    <Editable defaultValue={val}>
      <EditablePreview fontWeight="500" fontSize="14px" />
      <EditableInput />
    </Editable>
  );

  //mappings
  const mappinTask = (p: TaskI, i: number) => (
    <PseudoBox
      bg="#fafafa"
      boxShadow="rgba(0,0,0,0.2) 2px 2px 2px"
      borderRadius="0.5em"
      cursor="pointer"
      key={i}
      padding="0.5em"
      display="flex"
      justifyContent="space-between"
      margin="0.5em 0"
      _hover={{ background: "#f4f5f7" }}
      onClick={() => changeContent(p, i)}
    >
      {p.label}
    </PseudoBox>
  );
  const mappinContent = (p: ContentInterface, i: number) => (
    <List spacing={3} key={i} margin="1em 0" paddingLeft="0">
      <ListItem display="flex" justifyContent="space-between">
        <div>
          <ListIcon
            icon={p.status ? "check-circle" : "close"}
            color={p.status ? "green.500" : "red.500"}
          />
          <Text
            display="inline-block"
            margin="0"
            textDecoration={p.status ? "line-through" : "none"}
          >
            {p.description}
          </Text>
        </div>
        <ButtonGroup marginLeft="0.5em" spacing={2}>
          <Button
            leftIcon={p.status ? "close" : "check"}
            variantColor={p.status ? "red" : "green"}
            variant="outline"
            onClick={() => checkTask(i, "check", content?.id)}
            size="xs"
          >
            {p.status ? "Undo" : "Done"}
          </Button>
          <Button
            rightIcon="delete"
            variantColor="red"
            variant="outline"
            onClick={() => checkTask(i, "remove", content?.id)}
            size="xs"
          >
            Remove
          </Button>
        </ButtonGroup>
      </ListItem>
    </List>
  );
  return (
    <Box
      bg="#ebecf0"
      borderRadius="0.5em"
      width="250px"
      margin="1em"
      padding="1em"
      verticalAlign="top"
      display="inline-block"
      boxSizing="border-box"
    >
      <EditField val={props.editTxt} />
      {tabs.map(mappinTask)}
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
            if (e.key === "Enter") addTask();
          }}
        >
          <EditablePreview fontWeight="200" fontSize="14px" />
          <EditableInput />
        </Editable>
      </PseudoBox>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{content?.label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {content?.content.map(mappinContent)}
            <Editable
              value={addCont}
              onChange={(e) => setAddCont(e)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addContent(content?.id);
              }}
            >
              <EditablePreview fontWeight="200" fontSize="14px" />
              <EditableInput />
            </Editable>
          </ModalBody>
          <ModalFooter>
            <Button variantColor="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="solid"
              variantColor="red"
              onClick={() => deleteTaskTab(content?.id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Tab;
