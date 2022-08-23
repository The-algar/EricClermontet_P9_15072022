/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {screen, waitFor, fireEvent} from "@testing-library/dom"
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import {bills} from "../fixtures/bills.js"
import {ROUTES, ROUTES_PATH} from "../constants/routes.js";
import {localStorageMock} from "../__mocks__/localStorage.js";
import mockStore from "../__mocks__/store"

import store from "../__mocks__/store.js";
import userEvent from "@testing-library/user-event";
 
import router from "../app/Router.js";
 
jest.mock("../app/store", () => mockStore)


describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then mail icon in vertical layout should be hightlighted", async() => {

      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.NewBill)
      await waitFor(() => screen.getByTestId('icon-mail'))
      const mailIcon = screen.getByTestId('icon-mail')
      //to-do write expect expression
      expect(mailIcon.classList.contains('active-icon')).toBe(true)

    })

    test("Then all fields in that form are mandatory", () => {
      const html = NewBillUI()
      document.body.innerHTML = html
      expect(screen.getByTestId("form-new-bill")).toBeTruthy();
      expect(screen.getByTestId("expense-type")).toBeTruthy();
      expect(screen.getByTestId("expense-name")).toBeTruthy();
      expect(screen.getByTestId("datepicker")).toBeTruthy();
      expect(screen.getByTestId("amount")).toBeTruthy();
      expect(screen.getByTestId("vat")).toBeTruthy();
      expect(screen.getByTestId("pct")).toBeTruthy();
      expect(screen.getByTestId("commentary")).toBeTruthy();
      expect(screen.getByTestId("file")).toBeTruthy();
      expect(screen.getByRole("button")).toBeTruthy();
  })
    describe("When I click on upload a file", () => {
      test("Then an image browser modal should be displayed", () => {
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee'
        }))
        const html = NewBillUI()
        document.body.innerHTML = html
        const onNavigate = (pathname) => {document.body.innerHTML = ROUTES({pathname})}

        const currentNewBill = new NewBill({document, onNavigate, store: store, localStorage: localStorage})
        const fileTest = new File(['hello'], 'hello.png', {type: 'image/png'})

        const handleChangeFile = jest.fn((e) => currentNewBill.handleChangeFile(e))
        
        const selectFile = screen.getByTestId("file")
        selectFile.addEventListener('change', handleChangeFile)
        userEvent.upload(selectFile, fileTest)
        expect(selectFile.files[0]).toStrictEqual(fileTest)
        expect(selectFile.files.item(0)).toStrictEqual(fileTest)
        expect(selectFile.files).toHaveLength(1)
      })
    })
    describe("When I click on Submit button with a complete form", () => {
      test("Then It should call the submit function and renders Bills page", async () => {
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee'
        }))

        const html = NewBillUI()
        document.body.innerHTML = html

        const onNavigate = (pathname) => {document.body.innerHTML = ROUTES({pathname, data: bills})}
        const currentNewBill = new NewBill({document, onNavigate, store: mockStore, localStorage: localStorage})

        const fileTest = new File(['hello'], 'hello.png', {type: 'image/png'})
        const handleChangeFile = jest.fn((e) => currentNewBill.handleChangeFile(e))
        const selectFile = screen.getByTestId("file")
        selectFile.addEventListener('change', handleChangeFile)
        userEvent.upload(selectFile, fileTest)
        screen.getByTestId("expense-type").value = "IT et électronique"
        screen.getByTestId("expense-name").value = "Laptop Eric Clermontet"
        screen.getByTestId("datepicker").value = "2022-07-18"
        screen.getByTestId("amount").value = "1234"
        screen.getByTestId("vat").value = "206"
        screen.getByTestId("pct").value = "20"
        screen.getByTestId("commentary").value = "New laptop for the React JS training at OpenClassrooms"

        const handleSubmit = jest.spyOn(currentNewBill, 'handleSubmit')
        const form = screen.getByTestId("form-new-bill")
        form.addEventListener("submit", handleSubmit)
        fireEvent.submit(form)

        expect(handleSubmit).toHaveBeenCalled()

        await waitFor(() => screen.getByText("Mes notes de frais"))
        const billsPage = screen.getByText("Mes notes de frais")
        expect(billsPage).toBeTruthy()
      })
    })
  })
})

// test d'intégration POST

describe("Given I am a user connected as Employee", () => {
  beforeEach(() => {
    Object.defineProperty(
        window,
        'localStorage',
        { value: localStorageMock }
    )

    window.localStorage.setItem('user', JSON.stringify({
      type: 'Employee',
      email: "john@doe"
    }))
    const root = document.createElement("div")
    root.setAttribute("id", "root")
    document.body.appendChild(root)
    router()

  })

  describe("When I navigate to NewBill page", () => {
    test("Then create new bill to mock API POST", async () => {
      const spy = jest.spyOn(mockStore, "bills")
      const billdata={
        status: "pending",
        pct: 20,
        amount: 200,
        email: "john@doe",
        name: "Diner prospet",
        vat: "40",
        fileName: "justificatif.jpg",
        date: "2002-08-02",
        commentary: "Diner d'affaire newbiz",
        type: "Restaurants et bars",
        fileUrl: "justificatif.jpg"
      }

      mockStore.bills().create(billdata)

      expect(spy).toHaveBeenCalledTimes(1)
    })
  })

  describe("When an error occurs on API", () => {

    test("Then it fails with 404 message error", async () => {      

      jest.spyOn(mockStore, "bills")

      const rejected = mockStore.bills.mockImplementationOnce(() => {

        return {

          create: () => {return Promise.reject(new Error("Erreur 404"))}

        }

      })

      window.onNavigate(ROUTES_PATH.NewBill)

      await new Promise(process.nextTick);

      return expect(rejected().create).rejects.toEqual(new Error("Erreur 404"))

    })

    test("Then create new bill to an API and fails with 500 message error", async () => {

      jest.spyOn(mockStore, "bills")

      const rejected = mockStore.bills.mockImplementationOnce(() => {

        return {

          create: () => {return Promise.reject(new Error("Erreur 500"))}

        }

      })

      window.onNavigate(ROUTES_PATH.NewBill)
      await new Promise(process.nextTick);
      return expect(rejected().create).rejects.toEqual(new Error("Erreur 500"))
    })
  })
})