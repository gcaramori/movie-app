import ReactPaginate from 'react-paginate';

const Pagination = ({ setSelectedPage, totalItems }) => {
    if(totalItems > 500) totalItems = 500;
    const pageCount = Math.ceil(totalItems / 20);

    const handlePageClick = (event) => {
        setSelectedPage(event.selected + 1);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
        />
    );
}

export default Pagination;