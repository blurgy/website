var fr = str => {
	let swaps = [
		{ old: 'a_`', new: 224 },
		{ old: 'a_^', new: 226 },
		{ old: 'a_e', new: 230 },
		{ old: 'c_,', new: 231 },
		{ old: 'e_`', new: 232 },
		{ old: 'e_\'', new: 233 },
		{ old: 'e_^', new: 234 },
		{ old: 'e_:', new: 235 },
		{ old: 'i_^', new: 238 },
		{ old: 'i_:', new: 239 },
		{ old: 'o_^', new: 244 },
		{ old: 'o_e', new: 156 },
		{ old: 'u_`', new: 249 },
		{ old: 'u_^', new: 251 },
		{ old: 'u_:',  new: 252 },

		{ old: 'A_`', new: 192 },
		{ old: 'A_^', new: 194 },
		{ old: 'A_E', new: 198 },
		{ old: 'C_,', new: 199 },
		{ old: 'E_`', new: 200 },
		{ old: 'E_\'', new: 201 },
		{ old: 'E_^', new: 202 },
		{ old: 'E_:', new: 203 },
		{ old: 'I_^', new: 206 },
		{ old: 'I_:', new: 207 },
		{ old: 'O_^', new: 212 },
		{ old: 'O_E', new: 140 },
		{ old: 'U_`', new: 217 },
		{ old: 'U_^', new: 219 },
		{ old: 'U_:', new: 220 },


		{ old: '"',    new: 171 },
		{ old: '_"',   new: 187 },
	];
	let inQuote = false;
	let i = 0;
	while (i < str.length) {
		for (let j = 0; j < swaps.length; j++) {
			if (str.slice(i, i + swaps[j].old.length) == swaps[j].old) {
				str = str.slice(0, i)
					+ String.fromCharCode(swaps[j].new) 
					+ str.slice(i + swaps[j].old.length);
				break;
			}
		}
		i++
	}
	return str;
};