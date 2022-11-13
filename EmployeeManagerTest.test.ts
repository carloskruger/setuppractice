import {Builder, By, Capabilities, until, WebDriver} from "selenium-webdriver"
const chromedriver = require("chromedriver")
const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build()
import {emManager} from './EmployeeManagerPageObject'
const employeePage = new emManager(driver)

class Employee {
    name: string; 
    phone: number; 
    title: string; 

    constructor(name:string, phone: number, title: string){
        this.name = name; 
        this.phone = phone; 
        this.title = title; 
    }
}

let newEmployee: Array<Employee> = [
    new Employee("Employee 1", 1234567890, "Associate"), 
    new Employee("Employee 2", 1234567890, "Associate"), 
    new Employee("Employee 3", 1234567890, "VicePresident"),
    new Employee("Employee 4", 1234567890, "Director")
]

let addEmp = async (newEmployee) => {
    await employeePage.click(employeePage.addEmployee)
    await employeePage.click(employeePage.newEmployee)
    await employeePage.click(employeePage.nameField)
    await employeePage.setInput(employeePage.nameField, newEmployee.name)
    await employeePage.click(employeePage.phoneField)
    await employeePage.setInput(employeePage.phoneField, newEmployee.phone)
    await employeePage.click(employeePage.titleField)
    await employeePage.setInput(employeePage.titleField, newEmployee.title)
    await employeePage.click(employeePage.saveBtn)
    await employeePage.driver.sleep(3000)
}

describe("Test adding employees to employee manager", () => {
    test("can add employees using array", async () => { 
        await employeePage.navigate()
        for(let i = 0; i < newEmployee.length; i++){
            await addEmp(newEmployee[i])
        }
        await employeePage.driver.quit()
    })
})