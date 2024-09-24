import { render } from "@testing-library/react"
import { Pagination } from "./pagination"
import userEvent from "@testing-library/user-event"

const onPageChangeCallBack = vi.fn();

describe('Pagination', () => {

    beforeEach(() => {
        onPageChangeCallBack.mockClear()
    })

    it('should display the right amount of pages and results', () => {
        const wrapper = render(
            <Pagination
                onPageChange={onPageChangeCallBack}
                pageIndex={0}
                perPage={10}
                totalCount={100}
            />
        )

        expect(wrapper.getByText('Página 1 de 10')).toBeInTheDocument()
        expect(wrapper.getByText('Total de 100 itens')).toBeInTheDocument()
    })

    it('should to able to navigateto the next page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination
                onPageChange={onPageChangeCallBack}
                pageIndex={0}
                perPage={10}
                totalCount={100}
            />
        )

        const nextPageButton = wrapper.getByRole('button', ({
            name: 'Próxima página'
        }))

        await user.click(nextPageButton)

        expect(onPageChangeCallBack).toHaveBeenCalledWith(1)
    })

    it('should to able to navigate to the previous page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination
                onPageChange={onPageChangeCallBack}
                pageIndex={4}
                perPage={10}
                totalCount={100}
            />
        )

        const previousPageButton = wrapper.getByRole('button', ({
            name: 'Página anterior'
        }))

        await user.click(previousPageButton)

        expect(onPageChangeCallBack).toHaveBeenCalledWith(3)
    })

    it('should to able to navigate to the first page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination
                onPageChange={onPageChangeCallBack}
                pageIndex={4}
                perPage={10}
                totalCount={100}
            />
        )

        const firstPageButton = wrapper.getByRole('button', ({
            name: 'Primeira página'
        }))

        await user.click(firstPageButton)

        expect(onPageChangeCallBack).toHaveBeenCalledWith(0)
    })

    it('should to able to navigate to the last page', async () => {
        const user = userEvent.setup()

        const wrapper = render(
            <Pagination
                onPageChange={onPageChangeCallBack}
                pageIndex={0}
                perPage={10}
                totalCount={100}
            />
        )

        const lastPageButton = wrapper.getByRole('button', ({
            name: 'Última página'
        }))

        await user.click(lastPageButton)

        expect(onPageChangeCallBack).toHaveBeenCalledWith(9)
    })
})
