import React from "react";

function BorderAnimatedContainer({children}) {
  return (
    <div className="w-full flex [background:linear-gradient(45deg,#172033,#1e293b_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.600/48%)_80%,_theme(colors.indigo.500)_86%,_theme(colors.indigo.300)_90%,_theme(colors.indigo.500)_94%,_theme(colors.slate.600/48%))_border-box] rounded-2xl border border-transparent animate-border overflow-hidden">
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
