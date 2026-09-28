import { ImageResponse } from "next/og";

export const size = {width:1200,height:630};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(<div style={{background:"#101b1a",color:"#f5f3ec",width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"68px 76px",fontFamily:"Arial, sans-serif"}}><div style={{display:"flex",justifyContent:"space-between",fontSize:25,fontWeight:700}}><span>adrian.</span><span style={{fontSize:16,fontWeight:400,letterSpacing:3}}>SOFTWARE / SYSTEMS / AI</span></div><div style={{display:"flex",flexDirection:"column",fontSize:91,fontWeight:700,letterSpacing:-6,lineHeight:1.05}}><span>Make complex</span><span style={{color:"#b9db9b"}}>feel simple.</span></div><div style={{display:"flex",justifyContent:"space-between",fontSize:20,color:"#a9b5af"}}><span>Selected projects by Adrian</span><span>2026 ↗</span></div></div>,size);
}
