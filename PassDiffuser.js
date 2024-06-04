class PassDiffuser {
	//a-z + A-Z + 0-9
	char_set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	Diffuse(original_text, altered_text) {
		const remaining_chars = 5

		const per_char = Math.floor(original_text.length / altered_text.length)
		const remaining = original_text.length % altered_text.length

		//seperate
		let original_seperated = []
		for (
			let cnt = 0;
			cnt < Math.floor(original_text.length / per_char);
			cnt++
		) {
			original_seperated.push(
				original_text.slice(cnt * per_char, (cnt + 1) * per_char),
			)
		}
		let remainer = original_text.slice(
			original_seperated.length * per_char,
			original_text.length,
		)
		if (remainer != undefined) {
			original_seperated.push(remainer)
		}

		//create diffusion dictionary
		let diffusion_dictionary = {}
		for (let cnt = 0; cnt < this.char_set.length; cnt++) {
			diffusion_dictionary[this.char_set[cnt]] = []
		}

		//correct data
		for (
			let cnt_original = 0;
			cnt_original < altered_text.length;
			cnt_original++
		) {
			diffusion_dictionary[altered_text[cnt_original]].push(
				original_seperated[cnt_original],
			)
		}

		//>>fill data
		//fill the remaining length
		for (let cnt = 0; cnt < remaining_chars; cnt++) {
			diffusion_dictionary[altered_text[cnt]].push(
				this.#ComputeRandomString(remaining),
			)
		}

		//find the max items
		let max_items = 0
		for (let cnt = 0; cnt < this.char_set.length; cnt++) {
			if (diffusion_dictionary[this.char_set[cnt]].length > max_items) {
				max_items = diffusion_dictionary[this.char_set[cnt]].length
			}
		}

		//fill all lists
		for (let cnt = 0; cnt < this.char_set.length; cnt++) {
			let current_list = diffusion_dictionary[this.char_set[cnt]]

			while (current_list.length < max_items) {
				current_list.push(this.#ComputeRandomString(per_char))
			}
		}
		//<<fill data

		//output
		return diffusion_dictionary
	}

	#ComputeRandomString(length) {
		let result = ""
		const charactersLength = this.char_set.length
		for (let cnt = 0; cnt < length; cnt++) {
			result += this.char_set.charAt(
				Math.floor(Math.random() * charactersLength),
			)
		}
		return result
	}
}
