import * as React from "react";

type ButtonProps = {
	variant: "primary" | "secondary";
	className?: string;
	onClick: () => void;
} & React.ComponentPropsWithoutRef<"button">;

const variants = {
	primary: "bg-primary focus:ring-2 focus:ring-primary ring-offset-4 ring-offset-bg text-bg px-2 py-1",
	secondary: "bg-secondary focus:ring-2 focus:ring-secondary ring-offset-4 ring-offset-bg text-bg px-2 py-1",
};

export default function Button({ variant = "primary", className, onClick, children }: ButtonProps) {
	return (
		<button className={`btn-1 ${variants[variant]} ${className}`} onClick={onClick}>
			{children}
		</button>
	);
}
