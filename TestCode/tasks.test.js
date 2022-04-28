const { getAllTask, getAtask } = require('./mockaxios');
describe('Verifying ALL task', () => {
    test("ALL TASK", async () => {
        const result = await getAllTask();
        const { isCompleted, name,userName,userID } = result[0];
        expect( result.length ).toBe(4);
        expect(name).toBe('VIXENrt');
    })
});

/* describe('Verifying a task', () => {
    test("SINGLE TASK", async () => {
        const result = await  getAtask();
        expect(result).toBe("cse350 quiz at 7 PM.");
    })
}); */