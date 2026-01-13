import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 hover:scale-105 active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-slate-900 to-slate-700 text-white hover:from-slate-800 hover:to-slate-600 shadow-lg hover:shadow-xl",
        destructive: "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-lg hover:shadow-xl",
        outline: "border-2 border-slate-200 bg-white/80 backdrop-blur-sm hover:bg-slate-50 hover:border-slate-300 text-slate-700",
        secondary: "bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600 shadow-lg hover:shadow-xl",
        ghost: "hover:bg-slate-100 hover:text-slate-900",
        link: "text-slate-900 underline-offset-4 hover:underline",
        premium: "bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:from-amber-600 hover:to-rose-600 shadow-2xl hover:shadow-3xl relative overflow-hidden",
      },
      size: {
        default: "h-11 px-6 py-3 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-14 px-8 py-4 text-lg font-semibold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Add shine effect for premium variant
    const premiumShine = variant === "premium" && (
      <div className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
      </div>
    );

    return (
      <Comp 
        className={cn(buttonVariants({ variant, size, className }), "relative group")} 
        ref={ref} 
        {...props}
      >
        {premiumShine}
        <span className="relative z-10 flex gap-2">{props.children}</span>
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
