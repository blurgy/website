var sp = str => {
	let swaps = [{ old: 'a_\'', new: 225 }, { old: 'e_\'', new: 233 }, { old: 'i_\'', new: 237 }, { old: 'o_\'', new: 243 }, { old: 'u_\'', new: 250 }, { old: 'u_:', new: 252 }, { old: 'n_~', new: 241 }, { old: 'A_\'', new: 193 }, { old: 'E_\'', new: 201 }, { old: 'I_\'', new: 205 }, { old: 'O_\'', new: 211 }, { old: 'U_\'', new: 218 }, { old: 'U_:', new: 220 }, { old: 'N_~', new: 209 }, { old: '"', new: 171 }, { old: '_"', new: 187 }, { old: '_?', new: 191 }, { old: '_!', new: 161 }];
	let inQuote = false;
	let i = 0;
	while (i < str.length) {
		for (let j = 0; j < swaps.length; j++) {
			if (str.slice(i, i + swaps[j].old.length) == swaps[j].old) {
				str = str.slice(0, i) + String.fromCharCode(swaps[j].new) + str.slice(i + swaps[j].old.length);
				break;
			}
		}
		i++;
	}
	return str;
};

class SpanishWord {
	constructor(params) {
		this.statement = params.statement;
		this.definition = params.definition;
		this.notes = params.notes;
		this.type = params.type;
		this.specialSyntax = params.specialSyntax;
	}
}
