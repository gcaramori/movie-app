import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ props, pagesLength }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const items = Array.from(Array(parseInt(pagesLength)).keys());
    const pageCount = Math.ceil(items.length / 20);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * pagesLength) % items.length;

        setItemOffset(newOffset);
    };

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            {...props}
        />
    );
}

export default Pagination;