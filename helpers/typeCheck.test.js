const typeCheck = require("./typeCheck")
// @ponicode
describe("typeCheck", () => {
    test("0", () => {
        let callFunction = () => {
            typeCheck("wins")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            typeCheck("win")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            typeCheck("loss")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            typeCheck("array")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            typeCheck("losses")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            typeCheck(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
