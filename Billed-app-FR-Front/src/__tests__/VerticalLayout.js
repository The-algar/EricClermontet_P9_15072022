/**
 * @jest-environment jsdom
 */

import { screen } from "@testing-library/dom"
import VerticalLayout from "../views/VerticalLayout"
import { localStorageMock } from "../__mocks__/localStorage.js"


describe('Given I am connected as Employee', () => {
  test("Then Icons should be rendered", () => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    const user = JSON.stringify({
      type: 'Employee'
    })
    window.localStorage.setItem('user', user)
    const html = VerticalLayout(120)
    document.body.innerHTML = html
    expect(screen.getByTestId('icon-window')).toBeTruthy()
    expect(screen.getByTestId('icon-mail')).toBeTruthy()
  })

})

describe('Given I am connected as Admin', () => {
  test("Then 'Billed' should be rendered", () => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })
    const user = JSON.stringify({
      type: 'Admin'
    })
    window.localStorage.setItem('user', user)
    const html = VerticalLayout(120)
    document.body.innerHTML = html

    expect(screen.getByText("Billed")).toBeTruthy();
  })

})

describe('Given I am connected as Admin or Employee', () => {
  test("Then disconnected should be rendered", () => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock })

    const html = VerticalLayout(120)
    document.body.innerHTML = html
    expect(screen.getByTestId('layout-disconnect')).toBeTruthy()

  })

})