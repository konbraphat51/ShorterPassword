class PassReverser {
	/**
	 * @param {object} diffused diffusion dictionary
	 */
	constructor(diffused) {
		this.diffused = diffused
	}

	Reverse(input) {
		let reversed = ""

		let counters = {}
		const keys = Object.keys(this.diffused)
		for (let cnt = 0; cnt < keys.length; cnt++) {
			counters[keys[cnt]] = 0
		}

		for (let cnt = 0; cnt < input.length; cnt++) {
			let char = input[cnt]

			//avoid error
			if (counters[char] >= this.diffused[char].length) {
				counters[char] = 0
			}

			let adding = this.diffused[char][counters[char]]
			counters[char] += 1

			reversed += adding
		}

		return reversed
	}
}
