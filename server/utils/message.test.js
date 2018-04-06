const expect = require("expect");

const {generateMessage,generateLocationMessage} = require("./message");


describe("generateMessage", () =>{
	it("Should generate correct message object", () =>{
		var from = "jen";
		var text = "Some message";
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, text});
	});
});

describe("generateLocationMessage", () =>{
	it("Should generate correct message", () =>{
		var from = "deb";
		var latitude = 123;
		var longitude = 455;
		var url = "https://google.com/maps?q=455,123";

		var message = generateLocationMessage(from, longitude, latitude);
		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, url});
	})
});