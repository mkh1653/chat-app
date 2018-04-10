const expect = require("expect");

const {Users} = require("./users");


describe('Users', () =>{
	var users;

	beforeEach(() =>{
		users = new Users;
		users.users = [{
			id: '1',
			name: 'sina',
			room: 'Js Course'
		}, {
			id: '2',
			name: 'amir',
			room: 'PHP Course'
		}, {
			id: '3',
			name: 'morteza',
			room: 'Js Course'
		}];
	});

	it('Shoulde add new user', () =>{
		var users  = new Users();
		var user = {
			id: '123',
			name: 'mahdi',
			room: 'The office Fans'
		};

		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('Shoulde return names for Js course', () =>{
		var userList = users.getUserList('Js Course');
		expect(userList).toEqual(['sina', 'morteza']);
	});

	it('Shoulde return names for PHP course', () =>{
		var userList = users.getUserList('PHP Course');
		expect(userList).toEqual(['amir']);
	});

	it('Shoulde find a user', () =>{
		var userId = '1'
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
	});

	it('Shoulde not find user', () =>{
		var userId = '10'
		var user = users.getUser(userId);

		expect(user).toNotExist();
	});	

	it('Shoulde remove a user', () =>{
		var userId = '1'
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('Shoulde not remove user', () =>{
		var userId = '10'
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});	
});