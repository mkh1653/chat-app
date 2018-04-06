const expect = require("expect");

const {generateMessage} = require("./message");


describe("generateMessage", () =>{
	it("Should generate correct message object", () =>{
		var from = "jen";
		var text = "Some message";
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text});
	});
});