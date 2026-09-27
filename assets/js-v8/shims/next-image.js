import { jsx } from "__MIRBIR_BASE__assets/vendor-v6/react-jsx-runtime.js";
export default function Image({src,alt="",fill=false,width,height,className="",style={},loading,priority,sizes,fetchPriority,...rest}){
  const fillStyle=fill?{position:"absolute",height:"100%",width:"100%",left:0,top:0}:{};
  const eager = priority || loading === "eager";
  const props={
    src: typeof src === "string" ? src : (src?.src || ""),
    alt,
    className,
    style:{...fillStyle,...style},
    loading: eager ? "eager" : "lazy",
    decoding: "async",
    fetchPriority: fetchPriority || (priority ? "high" : undefined),
    ...rest
  };
  if(!fill){ if(width) props.width=width; if(height) props.height=height; }
  return jsx("img",props);
}
