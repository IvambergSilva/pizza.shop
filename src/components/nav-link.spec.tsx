import { render } from "@testing-library/react"
import { NavLink } from "./nav-link"
import { MemoryRouter } from "react-router-dom"

describe('NavLink', () => {
    it('should highlight the nav-link when is the current page link', () => {
        const wrapper = render(
            <>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/orders'}>Pedidos</NavLink>
            </>, {
            wrapper: ({ children }) => {
                return (
                    <MemoryRouter initialEntries={['/orders']}>
                        {children}
                    </MemoryRouter>
                )
            }
        })

        wrapper.debug()

        expect(wrapper.getByText('Pedidos').dataset.current).toEqual('true')

        expect(wrapper.getByText('Home').dataset.current).toEqual('false')
    })
})