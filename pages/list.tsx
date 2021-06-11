import Head from "next/head";
import { useRef, useState } from "react";
import { Container } from "../components/Layout";
import { H1, Text } from "../components/Text";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ListProps {
  // nothing
}

interface TextListItem {
  id: string;
  type: "text";
  content: string;
}

interface List {
  id: string;
  name: string;
  description: string;
  items: TextListItem[];
}

const list1: List = {
  id: "1",
  name: "drag n drop me",
  description: "",
  items: [
    {
      id: "1",
      type: "text",
      content: "one",
    },
    {
      id: "2",
      type: "text",
      content: "two",
    },
    {
      id: "3",
      type: "text",
      content: "three",
    },
  ],
};

const list2: List = {
  id: "2",
  name: "no stop",
  description: "",
  items: [
    {
      id: "11",
      type: "text",
      content: "a",
    },
    {
      id: "22",
      type: "text",
      content: "b",
    },
    {
      id: "33",
      type: "text",
      content: "c",
    },
  ],
};

const Draggable = ({ children }: { children: React.ReactNode }) => {
  const sourceRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      ref={sourceRef}
      draggable="true"
      style={isDragging ? { opacity: 0.5 } : undefined}
      onDragStart={(e) => {
        setIsDragging(true);

        const copy = sourceRef.current!.cloneNode(true) as HTMLDivElement;
        previewRef.current = copy;
        copy.id = "clone";

        document.body.append(copy);
        const el = document.getElementById("clone");

        if (!el) {
          // shouldn't be possible
          return;
        }

        el.style.opacity = "1";
        el.style.backgroundColor = "red";
        el.style.width = sourceRef.current?.offsetWidth + "px";
        console.log(copy);
        e.dataTransfer.setDragImage(el, 0, 0);
      }}
      onDragEnd={(e) => {
        console.log("data", e.dataTransfer);
        console.log("location", e.clientX, e.clientY);
        setIsDragging(false);
        previewRef.current!.remove();
      }}
    >
      {children}
    </div>
  );
};

export default function ListPage(props: ListProps): JSX.Element {
  const [lists, setLists] = useState([list1, list2]);

  return (
    <Container>
      <Head>
        <title>i like lists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <H1>i-like-lists</H1>
      {lists.map((list) => {
        const { id, name, items } = list;
        return (
          <div key={id}>
            <Text bold>{name}</Text>
            <div
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              {items.map((item) => (
                <Draggable key={item.id}>
                  <div style={{ backgroundColor: "white", padding: "6px", margin: "6px" }}>
                    {item.content}
                  </div>
                </Draggable>
              ))}
            </div>
          </div>
        );
      })}
    </Container>
  );
}
