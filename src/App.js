import { useState } from "react";


function App() {
	const [calc, setCalc] = useState("");	// initial value is passed inside ( );
	const [result, setResult] = useState("");
	const [operator, setOperator] = useState("");
	const [scientificResult, setScientificResult] = useState("");

	const ops = ['/', '*', '+', '-', '.'];

	const scientificOperations = {
		'√': value => Math.sqrt(value),
		/*'x^2': value => Math.pow(value, 2),
		'x^y': (base, exponent) => Math.pow(base, exponent),*/
		'sin': angle => Math.sin((Math.PI / 180) * angle),
		'cos': angle => Math.cos((Math.PI / 180) * angle),
		'tan': angle => Math.tan((Math.PI / 180) * angle),
		'log': value => Math.log10(value),
	};

	const evaluateExpression = expression => {
		const scientificFunctions = ['sin', 'cos', 'tan', 'log', 'sqrt'];
		scientificFunctions.forEach(func => {
			const regex = new RegExp(func, 'g');
			expression = expression.replace(regex, `Math.${func}`);
		});

		try {
			return eval(expression);
		} catch (error) {
			return 'Error';
		}
	};

	const updateCalc = value => {
		if (
			ops.includes(value) && calc === '' ||
			ops.includes(value) && ops.includes(calc.slice(-1))
		) {
			return;
		}

		setCalc(calc + value);

		if (!ops.includes(value)) {
			setResult(eval(calc + value).toString());
		}


	}

	const handleScientificOperation = operation => {
		if (operation === 'x^2') {
			const base = parseFloat(calc);
			const squareResult = Math.pow(base, 2).toString();
			setScientificResult(squareResult); // Store the scientific operation result separately
			setResult(squareResult);
			setCalc('');
		} else if (operation === 'π') {
			setResult(Math.PI.toString());
			setCalc('');
		} else if (operation in scientificOperations) {
			const sciResult = scientificOperations[operation](parseFloat(calc)).toString();
			setScientificResult(sciResult); // Store the scientific operation result separately
			setResult(sciResult);
			setCalc('');
		}
	};
		


	const calculate = () => {
		try {
			let evaluatedResult;
			if (scientificResult) {
				evaluatedResult = scientificResult; // Use stored scientific result if available
			} else {
				evaluatedResult = eval(calc); // Evaluate the expression using eval()
			}

			if (evaluatedResult !== undefined) {
				setResult(evaluatedResult);
				setCalc(evaluatedResult.toString());
			} else {
				setResult('Error');
				setCalc('');
			}
		} catch (error) {
			setResult('Error');
			setCalc('');
		}
		setScientificResult(""); // Reset the stored scientific result after calculation
	};

	const clearAll = () => {
		setCalc("");
		setResult("");
	};


	const createDigits = () => {
		const digits = [];

		for (let i = 1; i < 10; i++) {
			digits.push(
				<button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
			)
		}
		return digits;
	}

	const deleteLast = () => {
		if (calc == '') {
			return;
		}

		const value = calc.slice(0, -1);

		setCalc(value);
	}
	return (
		<div className="App">
			<div className="Calculator">
				<div className="display">
					{result ? <span> ({result}) </span> : ''}
					{/* if(result){
						 <span> ({result}) </span>;
					} else{
						''
					} */}
					{calc || "0"}
				</div>

				<div className="operators">
					<button onClick={() => updateCalc('/')}> / </button>
					<button onClick={() => updateCalc('*')}> * </button>
					<button onClick={() => updateCalc('+')}> + </button>
					<button onClick={() => updateCalc('-')}> - </button>

					<button onClick={deleteLast}> DEL </button>
				</div>

				<div className="digits">
					{createDigits()}
					<button onClick={() => updateCalc('.')}> . </button>
					<button onClick={() => updateCalc('0')}> 0 </button>
					<button onClick={calculate}> = </button>
				</div>

				<div className="scientific-operations">
					<button onClick={() => handleScientificOperation('√')}>√</button>
					<button onClick={() => handleScientificOperation('x^2')}>x^2</button>
					<button onClick={() => handleScientificOperation('π')}>π</button>
					<button onClick={() => handleScientificOperation('sin')}>sin</button>
					<button onClick={() => handleScientificOperation('cos')}>cos</button>
					<button onClick={() => handleScientificOperation('tan')}>tan</button>
					<button onClick={() => handleScientificOperation('log')}>log</button>
					<div className="clear">
						<button onClick={clearAll}>Clear</button>
					</div>
				</div>


			</div>
		</div>
	);
}

export default App;
