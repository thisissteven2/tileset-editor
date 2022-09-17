import * as React from "react";

type InputProps = {
	label: string;
	id: string;
	value: any;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	endText?: string;
	type?: string;
} & React.ComponentPropsWithoutRef<"input">;

export default function Input({ label, id, value, onChange, placeholder, endText, type, className }: InputProps) {
	return (
		<div className="flex justify-between">
			<label htmlFor={id}>{label}</label>
			<div>
				<input type={type} placeholder={placeholder} id={id} value={value} onChange={onChange} className={className} />
				<span className="ml-2">{endText}</span>
			</div>
		</div>
	);
}
