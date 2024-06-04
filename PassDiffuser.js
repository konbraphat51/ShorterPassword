class PassDiffuser {
	//a-z + A-Z + 0-9
	char_set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	Diffuse(original_text, altered_text) {
		const remaining_chars = 5

		const per_char = Math.floor(original_text.length / altered_text.length)

		//seperate
		let original_seperated = []
		while (original_text.length > 0) {
			original_seperated.push(
				original_text.substring(0, Math.min(per_char, original_text.length)),
			)
			original_text = original_text.substring(
				Math.min(per_char, original_text.length),
			)
		}

		//remaining
		while (original_seperated.length > altered_text.length) {
			let last = original_seperated.pop()
			original_seperated[original_seperated.length - 1] += last
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
		//fill with the last length
		const length_last = original_seperated[original_seperated.length - 1].length
		for (let cnt = 0; cnt < remaining_chars; cnt++) {
			diffusion_dictionary[altered_text[cnt]].push(
				this.#ComputeRandomString(length_last),
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
		const json_string = JSON.stringify(diffusion_dictionary)
		const base64_string = btoa(json_string)
		return base64_string
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
