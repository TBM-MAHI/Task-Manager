const { getAllTask, getAtask } = require('./TestMethods');

describe('Verifying User And Task', () => {
    test("A Task", async () => {
        const result = await getAllTask();
        const { isCompleted, name,userName,userID } = result[0];
        expect( result.length ).toBe(3);
        expect(name).toBe('cse350 quiz at 7 PM.');
    })
});

describe('Verifying Single task', () => {
    test("UserName", async () => {
        const result = await  getAtask();
        expect(result).toBe("mahi");
    })
});