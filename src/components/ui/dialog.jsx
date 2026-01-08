import * as React from "react";
import { cn } from "../../lib/utils";

const Dialog = ({ children, onClose, ...props }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
Dialog.displayName = "Dialog";

const DialogContent = ({ className, children, onClose, ...props }) => {
  return (
    <div
      className={cn(
        "relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {children}
    </div>
  );
};
DialogContent.displayName = "DialogContent";

const DialogHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = "DialogTitle";

export { Dialog, DialogContent, DialogHeader, DialogTitle };
