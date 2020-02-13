import React from "react";
import Button from "./components/Button";
import Display from "./components/Display";

import "./App.css";

const initialState = {
	displayValue: "0",
	clearMemory: false,
	operation: null,
	values: [0, 0],
	current: 0
};

export default class App extends React.Component {
	state = { ...initialState };

	constructor(props) {
		super(props);
		this.clearMemory = this.clearMemory.bind(this);
		this.setOperation = this.setOperation.bind(this);
		this.addDigit = this.addDigit.bind(this);
	}

	clearMemory() {
		this.setState({ ...initialState });
	}

	setOperation(operation) {
		if (this.state.current === 0) {
			this.setState({ operation, current: 1, clearMemory: true });
		} else {
			const equals = operation === "=";
			const currentOperation = this.state.operation;
			const values = [...this.state.values];
			switch (currentOperation) {
				case "/":
					values[0] = values[0] / values[1];
					values[1] = 0;
					break;
				case "*":
					values[0] = values[0] * values[1];
					values[1] = 0;
					break;
				case "-":
					values[0] = values[0] - values[1];
					values[1] = 0;
					break;
				case "+":
					values[0] = values[0] + values[1];
					values[1] = 0;
					break;

				default:
					break;
			}

			this.setState({
				displayValue: values[0],
				operation: equals ? null : operation,
				current: equals ? 0 : 1,
				clearDisplay: !equals,
				values
			});
		}
	}

	addDigit(n) {
		if (n === "." && this.state.displayValue.includes(".")) {
			return;
		}

		/* 
			vai limpar o display caso o dígito for zero
			ou a flag for verdadeira
		*/
		const clearDisplay =
			this.state.displayValue === "0" || this.state.clearMemory;
		/* 
			se precisar limpar o display o valor atual vai ser vazio,
			se não precisar vai ser o valor atual do estado
		*/
		const currentValue = clearDisplay ? "" : this.state.displayValue;

		/*
			o novo valor do display sera o valor atual concatenado com o 
			valor digitado
		*/
		const displayValue = currentValue + n;

		if (n !== ".") {
			const i = this.state.current;
			const newValue = parseFloat(displayValue);

			const values = [...this.state.values];
			values[i] = newValue;
			this.setState({ values });
		}

		this.setState({ displayValue, clearDisplay: false });
	}

	render() {
		return (
			<>
				<h1>Calculadora</h1>
				<div className="App">
					<Display value={this.state.displayValue} />
					<Button triple label="AC" click={this.clearMemory} />
					<Button operation label="/" click={this.setOperation} />
					<Button label="7" click={this.addDigit} />
					<Button label="8" click={this.addDigit} />
					<Button label="9" click={this.addDigit} />
					<Button operation label="*" click={this.setOperation} />
					<Button label="4" click={this.addDigit} />
					<Button label="5" click={this.addDigit} />
					<Button label="6" click={this.addDigit} />
					<Button operation label="-" click={this.setOperation} />
					<Button label="1" click={this.addDigit} />
					<Button label="2" click={this.addDigit} />
					<Button label="3" click={this.addDigit} />
					<Button operation label="+" click={this.setOperation} />
					<Button double label="0" click={this.addDigit} />
					<Button label="." click={this.addDigit} />
					<Button operation label="=" click={this.setOperation} />
				</div>
			</>
		);
	}
}
