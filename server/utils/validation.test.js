const expect = require("expect");

const {isRealString} = require("/validation");

describe("isRealString", () =>{
	it("Should reject non-string values", () =>{
		var res = isRealString(98);
		expect().toBe(false);
	});

	it("Should reject string withe only spaces", () =>{
		var res = isRealString("    ");
		expect().toBe(false);
	});

	it("Should allow string withe non-space characters", () =>{
		var res isRealString("   hello    ");
		expect().toBe(true);
	});
});