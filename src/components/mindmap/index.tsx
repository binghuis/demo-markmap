import { useRef, useEffect, memo } from "react";
import { transformer, Markmap } from "./config";
import { Toolbar } from "markmap-toolbar";

function renderToolbar(mm: Markmap, container: HTMLElement) {
  while (container?.firstChild) container.firstChild.remove();
  if (mm && container) {
    const toolbar = new Toolbar();
    toolbar.attach(mm);
    toolbar.register({
      id: "dog",
      title: "摸摸狗头",
      content: "🐶",
      onClick: () => {
        console.log("汪!");
      },
    });
    toolbar.setBrand(false);
    toolbar.setItems([...Toolbar.defaultItems, "dog"]);
    container.append(toolbar.render());
  }
}

type MindMapProps = {
  content: string;
};

export default memo(function MindMap(props: MindMapProps) {
  const { content } = props;
  const refCanvas = useRef<SVGSVGElement>(null);
  const refMarkMap = useRef<Markmap>();
  const refToolbar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refCanvas.current || refMarkMap.current) {
      return;
    }
    refMarkMap.current = Markmap.create(refCanvas.current);
    return () => {
      refMarkMap.current?.destroy();
      refMarkMap.current = undefined;
    };
  }, []);

  useEffect(() => {
    if (!refMarkMap.current || !refToolbar.current) {
      return;
    }
    renderToolbar(refMarkMap.current, refToolbar.current);
  }, []);

  useEffect(() => {
    if (!refMarkMap.current) {
      return;
    }
    const { root } = transformer.transform(content);
    refMarkMap.current.setData(root);
    refMarkMap.current.fit();
  }, [content]);

  return (
    <div className="border rounded-lg relative pb-9">
      <svg ref={refCanvas} />
      <div className="absolute bottom-1 right-1" ref={refToolbar}></div>
    </div>
  );
});
