import React from "react";
import "./Button.css";

export default props => {
	let classes = "Button ";

	// adiciona as classes caso essas sejam definidas
	classes += props.operation ? "operation" : "";
	classes += props.double ? "double" : "";
	classes += props.triple ? "triple" : "";

	return (
		<button className={classes} onClick={e => props.click(props.label)}>
			{props.label}
		</button>
	);
};
