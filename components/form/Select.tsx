import { useField } from "formik";
import { FocusEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ColumnContainer } from "../Layout";
import { SystemProps, th } from "../Theme";
import { Error, TextInput, TextLabel } from "./Blocks";

const InputWrapper = styled.div`
  order: 3;
  position: relative;
  width: 100%;

  ${TextLabel} + & {
    margin-top: ${th.space("xs")};
  }
`;

const Input = styled(TextInput)<{ hasError: boolean }>`
  padding-right: ${th.space("xl")};
`;

const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: ${th.space("xl")};
`;

const Triangle = styled.div`
  background-color: ${th.color("primary-400")};
  clip-path: polygon(100% 0, 0 0, 50% 100%);
  height: 0.5rem;
  width: 0.8rem;
`;

const OrderedError = styled(Error)`
  order: 5;
`;

const ListWrapper = styled.div<{ isExpanded: boolean; position: "top" | "bottom" }>`
  position: relative;
  ${(props) => !props.isExpanded && "display: none;"}
  ${(props) => (props.position === "top" ? "order: 2" : "order: 4")};
`;

const List = styled.ul<{ position: "top" | "bottom" }>`
  background-color: #fff;
  border: 1px solid ${th.color("primary-50")};
  border-radius: ${th.radii("default")};
  max-height: 10rem;
  margin-top: ${th.space("xs")};
  overflow: auto;
  position: absolute;
  width: 100%;

  ${(props) => (props.position === "top" ? "bottom: 0" : "top: 0")};
`;

const ListItem = styled.li<{ isFocused: boolean }>`
  cursor: default;
  padding: ${th.space("s")};

  &:not(:first-child) {
    border-top: 1px solid ${th.color("primary-50")};
  }

  ${(props) =>
    props.isFocused &&
    css`
      background-color: ${th.color("primary-50")};
    `}
`;

interface Item<T> {
  label: string;
  item: T;
}

interface FormikSelectProps<T = any> extends SystemProps {
  isRequired?: boolean;
  items: Item<T>[];
  label: string;
  name: string;
  type?: "text" | "password" | "email";
}

export const FormikSelect = <T,>(props: FormikSelectProps<T>): JSX.Element => {
  const { isRequired = false, items, label, name, type = "text", ...sx } = props;
  const [field, meta, helpers] = useField(name);
  const [focusedItem, setFocusedItem] = useState<Item<T> | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const listItemRefs = useRef<HTMLLIElement[]>([]);

  const hasError = !!(meta.touched && meta.error);

  useEffect(() => {
    setFocusedItem(null);
  }, [items]);

  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.code;
    switch (key) {
      case "ArrowDown": {
        e.preventDefault();
        const currentIndex = focusedItem === null ? -1 : items.findIndex((i) => i === focusedItem);
        const nextItemIndex = currentIndex + 1;
        const nextItem = currentIndex === items.length - 1 ? focusedItem : items[nextItemIndex];
        setFocusedItem(nextItem);
        listItemRefs.current[nextItemIndex]?.scrollIntoView(false);
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        const currentIndex = focusedItem === null ? -1 : items.findIndex((i) => i === focusedItem);
        const nextItemIndex = currentIndex - 1;
        const nextItem = currentIndex === 0 ? focusedItem : items[nextItemIndex];
        setFocusedItem(nextItem);
        listItemRefs.current[nextItemIndex]?.scrollIntoView(true);
        break;
      }
      case "Space": {
        e.preventDefault();
        if (isExpanded) {
          selectItem(focusedItem);
        } else {
          onFocus();
        }
        break;
      }
      case "Escape": {
        e.preventDefault();
        setIsExpanded(false);
        break;
      }
    }
  };

  const selectItem = (item: Item<T> | null) => {
    helpers.setValue(item);
    setIsExpanded(false);
  };

  const onWrapperFocus = () => {
    inputRef.current?.focus();
  };

  const onFocus = () => {
    // if the dropdown is going to flow offscreen, attempt to show it above the input (unless that will go offscreen, too)

    const rect = inputRef.current?.getBoundingClientRect();
    if (rect) {
      // get the current font size, with a sane default of 16px
      const { fontSize } = window.getComputedStyle(document.documentElement);
      const size = parseInt(fontSize) || 16;
      // here we're estimating the dropdown's height as 11rem
      const topOffset = window.pageYOffset + rect.top - size * 11;
      const bottomOffset = window.pageYOffset + rect.bottom + size * 11;

      if (bottomOffset > document.body.clientHeight && topOffset > 0) {
        setPosition("top");
      } else {
        setPosition("bottom");
      }
    }

    setFocusedItem(null);
    setIsExpanded(true);
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (
      !listWrapperRef.current?.contains(e.relatedTarget as Node) &&
      !inputWrapperRef.current?.isEqualNode(e.relatedTarget as Node)
    ) {
      setIsExpanded(false);
      setPosition("bottom");
      field.onBlur(e);
    } else {
      e.preventDefault();
    }
  };

  return (
    <ColumnContainer onKeyDown={handleKeyPress} {...sx}>
      <TextLabel htmlFor={field.name}>{label}</TextLabel>

      <InputWrapper ref={inputWrapperRef} tabIndex={-1} onClick={onWrapperFocus}>
        <Input
          type={type}
          id={field.name}
          {...field}
          hasError={hasError}
          autoComplete="off"
          aria-required={isRequired}
          aria-invalid={hasError}
          onFocus={onFocus}
          onBlur={onBlur}
          value={field.value?.label ?? ""}
          ref={inputRef}
          readOnly
        />
        <IconWrapper>
          <Triangle />
        </IconWrapper>
      </InputWrapper>

      <ListWrapper ref={listWrapperRef} isExpanded={isExpanded} position={position}>
        <List role="listbox" position={position}>
          {items.map((item, i) => (
            <ListItem
              tabIndex={-1}
              key={item.label}
              role="option"
              isFocused={focusedItem === item}
              onClick={() => selectItem(item)}
              onMouseEnter={() => setFocusedItem(item)}
              ref={(el) => {
                listItemRefs.current[i] = el as HTMLLIElement;
              }}
            >
              {item.label}
            </ListItem>
          ))}
        </List>
      </ListWrapper>
      <OrderedError hasError={hasError}>{meta.error || "Nil"}</OrderedError>
    </ColumnContainer>
  );
};
