import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { OrderTableFilters } from "./order-table-filters"
import userEvent from "@testing-library/user-event"

// const handleClearFilterCallBack = vi.fn();

describe('OrderTableFilter', () => {
    it('should clear the filter form fields', async () => {
        const wrapper = render(<OrderTableFilters />, {
            wrapper: ({ children }) => {
                return (
                    <MemoryRouter initialEntries={['/orders']}>
                        {children}
                    </MemoryRouter>
                )
            }
        })

        const user = userEvent.setup()

        const removeFiltersButton = wrapper.getByRole('button', ({
            name: 'Remover filtros'
        }))

        await user.click(removeFiltersButton)

        wrapper.debug()
    })
})